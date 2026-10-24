import { useEffect } from "react";
import { supabase } from "../services/supabase";

function VisitorTracker() {
  useEffect(() => {
    let sessionId;

    // Get or create a visitor ID
    try {
      sessionId = localStorage.getItem("visitor_session_id");

      if (!sessionId) {
        sessionId =
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

        localStorage.setItem("visitor_session_id", sessionId);
      }
    } catch (error) {
      // Fallback if browser storage is unavailable
      sessionId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }

    let isMounted = true;

    async function registerVisitor() {
      try {
        // Register the visitor even if country detection fails
        const { error } = await supabase
          .from("visitor_sessions")
          .upsert(
            {
              session_id: sessionId,
              country: "Unknown",
              last_seen: new Date().toISOString(),
            },
            {
              onConflict: "session_id",
            }
          );

        if (error) {
          console.error("Visitor registration failed:", error);
          return;
        }

        // Count this browser's first visit
        let alreadyCounted = false;

        try {
          alreadyCounted =
            localStorage.getItem("visitor_counted") === "true";
        } catch {
          // Storage may be unavailable in some browsers
        }

        if (!alreadyCounted) {
          const { data, error: statsError } = await supabase
            .from("portfolio_visitor_stats")
            .select("total_visitors")
            .eq("id", 1)
            .single();

          if (statsError) {
            console.error("Visitor count read failed:", statsError);
            return;
          }

          const { error: updateError } = await supabase
            .from("portfolio_visitor_stats")
            .update({
              total_visitors: (data.total_visitors || 0) + 1,
            })
            .eq("id", 1);

          if (updateError) {
            console.error("Visitor count update failed:", updateError);
            return;
          }

          try {
            localStorage.setItem("visitor_counted", "true");
          } catch {
            // Counting still succeeds if storage is unavailable
          }
        }

        // Detect country separately; this must not block registration
        try {
          const controller = new AbortController();
          const timeout = setTimeout(
            () => controller.abort(),
            5000
          );

          try {
            const response = await fetch("https://ipwho.is/", {
              signal: controller.signal,
            });

            if (response.ok) {
              const location = await response.json();

              if (location.success && location.country && isMounted) {
                await supabase
                  .from("visitor_sessions")
                  .update({
                    country: location.country,
                    last_seen: new Date().toISOString(),
                  })
                  .eq("session_id", sessionId);
              }
            }
          } finally {
            clearTimeout(timeout);
          }
        } catch {
          console.log(
            "Country detection unavailable; visitor remains registered."
          );
        }
      } catch (error) {
        console.error("Visitor tracking failed:", error);
      }
    }

    registerVisitor();

    // Keep the visitor's last-seen time fresh
    const heartbeat = setInterval(async () => {
      try {
        await supabase
          .from("visitor_sessions")
          .update({
            last_seen: new Date().toISOString(),
          })
          .eq("session_id", sessionId);
      } catch (error) {
        console.error("Visitor heartbeat failed:", error);
      }
    }, 30000);

    return () => {
      isMounted = false;
      clearInterval(heartbeat);
    };
  }, []);

  return null;
}

export default VisitorTracker;