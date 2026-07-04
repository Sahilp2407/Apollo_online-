import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, XCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

const UPCOMING_APPOINTMENTS = [
  { id: "a1", doctor: "Dr. Rajesh Mehta", dept: "Cardiology", date: "Thu, 3 Jul 2026", time: "10:30 AM", status: "confirmed", persona: "working_professional", remindersSent: 3, totalReminders: 5 },
  { id: "a2", doctor: "Dr. Sunil Nair", dept: "Dermatology", date: "Mon, 7 Jul 2026", time: "11:00 AM", status: "pending", persona: null, remindersSent: 1, totalReminders: 5 }
];

const PAST_APPOINTMENTS = [
  { id: "a3", doctor: "Dr. Priya Iyer", dept: "Orthopedics", date: "Mon, 15 Jun 2026", time: "9:00 AM", status: "completed" },
  { id: "a4", doctor: "Dr. Kavita Reddy", dept: "General Medicine", date: "Fri, 28 May 2026", time: "2:00 PM", status: "missed" },
  { id: "a5", doctor: "Dr. Arjun Deshmukh", dept: "Neurology", date: "Thu, 10 Apr 2026", time: "10:00 AM", status: "completed" }
];

export default function MyAppointments() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const isUpcoming = activeTab === "upcoming";
  const appointments = isUpcoming ? UPCOMING_APPOINTMENTS : PAST_APPOINTMENTS;

  const renderStatus = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1.5 text-[13px] text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 text-[13px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 font-medium bg-gray-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" /> Completed
          </span>
        );
      case "missed":
        return (
          <span className="inline-flex items-center gap-1.5 text-[13px] text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Missed
          </span>
        );
      default:
        return null;
    }
  };

  const renderPersonaChip = (persona) => {
    switch (persona) {
      case "working_professional":
        return <span className="text-[12px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium">Working Professional</span>;
      case "elderly":
        return <span className="text-[12px] px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-medium">Elderly</span>;
      case "student":
        return <span className="text-[12px] px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 font-medium">Student</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Page Hero */}
      <div className="w-full px-5 md:px-8 py-7" style={{ background: 'linear-gradient(135deg, #1b504c 0%, #0f3330 100%)' }}>
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs mb-1 uppercase tracking-widest">Priya Sharma</p>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Appointments</h1>
          </div>
          <Link
            to="/patient/doctors"
            className="flex items-center gap-2 bg-white text-[#1b504c] text-[14px] font-semibold px-4 py-2.5 rounded-xl hover:bg-[#e5f9f8] transition-colors duration-150 cursor-pointer shadow-lg shadow-black/10"
          >
            <Calendar size={15} />
            Book New
          </Link>
        </div>
        {/* Quick stats */}
        <div className="max-w-[800px] mx-auto mt-5 grid grid-cols-3 gap-3">
          {[
            { label: 'Upcoming', value: UPCOMING_APPOINTMENTS.length, color: 'text-green-300' },
            { label: 'Completed', value: PAST_APPOINTMENTS.filter(a => a.status === 'completed').length, color: 'text-blue-300' },
            { label: 'Missed', value: PAST_APPOINTMENTS.filter(a => a.status === 'missed').length, color: 'text-red-300' },
          ].map(s => (
            <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
              <p className={`text-xl font-bold ${s.color}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
              <p className="text-white/50 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[800px] mx-auto px-5 md:px-8 pt-6">

      {/* Tab toggle */}
      <div className="flex gap-0 bg-[#f3f4f6] p-1 rounded-xl w-fit mb-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`px-5 py-2 rounded-lg text-[14px] cursor-pointer transition-all duration-150 ${
            activeTab === "upcoming"
              ? "bg-white text-[#111827] font-medium shadow-sm"
              : "text-[#9ca3af] hover:text-[#6b7280]"
          }`}
        >
          Upcoming ({UPCOMING_APPOINTMENTS.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-5 py-2 rounded-lg text-[14px] cursor-pointer transition-all duration-150 ${
            activeTab === "past"
              ? "bg-white text-[#111827] font-medium shadow-sm"
              : "text-[#9ca3af] hover:text-[#6b7280]"
          }`}
        >
          Past ({PAST_APPOINTMENTS.length})
        </button>
      </div>

      {/* Appointment cards list */}
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#f3f4f6] rounded-xl">
            <Calendar size={40} className="text-[#d1d5db] mx-auto" />
            <p className="text-[16px] font-medium text-[#9ca3af] mt-4">No appointments found</p>
            <Link
              to="/patient/doctors"
              className="text-[14px] font-medium text-[#1b504c] mt-2 inline-block hover:underline"
            >
              Book an appointment →
            </Link>
          </div>
        ) : (
          appointments.map(apt => (
            <div
              key={apt.id}
              className="bg-white border border-[#f3f4f6] rounded-xl p-5 hover:border-[#e5e7eb] hover:shadow-sm transition-all duration-150"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#111827]">{apt.doctor}</span>
                  <span className="text-[13px] text-[#6b7280] mt-0.5">{apt.dept}</span>
                </div>
                {renderStatus(apt.status)}
              </div>

              <div className="mt-3 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#9ca3af]" />
                  <span className="text-[14px] text-[#6b7280]">{apt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-[#9ca3af]" />
                  <span className="text-[14px] text-[#6b7280]">{apt.time}</span>
                </div>
              </div>

              {/* Persona Setup (Upcoming only, if set) */}
              {isUpcoming && apt.persona && (
                <div className="mt-4 p-3 bg-[#f9fafb] border border-[#f3f4f6] rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {renderPersonaChip(apt.persona)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#9ca3af]">{apt.remindersSent} of {apt.totalReminders} reminders sent</span>
                    <div className="h-1 w-16 bg-[#f3f4f6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1b504c]"
                        style={{ width: `${(apt.remindersSent / apt.totalReminders) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Card Actions */}
              <div className="border-t border-[#f9fafb] mt-4 pt-3 flex items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <Link
                    to={`/patient/appointment/${apt.id}`}
                    className="text-[14px] font-medium text-[#1b504c] hover:underline"
                  >
                    View Details
                  </Link>
                  {isUpcoming && (
                    <>
                      <button className="text-[14px] text-[#6b7280] hover:text-[#111827] cursor-pointer">
                        Reschedule
                      </button>
                      <button className="text-[14px] text-red-500 hover:text-red-700 cursor-pointer">
                        Cancel
                      </button>
                    </>
                  )}
                </div>
                {!isUpcoming && (
                  <Link
                    to={`/patient/doctor/ca1`}
                    className="text-[14px] font-medium text-[#1b504c] hover:underline"
                  >
                    Book Again →
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
    </div>
  );
}
