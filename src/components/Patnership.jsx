import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Code2,
  Lightbulb,
  Mail,
  Send,
} from "lucide-react";
import { supabase } from "../services/supabase";

function Partnership() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    collaboration_type: "",
    description: "",
    budget: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    text: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setSending(true);
    setStatus({
      type: "",
      text: "",
    });

    const { error } = await supabase
      .from("partnership_requests")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          organization: formData.organization,
          collaboration_type: formData.collaboration_type,
          description: formData.description,
          message: formData.description,
          budget: formData.budget || null,
        },
      ]);

    if (error) {
      console.error("Error submitting partnership request:", error);

      setStatus({
        type: "error",
        text: "Something went wrong. Please try again.",
      });

      setSending(false);
      return;
    }

    setFormData({
      name: "",
      email: "",
      organization: "",
      collaboration_type: "",
      description: "",
      budget: "",
    });

    setStatus({
      type: "success",
      text: "Your collaboration request has been submitted successfully.",
    });

    setSending(false);
  }

  return (
    <section
      id="partnership"
      className="relative overflow-hidden border-t border-white/10 px-6 py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Collaboration
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's build something
            <span className="block text-blue-500">
              meaningful together.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Have an idea, project or organization that needs a digital
            solution? Tell me what you're building and let's explore
            how we can work together.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">

          {/* Information */}
          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <Mail size={22} />
              </div>

              <h3 className="mt-7 text-2xl font-bold">
                Open to new ideas.
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                I'm interested in working with individuals, businesses,
                organizations and fellow developers to turn ideas into
                useful technology.
              </p>

              <div className="mt-8 space-y-4">

                <div className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Code2 size={19} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Software Projects
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Websites, web applications and custom software.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Building2 size={19} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Organizations
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Digital platforms and management systems.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group rounded-2xl border border-white/10 bg-black/20 p-5 transition hover:border-blue-500/30">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Lightbulb size={19} />
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        Technology Ideas
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Turning promising ideas into working solutions.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Currently available for collaboration
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 sm:p-8"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold">
                  Start a conversation
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Share a few details about what you'd like to build.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="partnership-name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Name
                  </label>

                  <input
                    id="partnership-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="partnership-email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="partnership-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                  />
                </div>

              </div>

              <div className="mt-6">
                <label
                  htmlFor="organization"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Organization / Company
                  <span className="ml-2 text-xs text-gray-600">
                    Optional
                  </span>
                </label>

                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Your organization"
                  className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="collaboration_type"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  What would you like to build?
                </label>

                <select
                  id="collaboration_type"
                  name="collaboration_type"
                  value={formData.collaboration_type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Website Development">
                    Website Development
                  </option>
                  <option value="Web Application">
                    Web Application
                  </option>
                  <option value="Management System">
                    Management System
                  </option>
                  <option value="Software Project">
                    Software Project
                  </option>
                  <option value="Technology Partnership">
                    Technology Partnership
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Tell me about your idea
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Describe the project, problem or idea you'd like to discuss..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="budget"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Estimated Budget
                  <span className="ml-2 text-xs text-gray-600">
                    Optional
                  </span>
                </label>

                <input
                  id="budget"
                  name="budget"
                  type="text"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. KSh 20,000"
                  className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              {status.text && (
                <div
                  className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-green-500/20 bg-green-500/10 text-green-400"
                      : "border-red-500/20 bg-red-500/10 text-red-400"
                  }`}
                >
                  {status.text}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold transition duration-300 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending ? (
                  "Submitting..."
                ) : (
                  <>
                    Send Collaboration Request
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                <Send size={13} />
                Your request will be sent securely.
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Partnership;