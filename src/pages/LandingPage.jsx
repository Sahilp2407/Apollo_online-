import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, Bell, Users, ArrowRight } from 'lucide-react';

const FEATURES = [
  { icon: Zap, label: "Instant booking" },
  { icon: Bell, label: "Smart reminders" },
  { icon: Users, label: "25+ specialists" },
  { icon: CheckCircle, label: "Confirmed slots" },
];

const STATS = [
  { value: '2.4k+', label: 'Appointments' },
  { value: '94%', label: 'Show rate' },
  { value: '25+', label: 'Specialists' },
];

export default function LandingPage() {
  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── LEFT — Hero Panel ── */}
      <div
        className="hidden lg:flex flex-col flex-1 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1b504c 0%, #0d2e2b 55%, #081c1a 100%)' }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #5eead4, transparent)', transform: 'translate(30%, -30%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #34d399, transparent)', transform: 'translate(-40%, 40%)' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center gap-3 px-12 pt-10">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A</span>
          </div>
          <span className="text-white/80 font-semibold text-[15px] tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Apollo OPD Intelligence
          </span>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-12 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 w-fit backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px #34d399' }} />
            <span className="text-white/75 text-xs font-medium tracking-wide">Demo Day 2026 · Apollo Hospitals</span>
          </div>

          {/* Headline */}
          <h1
            className="text-[52px] font-bold leading-[1.1] text-white mb-6 tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Smarter OPD,
            <br />
            <span style={{ color: '#6ee7b7' }}>Better Care</span>
          </h1>

          <p className="text-white/55 text-[17px] leading-relaxed max-w-[420px] mb-10">
            AI-powered appointment intelligence for Apollo Hospitals — reducing no-shows, personalising reminders, and making every visit count.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-2.5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-4 py-2 text-white/70 text-[13px] backdrop-blur-sm"
              >
                <Icon size={13} style={{ color: '#6ee7b7' }} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Stat cards row */}
          <div className="flex items-stretch gap-4 mt-12">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex-1 bg-white/6 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm"
              >
                <p
                  className="text-[26px] font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {s.value}
                </p>
                <p className="text-white/45 text-[12px] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="relative z-10 px-12 pb-8 text-white/20 text-xs">
          Apollo Hospitals · Jubilee Hills, Hyderabad
        </p>
      </div>

      {/* ── RIGHT — Login Panel ── */}
      <div className="flex flex-col w-full lg:w-[480px] xl:w-[520px] bg-white overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-2.5 px-8 pt-8 pb-4">
          <div className="w-9 h-9 rounded-xl bg-[#1b504c] flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="text-[#1b504c] font-semibold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Apollo OPD Intelligence
          </span>
        </div>

        {/* Centered login content */}
        <div className="flex-1 flex flex-col justify-center px-10 xl:px-14 py-10">
          {/* Avatar placeholder */}
          <div className="w-14 h-14 rounded-2xl bg-[#e5f9f8] flex items-center justify-center mb-8">
            <div className="w-8 h-8 rounded-full bg-[#1b504c] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </div>

          <h2
            className="text-[32px] font-bold text-[#111827] leading-tight mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Welcome back
          </h2>
          <p className="text-[#9ca3af] text-[15px] mb-10">
            Select your role to continue to Apollo OPD
          </p>

          {/* Role buttons */}
          <div className="space-y-3 mb-10">
            <Link
              to="/patient/home"
              className="w-full flex items-center gap-4 bg-[#1b504c] hover:bg-[#133b38] text-white px-6 py-4 rounded-2xl transition-all duration-200 cursor-pointer group"
              style={{ boxShadow: '0 8px 24px rgba(27,80,76,0.25)' }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-semibold">I'm a Patient</p>
                <p className="text-white/60 text-[12px] mt-0.5">Book appointments, view records</p>
              </div>
              <ArrowRight size={18} className="text-white/50 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              to="/staff/login"
              className="w-full flex items-center gap-4 bg-white border-2 border-[#f3f4f6] hover:border-[#1b504c] text-[#374151] hover:text-[#1b504c] px-6 py-4 rounded-2xl transition-all duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#f9fafb] group-hover:bg-[#e5f9f8] flex items-center justify-center flex-shrink-0 transition-colors">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" className="text-[#6b7280] group-hover:text-[#1b504c] transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-semibold">Hospital Staff</p>
                <p className="text-[#9ca3af] text-[12px] mt-0.5">Manage appointments, view analytics</p>
              </div>
              <ArrowRight size={18} className="text-[#d1d5db] group-hover:text-[#1b504c] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#f3f4f6]" />
            <span className="text-[12px] text-[#d1d5db] font-medium">FEATURES</span>
            <div className="flex-1 h-px bg-[#f3f4f6]" />
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🤖', title: 'AI Scheduling', sub: 'Smart slot suggestions' },
              { icon: '📲', title: 'WhatsApp alerts', sub: 'Personalised reminders' },
              { icon: '📊', title: 'Live analytics', sub: 'Staff dashboard' },
              { icon: '🔄', title: 'Slot recovery', sub: 'Fill cancellations fast' },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-3 p-3.5 bg-[#f9fafb] rounded-xl">
                <span className="text-[18px] leading-none mt-0.5">{f.icon}</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#111827]">{f.title}</p>
                  <p className="text-[11px] text-[#9ca3af] mt-0.5">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-10 xl:px-14 pb-8 flex items-center justify-between">
          <p className="text-[12px] text-[#d1d5db]">Apollo OPD Intelligence · Demo Day 2026</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[12px] text-[#9ca3af]">Live demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
