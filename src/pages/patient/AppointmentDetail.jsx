import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Check, Info } from 'lucide-react';

export default function AppointmentDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate('/patient/appointments');
  };

  const timelineEvents = [
    { type: "sent", name: "Booking Confirmed", time: "12 Jun, 2:30 PM", desc: "Sent via WhatsApp" },
    { type: "sent", name: "Persona Set", time: "12 Jun, 2:35 PM", desc: "Working Professional" },
    { type: "sent", name: "48-hour Reminder", time: "1 Jul, 10:00 AM", desc: "Plan your leave for tomorrow" },
    { type: "sent", name: "24-hour Reminder", time: "2 Jul, 10:00 AM", desc: "Appointment is tomorrow" },
    { type: "pending", name: "Morning Reminder", time: "3 Jul, 8:00 AM", desc: "Scheduled" },
    { type: "pending", name: "Final Reminder", time: "3 Jul, 9:00 AM", desc: "Scheduled" }
  ];

  return (
    <div className="w-full max-w-[720px] mx-auto px-5 md:px-8 pt-4 md:pt-6 pb-24 lg:pb-12">
      {/* Back link */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-[14px] text-[#6b7280] hover:text-[#111827] mb-6 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to Appointments
      </button>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - Main Info, Timeline, Directions */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Main Info Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 bg-[#e8faee] text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-[13px] font-medium">Confirmed</span>
            </div>
            
            <p className="text-[11px] uppercase tracking-[0.06em] text-[#9ca3af] font-medium">Booking ID: APL-2026-0847</p>
            <div className="border-t border-[#f9fafb] my-4" />

            <div className="space-y-1">
              {[
                { label: "Date", value: "Thursday, 3 July 2026" },
                { label: "Time", value: "10:30 AM" },
                { label: "Doctor", value: "Dr. Rajesh Mehta" },
                { label: "Department", value: "Cardiology" },
                { label: "Hospital", value: "Apollo Hospital, Jubilee Hills" },
                { label: "Room", value: "Consultation Room 302, 3rd Floor" },
                { label: "Fee", value: "₹800 (Paid)" }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between py-2.5 border-b border-[#f9fafb] last:border-0">
                  <span className="text-[13px] text-[#9ca3af]">{row.label}</span>
                  <span className="text-[14px] font-medium text-[#111827]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <h3 className="text-[15px] font-semibold text-[#111827] mb-4">Reminders</h3>
            
            <div className="space-y-0.5">
              {timelineEvents.map((evt, idx) => {
                const isSent = evt.type === "sent";
                const isLast = idx === timelineEvents.length - 1;

                return (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {/* Circle icon line */}
                    <div className="w-6 flex flex-col items-center flex-shrink-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isSent ? "bg-[#e8faee]" : "bg-[#f3f4f6]"
                      }`}>
                        {isSent ? (
                          <Check size={12} className="text-green-600" />
                        ) : (
                          <Clock size={12} className="text-[#9ca3af]" />
                        )}
                      </div>
                      {!isLast && (
                        <div className="w-px h-12 bg-[#f3f4f6] mt-1" />
                      )}
                    </div>

                    {/* Content text */}
                    <div className="pb-4">
                      <p className="text-[14px] font-medium text-[#111827]">{evt.name}</p>
                      <p className="text-[13px] text-[#9ca3af] mt-0.5">{evt.time}</p>
                      <p className="text-[13px] text-[#6b7280] mt-0.5">{evt.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Directions Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <h3 className="text-[15px] font-semibold text-[#111827]">How to reach</h3>
            <p className="text-[14px] text-[#6b7280] mt-1">Apollo Hospital, Jubilee Hills, Hyderabad</p>
            <div className="text-[13px] text-[#9ca3af] mt-2 flex items-center gap-1.5">
              <MapPin size={12} />
              <span>38 km · ~55 min by car</span>
            </div>
            
            <div className="flex gap-3 mt-4">
              <button className="border border-[#e5e7eb] hover:border-[#d1d5db] text-[14px] text-[#374151] px-4 py-2.5 rounded-lg cursor-pointer transition-colors duration-150">
                Open in Maps
              </button>
              <button className="border border-[#e5e7eb] hover:border-[#d1d5db] text-[14px] text-[#374151] px-4 py-2.5 rounded-lg cursor-pointer transition-colors duration-150">
                Get Directions
              </button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - Doctor summary, preferences, action CTAs */}
        <div className="space-y-4">
          
          {/* Mini Doctor Info Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#e5f9f8] text-[#1b504c] rounded-full text-sm font-semibold flex items-center justify-center flex-shrink-0">
                RM
              </div>
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-[#111827]">Dr. Rajesh Mehta</p>
                <p className="text-[13px] text-[#6b7280] mt-0.5">Cardiology</p>
                <p className="text-[13px] text-amber-500 mt-1 font-medium">★ 4.9 (124 reviews)</p>
              </div>
            </div>
            <Link to="/patient/doctor/ca1" className="block mt-3 text-[13px] font-medium text-[#1b504c] hover:underline">
              View Profile →
            </Link>
          </div>

          {/* Preferences Card */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-[0.06em] text-[#9ca3af] mb-1 font-medium">Reminder Setup</p>
            <p className="text-[14px] font-medium text-[#111827]">Working Professional</p>
            <p className="text-[13px] text-[#6b7280] mt-0.5">48h · 24h · morning reminders</p>
            <Link to="/patient/profile" className="block mt-2 text-[13px] text-[#1b504c] hover:underline">
              Change →
            </Link>
          </div>

          {/* Action Panel Buttons (desktop) */}
          <div className="hidden md:block space-y-2">
            <button className="w-full border border-[#e5e7eb] hover:border-[#d1d5db] text-[14px] text-[#374151] py-2.5 rounded-lg cursor-pointer transition-colors duration-150">
              Reschedule
            </button>
            <button className="w-full border border-red-100 text-red-500 py-2.5 rounded-lg hover:border-red-200 cursor-pointer transition-colors duration-150">
              Cancel Appointment
            </button>
            <p className="text-[12px] text-[#9ca3af] text-center mt-2.5">Free cancellation up to 4 hours before</p>
          </div>

        </div>

      </div>

      {/* Sticky Bottom Actions (Mobile only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#f3f4f6] px-5 py-4 flex gap-3 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <button className="flex-1 border border-[#e5e7eb] text-[14px] text-[#374151] py-3 rounded-lg text-center font-medium cursor-pointer">
          Reschedule
        </button>
        <button className="flex-1 border border-red-100 text-red-500 py-3 rounded-lg text-center font-medium cursor-pointer">
          Cancel
        </button>
      </div>

    </div>
  );
}
