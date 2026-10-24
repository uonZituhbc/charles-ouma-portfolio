import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

function Stats() {
  const [stats, setStats] = useState({
    projects: 0,
    partnerships: 0,
    technologies: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
  try {
    const { count: projectsCount } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    const { count: technologiesCount } = await supabase
      .from("skills")
      .select("*", { count: "exact", head: true });

    const { data: partnershipStat } = await supabase
      .from("portfolio_stats")
      .select("value")
      .eq("name", "partnerships")
      .single();

    setStats({
      projects: projectsCount || 0,
      technologies: technologiesCount || 0,
      partnerships: partnershipStat?.value || 0,
    });
  } catch (error) {
    console.error("Error loading statistics:", error);
  } finally {
    setLoading(false);
  }
}

  const statistics = [
    {
      number: stats.projects,
      label: "Projects Built",
    },
    {
      number: stats.technologies,
      label: "Technologies",
    },
    {
      number: stats.partnerships,
      label: "Collaboration Requests",
    },
  ];

  return (
    <section className="border-y border-white/10 bg-white/[0.02] px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">

        {statistics.map((stat) => (
          <div
            key={stat.label}
            className="text-center"
          >
            <div className="text-4xl font-bold text-blue-400">
              {loading ? "..." : `${stat.number}+`}
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {stat.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;