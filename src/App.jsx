import { useEffect, useState } from "react";

import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Patnership from "./components/Patnership";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import VisitorTracker from "./components/VisitorTracker";
import VisitorStats from "./components/VisitorStats";

import { supabase } from "./services/supabase";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isAdminPage = window.location.hash === "#/admin";

  useEffect(() => {
    if (!isAdminPage) {
      setCheckingAuth(false);
      return;
    }

    checkAdminSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [isAdminPage]);

  async function checkAdminSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user ?? null);
    setCheckingAuth(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  // ================= ADMIN PAGE =================

  if (isAdminPage) {
    if (checkingAuth) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#050816] text-gray-400">
          Checking authentication...
        </div>
      );
    }

    if (!user) {
      return (
        <AdminLogin
          onLogin={(loggedInUser) => {
            setUser(loggedInUser);
          }}
        />
      );
    }

    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  // ================= PORTFOLIO =================

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <VisitorTracker />

      {/* ================= NAVIGATION ================= */}

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="text-xl font-bold tracking-wide"
            aria-label="Charles Ouma home"
          >
            <span className="text-white">CHARLES</span>
            <span className="text-blue-500">.</span>
          </a>

          <div className="hidden gap-8 text-sm text-gray-200 md:flex">
            <a href="#home" className="transition hover:text-blue-400">
              Home
            </a>

            <a href="#about" className="transition hover:text-blue-400">
              About
            </a>

            <a href="#skills" className="transition hover:text-blue-400">
              Skills
            </a>

            <a href="#projects" className="transition hover:text-blue-400">
              Projects
            </a>

            <a href="#contact" className="transition hover:text-blue-400">
              Contact
            </a>
          </div>

          <a
            href="#contact"
            className="rounded-full border border-blue-400/30 bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Let's Talk
          </a>
        </div>
      </nav>

      {/* ================= MAIN ================= */}

      <main>
        {/* ================= SHARP CINEMATIC HERO ================= */}

        <section
          id="home"
          className="relative isolate flex min-h-[100svh] items-start overflow-hidden bg-[#050816] px-6 pb-16 pt-20 sm:items-center sm:pt-28"
        >
          {/* Clear Video Background */}
          <video
            className="absolute inset-0 -z-30 h-full w-full object-contain object-center sm:object-cover sm:object-center"
            src={`${import.meta.env.BASE_URL}hero/charles_hero_polished.mp4`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            fetchPriority="high"
            aria-hidden="true"
          />

          {/* Lighter Overlay: Preserve Video Detail */}
          <div className="pointer-events-none absolute inset-0 -z-20 bg-[#050816]/65" />

          {/* Gentle Gradient: Keep Text Readable */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#050816]/70 via-[#050816]/35 to-transparent" />

          {/* Subtle Bottom Transition */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[#050816]/75 to-transparent" />

          {/* Minimal Ambient Lighting */}
          <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />

          {/* Hero Content */}
          <div className="relative mx-auto w-full max-w-7xl">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-[#050816]/35 px-4 py-2 text-sm text-blue-100 shadow-lg backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                </span>

                Available for collaboration
              </div>

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.4em] text-blue-300 sm:text-sm">
                Software Developer
              </p>

              <h1 className="max-w-5xl text-5xl font-extrabold leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Building

                <span className="mt-2 block bg-gradient-to-r from-blue-300 via-blue-500 to-cyan-300 bg-clip-text pb-2 text-transparent">
                  Digital Solutions.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white sm:text-lg sm:leading-9">
                I'm{" "}
                <span className="font-bold text-white">
                  Charles Ouma
                </span>
                , a Computer Science student and software developer passionate
                about building modern web applications, management systems, and
                technology solutions that solve real-world problems.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl"
                >
                  View My Work

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-[#050816]/30 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-[#050816]/50 hover:text-blue-200"
                >
                  Let's Collaborate
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-white">
                <span>Web Development</span>

                <span className="hidden h-1 w-1 rounded-full bg-blue-400 sm:block" />

                <span>Full Stack</span>

                <span className="hidden h-1 w-1 rounded-full bg-blue-400 sm:block" />

                <span>Supabase</span>

                <span className="hidden h-1 w-1 rounded-full bg-blue-400 sm:block" />

                <span>PostgreSQL</span>
              </div>

              <a
                href="#about"
                className="mt-12 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-200 transition hover:text-white"
              >
                <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 p-1">
                  <span className="h-2 w-1 animate-bounce rounded-full bg-blue-400" />
                </span>

                Explore my work
              </a>
            </div>
          </div>
        </section>

        {/* ================= STATISTICS ================= */}

        <Stats />
        <VisitorStats />

        {/* ================= ABOUT ================= */}

        <About />

        {/* ================= SKILLS ================= */}

        <Skills />

        {/* ================= PROJECTS ================= */}

        <Projects />

        {/* ================= PARTNERSHIP ================= */}

        <Patnership />

        {/* ================= CONTACT ================= */}

        <Contact />
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Charles Ouma. All rights reserved.
      </footer>
    </div>
  );
}

export default App;