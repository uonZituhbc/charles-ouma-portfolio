import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function VisitorStats() {
  const [liveVisitors, setLiveVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [countries, setCountries] = useState(0);

  async function loadStats() {
    try {
      const sixtySecondsAgo = new Date(
        Date.now() - 60 * 1000
      ).toISOString();

      const { data: sessions, error: sessionsError } = await supabase
        .from("visitor_sessions")
        .select("country, last_seen")
        .gte("last_seen", sixtySecondsAgo);

      if (sessionsError) {
        console.error("Live visitors error:", sessionsError);
        return;
      }

      const { data: total, error: totalError } = await supabase
        .from("portfolio_visitor_stats")
        .select("total_visitors")
        .eq("id", 1)
        .single();

      if (totalError) {
        console.error("Total visitors error:", totalError);
        return;
      }

      const { data: allSessions, error: countriesError } = await supabase
        .from("visitor_sessions")
        .select("country");

      if (countriesError) {
        console.error("Countries error:", countriesError);
        return;
      }

      const uniqueCountries = new Set(
        (allSessions || [])
          .map((session) => session.country)
          .filter(
            (country) =>
              country && country !== "Unknown"
          )
      );

      setLiveVisitors((sessions || []).length);
      setTotalVisitors(total?.total_visitors || 0);
      setCountries(uniqueCountries.size);
    } catch (error) {
      console.error("Visitor statistics error:", error);
    }
  }

  useEffect(() => {
    loadStats();

    const channel = supabase
      .channel("visitor-sessions-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "visitor_sessions",
        },
        () => {
          loadStats();
        }
      )
      .subscribe();

    const interval = setInterval(loadStats, 10000);

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="border-y border-white/10 bg-white/[0.02] px-6 py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <div className="mb-2 text-2xl">🟢</div>

          <p className="text-3xl font-bold text-green-400">
            {liveVisitors}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Live Visitors
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <div className="mb-2 text-2xl">👁️</div>

          <p className="text-3xl font-bold text-blue-400">
            {totalVisitors}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Total Visitors
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
          <div className="mb-2 text-2xl">🌍</div>

          <p className="text-3xl font-bold text-purple-400">
            {countries}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Countries Reached
          </p>
        </div>

      </div>
    </section>
  );
}

export default VisitorStats;