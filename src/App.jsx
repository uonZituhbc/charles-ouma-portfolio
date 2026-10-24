import { useEffect, useState } from "react";

import Projects from "./components/Projects";
import Stats from "./components/Stats";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Patnership from "./components/Patnership";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

import { supabase } from "./services/supabase";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isAdminPage = window.location.pathname === "/admin";

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

      {/* ================= NAVIGATION ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          {/* Logo */}
          <div className="text-xl font-bold tracking-wide">
            <span className="text-white">CHARLES</span>
            <span className="text-blue-500">.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden gap-8 text-sm text-gray-300 md:flex">
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

          {/* Contact Button */}
          <a
            href="#contact"
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium transition hover:bg-blue-500"
          >
            Let's Talk
          </a>

        </div>
      </nav>

      {/* ================= MAIN ================= */}

      <main id="home">

        {/* ================= HERO ================= */}

        <section
          id="home"
          className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
        >

          {/* Background Effects */}
          <div className="pointer-events-none absolute left-[-120px] top-1/4 h-96 w-96 rounded-full bg-blue-600/15 blur-[140px]" />

          <div className="pointer-events-none absolute bottom-[-100px] right-[-80px] h-96 w-96 rounded-full bg-purple-600/10 blur-[140px]" />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 md:grid-cols-2">

            {/* ================= HERO TEXT ================= */}

            <div>

              {/* Availability Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Available for collaboration
              </div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
                Software Developer
              </p>

              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Building

                <span className="block text-blue-500">
                  Digital Solutions.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-gray-400">
                I'm{" "}
                <span className="font-semibold text-white">
                  Charles Ouma
                </span>
                , a Computer Science student and software developer passionate
                about building modern web applications, management systems and
                technology solutions that solve real-world problems.
              </p>

              {/* Hero Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">

                <a
                  href="#projects"
                  className="rounded-full bg-blue-600 px-7 py-3.5 font-semibold transition duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20"
                >
                  View My Work
                </a>

                <a
                  href="#contact"
                  className="rounded-full border border-white/15 px-7 py-3.5 font-semibold text-gray-200 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-blue-400"
                >
                  Let's Collaborate
                </a>

              </div>

              {/* Technology Highlights */}
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-gray-500">
                <span>Web Development</span>
                <span>Full Stack</span>
                <span>Supabase</span>
                <span>PostgreSQL</span>
              </div>

            </div>

            {/* ================= DEVELOPER VISUAL ================= */}

            <div className="relative mx-auto flex h-[460px] w-full max-w-lg items-center justify-center">

              {/* Outer Rings */}
              <div className="absolute h-80 w-80 rounded-full border border-blue-500/10" />

              <div className="absolute h-96 w-96 rounded-full border border-blue-500/5" />

              {/* Developer Card */}
              <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">

                {/* Code Window Header */}
                <div className="mb-8 flex items-center justify-between">

                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/70" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                    <span className="h-3 w-3 rounded-full bg-green-400/70" />
                  </div>

                  <span className="text-xs tracking-widest text-gray-600">
                    CHARLES.DEV
                  </span>

                </div>

                {/* Code */}
                <div className="rounded-2xl border border-white/5 bg-black/30 p-6 font-mono text-sm leading-8">

                  <p className="text-gray-600">
                    // building solutions
                  </p>

                  <p>
                    <span className="text-purple-400">
                      const
                    </span>{" "}
                    <span className="text-blue-300">
                      developer
                    </span>{" "}
                    = {"{"}
                  </p>

                  <p className="pl-5">
                    <span className="text-gray-500">
                      name:
                    </span>{" "}
                    <span className="text-green-400">
                      "Charles Ouma"
                    </span>
                    ,
                  </p>

                  <p className="pl-5">
                    <span className="text-gray-500">
                      role:
                    </span>{" "}
                    <span className="text-green-400">
                      "Software Developer"
                    </span>
                    ,
                  </p>

                  <p className="pl-5">
                    <span className="text-gray-500">
                      focus:
                    </span>{" "}
                    <span className="text-green-400">
                      "Real-world solutions"
                    </span>
                  </p>

                  <p>
                    {"};"}
                  </p>

                  <p className="mt-4">
                    <span className="text-purple-400">
                      developer
                    </span>

                    <span className="text-gray-400">
                      .
                    </span>

                    <span className="text-blue-300">
                      build
                    </span>

                    <span className="text-gray-400">
                      ();
                    </span>

                    <span className="ml-2 animate-pulse text-blue-400">
                      |
                    </span>
                  </p>

                </div>

                {/* Bottom Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      Web
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                      Development
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      Full
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                      Stack
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      Tech
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                      Solutions
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ================= STATISTICS ================= */}

        <Stats />

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