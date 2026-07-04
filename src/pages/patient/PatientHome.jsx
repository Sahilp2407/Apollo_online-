import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, FileText, MapPin, Star, X, ChevronDown, ArrowRight } from 'lucide-react';

const ALL_FLAT_DOCTORS = [
  { id: "gm1", initials: "KR", name: "Dr. Kavita Reddy", dept: "General Medicine", exp: 12, rating: 4.8, next: "Tomorrow, 9:30 AM", fee: 500 },
  { id: "gm2", initials: "SG", name: "Dr. Sanjay Gupta", dept: "General Medicine", exp: 8, rating: 4.6, next: "Today, 3:00 PM", fee: 600 },
  { id: "gm3", initials: "AP", name: "Dr. Anita Patel", dept: "General Medicine", exp: 15, rating: 4.7, next: "Tomorrow, 11:00 AM", fee: 550 },
  { id: "gm4", initials: "MN", name: "Dr. Anita Reddy", dept: "General Medicine", exp: 8, rating: 4.8, next: "Tomorrow, 9:30 AM", fee: null, showBookNow: true, expBadge: 12 },
  { id: "ca1", initials: "RM", name: "Dr. Rajesh Mehta", dept: "Cardiology", exp: 15, rating: 4.9, next: "Today, 2:00 PM", fee: 800 },
  { id: "ca2", initials: "VK", name: "Dr. Vijay Kumar", dept: "Cardiology", exp: 10, rating: 4.7, next: "Tomorrow, 10:00 AM", fee: 750 },
  { id: "ca3", initials: "NS", name: "Dr. Neha Shah", dept: "Cardiology", exp: 7, rating: 4.5, next: "Today, 5:00 PM", fee: 700 },
  { id: "or1", initials: "PI", name: "Dr. Priya Iyer", dept: "Orthopedics", exp: 12, rating: 4.7, next: "Tomorrow, 9:00 AM", fee: 1000 },
  { id: "or2", initials: "RD", name: "Dr. Rohit Desai", dept: "Orthopedics", exp: 14, rating: 4.8, next: "Today, 4:00 PM", fee: 900 },
  { id: "de1", initials: "SN", name: "Dr. Sunil Nair", dept: "Dermatology", exp: 10, rating: 4.7, next: "Today, 11:30 AM", fee: 600 },
  { id: "de2", initials: "PJ", name: "Dr. Pooja Jain", dept: "Dermatology", exp: 6, rating: 4.5, next: "Tomorrow, 3:00 PM", fee: 500 },
  { id: "ne1", initials: "AD", name: "Dr. Arjun Deshmukh", dept: "Neurology", exp: 18, rating: 4.9, next: "Tomorrow, 10:00 AM", fee: 1200 },
  { id: "gy1", initials: "MN", name: "Dr. Meena Nair", dept: "Gynecology", exp: 14, rating: 4.8, next: "Tomorrow, 9:00 AM", fee: 700 },
  { id: "pe1", initials: "RH", name: "Dr. Ravi Shankar", dept: "Pediatrics", exp: 11, rating: 4.9, next: "Today, 10:00 AM", fee: 700 },
];

const TOP_DOCTORS = [
  { id: "ca1", initials: "RM", name: "Dr. Rajesh Mehta", dept: "Cardiology", rating: "4.9", consults: "3.2k" },
  { id: "ne1", initials: "AD", name: "Dr. Arjun Deshmukh", dept: "Neurology", rating: "4.9", consults: "1.9k" },
  { id: "pe1", initials: "RH", name: "Dr. Ravi Shankar", dept: "Pediatrics", rating: "4.9", consults: "7.2k" },
  { id: "gm1", initials: "KR", name: "Dr. Kavita Reddy", dept: "General Medicine", rating: "4.8", consults: "5.4k" },
  { id: "gy1", initials: "MN", name: "Dr. Meena Nair", dept: "Gynecology", rating: "4.9", consults: "2.8k" },
];

const QUICK_ACTIONS = [
  { icon: Calendar, label: "Book Appointment", sub: "Find & book a slot", to: "/patient/doctors", color: "#e5f9f8", iconColor: "#1b504c" },
  { icon: Clock, label: "My Appointments", sub: "View upcoming visits", to: "/patient/appointments", color: "#eff6ff", iconColor: "#3b82f6" },
  { icon: FileText, label: "Health Records", sub: "Reports & history", to: "/patient/profile", color: "#fff3d6", iconColor: "#f59e0b" },
];

