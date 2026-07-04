import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StaffLayout from './layouts/StaffLayout';
import PatientLayout from './layouts/PatientLayout';

// Shared / Root Page
import LandingPage from './pages/LandingPage';

// Staff Pages
import StaffLogin from './pages/staff/StaffLogin';
import MorningBriefing from './pages/staff/MorningBriefing';
import Appointments from './pages/staff/Appointments';
import PatientDetail from './pages/staff/PatientDetail';
import SlotRecovery from './pages/staff/SlotRecovery';
import DoctorView from './pages/staff/DoctorView';
import AdminDashboard from './pages/staff/AdminDashboard';
import ReminderLog from './pages/staff/ReminderLog';

// Patient Pages
import PatientLogin from './pages/patient/PatientLogin';
import PatientHome from './pages/patient/PatientHome';
import BrowseDoctors from './pages/patient/BrowseDoctors';
import DoctorProfile from './pages/patient/DoctorProfile';
import BookingConfirmation from './pages/patient/BookingConfirmation';
import MyAppointments from './pages/patient/MyAppointments';
import AppointmentDetail from './pages/patient/AppointmentDetail';
import PatientProfile from './pages/patient/PatientProfile';
import PatientNotifications from './pages/patient/PatientNotifications';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* STAFF ROUTES */}
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route
          path="/staff/dashboard"
          element={
            <StaffLayout>
              <MorningBriefing />
            </StaffLayout>
          }
        />
        <Route
          path="/staff/appointments"
          element={
            <StaffLayout>
              <Appointments />
            </StaffLayout>
          }
        />
        <Route
          path="/staff/patient/:id"
          element={
            <StaffLayout>
              <PatientDetail />
            </StaffLayout>
          }
        />
        <Route
          path="/staff/slot-recovery"
          element={
            <StaffLayout>
              <SlotRecovery />
            </StaffLayout>
          }
        />
        <Route
          path="/staff/doctor-view"
          element={
            <StaffLayout>
              <DoctorView />
            </StaffLayout>
          }
        />
        <Route
          path="/staff/admin"
          element={
            <StaffLayout>
              <AdminDashboard />
            </StaffLayout>
          }
        />
        <Route
          path="/staff/reminders"
          element={
            <StaffLayout>
              <ReminderLog />
            </StaffLayout>
          }
        />

        {/* PATIENT ROUTES */}
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route
          path="/patient/home"
          element={
            <PatientLayout>
              <PatientHome />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/doctors"
          element={
            <PatientLayout>
              <BrowseDoctors />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/doctor/:id"
          element={
            <PatientLayout>
              <DoctorProfile />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/booking/confirm"
          element={
            <PatientLayout>
              <BookingConfirmation />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/appointments"
          element={
            <PatientLayout>
              <MyAppointments />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/appointment/:id"
          element={
            <PatientLayout>
              <AppointmentDetail />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/profile"
          element={
            <PatientLayout>
              <PatientProfile />
            </PatientLayout>
          }
        />
        <Route
          path="/patient/notifications"
          element={
            <PatientLayout>
              <PatientNotifications />
            </PatientLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
