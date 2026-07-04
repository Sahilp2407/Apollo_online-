import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star } from 'lucide-react';

const DEPARTMENTS = [
  "General Medicine", "Cardiology", "Orthopedics",
  "Dermatology", "Neurology", "ENT", "Gynecology", "Pediatrics"
];

const ALL_DOCTORS = [
  { id: "gm1", initials: "KR", name: "Dr. Kavita Reddy", dept: "General Medicine", exp: 12, rating: 4.8, next: "Tomorrow, 9:30 AM", fee: 500, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "gm2", initials: "SG", name: "Dr. Sanjay Gupta", dept: "General Medicine", exp: 8, rating: 4.6, next: "Today, 3:00 PM", fee: 600, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "gm3", initials: "AP", name: "Dr. Anita Patel", dept: "General Medicine", exp: 15, rating: 4.7, next: "Tomorrow, 11:00 AM", fee: 550, quals: "MBBS, DNB · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "ca1", initials: "RM", name: "Dr. Rajesh Mehta", dept: "Cardiology", exp: 15, rating: 4.9, next: "Today, 2:00 PM", fee: 800, quals: "MBBS, MD, FACC · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "ca2", initials: "VK", name: "Dr. Vijay Kumar", dept: "Cardiology", exp: 10, rating: 4.7, next: "Tomorrow, 10:00 AM", fee: 750, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "ca3", initials: "NS", name: "Dr. Neha Shah", dept: "Cardiology", exp: 7, rating: 4.5, next: "Today, 5:00 PM", fee: 700, quals: "MBBS, DNB · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "or1", initials: "PI", name: "Dr. Priya Iyer", dept: "Orthopedics", exp: 12, rating: 4.7, next: "Tomorrow, 9:00 AM", fee: 1000, quals: "MBBS, MS · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "or2", initials: "RD", name: "Dr. Rohit Desai", dept: "Orthopedics", exp: 14, rating: 4.8, next: "Today, 4:00 PM", fee: 900, quals: "MBBS, MS · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "or3", initials: "MA", name: "Dr. Meera Agarwal", dept: "Orthopedics", exp: 9, rating: 4.6, next: "Tomorrow, 2:30 PM", fee: 850, quals: "MBBS, DNB · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "de1", initials: "SN", name: "Dr. Sunil Nair", dept: "Dermatology", exp: 10, rating: 4.7, next: "Today, 11:30 AM", fee: 600, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "de2", initials: "PJ", name: "Dr. Pooja Jain", dept: "Dermatology", exp: 6, rating: 4.5, next: "Tomorrow, 3:00 PM", fee: 500, quals: "MBBS, DDVL · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "de3", initials: "AK", name: "Dr. Amit Khanna", dept: "Dermatology", exp: 11, rating: 4.6, next: "Today, 6:00 PM", fee: 650, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "ne1", initials: "AD", name: "Dr. Arjun Deshmukh", dept: "Neurology", exp: 18, rating: 4.9, next: "Tomorrow, 10:00 AM", fee: 1200, quals: "MBBS, DM · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "ne2", initials: "SK", name: "Dr. Sunita Kapoor", dept: "Neurology", exp: 13, rating: 4.7, next: "Today, 1:00 PM", fee: 1100, quals: "MBBS, MD, DM · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "ne3", initials: "RV", name: "Dr. Rakesh Verma", dept: "Neurology", exp: 9, rating: 4.5, next: "Tomorrow, 4:00 PM", fee: 1000, quals: "MBBS, DM · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "en1", initials: "SJ", name: "Dr. Sanjay Joshi", dept: "ENT", exp: 9, rating: 4.4, next: "Today, 2:30 PM", fee: 600, quals: "MBBS, MS · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "en2", initials: "DM", name: "Dr. Deepa Menon", dept: "ENT", exp: 7, rating: 4.3, next: "Tomorrow, 11:30 AM", fee: 550, quals: "MBBS, DLO · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "en3", initials: "HP", name: "Dr. Harsh Pandey", dept: "ENT", exp: 12, rating: 4.6, next: "Today, 5:30 PM", fee: 650, quals: "MBBS, MS · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "gy1", initials: "MN", name: "Dr. Meena Nair", dept: "Gynecology", exp: 14, rating: 4.8, next: "Tomorrow, 9:00 AM", fee: 700, quals: "MBBS, MD, DGO · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "gy2", initials: "RS", name: "Dr. Ritu Singh", dept: "Gynecology", exp: 10, rating: 4.6, next: "Today, 3:30 PM", fee: 650, quals: "MBBS, DGO · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "gy3", initials: "AA", name: "Dr. Asha Ahluwalia", dept: "Gynecology", exp: 16, rating: 4.9, next: "Tomorrow, 2:00 PM", fee: 800, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "pe1", initials: "RH", name: "Dr. Ravi Shankar", dept: "Pediatrics", exp: 11, rating: 4.9, next: "Today, 10:00 AM", fee: 700, quals: "MBBS, MD, DCH · Apollo Hospital, Jubilee Hills", availableToday: true },
  { id: "pe2", initials: "NB", name: "Dr. Nisha Bhatt", dept: "Pediatrics", exp: 8, rating: 4.7, next: "Tomorrow, 11:00 AM", fee: 600, quals: "MBBS, DCH · Apollo Hospital, Jubilee Hills", availableToday: false },
  { id: "pe3", initials: "TK", name: "Dr. Tarun Khare", dept: "Pediatrics", exp: 13, rating: 4.6, next: "Today, 4:30 PM", fee: 650, quals: "MBBS, MD · Apollo Hospital, Jubilee Hills", availableToday: true },
];

export default function BrowseDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDept, setActiveDept] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // Filtering logic
  const filtered = ALL_DOCTORS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.dept.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = activeDept === "All" || doc.dept === activeDept;
    return matchesSearch && matchesDept;
  });

  // Sorting logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "experience") return b.exp - a.exp;
    if (sortBy === "fee_low") return a.fee - b.fee;
    if (sortBy === "available_today") {
      if (a.availableToday && !b.availableToday) return -1;
      if (!a.availableToday && b.availableToday) return 1;
      return 0;
    }
    return 0;
  });

  return (
    <div className="w-full">
      {/* Page Hero */}
      <div className="w-full px-5 md:px-8 py-7 mb-0" style={{ background: 'linear-gradient(135deg, #1b504c 0%, #0f3330 100%)' }}>
        <div className="max-w-[1200px] mx-auto">
          <p className="text-white/50 text-xs mb-1 uppercase tracking-widest">Apollo Hospital, Jubilee Hills</p>
          <h1 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Find Doctors</h1>
          <p className="text-white/60 text-sm">Book same-day or next-day appointments with top specialists</p>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 pt-6 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR - Desktop only */}
        <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-24 h-fit">
          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#9ca3af] mb-3">Departments</p>
          <div className="space-y-1">
            <button
              onClick={() => setActiveDept("All")}
              className={`px-3 py-2.5 text-[14px] cursor-pointer transition-colors w-full text-left rounded-lg ${
                activeDept === "All"
                  ? "bg-[#e5f9f8] text-[#1b504c] font-medium"
                  : "text-[#6b7280] hover:bg-[#f9fafb]"
              }`}
            >
              All Doctors
            </button>
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-3 py-2.5 text-[14px] cursor-pointer transition-colors w-full text-left rounded-lg ${
                  activeDept === dept
                    ? "bg-[#e5f9f8] text-[#1b504c] font-medium"
                    : "text-[#6b7280] hover:bg-[#f9fafb]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#9ca3af] mt-6 mb-3">Sort By</p>
          <div className="space-y-1">
            {[
              { id: "rating", label: "Highest Rated" },
              { id: "experience", label: "Most Experienced" },
              { id: "fee_low", label: "Fee: Low to High" },
              { id: "available_today", label: "Available Today" }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={() => setSortBy(opt.id)}
                className={`px-3 py-2 text-[14px] cursor-pointer transition-colors w-full text-left block ${
                  sortBy === opt.id
                    ? "text-[#1b504c] font-medium"
                    : "text-[#6b7280] hover:text-[#111827]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Search bar */}
          <div className="w-full bg-[#f9fafb] border border-[#f3f4f6] rounded-xl px-4 py-3 flex items-center focus-within:border-[#1b504c] focus-within:ring-1 focus-within:ring-[#1b504c]/10 transition-all duration-150">
            <Search size={16} className="text-[#9ca3af] mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctors, specialties..."
              className="bg-transparent border-none outline-none text-sm placeholder-[#9ca3af] w-full text-[#111827]"
            />
          </div>

          {/* Horizontal scrollable dept chips on Mobile */}
          <div className="lg:hidden flex overflow-x-auto gap-2 py-1 scrollbar-hide">
            <button
              onClick={() => setActiveDept("All")}
              className={`px-4 py-2 rounded-lg text-sm transition-colors flex-shrink-0 cursor-pointer ${
                activeDept === "All"
                  ? "bg-[#1b504c] text-white font-medium"
                  : "bg-white text-[#6b7280] border border-[#e5e7eb]"
              }`}
            >
              All
            </button>
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors flex-shrink-0 cursor-pointer ${
                  activeDept === dept
                    ? "bg-[#1b504c] text-white font-medium"
                    : "bg-white text-[#6b7280] border border-[#e5e7eb]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Sort selector on Mobile */}
          <div className="lg:hidden flex items-center justify-between border-b border-[#f3f4f6] pb-2">
            <span className="text-[13px] text-[#6b7280]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[13px] font-medium text-[#1b504c] bg-transparent border-none outline-none cursor-pointer"
            >
              <option value="rating">Highest Rated</option>
              <option value="experience">Most Experienced</option>
              <option value="fee_low">Fee: Low to High</option>
              <option value="available_today">Available Today</option>
            </select>
          </div>

          {/* Results count */}
          <p className="text-[13px] text-[#9ca3af]">{sorted.length} doctors found</p>

          {/* Doctors list */}
          <div className="space-y-3">
            {sorted.map(doc => (
              <Link
                key={doc.id}
                to={`/patient/doctor/${doc.id}`}
                className="flex items-center bg-white border border-[#f3f4f6] rounded-xl p-5 hover:border-[#e5e7eb] hover:shadow-sm transition-all duration-150 group cursor-pointer"
              >
                {/* Left: Avatar */}
                <div className="w-11 h-11 rounded-full bg-[#e5f9f8] text-[#1b504c] text-[14px] font-semibold flex items-center justify-center flex-shrink-0">
                  {doc.initials}
                </div>

                {/* Middle: Details */}
                <div className="flex-1 ml-3 min-w-0">
                  <p className="text-[15px] font-medium text-[#111827]">{doc.name}</p>
                  <p className="text-[13px] text-[#6b7280] mt-0.5">{doc.dept} · {doc.exp} yrs exp</p>
                  <p className="text-[13px] text-[#9ca3af] mt-1">{doc.quals}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-0.5 text-[13px] font-medium text-amber-500">
                      <Star size={12} className="fill-current" /> {doc.rating}
                    </span>
                    <span className="text-[#d1d5db]">·</span>
                    <span className="text-[13px] text-green-600">Next: {doc.next}</span>
                  </div>
                </div>

                {/* Right: Price & CTA */}
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className="text-[15px] font-semibold text-[#111827]">₹{doc.fee}</span>
                  <span className="bg-[#1b504c] text-white text-[13px] font-medium px-4 py-2 rounded-lg group-hover:bg-[#133b38] transition-colors duration-150">
                    Book
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </div>
      </div>
    </div>
  );
}
