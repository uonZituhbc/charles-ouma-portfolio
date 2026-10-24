import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { supabase } from "../services/supabase";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load projects:", error);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            My Work
          </p>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Projects I've Built
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            A selection of digital products and software solutions I've
            developed to solve real-world problems.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-[520px] animate-pulse rounded-3xl border border-white/10 bg-white/5"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-gray-500">
              Projects will appear here soon.
            </p>
          </div>
        )}

        {/* Projects */}
        {!loading && projects.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-white/[0.05]"
              >
                {/* Project image */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/10">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={`${project.title} project`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-blue-400/60">
                          {"</>"}
                        </div>

                        <p className="mt-3 text-sm tracking-widest text-gray-500">
                          PROJECT
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-70" />

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute left-5 top-5 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-300 backdrop-blur-md">
                      Featured Project
                    </div>
                  )}

                  {/* Top-right arrow */}
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition duration-300 group-hover:bg-blue-600">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-2xl font-bold transition group-hover:text-blue-400">
                    {project.title}
                  </h3>

                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="rounded-full border border-blue-500/10 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Actions */}
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
                      >
                        <ExternalLink size={16} />
                        Live Project
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:border-blue-500/40 hover:text-white"
                      >
                        <span className="text-sm font-bold">GH</span>
GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;