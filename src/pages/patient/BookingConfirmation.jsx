import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Briefcase, HeartHandshake, GraduationCap, Clock, X } from 'lucide-react';

export default function BookingConfirmation() {
  const location = useLocation();
  const appointmentDetails = location.state || {
    doctorName: "Dr. Rajesh Mehta",
    dept: "Cardiology",
    date: { dayName: "Thu", dateNum: 3, monthName: "Jul" },
    time: "10:30 AM",
    hospital: "Apollo Hospital, Jubilee Hills",
    fee: 800
  };

  const [selectedPersona, setSelectedPersona] = useState(null);
  const [familyName, setFamilyName] = useState("");
  const [familyPhone, setFamilyPhone] = useState("");
  const [familyRelation, setFamilyRelation] = useState("Son/Daughter");

  const personas = [
    {
      id: "working_professional",
      name: "Working Professional",
      desc: "I need 48 hours notice to plan leave from work",
      icon: <Briefcase size={20} className="text-blue-600" />,
      colorClass: "bg-blue-50",
      reminders: "48h · 24h · Morning of"
    },
    {
      id: "elderly",
      name: "Elderly",
      desc: "A family member will bring me to the appointment",
      icon: <HeartHandshake size={20} className="text-purple-600" />,
      colorClass: "bg-purple-50",
      reminders: "Shared with caretaker"
    },
    {
      id: "student",
      name: "Student",
      desc: "Remind me the day before and an hour before",
      icon: <GraduationCap size={20} className="text-orange-600" />,
      colorClass: "bg-orange-50",
      reminders: "24h · 1h before"
    },
    {
      id: "other",
      name: "Other",
      desc: "Basic reminders only",
      icon: <Clock size={20} className="text-gray-500" />,
      colorClass: "bg-gray-50",
      reminders: "24h · 2h before"
    }
  ];

  const getWhatsappMessage = () => {
    if (selectedPersona === "working_professional") {
      return "Hi Priya! Your appointment with Dr. Rajesh Mehta is in 48 hours. Reply 1 to confirm, 2 to reschedule.";
    }
    if (selectedPersona === "student") {
      return "Hey! Reminder: Dr. Rajesh Mehta tomorrow at 10:30 AM. Reply 1 to confirm.";
    }
    if (selectedPersona === "elderly") {
      return `Hi! Mr. Sharma's appointment is tomorrow at 10:30 AM. Will you be able to bring him?`;
    }
    return "Reminder: Your appointment with Dr. Rajesh Mehta is tomorrow at 10:30 AM.";
  };

  return (
    <div className="w-full max-w-[600px] mx-auto px-5 pt-8 pb-12">
      
      {/* Success header */}
      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircle size={48} className="text-green-500" />
        <h1 className="text-[22px] font-semibold text-[#111827] mt-4">Booking Confirmed</h1>
        <p className="text-[14px] text-[#6b7280] mt-1">Your slot has been reserved</p>
      </div>

      {/* Appointment summary card */}
      <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-[#9ca3af]">Booking ID</span>
          <span className="text-[13px] font-medium text-[#111827]">APL-2026-0847</span>
        </div>
        <div className="border-t border-[#f9fafb] my-3" />
        
        <div className="space-y-2.5">
          {[
            { label: "Doctor", value: appointmentDetails.doctorName },
            { label: "Department", value: appointmentDetails.dept },
            { label: "Date", value: `Thursday, ${appointmentDetails.date.dateNum} ${appointmentDetails.date.monthName} 2026` },
            { label: "Time", value: appointmentDetails.time },
            { label: "Hospital", value: appointmentDetails.hospital },
            { label: "Fee", value: `₹${appointmentDetails.fee}` }
          ].map((row, idx) => (
            <div key={idx} className="flex justify-between py-2.5 border-b border-[#f9fafb] last:border-0">
              <span className="text-[13px] text-[#9ca3af]">{row.label}</span>
              <span className="text-[14px] font-medium text-[#111827]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Persona selection card */}
      <div className="bg-white border border-[#f3f4f6] rounded-xl p-5 mt-4">
        <h2 className="text-[16px] font-semibold text-[#111827] mb-1">How should we remind you?</h2>
        <p className="text-[13px] text-[#9ca3af] mb-4">We'll schedule reminders based on your preference</p>

        <div className="space-y-3">
          {personas.map(p => {
            const isSelected = selectedPersona === p.id;
            return (
              <div key={p.id}>
                <div
                  onClick={() => setSelectedPersona(p.id)}
                  className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "border-[#1b504c] bg-[#e5f9f8]/30"
                      : "border-[#e5e7eb] bg-white hover:border-[#d1d5db]"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${p.colorClass}`}>
                    {p.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-medium text-[#111827]">{p.name}</p>
                    <p className="text-[13px] text-[#6b7280] mt-0.5">{p.desc}</p>
                    {isSelected && p.id !== "elderly" && (
                      <p className="text-[13px] text-[#9ca3af] mt-1.5">{p.reminders}</p>
                    )}
                  </div>

                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-[#1b504c]" : "border-[#d1d5db]"
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#1b504c]" />}
                    </div>
                  </div>
                </div>

                {/* Family Contact Form (Elderly only) */}
                {isSelected && p.id === "elderly" && (
                  <div className="mt-3 ml-14 bg-[#f9fafb] rounded-xl p-4 border border-[#f3f4f6] space-y-3">
                    <p className="text-[13px] font-medium text-[#111827]">Family member details</p>
                    <input
                      type="text"
                      placeholder="Family member name"
                      value={familyName}
                      onChange={(e) => setFamilyName(e.target.value)}
                      className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2.5 text-[14px] outline-none bg-white focus:border-[#1b504c] focus:ring-1 focus:ring-[#1b504c]/10"
                    />
                    <input
                      type="text"
                      placeholder="+91 Family member phone"
                      value={familyPhone}
                      onChange={(e) => setFamilyPhone(e.target.value)}
                      className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2.5 text-[14px] outline-none bg-white focus:border-[#1b504c] focus:ring-1 focus:ring-[#1b504c]/10"
                    />
                    <select
                      value={familyRelation}
                      onChange={(e) => setFamilyRelation(e.target.value)}
                      className="w-full border border-[#e5e7eb] rounded-lg px-3 py-2.5 text-[14px] outline-none bg-white focus:border-[#1b504c]"
                    >
                      <option>Son/Daughter</option>
                      <option>Spouse</option>
                      <option>Sibling</option>
                      <option>Other</option>
                    </select>
                    <p className="text-[12px] text-[#9ca3af]">They'll receive WhatsApp reminders and can confirm on your behalf</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Preview */}
        {selectedPersona && (
          <div className="mt-4 p-4 bg-[#f9fafb] rounded-xl border border-[#f3f4f6]">
            <p className="text-[11px] uppercase tracking-[0.06em] text-[#9ca3af] mb-3">You'll receive</p>
            <div className="bg-[#e8faee] rounded-xl rounded-bl-sm p-3 max-w-xs text-[13px] text-[#374151] leading-relaxed">
              {getWhatsappMessage()}
            </div>
            <p className="text-[11px] text-[#9ca3af] mt-1.5">via WhatsApp</p>
          </div>
        )}
      </div>

      {/* Done button */}
      <div className="mt-6">
        <Link
          to="/patient/appointments"
          className="block w-full bg-[#1b504c] text-white text-[15px] font-medium py-3.5 rounded-xl text-center hover:bg-[#133b38] transition-colors duration-150"
        >
          Done
        </Link>
        <p className="text-[13px] text-[#9ca3af] text-center mt-3">You'll receive a WhatsApp confirmation shortly</p>
      </div>

    </div>
  );
}
