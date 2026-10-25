import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { Users, Globe2, Radio } from "lucide-react";

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
      } else {
        setLiveVisitors((sessions || []).length);
      }

      const { data: total, error: totalError } = await supabase
        .from("portfolio_visitor_stats")
        .select("total_visitors")
        .eq("id", 1)
        .single();

      if (totalError) {
        console.error("Total visitors error:", totalError);
      } else {
        setTotalVisitors(total?.total_visitors || 0);
      }

      const { data: allSessions, error: countriesError } = await supabase
        .from("visitor_sessions")
        .select("country");

      if (countriesError) {
        console.error("Countries error:", countriesError);
      } else {
        const uniqueCountries = new Set(
          (allSessions || [])
            .map((session) => session.country)
            .filter(
              (country) =>
                country && country !== "Unknown"
            )
        );

        setCountries(uniqueCountries.size);
      }
    } catch (error) {
      console.error("Visitor statistics error:", error);
    }
  }

  useEffect(() => {
    // Load statistics in the background.
    // This does not block the rest of the portfolio from rendering.
    const loadInBackground = () => {
      setTimeout(() => {
        loadStats();
      }, 0);
    };

    loadInBackground();

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

        {/* Live Visitors */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-green-400/20">
          <div className="mb-3 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500/10 text-green-400">
              <Radio size={22} />
            </div>
          </div>

          <p className="text-3xl font-bold text-green-400">
            {liveVisitors}
          </p>

          <p className="mt-2 font-medium text-white">
            Live Visitors
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            People currently viewing this portfolio.
          </p>
        </div>

        {/* Total Visitors */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-blue-400/20">
          <div className="mb-3 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
              <Users size={22} />
            </div>
          </div>

          <p className="text-3xl font-bold text-blue-400">
            {totalVisitors}
          </p>

          <p className="mt-2 font-medium text-white">
            Total Visitors
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            The total number of visitors recorded on this portfolio.
          </p>
        </div>

        {/* Countries Reached */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center transition hover:border-purple-400/20">
          <div className="mb-3 flex justify-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
              <Globe2 size={22} />
            </div>
          </div>

          <p className="text-3xl font-bold text-purple-400">
            {countries}
          </p>

          <p className="mt-2 font-medium text-white">
            Countries Reached
          </p>

          <p className="mt-2 text-xs leading-5 text-gray-500">
            The number of different countries visitors have come from.
          </p>
        </div>

      </div>
    </section>
  );
}

export default VisitorStats;