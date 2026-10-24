import { useEffect, useState } from "react";
import {
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Pencil,
  Plus,
  Rocket,
  Save,
  Send,
  Settings2,
  Trash2,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";

import { supabase } from "../services/supabase";

function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [stats, setStats] = useState({
    projects: 0,
    technologies: 0,
    partnerships: 0,
    messages: 0,
  });

  const [messages, setMessages] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    try {
      const [
        projectsResult,
        skillsResult,
        partnershipsResult,
        messagesResult,
      ] = await Promise.all([
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("skills")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("partnership_requests")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("messages")
          .select("*", { count: "exact", head: true }),
      ]);

      setStats({
        projects: projectsResult.count || 0,
        technologies: skillsResult.count || 0,
        partnerships: partnershipsResult.count || 0,
        messages: messagesResult.count || 0,
      });

      const { data: messageData } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: partnershipData } = await supabase
        .from("partnership_requests")
        .select("*")
        .order("created_at", { ascending: false });

      setMessages(messageData || []);
      setPartnerships(partnershipData || []);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      setLoading(false);
    }
  }

  const navigation = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      count: stats.messages,
    },
    {
      id: "partnerships",
      label: "Partnerships",
      icon: Users,
      count: stats.partnerships,
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      id: "skills",
      label: "Technologies",
      icon: Code2,
    },
  ];

  function changeTab(tab) {
    setActiveTab(tab);
    setMobileMenu(false);
  }

  const activeLabel =
    navigation.find((item) => item.id === activeTab)?.label ||
    "Overview";

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* MOBILE HEADER */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#070b1a]/95 px-5 py-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 font-bold text-blue-400">
            CO
          </div>

          <div>
            <p className="text-sm font-semibold">Charles Ouma</p>
            <p className="text-[11px] text-gray-500">Admin Panel</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenu((prev) => !prev)}
          className="rounded-xl border border-white/10 p-2.5 text-gray-300 transition hover:bg-white/5"
        >
          {mobileMenu ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenu && (
        <div className="fixed inset-x-0 top-[73px] z-40 border-b border-white/10 bg-[#070b1a] p-4 shadow-2xl lg:hidden">
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeTab(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />

                  <span>{item.label}</span>

                  {item.count > 0 && (
                    <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              type="button"
              onClick={onLogout}
              className="mt-4 flex w-full items-center gap-3 rounded-xl border border-red-500/10 px-4 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/5"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-[#070b1a] lg:block">
        <div className="flex h-full flex-col p-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/15 font-bold text-blue-400 ring-1 ring-blue-500/10">
              CO
            </div>

            <div>
              <h1 className="font-bold">Charles Ouma</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-10 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeTab(item.id)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    activeTab === item.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />

                  <span className="flex-1">{item.label}</span>

                  {item.count > 0 && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        activeTab === item.id
                          ? "bg-white/15 text-white"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}

                  {activeTab === item.id && (
                    <ChevronRight size={14} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom profile */}
          <div className="mt-auto">
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/10 text-blue-400">
                  <UserRound size={17} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    Administrator
                  </p>

                  <p className="truncate text-xs text-gray-600">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:ml-64">
        {/* HEADER */}
        <header className="border-b border-white/10 bg-[#050816]/80 px-5 py-5 backdrop-blur sm:px-6 lg:px-10">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>Admin</span>
                <ChevronRight size={12} />
                <span className="text-blue-400">{activeLabel}</span>
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                {activeTab === "overview"
                  ? "Welcome back, Charles."
                  : activeLabel}
              </h2>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Account
                </p>
                <p className="max-w-[240px] truncate text-sm text-gray-300">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="p-5 sm:p-6 lg:p-10">
          {loading ? (
            <DashboardLoading />
          ) : (
            <>
              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <Overview
                  stats={stats}
                  setActiveTab={changeTab}
                />
              )}

              {/* MESSAGES */}
              {activeTab === "messages" && (
                <Messages messages={messages} />
              )}

              {/* PARTNERSHIPS */}
              {activeTab === "partnerships" && (
                <PartnershipRequests requests={partnerships} />
              )}

              {/* PROJECTS */}
              {activeTab === "projects" && (
                <ProjectManager
                  onProjectsChanged={loadDashboard}
                />
              )}

              {/* TECHNOLOGIES */}
              {activeTab === "skills" && (
                <TechnologyManager
                  onSkillsChanged={loadDashboard}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({ stats, setActiveTab }) {
  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanban,
      description: "Portfolio projects",
      tab: "projects",
    },
    {
      label: "Technologies",
      value: stats.technologies,
      icon: Code2,
      description: "Skills & tools",
      tab: "skills",
    },
    {
      label: "Partnerships",
      value: stats.partnerships,
      icon: Users,
      description: "Collaboration requests",
      tab: "partnerships",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: MessageSquare,
      description: "Contact submissions",
      tab: "messages",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div>
        <p className="text-sm font-medium text-blue-400">
          Portfolio control center
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Manage everything from here.
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-gray-500">
          Keep your projects, technologies, messages and
          collaboration opportunities organized from one place.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.label}
              type="button"
              onClick={() => setActiveTab(card.tab)}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <Icon size={20} />
                </div>

                <ChevronRight
                  size={17}
                  className="text-gray-700 transition group-hover:translate-x-1 group-hover:text-blue-400"
                />
              </div>

              <p className="mt-6 text-3xl font-bold">
                {card.value}
              </p>

              <p className="mt-1 font-medium text-white">
                {card.label}
              </p>

              <p className="mt-1 text-xs text-gray-600">
                {card.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Management */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-blue-400" />

              <h3 className="text-xl font-bold">
                Quick Management
              </h3>
            </div>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Quickly jump to the part of your portfolio you want
              to update.
            </p>
          </div>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            icon={FolderKanban}
            label="Manage Projects"
            onClick={() => setActiveTab("projects")}
          />

          <QuickAction
            icon={Code2}
            label="Manage Technologies"
            onClick={() => setActiveTab("skills")}
          />

          <QuickAction
            icon={MessageSquare}
            label="View Messages"
            onClick={() => setActiveTab("messages")}
          />

          <QuickAction
            icon={Users}
            label="View Partnerships"
            onClick={() => setActiveTab("partnerships")}
          />
        </div>
      </div>

      {/* Status */}
      <div className="rounded-2xl border border-green-500/10 bg-green-500/[0.03] p-5">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <h3 className="font-semibold text-green-300">
              Portfolio system online
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Your admin panel is connected to Supabase and ready
              to manage your portfolio content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 text-left transition hover:border-blue-500/30 hover:bg-blue-500/5"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition group-hover:bg-blue-500/10 group-hover:text-blue-400">
        <Icon size={17} />
      </div>

      <span className="flex-1 text-sm font-medium text-gray-300 group-hover:text-white">
        {label}
      </span>

      <ChevronRight
        size={15}
        className="text-gray-700 transition group-hover:translate-x-1 group-hover:text-blue-400"
      />
    </button>
  );
}

/* =========================================================
   MESSAGES
========================================================= */

function Messages({ messages }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Inbox"
        title="Contact Messages"
        description="Messages submitted through your portfolio contact form."
        icon={Inbox}
      />

      {messages.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No messages yet"
          text="When someone contacts you through your portfolio, their message will appear here."
        />
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                    <Mail size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {message.name}
                    </h3>

                    <p className="mt-1 text-sm text-blue-400">
                      {message.email}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-600">
                  {formatDate(message.created_at)}
                </span>
              </div>

              {message.subject && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-gray-600">
                    Subject
                  </p>

                  <h4 className="mt-1 font-semibold text-white">
                    {message.subject}
                  </h4>
                </div>
              )}

              <div className="mt-5 rounded-xl border border-white/5 bg-black/10 p-4">
                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-400">
                  {message.message}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-gray-600">
                <MessageSquare size={13} />
                Contact form submission
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   PARTNERSHIPS
========================================================= */

function PartnershipRequests({ requests }) {
  return (
    <div>
      <SectionHeader
        eyebrow="Opportunities"
        title="Collaboration Requests"
        description="Review people and organizations interested in working with you."
        icon={BriefcaseBusiness}
      />

      {requests.length === 0 ? (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No collaboration requests yet"
          text="Partnership and collaboration requests submitted through your portfolio will appear here."
        />
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 sm:p-6"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                    <Users size={18} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {request.name}
                    </h3>

                    <p className="mt-1 text-sm text-blue-400">
                      {request.email}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-gray-600">
                  {formatDate(request.created_at)}
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {request.organization && (
                  <InfoItem
                    label="Organization"
                    value={request.organization}
                  />
                )}

                {request.collaboration_type && (
                  <InfoItem
                    label="Collaboration Type"
                    value={request.collaboration_type}
                  />
                )}

                {request.budget && (
                  <InfoItem
                    label="Budget"
                    value={request.budget}
                  />
                )}
              </div>

              {(request.description || request.message) && (
                <div className="mt-5 rounded-xl border border-white/5 bg-black/10 p-4">
                  <p className="mb-2 text-xs uppercase tracking-wider text-gray-600">
                    Project / Collaboration Details
                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-7 text-gray-400">
                    {request.description || request.message}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                {request.email && (
                  <a
                    href={`mailto:${request.email}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
                  >
                    <Send size={15} />
                    Reply by Email
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   TECHNOLOGY MANAGER
========================================================= */

function TechnologyManager({ onSkillsChanged }) {
  const emptyForm = {
    name: "",
    category: "",
  };

  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    setLoading(true);

    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (error) {
      console.error(error);
      setMessage("Failed to load technologies.");
    } else {
      setSkills(data || []);
    }

    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setMessage("Technology name is required.");
      return;
    }

    if (!form.category.trim()) {
      setMessage("Technology category is required.");
      return;
    }

    setSaving(true);
    setMessage("");

    const skillData = {
      name: form.name.trim(),
      category: form.category.trim(),
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from("skills")
          .update(skillData)
          .eq("id", editingId);

        if (error) throw error;

        setMessage("Technology updated successfully.");
      } else {
        const { error } = await supabase
          .from("skills")
          .insert(skillData);

        if (error) throw error;

        setMessage("Technology added successfully.");
      }

      resetForm();
      await loadSkills();

      if (onSkillsChanged) {
        await onSkillsChanged();
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to save technology.");
    } finally {
      setSaving(false);
    }
  }

  function editSkill(skill) {
    setEditingId(skill.id);

    setForm({
      name: skill.name || "",
      category: skill.category || "",
    });

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteSkill(skill) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${skill.name}"?`
    );

    if (!confirmed) return;

    setSaving(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("skills")
        .delete()
        .eq("id", skill.id);

      if (error) throw error;

      setMessage("Technology deleted successfully.");

      await loadSkills();

      if (onSkillsChanged) {
        await onSkillsChanged();
      }
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to delete technology.");
    } finally {
      setSaving(false);
    }
  }

  const filteredSkills = skills.filter((skill) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      skill.name?.toLowerCase().includes(query) ||
      skill.category?.toLowerCase().includes(query)
    );
  });

  const categories = [
    ...new Set(
      skills
        .map((skill) => skill.category)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Technology Stack"
        title="Manage Technologies"
        description="Add, edit and organize the technologies displayed on your portfolio."
        icon={Code2}
      />

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            {editingId ? <Pencil size={18} /> : <Plus size={18} />}
          </div>

          <div>
            <h3 className="font-semibold">
              {editingId
                ? "Edit Technology"
                : "Add Technology"}
            </h3>

            <p className="text-xs text-gray-600">
              Keep your technology stack up to date.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <FormField label="Technology Name">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. React"
              className="admin-input"
              required
            />
          </FormField>

          <FormField label="Category">
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="e.g. Framework"
              list="technology-categories"
              className="admin-input"
              required
            />

            <datalist id="technology-categories">
              {categories.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </FormField>
        </div>

        {message && (
          <div className="mt-5 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300">
            {message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              "Saving..."
            ) : editingId ? (
              <>
                <Save size={16} />
                Update Technology
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Technology
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* SEARCH + LIST */}
      <div>
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-bold">
              Your Technologies
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {skills.length} technology
              {skills.length === 1 ? "" : "ies"} in your portfolio.
            </p>
          </div>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search technologies..."
            className="admin-input sm:max-w-xs"
          />
        </div>

        {loading ? (
          <DashboardLoading />
        ) : filteredSkills.length === 0 ? (
          <EmptyState
            icon={Code2}
            title={
              search
                ? "No technologies found"
                : "No technologies yet"
            }
            text={
              search
                ? "Try a different search term."
                : "Add your first technology using the form above."
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-blue-500/20 hover:bg-white/[0.06]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Code2 size={18} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="truncate font-semibold">
                        {skill.name}
                      </h4>

                      <p className="mt-1 text-xs text-gray-600">
                        {skill.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex gap-2 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => editSkill(skill)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteSkill(skill)}
                    disabled={saving}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   PROJECT MANAGER
========================================================= */

function ProjectManager({ onProjectsChanged }) {
  const emptyProject = {
    title: "",
    description: "",
    technologies: "",
    live_url: "",
    github_url: "",
    image_url: "",
    featured: false,
  };

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoadingProjects(true);

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setMessage("Failed to load projects.");
    } else {
      setProjects(data || []);
    }

    setLoadingProjects(false);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage("");
  }

  async function uploadImage(file) {
    if (!file) {
      return form.image_url || null;
    }

    const fileExtension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;
    const filePath = `projects/${fileName}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(error);
      throw new Error("Image upload failed.");
    }

    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function deleteStorageImage(imageUrl) {
    if (!imageUrl) return;

    try {
      const marker = "/project-images/";

      if (!imageUrl.includes(marker)) {
        return;
      }

      const filePath = imageUrl.split(marker)[1];

      if (!filePath) return;

      const { error } = await supabase.storage
        .from("project-images")
        .remove([filePath]);

      if (error) {
        console.error(
          "Failed to delete storage image:",
          error
        );
      }
    } catch (error) {
      console.error("Image cleanup error:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      setMessage("Project title is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    let uploadedImageUrl = null;
    let oldImageUrl = null;

    try {
      oldImageUrl = form.image_url || null;

      let imageUrl = oldImageUrl;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
        uploadedImageUrl = imageUrl;
      }

      const projectData = {
        title: form.title.trim(),
        description: form.description.trim(),
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        live_url: form.live_url.trim() || null,
        github_url: form.github_url.trim() || null,
        image_url: imageUrl,
        featured: form.featured,
      };

      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);

        if (error) throw error;

        if (
          uploadedImageUrl &&
          oldImageUrl &&
          oldImageUrl !== uploadedImageUrl
        ) {
          await deleteStorageImage(oldImageUrl);
        }

        setMessage("Project updated successfully.");
      } else {
        const { error } = await supabase
          .from("projects")
          .insert(projectData);

        if (error) {
          if (uploadedImageUrl) {
            await deleteStorageImage(uploadedImageUrl);
          }

          throw error;
        }

        setMessage("Project added successfully.");
      }

      resetForm();
      await loadProjects();

      if (onProjectsChanged) {
        await onProjectsChanged();
      }
    } catch (error) {
      console.error(error);

      if (uploadedImageUrl && !editingId) {
        await deleteStorageImage(uploadedImageUrl);
      }

      setMessage(
        error.message || "Something went wrong while saving."
      );
    } finally {
      setLoading(false);
    }
  }

  function editProject(project) {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      live_url: project.live_url || "",
      github_url: project.github_url || "",
      image_url: project.image_url || "",
      featured: project.featured || false,
    });

    setImageFile(null);
    setImagePreview(project.image_url || "");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteProject(project) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (error) throw error;

      await deleteStorageImage(project.image_url);

      setMessage("Project deleted successfully.");

      await loadProjects();

      if (onProjectsChanged) {
        await onProjectsChanged();
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error.message || "Failed to delete project."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      description: "",
      technologies: "",
      live_url: "",
      github_url: "",
      image_url: "",
      featured: false,
    });

    setImageFile(null);
    setImagePreview("");
    setMessage("");
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Portfolio Content"
        title={editingId ? "Edit Project" : "Manage Projects"}
        description="Create and maintain the projects displayed on your portfolio."
        icon={FolderKanban}
      />

      {/* PROJECT FORM */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            {editingId ? <Pencil size={18} /> : <Plus size={18} />}
          </div>

          <div>
            <h3 className="font-semibold">
              {editingId ? "Update Project" : "Add New Project"}
            </h3>

            <p className="text-xs text-gray-600">
              Add the details visitors will see on your portfolio.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <FormField label="Project Title">
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Education Management Platform"
              className="admin-input"
              required
            />
          </FormField>

          <FormField label="Technologies">
            <input
              type="text"
              name="technologies"
              value={form.technologies}
              onChange={handleChange}
              placeholder="React, Supabase, PostgreSQL"
              className="admin-input"
            />

            <p className="mt-2 text-xs text-gray-600">
              Separate technologies with commas.
            </p>
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Description">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe what the project does..."
                className="admin-input resize-none"
              />
            </FormField>
          </div>

          <FormField label="Live Project URL">
            <input
              type="url"
              name="live_url"
              value={form.live_url}
              onChange={handleChange}
              placeholder="https://example.com"
              className="admin-input"
            />
          </FormField>

          <FormField label="GitHub URL">
            <input
              type="url"
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="admin-input"
            />
          </FormField>

          <div className="md:col-span-2">
            <FormField label="Project Image">
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-blue-500"
              />

              <p className="mt-2 text-xs text-gray-600">
                PNG, JPG, JPEG or WEBP. Maximum 5MB.
              </p>

              {imagePreview && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                  <img
                    src={imagePreview}
                    alt="Project preview"
                    className="h-64 w-full object-cover"
                  />
                </div>
              )}
            </FormField>
          </div>

          <div className="md:col-span-2">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="h-4 w-4 accent-blue-600"
              />

              <span>
                <span className="block text-sm font-medium text-gray-300">
                  Feature this project
                </span>

                <span className="mt-1 block text-xs text-gray-600">
                  Featured projects receive extra visibility on your portfolio.
                </span>
              </span>
            </label>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300">
            {message}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              "Saving..."
            ) : editingId ? (
              <>
                <Save size={16} />
                Update Project
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Project
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* EXISTING PROJECTS */}
      <div>
        <div className="mb-5">
          <h3 className="text-xl font-bold">
            Existing Projects
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Manage the projects currently stored in your portfolio.
          </p>
        </div>

        {loadingProjects ? (
          <DashboardLoading />
        ) : projects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            text="Create your first portfolio project using the form above."
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition hover:border-white/20"
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent">
                    <Rocket
                      size={42}
                      className="text-blue-400/70"
                    />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="truncate text-lg font-semibold">
                        {project.title}
                      </h4>

                      {project.created_at && (
                        <p className="mt-1 text-xs text-gray-600">
                          Added {formatDate(project.created_at)}
                        </p>
                      )}
                    </div>

                    {project.featured && (
                      <span className="shrink-0 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-[11px] font-medium text-yellow-400">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-500">
                    {project.description || "No description provided."}
                  </p>

                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <ExternalLink size={14} />
                        Live Project
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <Code2 size={14} />
                        GitHub
                      </a>
                    )}
                  </div>

                  <div className="mt-5 flex gap-2 border-t border-white/5 pt-4">
                    <button
                      type="button"
                      onClick={() => editProject(project)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteProject(project)}
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/10 px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SectionHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="mb-8">
      <div className="flex items-start gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 sm:flex">
          <Icon size={21} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            {eyebrow}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            {title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-400">
        {label}
      </label>

      {children}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-black/10 p-3">
      <p className="text-[10px] uppercase tracking-wider text-gray-600">
        {label}
      </p>

      <p className="mt-1 truncate text-sm text-gray-300">
        {value}
      </p>
    </div>
  );
}

function EmptyState({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-gray-600">
        <Icon size={24} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-gray-300">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="space-y-4">
      <div className="h-24 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]" />

      <div className="h-40 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]" />

      <div className="h-32 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]" />
    </div>
  );
}

function formatDate(date) {
  if (!date) return "";

  try {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (error) {
    return "";
  }
}

/* =========================================================
   ADMIN INPUT STYLES
========================================================= */

const adminStyle =
  typeof document !== "undefined" ? document.createElement("style") : null;

if (adminStyle) {
  adminStyle.innerHTML = `
    .admin-input {
      width: 100%;
      border-radius: 0.75rem;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(0,0,0,0.20);
      padding: 0.75rem 1rem;
      color: white;
      outline: none;
      transition:
        border-color 0.2s ease,
        background 0.2s ease,
        box-shadow 0.2s ease;
    }

    .admin-input::placeholder {
      color: rgba(156,163,175,0.45);
    }

    .admin-input:focus {
      border-color: rgba(59,130,246,0.75);
      background: rgba(0,0,0,0.28);
      box-shadow: 0 0 0 3px rgba(59,130,246,0.08);
    }

    .admin-input option {
      background: #070b1a;
      color: white;
    }

    .admin-input[type="search"]::-webkit-search-cancel-button {
      filter: invert(1);
    }
  `;

  if (document.head && !document.head.contains(adminStyle)) {
    document.head.appendChild(adminStyle);
  }
}

export default AdminDashboard;