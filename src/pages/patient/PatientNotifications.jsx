import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, AlertCircle, Info, ChevronRight } from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: "n1",
    group: "Today",
    unread: true,
    type: "reminder",
    title: "Final Reminder",
    body: "Your appointment with Dr. Rajesh Mehta is tomorrow at 10:30 AM.",
    time: "Today, 8:00 AM"
  },
  {
    id: "n2",
    group: "Today",
    unread: true,
    type: "update",
    title: "Doctor Running Late",
    body: "Dr. Rajesh Mehta is running 15 minutes late. We'll update you.",
    time: "Today, 9:30 AM"
  },
  {
    id: "n3",
    group: "Yesterday",
    unread: false,
    type: "reminder",
    title: "24-hour Reminder",
    body: "Reminder: Dr. Rajesh Mehta tomorrow at 10:30 AM. Reply 1 to confirm.",
    time: "Yesterday, 10:00 AM"
  },
  {
    id: "n4",
    group: "Earlier",
    unread: false,
    type: "confirmed",
    title: "Booking Confirmed",
    body: "Your appointment with Dr. Rajesh Mehta on 3 Jul at 10:30 AM is confirmed.",
    time: "12 Jun, 2:30 PM"
  },
  {
    id: "n5",
    group: "Earlier",
    unread: false,
    type: "reminder",
    title: "Persona Set",
    body: "You're set up for Working Professional reminders.",
    time: "12 Jun, 2:35 PM"
  },
  {
    id: "n6",
    group: "Earlier",
    unread: false,
    type: "update",
    title: "Slot Available",
    body: "A slot opened with Dr. Sunil Nair on 28 Jun at 3 PM. Tap to book.",
    time: "10 Jun, 4:00 PM",
    action: "Book Now"
  }
];

export default function PatientNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const renderIcon = (type) => {
    switch (type) {
      case "reminder":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#e5f9f8] text-[#1b504c] flex-shrink-0">
            <Bell size={18} />
          </div>
        );
      case "confirmed":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#e8faee] text-green-600 flex-shrink-0">
            <CheckCircle size={18} />
          </div>
        );
      case "alert":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fff3d6] text-amber-500 flex-shrink-0">
            <AlertCircle size={18} />
          </div>
        );
      case "update":
        return (
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#f3f4f6] text-[#6b7280] flex-shrink-0">
            <Info size={18} />
          </div>
        );
      default:
        return null;
    }
  };

  // Group notifications
  const groups = ["Today", "Yesterday", "Earlier"];

  return (
    <div className="w-full pb-12">
      {/* Page Hero */}
      <div className="w-full px-5 md:px-8 py-7 mb-0" style={{ background: 'linear-gradient(135deg, #1b504c 0%, #0f3330 100%)' }}>
        <div className="max-w-[680px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs mb-1 uppercase tracking-widest">Updates</p>
            <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Notifications</h1>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="text-[13px] font-semibold text-white bg-white/15 border border-white/20 hover:bg-white/25 px-4 py-2 rounded-xl cursor-pointer transition-colors"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="w-full max-w-[680px] mx-auto px-5 md:px-8 pt-6">

      {/* Group List */}
      <div className="space-y-6">
        {groups.map(groupName => {
          const groupNotifications = notifications.filter(n => n.group === groupName);
          if (groupNotifications.length === 0) return null;

          return (
            <div key={groupName}>
              <p className="text-[11px] uppercase tracking-[0.06em] text-[#9ca3af] font-medium py-3 border-b border-[#f3f4f6]">
                {groupName}
              </p>
              
              <div className="divide-y divide-[#f9fafb]">
                {groupNotifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (n.action) {
                        navigate('/patient/doctors');
                      } else {
                        navigate('/patient/appointments');
                      }
                    }}
                    className="flex items-start gap-4 py-4 border-b border-[#f9fafb] last:border-0 cursor-pointer hover:bg-[#f9fafb] -mx-2 px-2 rounded-lg transition-colors duration-150 relative"
                  >
                    {/* Unread indicator dot */}
                    {n.unread && (
                      <span className="absolute left-0 top-[22px] w-1.5 h-1.5 rounded-full bg-[#1b504c]" />
                    )}

                    {/* Left Icon */}
                    <div className="pl-2">
                      {renderIcon(n.type)}
                    </div>

                    {/* Middle Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[#111827]">{n.title}</p>
                      <p className="text-[14px] text-[#6b7280] mt-0.5 leading-relaxed">{n.body}</p>
                      <p className="text-[12px] text-[#9ca3af] mt-1">{n.time} · via WhatsApp</p>
                      
                      {n.action && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/patient/doctors');
                          }}
                          className="mt-2 text-[13px] font-medium text-[#1b504c] hover:underline cursor-pointer block"
                        >
                          {n.action}
                        </button>
                      )}
                    </div>

                    {/* Right Chevron */}
                    <ChevronRight size={16} className="text-[#d1d5db] self-center flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}
