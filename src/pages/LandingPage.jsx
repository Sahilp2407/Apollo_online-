import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Bell, 
  Users, 
  CheckCircle, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Activity, 
  ChevronRight 
} from 'lucide-react';

const FEATURES = [
  { icon: Zap, label: "Instant booking" },
  { icon: Bell, label: "Smart reminders" },
  { icon: Users, label: "25+ specialists" },
  { icon: CheckCircle, label: "Confirmed slots" },
];

const STATS = [
  { value: '2.4k+', label: 'Appointments', trend: '+18% This Month' },
  { value: '94%', label: 'Show Rate', trend: '+4.2% AI Lift' },
  { value: '25+', label: 'Specialists', trend: 'Across 8 Depts' },
];

const LOGIN_FEATURES = [
  { 
    icon: Sparkles, 
    title: 'AI Scheduling', 
    sub: 'Smart slot suggestions based on patient show-risk.',
    color: 'text-[#00D4AA]'
  },
  { 
    icon: MessageSquare, 
    title: 'WhatsApp Alerts', 
    sub: 'Personalised reminder sequences with instant RSVP.',
    color: 'text-[#6EE7B7]'
  },
  { 
    icon: Activity, 
    title: 'Live Analytics', 
    sub: 'Real-time dashboard monitoring clinic efficiency.',
    color: 'text-[#00D4AA]'
  },
  { 
    icon: Clock, 
    title: 'Slot Recovery', 
    sub: 'Instantly backfill cancelled slots from waitlists.',
    color: 'text-[#6EE7B7]'
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030c0a] text-white overflow-hidden relative flex flex-col font-sans landing-page-container">
      {/* Background decorations */}
      <div className="glow-spot-teal top-[-10%] left-[-10%] animate-mesh-1" />
      <div className="glow-spot-emerald bottom-[-10%] right-[-10%] animate-mesh-2" />
      <div className="glow-spot-teal top-[35%] right-[15%] w-[400px] h-[400px] opacity-40 animate-pulse-slow" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c2520_1px,transparent_1px),linear-gradient(to_bottom,#0c2520_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-50 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#00D4AA] p-[1.5px] shadow-[0_4px_12px_rgba(0,212,170,0.2)]">
            <div className="w-full h-full rounded-[10px] bg-[#030c0a] flex items-center justify-center">
              <span className="text-white font-extrabold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A</span>
            </div>
          </div>
          <span className="text-white font-bold text-base tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Apollo OPD Intelligence
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#0d2a25]/40 border border-emerald-950 px-3 py-1 rounded-full text-[11px] text-emerald-400 font-semibold backdrop-blur-sm shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Demo Day 2026</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 py-10">
        
        {/* Left Column - Headline & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-900/30 rounded-full px-3 py-1.5 mb-6 w-fit backdrop-blur-md"
          >
            <Sparkles size={13} className="text-[#00D4AA]" />
            <span className="text-[#6EE7B7] text-[11px] font-bold tracking-wide uppercase">AI-Powered OPD Optimization</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[44px] md:text-[60px] lg:text-[68px] font-extrabold leading-[1.05] tracking-tight mb-5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Smarter OPD.<br />
            <span className="text-gradient">Better Care.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mb-8"
          >
            An AI-powered appointment management platform for Apollo Hospitals that reduces patient no-shows using AI reminders, smart scheduling, analytics, and WhatsApp notifications.
          </motion.p>

          {/* Feature chips */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-2.5 mb-10"
          >
            {FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-[#0d2a25]/40 border border-emerald-900/20 hover:border-emerald-800/40 rounded-full px-3.5 py-1.5 text-zinc-300 text-[12px] backdrop-blur-sm transition-colors cursor-default"
              >
                <Icon size={12} className="text-[#6EE7B7]" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Stat cards row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-4"
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="glass-card-dark p-5 rounded-2xl flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4aa]/0 via-[#00d4aa]/0 to-[#00d4aa]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-wide uppercase mb-1">{s.label}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {s.value}
                  </h3>
                </div>
                <div className="mt-3.5 flex items-center gap-1 text-[10px] text-[#6EE7B7] font-bold">
                  <TrendingUp size={11} />
                  <span>{s.trend}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Floating Cards & Glass Login */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[500px]">
          
          {/* Floating Widget 1: WhatsApp Alert */}
          <div className="absolute -top-6 -right-6 w-72 glass-card-dark p-4 rounded-2xl shadow-2xl animate-float-slow z-20 border border-emerald-500/20 backdrop-blur-xl hidden xl:block">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare size={12} />
                </div>
                <span className="text-[11px] font-bold text-emerald-400">WhatsApp Alert</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-medium">Sent · Just now</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-snug">
              "Hello Sarah, your appointment with <strong className="text-white font-medium">Dr. Amit Verma</strong> is confirmed for tomorrow at 10:30 AM."
            </p>
            <div className="mt-2.5 flex gap-1.5">
              <span className="text-[9px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">1: Confirm</span>
              <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-semibold">2: Reschedule</span>
            </div>
          </div>

          {/* Floating Widget 2: AI Risk */}
          <div className="absolute bottom-16 -left-16 w-52 glass-card-dark p-4 rounded-2xl shadow-2xl animate-float-medium z-20 border border-[#00d4aa]/10 backdrop-blur-xl hidden xl:block">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-zinc-400">AI Risk Assessment</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-white">4.2%</span>
              <span className="text-[9px] text-[#6EE7B7] font-bold flex items-center">↓ 12.8% No-shows</span>
            </div>
            <p className="text-[9px] text-zinc-500 mt-1 font-medium">OPD prediction index</p>
            {/* Simple mock micro bar chart */}
            <div className="mt-3.5 flex gap-1 items-end h-6">
              <div className="w-full h-[40%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[70%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[85%] bg-zinc-800 rounded-sm" />
              <div className="w-full h-[30%] bg-emerald-500/80 rounded-sm animate-pulse" />
            </div>
          </div>

          {/* Floating Widget 3: Slot Recovery */}
          <div className="absolute -bottom-8 -right-4 w-60 glass-card-dark p-4 rounded-2xl shadow-2xl animate-float-fast z-20 border border-emerald-500/20 backdrop-blur-xl hidden xl:block">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Clock size={11} />
              </div>
              <span className="text-[10px] font-bold text-white">Smart Recovery</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-snug">
              Slot at <span className="text-[#6EE7B7] font-semibold">2:30 PM</span> cancelled. Replaced with waitlist patient <span className="text-white font-semibold">A. Sharma</span> in <span className="text-[#00D4AA] font-bold">2.4 mins</span>.
            </p>
          </div>

          {/* Central Glass Login Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[430px] glass-panel p-8 md:p-10 rounded-[32px] border border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.6)] flex flex-col relative z-30 overflow-hidden"
          >
            {/* Glowing top line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#00D4AA]/80 to-transparent" />
            
            <div className="flex items-center gap-3.5 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0F766E] to-[#00D4AA] p-[1.2px] shadow-[0_8px_20px_rgba(0,212,170,0.25)] flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full rounded-[15px] bg-[#030c0a] flex items-center justify-center">
                  <span className="text-white font-extrabold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>A</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Apollo OPD</h3>
                <span className="text-emerald-400/80 text-[10px] font-bold tracking-wider uppercase">Portal Access</span>
              </div>
            </div>

            <h2 
              className="text-2xl font-bold text-white mb-2 leading-snug"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Welcome back
            </h2>
            <p className="text-zinc-400 text-[13px] mb-8 leading-relaxed">
              Select your role to securely access the OPD intelligence platform.
            </p>

            {/* Role buttons */}
            <div className="space-y-3.5 mb-8">
              <Link
                to="/patient/home"
                className="w-full flex items-center gap-4 bg-gradient-to-r from-[#0F766E] to-[#0d5f59] hover:from-[#118c82] hover:to-[#0f766e] text-white px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer group shadow-[0_4px_20px_rgba(15,118,110,0.25)] hover:shadow-[0_4px_24px_rgba(15,118,110,0.4)] hover:-translate-y-0.5 border border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                  <Users size={18} className="text-[#6EE7B7]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[14px] font-bold tracking-tight">I'm a Patient</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Book slots, check-in, view records</p>
                </div>
                <ChevronRight size={18} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                to="/staff/login"
                className="w-full flex items-center gap-4 bg-zinc-950/45 hover:bg-zinc-900/60 border border-white/10 hover:border-emerald-500/35 text-[#e4e4e7] px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Activity size={18} className="text-[#00D4AA] group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[14px] font-bold tracking-tight">Hospital Staff</p>
                  <p className="text-zinc-500 group-hover:text-zinc-400 text-[11px] mt-0.5 transition-colors">OPD dashboard & smart recovery</p>
                </div>
                <ChevronRight size={18} className="text-zinc-500 group-hover:text-[#00D4AA] group-hover:translate-x-1 transition-all" />
              </Link>
            </div>

            {/* Features Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-[1px] bg-white/5" />
              <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Intelligence Suite</span>
              <div className="flex-1 h-[1px] bg-white/5" />
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-3">
              {LOGIN_FEATURES.map((f, idx) => {
                const Icon = f.icon;
                return (
                  <div 
                    key={f.title} 
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.015] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.07] transition-all group"
                  >
                    <div className={`mt-0.5 p-1 rounded bg-white/[0.02] group-hover:bg-white/[0.06] ${f.color} transition-colors`}>
                      <Icon size={13} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-white leading-tight">{f.title}</p>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-snug">{f.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </motion.div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between border-t border-white/5 mt-auto text-[11px] text-zinc-600 gap-4">
        <p>Apollo OPD Intelligence · Demo Day 2026</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-zinc-500">Live Demo</span>
          </div>
          <span className="hidden md:inline">·</span>
          <span>Jubilee Hills, Hyderabad</span>
        </div>
      </footer>
    </div>
  );
}
