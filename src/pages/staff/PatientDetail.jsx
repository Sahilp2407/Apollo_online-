import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const PERSONA_CONFIG = {
  'Working Professional': { emoji: '💼', bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
  'Elderly': { emoji: '👴', bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
  'Student': { emoji: '🎓', bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
  'Default': { emoji: '👤', bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' },
};

export default function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [riskVal, setRiskVal] = useState(0);

  const isPriya = id === 'apt-1' || !id;

  const patientData = {
    name: isPriya ? 'Priya Sharma' : 'Ramesh Gupta',
    phone: isPriya ? '+91 98765 43210' : '+91 76543 21098',
    persona: isPriya ? 'Working Professional' : 'Elderly',
    pastNoShows: isPriya ? 2 : 3,
    pastVisits: isPriya ? 6 : 8,
    joinedDate: isPriya ? 'March 2024' : 'January 2024',
    riskScore: isPriya ? 84 : 71,
    riskLevel: isPriya ? 'high' : 'high',
    shapFactors: isPriya ? [
      { name: 'Distance from hospital', value: 32, desc: '38 km away' },
      { name: 'Past no-show history', value: 28, desc: 'Skipped 2 of 6 visits' },
      { name: 'Lead time', value: 18, desc: 'Booked 21 days ago' },
      { name: 'Weather forecast', value: 6, desc: 'Rain predicted' },
      { name: 'Persona preference set', value: -8, desc: 'Preference set ✓' },
      { name: 'Day of week', value: 5, desc: 'Thursday' },
    ] : [
      { name: 'Past no-show history', value: 42, desc: 'Skipped 3 of 8 visits' },
      { name: 'Age factor', value: 24, desc: 'Patient is 67 yrs old' },
      { name: 'Lead time', value: 12, desc: 'Booked 14 days ago' },
      { name: 'Distance from hospital', value: 8, desc: '12 km away' },
      { name: 'Persona preference set', value: -15, desc: 'Family setup active' },
    ],
    textSummary: isPriya
      ? 'Priya lives 38km away and has missed 2 appointments before. Combined with a 3-week booking window and rain in the forecast, our model rates her at 84% risk of not showing up.'
      : 'Ramesh has missed 3 appointments previously. Coupled with his age (67) requiring assistance and a 2-week booking lead time, our model flags him at 71% high risk.',
    appointment: {
      date: 'Thursday, 3 July 2026',
      time: isPriya ? '10:00 AM' : '11:00 AM',
      doctor: isPriya ? 'Dr. Rajesh Mehta' : 'Dr. Rajesh Mehta',
      dept: isPriya ? 'Cardiology' : 'Cardiology',
      room: isPriya ? 'OPD Room 304' : 'OPD Room 212',
      fee: isPriya ? '₹800' : '₹1,000',
      distance: isPriya ? '38 km · ~55 min drive' : '12 km · ~20 min drive',
    },
    timeline: [
      { id: 1, type: 'sent', label: 'Booking Confirmation', meta: 'Sent 12 June, 2:30 PM via WhatsApp', msg: 'Hello Priya, your appointment with Dr. Mehta is confirmed for July 3 at 10:00 AM. Tap to reschedule anytime.', done: true },
      { id: 2, type: 'received', label: 'Persona Selection', meta: 'Replied: Working Professional', msg: 'I prefer WhatsApp morning pings because of my work schedule.', done: true },
      { id: 3, type: 'sent', label: '48hr Reminder', meta: 'Sent 1 July, 11:00 AM via WhatsApp', msg: 'Hi Priya, your slot is in 48 hours. Plan your leave for Thursday. Tap to confirm.', done: true },
      { id: 4, type: 'sent', label: '24hr Reminder', meta: 'Sent 2 July, 11:00 AM via WhatsApp', msg: 'Urgent: Your appointment is tomorrow at 10:00 AM. Please confirm if you are coming.', done: true },
      { id: 5, type: 'pending', label: 'Morning Reminder', meta: 'Scheduled: 3 July, 8:00 AM', msg: 'Good morning, a quick checklist for your Cardiology visit at 10:00 AM today.', done: false },
    ],
  };

  useEffect(() => {
    let start = null;
    const duration = 800;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setRiskVal(Math.floor(eased * patientData.riskScore));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [patientData.riskScore]);

  const riskRingRadius = 46;
  const riskCircumference = 2 * Math.PI * riskRingRadius;
  const strokeDashoffset = riskCircumference - (riskVal / 100) * riskCircumference;

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', paddingBottom: '88px' }}>
      
      {/* BACK BUTTON */}
      <div style={{ marginBottom: '1.25rem' }}>
        <button
          onClick={() => navigate('/staff/appointments')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none',
            fontSize: '0.85rem', fontWeight: 500, color: '#64748b', cursor: 'pointer', outline: 'none',
            padding: 0,
          }}
        >
          <ArrowLeft size={15} /> Back to Appointments
        </button>
      </div>

      {/* PATIENT HEADER CARD */}
      <div
        style={{
          background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #f3f4f6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            border: `2px solid ${patientData.riskLevel === 'high' ? '#ef4444' : '#f59e0b'}`,
            padding: '2px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%', background: '#f1f5f9', color: '#1b504c',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.25rem',
              fontFamily: 'Space Grotesk, sans-serif',
            }}>
              {patientData.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                {patientData.name}
              </h1>
              <span style={{ fontSize: '0.72rem', fontWeight: 500, background: '#f1f5f9', color: '#475569', borderRadius: '4px', padding: '0.15rem 0.4rem' }}>
                {PERSONA_CONFIG[patientData.persona]?.emoji} {patientData.persona}
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#374151', marginTop: '0.25rem' }}>
              {patientData.phone} · Patient since {patientData.joinedDate}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
              {patientData.pastVisits} past visits · <span style={{ color: '#ef4444' }}>{patientData.pastNoShows} no-shows</span>
            </div>
          </div>
        </div>

        {/* Risk progress circle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexShrink: 0 }}>
          <div style={{ position: 'relative', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={90} height={90} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="45" cy="45" r={riskRingRadius} fill="transparent" stroke="#f1f5f9" strokeWidth={5} />
              <circle
                cx="45"
                cy="45"
                r={riskRingRadius}
                fill="transparent"
                stroke={patientData.riskLevel === 'high' ? '#ef4444' : '#f59e0b'}
                strokeWidth={5}
                strokeDasharray={riskCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#1a1a2e', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {riskVal}%
              </span>
            </div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
              HIGH RISK
            </span>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.25rem' }}>
              XGBoost Classifier
            </div>
          </div>
        </div>
      </div>

      {/* 2-COLUMN DETAILED VIEWS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* SHAP Factors (bars height: 24px, gap: 1.25rem) */}
          <div style={{ background: 'white', borderRadius: '8px', padding: '1.75rem', border: '1px solid #f3f4f6' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#1a1a2e', margin: '0 0 0.5rem 0' }}>
              Risk Factor Breakdown
            </h2>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
              Feature impact contributions to no-show projection.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {patientData.shapFactors.map((factor) => {
                const absVal = Math.abs(factor.value);
                const isPositive = factor.value > 0;
                const barColor = isPositive ? '#ef4444' : '#22c55e';

                return (
                  <div key={factor.name} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: 150, flexShrink: 0 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>{factor.name}</span>
                    </div>
                    <div style={{ flex: 1, height: 24, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: barColor, width: `${absVal * 2}%` }} />
                    </div>
                    <div style={{ width: 100, textAlign: 'right', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: barColor, fontVariantNumeric: 'tabular-nums' }}>
                        {isPositive ? `+${factor.value}%` : `${factor.value}%`}
                      </span>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{factor.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Summary Box */}
            <div style={{ marginTop: '1.5rem', background: '#f8fafc', borderRadius: '6px', padding: '1rem', border: '1px solid #cbd5e1' }}>
              <p style={{ fontSize: '0.83rem', color: '#374151', lineHeight: 1.5, margin: 0 }}>
                {patientData.textSummary}
              </p>
            </div>
          </div>

          {/* Appointment Details */}
          <div style={{ background: 'white', borderRadius: '8px', padding: '1.75rem', border: '1px solid #f3f4f6' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#1a1a2e', marginBottom: '1.25rem', margin: 0 }}>
              Appointment Logistics
            </h2>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Date & Time', value: patientData.appointment.date + ' at ' + patientData.appointment.time },
                  { label: 'Doctor', value: patientData.appointment.doctor },
                  { label: 'Department', value: patientData.appointment.dept },
                  { label: 'Room', value: patientData.appointment.room },
                  { label: 'Consultation Fee', value: patientData.appointment.fee },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                    <span style={{ fontSize: '0.825rem', fontWeight: 500, color: '#1a1a2e' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Transit Map Coordinates</span>
                <div style={{ height: 110, background: '#f1f5f9', borderRadius: '6px', border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={24} color="#1b504c" />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 500 }}>
                  {patientData.appointment.distance}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Simple Timeline (Dots and text descriptions, no WhatsApp bubbles) */}
          <div style={{ background: 'white', borderRadius: '8px', padding: '1.25rem', border: '1px solid #f3f4f6' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 500, color: '#1a1a2e', marginBottom: '1.25rem', margin: 0 }}>
              Reminder Journey
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 10, bottom: 10, left: 10, width: 1, background: '#e2e8f0' }} />
              {patientData.timeline.map((step) => (
                <div key={step.id} style={{ display: 'flex', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: step.done ? '#e8faee' : '#f1f5f9',
                    border: `1.5px solid ${step.done ? '#22c55e' : '#94a3b8'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {step.done ? <span style={{ fontSize: '0.6rem', color: '#16a34a', fontWeight: 800 }}>✓</span> : <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>⏳</span>}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a2e' }}>{step.label}</div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '0.25rem' }}>{step.meta}</div>
                    <div style={{ fontSize: '0.75rem', color: '#374151', lineHeight: 1.4 }}>
                      {step.msg}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ACTION BAR STICKY FOOTER */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #f3f4f6',
        height: 68, display: 'flex', alignItems: 'center',
        padding: '0 1.5rem', zIndex: 99,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.02)',
      }}>
        <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1a1a2e' }}>{patientData.name} ({patientData.appointment.time})</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => toast.success(`Reminder manual WhatsApp sent!`)}
              style={{ padding: '0.4rem 0.8rem', background: '#1b504c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500 }}
            >
              Send Reminder
            </button>
            <button
              onClick={() => toast.success(`Connecting call...`)}
              style={{ padding: '0.4rem 0.8rem', background: '#f1f5f9', color: '#1b504c', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500 }}
            >
              Voice Call
            </button>
            <button
              onClick={() => toast.success(`Redirecting to rescheduling...`)}
              style={{ padding: '0.4rem 0.8rem', background: 'white', color: '#374151', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500 }}
            >
              Reschedule
            </button>
            <button
              onClick={() => { toast.error(`Marked absent.`); navigate('/staff/appointments'); }}
              style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500 }}
            >
              Mark No-Show
            </button>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
