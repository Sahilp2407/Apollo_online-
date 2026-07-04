import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Calendar, MapPin, ArrowLeft } from 'lucide-react';

const DOCTOR_DATA = {
  id: "ca1",
  initials: "RM",
  name: "Dr. Rajesh Mehta",
  dept: "Cardiology",
  quals: "MBBS, MD (Cardiology), FACC",
  exp: 15,
  rating: 4.9,
  reviews: 124,
  fee: 800,
  hospital: "Apollo Hospital, Jubilee Hills",
  bio: "Senior cardiologist specializing in interventional cardiology.",
  specializations: ["Interventional Cardiology", "Heart Failure", "Angioplasty", "ECG"]
};

// Generate next 7 days from today
const getNext7Days = () => {
  const dates = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      id: d.toISOString().split('T')[0],
      dayName: days[d.getDay()],
      dateNum: d.getDate(),
      monthName: months[d.getMonth()]
    });
  }
  return dates;
};

const MORNING_SLOTS = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
const AFTERNOON_SLOTS = ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];
const EVENING_SLOTS = ["5:00 PM", "5:30 PM", "6:00 PM"];
const BOOKED_SLOTS = ["10:00 AM", "3:00 PM", "4:30 PM"];

export default function DoctorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dates = getNext7Days();

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleConfirm = () => {
    if (!selectedSlot) return;
    // Go to confirmation page
    navigate('/patient/booking/confirm', {
      state: {
        doctorId: DOCTOR_DATA.id,
        doctorName: DOCTOR_DATA.name,
        doctorAvatar: DOCTOR_DATA.initials,
        dept: DOCTOR_DATA.dept,
        fee: DOCTOR_DATA.fee,
        hospital: DOCTOR_DATA.hospital,
        date: selectedDate,
        time: selectedSlot
      }
    });
  };

  const renderSlotButton = (slot) => {
    const isBooked = BOOKED_SLOTS.includes(slot);
    const isSelected = selectedSlot === slot;

    return (
      <button
        key={slot}
        disabled={isBooked}
        onClick={() => setSelectedSlot(slot)}
        className={`w-full py-2.5 text-[14px] rounded-lg transition-all duration-150 border text-center ${
          isBooked
            ? "bg-[#f9fafb] text-[#d1d5db] line-through border-[#f3f4f6] pointer-events-none"
            : isSelected
            ? "bg-[#1b504c] text-white border-[#1b504c] font-medium"
            : "bg-white border-[#e5e7eb] text-[#374151] hover:border-[#1b504c] hover:text-[#1b504c] cursor-pointer"
        }`}
      >
        {slot}
      </button>
    );
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto px-5 md:px-8 pt-4 md:pt-8 pb-24 lg:pb-12">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] mb-6 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
        
        {/* LEFT COLUMN - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-6">
            <div className="w-16 h-16 rounded-full bg-[#e5f9f8] text-[#1b504c] text-xl font-semibold flex items-center justify-center">
              {DOCTOR_DATA.initials}
            </div>
            
            <h1 className="text-[20px] font-semibold text-[#111827] mt-4">{DOCTOR_DATA.name}</h1>
            
            <div className="inline-block text-[13px] font-medium text-[#1b504c] bg-[#e5f9f8] px-3 py-1 rounded-lg mt-1">
              {DOCTOR_DATA.dept}
            </div>
            
            <p className="text-[14px] text-[#6b7280] mt-3">{DOCTOR_DATA.quals}</p>
            <p className="text-[14px] text-[#6b7280] mt-1">{DOCTOR_DATA.exp} years experience</p>
            <p className="text-[14px] text-[#9ca3af] mt-1">{DOCTOR_DATA.hospital}</p>
            
            <div className="border-t border-[#f3f4f6] my-4" />
            
            <div className="flex items-center gap-2">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="text-[15px] font-medium text-[#111827]">{DOCTOR_DATA.rating}</span>
              <span className="text-[13px] text-[#9ca3af]">({DOCTOR_DATA.reviews} reviews)</span>
            </div>

            <div className="mt-4">
              <span className="text-[20px] font-semibold text-[#111827]">₹{DOCTOR_DATA.fee}</span>
              <span className="text-[13px] text-[#9ca3af]"> /consultation</span>
            </div>
          </div>

          {/* About section */}
          <div>
            <h3 className="text-[15px] font-semibold text-[#111827] mb-2">About</h3>
            <p className="text-[14px] text-[#6b7280] leading-relaxed">{DOCTOR_DATA.bio}</p>
          </div>

          {/* Specializations */}
          <div>
            <h3 className="text-[15px] font-semibold text-[#111827] mb-2">Specializations</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {DOCTOR_DATA.specializations.map(spec => (
                <span
                  key={spec}
                  className="px-3 py-1.5 bg-[#f9fafb] text-[#374151] text-[13px] rounded-lg border border-[#f3f4f6]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Slots selection */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-6">
            <h2 className="text-[18px] font-semibold text-[#111827] mb-1">Book Appointment</h2>
            <p className="text-[14px] text-[#9ca3af] mb-5">Select a date and time</p>

            {/* Date selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {dates.map(d => {
                const isSelected = selectedDate.id === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDate(d);
                      setSelectedSlot(null); // Clear selected slot on date change
                    }}
                    className={`w-14 h-16 flex flex-col items-center justify-center rounded-xl border cursor-pointer flex-shrink-0 transition-all duration-150 ${
                      isSelected
                        ? "bg-[#1b504c] text-white border-[#1b504c]"
                        : "bg-white border-[#e5e7eb] text-[#6b7280] hover:border-[#b8eee9]"
                    }`}
                  >
                    <span className="text-[11px] uppercase font-medium">{d.dayName}</span>
                    <span className="text-[18px] font-semibold mt-0.5 leading-none">{d.dateNum}</span>
                    <span className="text-[11px] mt-0.5">{d.monthName}</span>
                  </button>
                );
              })}
            </div>

            {/* Time slots periods */}
            <div className="mt-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#9ca3af] mb-2 mt-5">Morning</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {MORNING_SLOTS.map(renderSlotButton)}
              </div>

              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#9ca3af] mb-2 mt-5">Afternoon</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {AFTERNOON_SLOTS.map(renderSlotButton)}
              </div>

              <p className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#9ca3af] mb-2 mt-5">Evening</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {EVENING_SLOTS.map(renderSlotButton)}
              </div>
            </div>

            {/* Booking summary - desktop only */}
            {selectedSlot && (
              <div className="hidden lg:block mt-6 pt-6 border-t border-[#f3f4f6]">
                <div className="flex items-center justify-between">
                  <div className="text-[14px] text-[#6b7280]">
                    Selected: <span className="font-medium text-[#111827]">{selectedDate.dayName}, {selectedDate.dateNum} {selectedDate.monthName} · {selectedSlot} · ₹{DOCTOR_DATA.fee}</span>
                  </div>
                  <button
                    onClick={handleConfirm}
                    className="bg-[#1b504c] text-white text-[14px] font-medium px-6 py-3 rounded-lg hover:bg-[#133b38] transition-colors duration-150 cursor-pointer"
                  >
                    Confirm Booking →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#f3f4f6] px-5 py-4 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div>
          {selectedSlot ? (
            <p className="text-[14px] font-medium text-[#111827]">
              {selectedDate.dayName}, {selectedDate.dateNum} {selectedDate.monthName} · {selectedSlot}
            </p>
          ) : (
            <p className="text-[14px] text-[#9ca3af]">Select a slot</p>
          )}
        </div>
        <button
          disabled={!selectedSlot}
          onClick={handleConfirm}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
            selectedSlot
              ? "bg-[#1b504c] text-white hover:bg-[#133b38] cursor-pointer"
              : "bg-gray-100 text-gray-400 pointer-events-none"
          }`}
        >
          Confirm Booking →
        </button>
      </div>

    </div>
  );
}
