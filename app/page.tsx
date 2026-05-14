import Link from "next/link";
import {
  Shield,
  Users,
  FileText,
  Star,
  QrCode,
  Clock,
  Database,
  Lock,
  Check,
  X,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV ── */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-[#ECEFF1] sticky top-0 bg-white z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F1819] flex items-center justify-center">
            <Shield size={16} className="text-[#2ECC71]" />
          </div>
          <span className="font-bold text-[#0F1819] text-lg tracking-tight">TalentCore</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#203D47]">
          <a href="#" className="hover:text-[#2ECC71] transition-colors">Your Account</a>
          <a href="#" className="hover:text-[#2ECC71] transition-colors">Company</a>
          <a href="#" className="hover:text-[#2ECC71] transition-colors">Contact</a>
        </div>
        <Link
          href="/login"
          className="bg-[#0F1819] hover:bg-[#1E333A] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-8 py-20">
        <div className="flex-1 flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 border border-[#2ECC71] text-[#2ECC71] text-xs font-semibold px-3 py-1 rounded-full w-fit tracking-wide">
            INSTITUTIONAL ADVANTAGES
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F1819] leading-tight">
            End-to-end management of your human talent, from onboarding to offboarding
          </h1>
          <p className="text-[#8aa3ad] text-lg leading-relaxed max-w-lg">
            Manage contracts, employees, evaluations, and digital identification from a single institutional platform designed for the security of your talent.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href="/login"
              className="bg-[#2ECC71] hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Sign In
            </Link>
            <button className="border border-[#203D47] text-[#203D47] font-semibold px-6 py-3 rounded-xl hover:bg-[#ECEFF1] transition-colors">
              See Features
            </button>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div className="flex-1 hidden md:block">
          <div className="bg-[#0F1819] rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
            </div>
            <div className="bg-[#1E333A] rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#ECEFF1] text-xs font-semibold">Admin Dashboard</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded bg-[#203D47]" />
                  <div className="w-3 h-3 rounded bg-[#203D47]" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["Employees", "Contracts", "Alerts"].map((label) => (
                  <div key={label} className="bg-[#203D47] rounded-lg p-2.5">
                    <div className="w-8 h-1.5 rounded bg-[#2ECC71] mb-2" />
                    <div className="w-12 h-1 rounded bg-[#8aa3ad] mb-1.5" />
                    <p className="text-[#8aa3ad] text-xs">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 pt-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#203D47] rounded-lg px-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-[#0F1819] shrink-0" />
                    <div className="flex-1 space-y-1">
                      <div className="w-24 h-1.5 rounded bg-[#ECEFF1]" />
                      <div className="w-14 h-1 rounded bg-[#8aa3ad]" />
                    </div>
                    <div className="w-10 h-4 rounded-full bg-emerald-900" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION ── */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#ECEFF1] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <X size={16} className="text-rose-500" />
              </div>
              <h2 className="text-xl font-bold text-[#0F1819]">The Current Challenge</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Information scattered across spreadsheets and local files.",
                "No automated tracking of contract dates and renewals.",
                "Inefficient digital identification for field staff.",
                "Lack of traceability of employees' work history.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#203D47]">
                  <X size={13} className="text-rose-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0F1819] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-emerald-900 flex items-center justify-center shrink-0">
                <Shield size={16} className="text-[#2ECC71]" />
              </div>
              <h2 className="text-xl font-bold text-white">The TalentCore Solution</h2>
            </div>
            <ul className="space-y-3">
              {[
                "Centralized platform with roles and secure administrative access.",
                "Automatic expiration alerts and proactive talent management.",
                "Employee digital QR badge for verification at any facility.",
                "Complete per-employee history with events and institutional traceability.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#BDD5EA]">
                  <Check size={13} className="text-[#2ECC71] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#0F1819]">Everything you need in a single system</h2>
          <p className="text-[#8aa3ad] mt-3 text-base">
            Integrated modules designed to cover the entire lifecycle of your staff.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { Icon: Users, title: "Employee Management", desc: "Register and search employees, evaluations, and work teams." },
            { Icon: FileText, title: "Contract Management", desc: "Manage every contract with tracking and expiration alerts." },
            { Icon: Star, title: "Evaluations", desc: "Review work history with continuous tracking and no data loss." },
            { Icon: QrCode, title: "Digital ID", desc: "Unique QR per employee with institutional verification in the field." },
          ].map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-6 rounded-2xl border border-[#ECEFF1] hover:border-[#BDD5EA] hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ECEFF1] flex items-center justify-center">
                <Icon size={20} className="text-[#203D47]" />
              </div>
              <h3 className="font-semibold text-[#0F1819] text-sm leading-snug">{title}</h3>
              <p className="text-[#8aa3ad] text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="bg-[#0F1819] px-8 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-10">Real impact on your organization</h2>
            <ul className="space-y-7">
              {[
                { Icon: Clock, title: "Time savings", desc: "Automate routine processes and reduce administrative workload by up to 40%." },
                { Icon: Database, title: "Full consolidation", desc: "Centralize records, contracts, and evaluations on a single platform." },
                { Icon: Lock, title: "Control and tracking", desc: "Role-based access with full auditing of every action in the system." },
              ].map(({ Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1E333A] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#2ECC71]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{title}</h3>
                    <p className="text-[#8aa3ad] text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#1E333A] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#203D47] flex items-center justify-center">
              <Shield size={32} className="text-[#2ECC71]" />
            </div>
            <h3 className="text-white font-bold text-xl">Institutional Security</h3>
            <p className="text-[#8aa3ad] text-sm">Built to work. 100% reliable.</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1E333A] px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to access your platform?</h2>
        <p className="text-[#8aa3ad] text-base mb-8 max-w-lg mx-auto leading-relaxed">
          Sign in to keep managing your organization&apos;s human talent and institutional security.
        </p>
        <Link
          href="/login"
          className="inline-block bg-[#2ECC71] hover:bg-emerald-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
        >
          Sign In
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0F1819] px-8 pt-12 pb-6 border-t border-[#1E333A]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#1E333A] flex items-center justify-center">
                <Shield size={13} className="text-[#2ECC71]" />
              </div>
              <span className="font-bold text-white text-sm">TalentCore</span>
            </div>
            <p className="text-[#8aa3ad] text-xs leading-relaxed">
              Your portal for human talent management and institutional security.
            </p>
          </div>
          {[
            { title: "Navigate", links: ["Your Account", "Company", "Contact"] },
            { title: "Company", links: ["About Us", "Blog"] },
            { title: "Connect", links: ["LinkedIn", "Twitter"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-xs mb-3 uppercase tracking-wider">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[#8aa3ad] text-xs hover:text-[#BDD5EA] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto pt-6 border-t border-[#1E333A] text-center">
          <p className="text-[#8aa3ad] text-xs">© 2024 TalentCore. Institutional Security &amp; Performance.</p>
        </div>
      </footer>

    </div>
  );
}
