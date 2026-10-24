import { useEffect } from "react";
import { supabase } from "../services/supabase";

function VisitorTracker() {
  useEffect(() => {
    let sessionId = localStorage.getItem("visitor_session_id");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("visitor_session_id", sessionId);
    }

    async function registerVisitor() {
      try {
        // Get country from IP-based geolocation
        const response = await fetch("https://ipwho.is/");
const location = await response.json();

const country = location.success
  ? location.country
  : "Unknown";

        // Create or update visitor session
        const { error } = await supabase
          .from("visitor_sessions")
          .upsert(
            {
              session_id: sessionId,
              country,
              last_seen: new Date().toISOString(),
            },
            {
              onConflict: "session_id",
            }
          );

        if (error) {
          console.error("Visitor tracking error:", error);
          return;
        }

        // Increase total visitors only for a new session
        const alreadyCounted = localStorage.getItem(
          "visitor_counted"
        );

        if (!alreadyCounted) {
          const { data, error: statsError } = await supabase
            .from("portfolio_visitor_stats")
            .select("total_visitors")
            .eq("id", 1)
            .single();

          if (statsError) {
            console.error("Visitor stats error:", statsError);
            return;
          }

          await supabase
            .from("portfolio_visitor_stats")
            .update({
              total_visitors: (data.total_visitors || 0) + 1,
            })
            .eq("id", 1);

          localStorage.setItem("visitor_counted", "true");
        }
      } catch (error) {
        console.error("Visitor tracking failed:", error);
      }
    }

    registerVisitor();

    // Heartbeat — keeps the visitor marked as active
    const heartbeat = setInterval(async () => {
      await supabase
        .from("visitor_sessions")
        .update({
          last_seen: new Date().toISOString(),
        })
        .eq("session_id", sessionId);
    }, 30000);

    return () => {
      clearInterval(heartbeat);
    };
  }, []);

  return null;
}

export default VisitorTracker;