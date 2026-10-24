import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { supabase } from "../services/supabase";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
      .from("messages")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

    if (error) {
      console.error("Error sending message:", error);

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
      subject: "",
      message: "",
    });

    setStatus({
      type: "success",
      text: "Message sent successfully. I'll get back to you soon.",
    });

    setSending(false);
  }

  const socialLinks = [
    {
      name: "WhatsApp",
      description: "Chat with me",
      icon: MessageCircle,
      href: "https://wa.me/254757965146",
      iconClass: "text-green-400",
      bgClass: "bg-green-500/10",
      borderClass: "hover:border-green-500/30",
    },
    {
      name: "Call",
      description: "+254 119 984 166",
      icon: Phone,
      href: "tel:+254119984166",
      iconClass: "text-blue-400",
      bgClass: "bg-blue-500/10",
      borderClass: "hover:border-blue-500/30",
    },
    {
      name: "Instagram",
      description: "@oumacharles001",
      mark: "IG",
      href: "https://instagram.com/oumacharles001",
      iconClass: "text-pink-400",
      bgClass: "bg-pink-500/10",
      borderClass: "hover:border-pink-500/30",
    },
    {
      name: "TikTok",
      description: "@ouma.charles001",
      mark: "TT",
      href: "https://www.tiktok.com/@ouma.charles001",
      iconClass: "text-white",
      bgClass: "bg-white/10",
      borderClass: "hover:border-white/20",
    },
    {
      name: "YouTube",
      description: "@oumacharles001",
      mark: "YT",
      href: "https://youtube.com/@oumacharles001",
      iconClass: "text-red-400",
      bgClass: "bg-red-500/10",
      borderClass: "hover:border-red-500/30",
    },
    {
      name: "X",
      description: "@oumacharles001",
      mark: "𝕏",
      href: "https://x.com/oumacharles001",
      iconClass: "text-white",
      bgClass: "bg-white/10",
      borderClass: "hover:border-white/20",
    },
    {
      name: "Threads",
      description: "@oumacharles001",
      mark: "@",
      href: "https://www.threads.net/@oumacharles001",
      iconClass: "text-white",
      bgClass: "bg-white/10",
      borderClass: "hover:border-white/20",
    },
    {
      name: "Facebook",
      description: "Facebook Page",
      mark: "f",
      href: "https://www.facebook.com/profile.php?id=100075782140738",
      iconClass: "text-blue-400",
      bgClass: "bg-blue-500/10",
      borderClass: "hover:border-blue-500/30",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 px-6 py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-600/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            Contact
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Let's start a
            <span className="block text-blue-500">
              conversation.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Have a project idea, question or opportunity? Send me a
            message and let's explore what we can build together.
          </p>
        </div>

        {/* Contact area */}
        <div className="mt-16 grid gap-10 lg:grid-cols-5">

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                <MessageSquare size={22} />
              </div>

              <h3 className="mt-7 text-2xl font-bold">
                Get in touch
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                I'm open to software projects, technology collaborations,
                partnerships and opportunities to build useful digital
                solutions.
              </p>

              <div className="mt-8 space-y-4">

                {/* Email */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-600">
                        Email
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        Available through the contact form
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <MapPin size={18} />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-600">
                        Based in
                      </p>

                      <p className="mt-1 text-sm text-gray-300">
                        Kenya
                      </p>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                      <CheckCircle2 size={18} />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-600">
                        Availability
                      </p>

                      <p className="mt-1 text-sm text-green-400">
                        Open to collaborations
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-8 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-5">
                <p className="text-sm leading-6 text-gray-400">
                  Whether you're building a startup, organization platform,
                  website or custom software, I'd be glad to hear about it.
                </p>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 sm:p-8"
            >

              <div className="mb-8">
                <h3 className="text-2xl font-bold">
                  Send me a message
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Fill in the form below and I'll get back to you.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
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
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
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
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project collaboration"
                  className="w-full rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your idea or project..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#050816] px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30"
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
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                <Send size={13} />
                Your message will be stored securely.
              </div>

            </form>
          </div>

        </div>

        {/* Social & Direct Contact */}
        <div className="mt-20">

          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
              Connect
            </p>

            <h3 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Find me online
            </h3>

            <p className="mt-4 text-gray-400">
              Prefer a quick chat or social connection? You can also reach
              me through any of these platforms.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06] ${social.borderClass}`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${social.bgClass} ${social.iconClass} transition duration-300 group-hover:scale-105`}
                  >
                    {social.icon ? (
                      <social.icon size={21} />
                    ) : (
                      <span className="text-lg font-bold">
                        {social.mark}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-white transition group-hover:text-blue-400">
                      {social.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {social.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="ml-auto shrink-0 text-gray-600 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-400"
                  />
                </a>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;