export default function PatientHome() {
  const [selectedSpecialization, setSelectedSpecialization] = useState("General Medicine");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedDate, setSelectedDate] = useState("All");
  const [openSpecialization, setOpenSpecialization] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const filteredDoctors = ALL_FLAT_DOCTORS.filter(doc => {
    const matchSpecialization = selectedSpecialization === "All" || doc.dept === selectedSpecialization;
    let matchRating = true;
    if (selectedRating === "4.8+") matchRating = doc.rating >= 4.8;
    else if (selectedRating === "4.6+") matchRating = doc.rating >= 4.6;
    let matchDate = true;
    if (selectedDate === "Today") matchDate = doc.next.toLowerCase().includes("today");
    else if (selectedDate === "Tomorrow") matchDate = doc.next.toLowerCase().includes("tomorrow");
    return matchSpecialization && matchRating && matchDate;
  });

  return (
    <div className="w-full">

      {/* ── GREETING HERO ── */}
      <div
        className="w-full px-5 md:px-8 py-8 md:py-10 mb-0"
        style={{ background: 'linear-gradient(135deg, #1b504c 0%, #0f3330 100%)' }}
      >
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-white/50 text-sm mb-1">Good morning</p>
            <h1
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Welcome back, Priya 👋
            </h1>
            <p className="text-white/60 text-sm mt-1.5">Apollo Hospital, Jubilee Hills · 4 Jul 2026</p>
          </div>
          {/* Upcoming appointment pill */}
          <Link
            to="/patient/appointments"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl px-5 py-4 transition-all duration-200 group max-w-xs w-full md:w-auto"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Calendar size={18} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-snug">Dr. Rajesh Mehta</p>
              <p className="text-white/60 text-xs mt-0.5">Tomorrow · 10:30 AM · Cardiology</p>
            </div>
            <ArrowRight size={16} className="text-white/40 group-hover:text-white/70 ml-auto flex-shrink-0 transition-colors" />
          </Link>
        </div>
      </div>

      {/* ── QUICK ACTIONS ROW ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 -mt-0">
        <div className="grid grid-cols-3 gap-3 md:gap-4 py-5">
          {QUICK_ACTIONS.map(({ icon: Icon, label, sub, to, color, iconColor }) => (
            <Link
              key={label}
              to={to}
              className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white border border-[#f3f4f6] rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: color }}
              >
                <Icon size={18} style={{ color: iconColor }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] md:text-[14px] font-semibold text-[#111827] group-hover:text-[#1b504c] transition-colors leading-snug">{label}</p>
                <p className="text-[11px] md:text-[13px] text-[#9ca3af] mt-0.5 hidden md:block">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8 order-last lg:order-first">

            {/* Doctor Finder */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-semibold text-[#111827]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Find Doctors
                </h2>
                <Link to="/patient/doctors" className="text-[13px] font-medium text-[#1b504c] hover:underline flex items-center gap-0.5">
                  See all →
                </Link>
              </div>

              <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-5 relative z-20">
                  {/* Specialization */}
                  <div className="relative">
                    <button
                      onClick={() => { setOpenSpecialization(!openSpecialization); setOpenRating(false); setOpenDate(false); }}
                      className="flex items-center gap-1.5 px-4 py-2 border border-[#e5e7eb] rounded-full text-[13px] text-[#374151] hover:border-[#1b504c] hover:text-[#1b504c] bg-white cursor-pointer transition-colors"
                    >
                      <span>{selectedSpecialization === "All" ? "Specialization" : selectedSpecialization}</span>
                      <ChevronDown size={14} className="text-[#9ca3af]" />
                    </button>
                    {openSpecialization && (
                      <div className="absolute left-0 mt-1.5 w-52 bg-white border border-[#f3f4f6] rounded-xl shadow-lg py-1.5 z-30">
                        {["All", "General Medicine", "Cardiology", "Orthopedics", "Dermatology", "Neurology", "ENT", "Gynecology", "Pediatrics"].map(dept => (
                          <button key={dept} onClick={() => { setSelectedSpecialization(dept); setOpenSpecialization(false); }}
                            className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#f9fafb] cursor-pointer ${selectedSpecialization === dept ? "text-[#1b504c] font-medium bg-[#e5f9f8]" : "text-[#374151]"}`}>
                            {dept === "All" ? "All Specializations" : dept}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="relative">
                    <button
                      onClick={() => { setOpenRating(!openRating); setOpenSpecialization(false); setOpenDate(false); }}
                      className="flex items-center gap-1.5 px-4 py-2 border border-[#e5e7eb] rounded-full text-[13px] text-[#374151] hover:border-[#1b504c] hover:text-[#1b504c] bg-white cursor-pointer transition-colors"
                    >
                      <span>{selectedRating === "All" ? "Rating" : `${selectedRating} Star`}</span>
                      <ChevronDown size={14} className="text-[#9ca3af]" />
                    </button>
                    {openRating && (
                      <div className="absolute left-0 mt-1.5 w-40 bg-white border border-[#f3f4f6] rounded-xl shadow-lg py-1.5 z-30">
                        {[{ label: "All Ratings", value: "All" }, { label: "4.8+ Star", value: "4.8+" }, { label: "4.6+ Star", value: "4.6+" }].map(opt => (
                          <button key={opt.value} onClick={() => { setSelectedRating(opt.value); setOpenRating(false); }}
                            className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#f9fafb] cursor-pointer ${selectedRating === opt.value ? "text-[#1b504c] font-medium bg-[#e5f9f8]" : "text-[#374151]"}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Date */}
                  <div className="relative">
                    <button
                      onClick={() => { setOpenDate(!openDate); setOpenSpecialization(false); setOpenRating(false); }}
                      className="flex items-center gap-1.5 px-4 py-2 border border-[#e5e7eb] rounded-full text-[13px] text-[#374151] hover:border-[#1b504c] hover:text-[#1b504c] bg-white cursor-pointer transition-colors"
                    >
                      <span>{selectedDate === "All" ? "Date" : selectedDate}</span>
                      <ChevronDown size={14} className="text-[#9ca3af]" />
                    </button>
                    {openDate && (
                      <div className="absolute left-0 mt-1.5 w-40 bg-white border border-[#f3f4f6] rounded-xl shadow-lg py-1.5 z-30">
                        {[{ label: "All Dates", value: "All" }, { label: "Available Today", value: "Today" }, { label: "Available Tomorrow", value: "Tomorrow" }].map(opt => (
                          <button key={opt.value} onClick={() => { setSelectedDate(opt.value); setOpenDate(false); }}
                            className={`w-full text-left px-4 py-2 text-[13px] hover:bg-[#f9fafb] cursor-pointer ${selectedDate === opt.value ? "text-[#1b504c] font-medium bg-[#e5f9f8]" : "text-[#374151]"}`}>
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor list */}
                <div className="space-y-1">
                  {filteredDoctors.length === 0 ? (
                    <div className="text-center py-10 text-[#9ca3af] text-[14px]">No doctors found matching the filters.</div>
                  ) : filteredDoctors.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between py-3.5 border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] -mx-3 px-3 rounded-lg transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#e5f9f8] text-[#1b504c] text-sm font-semibold flex items-center justify-center flex-shrink-0">
                          {doc.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-semibold text-[#111827]">{doc.name}</span>
                            <span className="text-[11px] bg-gray-100 text-[#6b7280] px-2 py-0.5 rounded-full font-medium hidden sm:inline">
                              {doc.expBadge || doc.exp} yrs
                            </span>
                          </div>
                          <p className="text-[12px] text-[#6b7280] mt-0.5">{doc.dept}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <span className="text-[12px] text-[#6b7280] font-medium">{doc.rating}</span>
                            <span className="text-[#d1d5db]">·</span>
                            <span className="text-[12px] text-green-600 font-medium">Next: {doc.next}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                        {doc.fee && <span className="text-[14px] font-semibold text-[#111827]">₹{doc.fee}</span>}
                        <Link
                          to={`/patient/doctor/${doc.id}`}
                          className={`${doc.showBookNow ? 'px-3 py-2 text-[12px] flex items-center gap-1.5' : 'w-9 h-9'} bg-[#1b504c] text-white rounded-lg hover:bg-[#133b38] transition-colors duration-150 flex items-center justify-center cursor-pointer`}
                        >
                          {doc.showBookNow ? (
                            <><Calendar size={13} /><span>Book</span></>
                          ) : (
                            <Calendar size={15} />
                          )}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Rated Doctors */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-semibold text-[#111827]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Top Rated Doctors
                </h2>
                <Link to="/patient/doctors" className="text-[13px] font-medium text-[#1b504c] hover:underline">See all →</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {TOP_DOCTORS.map(doc => (
                  <div key={doc.id} className="bg-white border border-[#f3f4f6] rounded-xl p-4 text-center flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                    <div className="w-12 h-12 rounded-full bg-[#e5f9f8] text-[#1b504c] text-[14px] font-semibold flex items-center justify-center mx-auto">
                      {doc.initials}
                    </div>
                    <p className="text-[13px] font-semibold text-[#111827] mt-2.5 truncate">{doc.name}</p>
                    <p className="text-[11px] text-[#6b7280] mt-0.5">{doc.dept}</p>
                    <div className="flex items-center justify-center gap-1 mt-1 text-[11px] text-[#6b7280]">
                      <Star size={10} className="text-amber-500 fill-amber-500" />
                      <span>{doc.rating}</span>
                      <span className="text-gray-300">·</span>
                      <span>{doc.consults}</span>
                    </div>
                    <Link
                      to={`/patient/doctor/${doc.id}`}
                      className="w-full text-center border border-[#e5e7eb] text-[#374151] hover:border-[#1b504c] hover:text-[#1b504c] text-[12px] font-medium py-2 rounded-lg mt-3 block transition-colors cursor-pointer"
                    >
                      Book
                    </Link>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="lg:sticky lg:top-24 space-y-4">

              {/* Upcoming Appointment Card */}
              <div className="bg-white border border-[#f3f4f6] rounded-xl overflow-hidden">
                <div className="bg-[#1b504c] px-5 py-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">Upcoming</span>
                    <span className="text-[12px] font-semibold text-green-300 bg-green-900/30 px-2.5 py-0.5 rounded-full">Confirmed</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-10 h-10 rounded-full bg-white/15 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                      RM
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-white">Dr. Rajesh Mehta</p>
                      <p className="text-[12px] text-white/60 mt-0.5">Cardiology</p>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-[#1b504c] flex-shrink-0" />
                    <span className="text-[13px] text-[#6b7280]">Fri, 4 Jul 2026 · 10:30 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-[#1b504c] flex-shrink-0" />
                    <span className="text-[13px] text-[#9ca3af]">Apollo Hospital, Jubilee Hills</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#f9fafb] mt-3">
                    <Link to="/patient/appointment/a1" className="text-[13px] font-medium text-[#1b504c] hover:underline">
                      View Details →
                    </Link>
                    <Link to="/patient/appointments" className="text-[13px] text-[#9ca3af] hover:text-[#6b7280] transition-colors">
                      Reschedule
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#9ca3af] block mb-4">Quick Actions</span>
                <div className="space-y-3">
                  <Link to="/patient/doctors" className="flex items-center gap-3 text-[#374151] hover:text-[#1b504c] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#e5f9f8] flex items-center justify-center group-hover:bg-[#1b504c] transition-colors">
                      <Calendar size={15} className="text-[#1b504c] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[14px]">Book Appointment</span>
                  </Link>
                  <Link to="/patient/appointments" className="flex items-center gap-3 text-[#374151] hover:text-[#1b504c] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center group-hover:bg-[#3b82f6] transition-colors">
                      <Clock size={15} className="text-[#3b82f6] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[14px]">Appointment History</span>
                  </Link>
                  <Link to="/patient/profile" className="flex items-center gap-3 text-[#374151] hover:text-[#1b504c] transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-[#fff3d6] flex items-center justify-center group-hover:bg-[#f59e0b] transition-colors">
                      <FileText size={15} className="text-[#f59e0b] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[14px]">Health Records</span>
                  </Link>
                </div>
              </div>

              {/* Smart Reminders Banner */}
              {showBanner && (
                <div className="bg-[#e8faee] rounded-xl p-5 relative border border-[#d2f4df]">
                  <button onClick={() => setShowBanner(false)} className="absolute top-3.5 right-3.5 text-[#9ca3af] hover:text-[#6b7280] cursor-pointer">
                    <X size={14} />
                  </button>
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[14px] font-semibold text-[#1b504c]">Smart Reminders Active</p>
                  </div>
                  <p className="text-[12px] text-[#6b7280] leading-relaxed">Personalized reminders based on your schedule — 3 of 5 sent for your next appointment.</p>
                  <Link to="/patient/profile" className="text-[13px] font-semibold text-[#1b504c] mt-2.5 inline-block hover:underline">
                    Set preferences →
                  </Link>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
