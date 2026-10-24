function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-32"
    >

      {/* Background glow */}
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* Section heading */}
        <div className="max-w-3xl">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">
            About Me
          </p>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            More than a student.
            <span className="block text-blue-500">
              I'm a builder.
            </span>
          </h2>

          <p className="mt-6 leading-8 text-gray-400">
            I'm Charles Ouma, a Computer Science student and software
            developer passionate about using technology to turn ideas,
            challenges and opportunities into practical digital solutions.
          </p>

        </div>

        {/* Main content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-5">

          {/* Developer card */}
          <div className="lg:col-span-2">

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8">

              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full border border-blue-500/20" />

              <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full border border-blue-500/10" />

              {/* Profile photo */}
              <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-purple-600/10 shadow-xl shadow-blue-600/10">

                <img
  src={`${import.meta.env.BASE_URL}profile-photo.png`}
  alt="Charles Ouma"
  className="h-full w-full object-cover"
/>

              </div>

              <div className="relative mt-8 text-center">

                <h3 className="text-2xl font-bold">
                  Charles Ouma
                </h3>

                <p className="mt-2 text-sm text-blue-400">
                  Computer Science Student • Software Developer
                </p>

              </div>

              {/* CV button */}
              <div className="relative mt-7 text-center">

                <button
                  className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium transition hover:border-blue-500 hover:text-blue-400"
                >
                  Download CV
                </button>

              </div>

            </div>

          </div>

          {/* About text */}
          <div className="space-y-8 lg:col-span-3">

            <div>

              <h3 className="text-2xl font-bold">
                My journey in technology
              </h3>

              <p className="mt-4 leading-8 text-gray-400">
                My journey into technology has been driven by curiosity,
                continuous learning and the desire to build things that
                people can actually use. I started by learning programming
                fundamentals and gradually moved into web development,
                databases and full-stack application development.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold">
                What I build
              </h3>

              <p className="mt-4 leading-8 text-gray-400">
                I enjoy building responsive websites, web applications,
                management systems, dashboards and database-driven platforms.
                I focus on creating solutions that are practical, easy to
                use and capable of growing with the people and organizations
                that depend on them.
              </p>

            </div>

            <div>

              <h3 className="text-2xl font-bold">
                Always learning
              </h3>

              <p className="mt-4 leading-8 text-gray-400">
                Technology never stops evolving, and neither does my learning.
                I'm continuously improving my programming, software engineering,
                database and development skills while exploring new areas of
                technology.
              </p>

            </div>

            {/* Quick highlights */}
            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-bold text-blue-400">
                  Code
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Turning ideas into software
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-bold text-blue-400">
                  Learn
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Growing through continuous learning
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-2xl font-bold text-blue-400">
                  Build
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Creating practical solutions
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;