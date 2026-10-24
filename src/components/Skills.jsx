import { useEffect, useState } from "react";
import {
  Code2,
  Globe,
  Layers3,
  Server,
  Database,
  GitBranch,
  
  Cpu,
} from "lucide-react";
import { supabase } from "../services/supabase";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error("Error loading skills:", error);
    } else {
      setSkills(data || []);
    }

    setLoading(false);
  }

  const categories = [
    {
      name: "Programming Language",
      icon: Code2,
      description: "Core programming",
    },
    {
      name: "Web Technology",
      icon: Globe,
      description: "Modern web",
    },
    {
      name: "Framework",
      icon: Layers3,
      description: "Application frameworks",
    },
    {
      name: "Runtime",
      icon: Server,
      description: "Application runtime",
    },
    {
      name: "Backend",
      icon: Cpu,
      description: "Backend development",
    },
    {
      name: "Database",
      icon: Database,
      description: "Data management",
    },
    {
      name: "Development Tool",
      icon: GitBranch,
      description: "Developer tools",
    },
    {
      name: "Development Platform",
      icon: GitBranch,
      description: "Development platforms",
    },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y border-white/10 px-6 py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Technologies
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Tools I use to{" "}
            <span className="text-blue-500">
              build.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            A growing toolkit of programming languages, frameworks,
            databases and development technologies I use to transform
            ideas into reliable digital solutions.
          </p>
        </div>

        {/* Skills */}
        {loading ? (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const categorySkills = skills.filter(
                (skill) => skill.category === category.name
              );

              if (categorySkills.length === 0) {
                return null;
              }

              const Icon = category.icon;

              return (
                <div
                  key={category.name}
                  className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]"
                >
                  {/* Category header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400 transition duration-300 group-hover:bg-blue-500/20">
                      <Icon size={21} />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-500">
                      {categorySkills.length}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-xs uppercase tracking-wider text-gray-600">
                    {category.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm font-medium text-gray-300 transition duration-300 hover:border-blue-500/30 hover:text-blue-400"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;