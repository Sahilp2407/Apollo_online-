import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function PatientProfile() {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const [abhaLinked, setAbhaLinked] = useState(true);

  const renderToggle = (checked, onChange) => {
    return (
      <div
        onClick={onChange}
        className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors duration-150 ${
          checked ? "bg-[#1b504c]" : "bg-[#d1d5db]"
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-[900px] mx-auto px-5 md:px-8 pt-4 md:pt-6 pb-12">
      <h1 className="text-[22px] font-semibold text-[#111827] mb-6">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN - Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5 lg:sticky lg:top-24">
            
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#e5f9f8] text-[#1b504c] text-xl font-semibold flex items-center justify-center mx-auto">
              PS
            </div>
            
            <h2 className="text-[18px] font-semibold text-[#111827] text-center mt-3">Priya Sharma</h2>
            <p className="text-[14px] text-[#9ca3af] text-center mt-0.5">+91 98765 43210</p>
            
            <div className="border-t border-[#f9fafb] my-4" />

            {/* Stats Table */}
            <div className="grid grid-cols-3 text-center">
              <div>
                <p className="text-[18px] font-semibold text-[#111827]">6</p>
                <p className="text-[11px] text-[#9ca3af] mt-0.5 uppercase tracking-wider">Total Visits</p>
              </div>
              <div>
                <p className="text-[18px] font-semibold text-[#111827]">2</p>
                <p className="text-[11px] text-[#9ca3af] mt-0.5 uppercase tracking-wider">Upcoming</p>
              </div>
              <div>
                <p className="text-[18px] font-semibold text-[#111827]">72</p>
                <p className="text-[11px] text-[#9ca3af] mt-0.5 uppercase tracking-wider">Trust Score</p>
              </div>
            </div>

            {/* Trust score progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-[11px] text-[#9ca3af] mb-1">
                <span>Trust Score</span>
                <span>72/100</span>
              </div>
              <div className="bg-[#f3f4f6] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#1b504c] h-full rounded-full"
                  style={{ width: '72%' }}
                />
              </div>
              <p className="text-[11px] text-[#9ca3af] mt-1.5 leading-normal">Improves with regular attendance</p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN - Settings Stacks */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Section 1: Personal Information */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-semibold text-[#111827]">Personal Information</h2>
              <button className="text-[13px] font-medium text-[#1b504c] hover:underline cursor-pointer">
                Edit
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: "Priya Sharma" },
                { label: "Phone", value: "+91 98765 43210" },
                { label: "Email", value: "priya.sharma@gmail.com" },
                { label: "Age", value: "28" },
                { label: "Gender", value: "Female" },
                { label: "City", value: "Hyderabad" },
                { label: "Blood Group", value: "B+" }
              ].map((field, idx) => (
                <div key={idx} className="col-span-2 sm:col-span-1">
                  <p className="text-[11px] uppercase tracking-[0.06em] text-[#9ca3af] font-medium">{field.label}</p>
                  <p className="text-[14px] text-[#111827] mt-0.5">{field.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Reminder Preferences */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-semibold text-[#111827]">Reminder Preferences</h2>
              <button className="text-[13px] font-medium text-[#1b504c] hover:underline cursor-pointer">
                Edit
              </button>
            </div>

            <div className="mb-4">
              <span className="text-[12px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-medium">Working Professional</span>
              <p className="text-[13px] text-[#6b7280] mt-1.5">Receive reminders at 48h, 24h, and morning of appointment to plan your leave.</p>
            </div>

            <div className="space-y-1">
              {[
                { label: "WhatsApp", val: whatsappEnabled, set: () => setWhatsappEnabled(!whatsappEnabled) },
                { label: "SMS", val: smsEnabled, set: () => setSmsEnabled(!smsEnabled) },
                { label: "Voice Call", val: voiceEnabled, set: () => setVoiceEnabled(!voiceEnabled) },
                { label: "Email", val: emailEnabled, set: () => setEmailEnabled(!emailEnabled) }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-center py-2.5 border-b border-[#f9fafb] last:border-0">
                  <span className="text-[14px] text-[#374151]">{row.label}</span>
                  {renderToggle(row.val, row.set)}
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Family Contacts */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-semibold text-[#111827]">Family Contacts</h2>
            </div>
            <p className="text-[14px] text-[#9ca3af]">No family contacts added</p>
            <button className="text-[14px] text-[#1b504c] hover:underline mt-2 font-medium cursor-pointer">
              + Add family contact
            </button>
          </div>

          {/* Section 4: ABHA Health ID */}
          <div className="bg-white border border-[#f3f4f6] rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[15px] font-semibold text-[#111827]">ABHA Health ID</h2>
            </div>

            {abhaLinked ? (
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" />
                <span className="text-[14px] font-medium text-[#111827]">1234-5678-9012-3456</span>
              </div>
            ) : (
              <div>
                <p className="text-[14px] text-[#6b7280]">Link your Ayushman Bharat Health Account for seamless record access.</p>
                <button
                  onClick={() => setAbhaLinked(true)}
                  className="mt-3 border border-[#e5e7eb] hover:border-[#d1d5db] text-[14px] text-[#374151] px-4 py-2 rounded-lg cursor-pointer transition-colors duration-150"
                >
                  Link ABHA ID
                </button>
              </div>
            )}
          </div>

          {/* Log Out button */}
          <button className="w-full border border-red-100 text-red-500 text-[14px] py-3 rounded-xl hover:border-red-200 cursor-pointer transition-colors duration-150">
            Log Out
          </button>

        </div>

      </div>
    </div>
  );
}
