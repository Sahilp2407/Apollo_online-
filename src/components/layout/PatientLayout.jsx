import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Bell, User } from 'lucide-react';

export function PatientLayout({ children }) {
  const location = useLocation();
  const pathname = location.pathname;

  const tabs = [
    { label: 'Home', path: '/patient/home', icon: Home },
    { label: 'Appointments', path: '/patient/appointments', icon: Calendar },
    { label: 'Notifications', path: '/patient/notifications', icon: Bell },
    { label: 'Profile', path: '/patient/profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#f3f4f6] h-14 md:h-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-8 h-full flex items-center justify-between">
          {/* Header LEFT */}
          <Link to="/patient/home" className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#1b504c] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span
              className="ml-2.5 font-semibold text-[#1b504c] text-[15px] tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Apollo OPD
            </span>
          </Link>

          {/* Header CENTER */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/patient/home"
              className={`text-sm transition-colors ${
                pathname === '/patient/home'
                  ? 'text-[#1b504c] font-medium'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Home
            </Link>
            <Link
              to="/patient/doctors"
              className={`text-sm transition-colors ${
                pathname.startsWith('/patient/doctor') || pathname === '/patient/doctors'
                  ? 'text-[#1b504c] font-medium'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Find Doctors
            </Link>
            <Link
              to="/patient/appointments"
              className={`text-sm transition-colors ${
                pathname.startsWith('/patient/appointment')
                  ? 'text-[#1b504c] font-medium'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              My Appointments
            </Link>
            <Link
              to="/patient/notifications"
              className={`text-sm transition-colors ${
                pathname === '/patient/notifications'
                  ? 'text-[#1b504c] font-medium'
                  : 'text-[#6b7280] hover:text-[#111827]'
              }`}
            >
              Notifications
            </Link>
          </nav>

          {/* Header RIGHT */}
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-sm text-[#6b7280]">Priya Sharma</span>
            <Link to="/patient/notifications" className="relative ml-3">
              <Bell size={20} className="text-[#9ca3af] hover:text-[#6b7280] transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
            </Link>
            <Link
              to="/patient/profile"
              className="w-8 h-8 rounded-full bg-[#e5f9f8] text-[#1b504c] text-xs font-semibold flex items-center justify-center ml-2 hover:opacity-90 transition-opacity"
            >
              PS
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full pt-14 md:pt-16 pb-20 lg:pb-8 min-h-screen" style={{ background: '#f8fffe' }}>
        {children}
      </main>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-[#f3f4f6] lg:hidden shadow-[0_-1px_0_rgba(0,0,0,0.04)]">
        <div className="grid grid-cols-4 h-full max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            // Check if active: path equals tab path, or for appointments sub-routes
            const isActive =
              pathname === tab.path ||
              (tab.path === '/patient/appointments' && pathname.startsWith('/patient/appointment'));

            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  isActive
                    ? 'text-[#1b504c] border-t-2 border-[#1b504c] -mt-px'
                    : 'text-[#9ca3af] hover:text-[#6b7280]'
                }`}
              >
                <Icon size={21} />
                <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
