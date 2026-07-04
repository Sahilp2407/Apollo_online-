import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, User, CheckCircle, AlertTriangle, AlertCircle,
  X, Check, Sparkles, LogOut, ChevronRight, RefreshCw
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

export default function DoctorViewPage() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(true);
  const [showLateModal, setShowLateModal] = useState(false);
  const [lateStatus, setLateStatus] = useState(null); // null | 'sending' | 'done'
  const [loadingDots, setLoadingDots] = useState('.');

  // Loading dots ticker for open slot
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots(dots => dots.length >= 3 ? '.' : dots + '.');
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleLateSelect = (mins) => {
    setLateStatus('sending');
    setTimeout(() => {
      setLateStatus('done');
      toast.success(`Patients notified: running ${mins} late.`);
      setTimeout(() => {
        setShowLateModal(false);
        setLateStatus(null);
      }, 1200);
    }, 1000);
  };

  return (
    <div style={{
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      background: '#fafffe',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '1.5rem 1rem 120px',
    }}>
      {/* MINIMAL TOP NAV */}
      <div style={{
        width: '100%',
        maxWidth: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        padding: '0.5rem 0',
      }}>
        <button
          onClick={() => navigate('/staff/dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none',
            fontSize: '0.85rem', fontWeight: 600, color: '#1b504c', cursor: 'pointer', outline: 'none',
          }}
        >
          <ArrowLeft size={15} /> Exit Doctor View
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1b504c', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            OPD Live Dashboard
          </span>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* DOCTOR HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            background: '#f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#1b504c', fontSize: '1.25rem', fontWeight: 700,
            fontFamily: 'Space Grotesk, sans-serif',
          }}>
            RM
          </div>
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '22px', fontWeight: 500, color: '#1a1a2e', lineHeight: 1.2, margin: 0 }}>
              Dr. Rajesh Mehta
            </h1>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
              Cardiology · Apollo Jubilee Hills
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>Currently Available</span>
              </div>
              <span style={{ color: '#cbd5e1' }}>·</span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>Thursday, 3 July 2026</span>
            </div>
          </div>
        </div>

        {/* NOTIFICATION CARD */}
        <AnimatePresence>
          {showNotification && (
            <div
              style={{
                background: '#fff3d6', borderRadius: '6px', padding: '0.875rem', border: '1px solid #fcd34d',
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem', position: 'relative',
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.4, fontWeight: 500, margin: 0 }}>
                  <strong>Update:</strong> Your 11:00 AM patient rescheduled. Rahul Verma is being notified as replacement.
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                style={{
                  background: 'none', border: 'none', color: '#b45309', cursor: 'pointer',
                  position: 'absolute', top: 8, right: 8, padding: '0.25rem',
                }}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* TODAY'S SUMMARY CARD */}
        <div style={{
          background: '#1b504c', borderRadius: '8px', padding: '1.5rem', color: 'white',
        }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
            Today at a Glance
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>12</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.25rem' }}>Total Patients</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '1rem' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#86efac', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>10</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.25rem' }}>Confirmed</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '1rem' }}>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#fcd34d', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>2</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginTop: '0.25rem' }}>At Risk</div>
            </div>
          </div>

          <div style={{ height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 99, overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div style={{ width: '83%', height: '100%', background: '#22c55e', borderRadius: 99 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
            <span>Utilization Rate</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>83% slots filled</span>
          </div>
        </div>

        {/* NEXT PATIENTS SECTION */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#1a1a2e', margin: 0 }}>
              Your Next Patients
            </h2>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Card 1 (Current) */}
            <div style={{
              background: 'white', borderRadius: '8px', padding: '1.25rem',
              border: '1px solid #f3f4f6', borderLeft: '3px solid #22c55e',
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#16a34a', background: '#e8faee', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                  NOW · 10:00 AM
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#1b504c' }}>Room 204</span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                Rajesh Kumar
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem', margin: 0 }}>
                Cardiology Consultation · Follow-up visit
              </p>
              
              <div style={{ marginTop: '0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a', fontSize: '0.78rem', fontWeight: 500 }}>
                <Check size={13} strokeWidth={2.5} />
                <span>Confirmed · Arrived at 9:45 AM</span>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'white', borderRadius: '8px', padding: '1.25rem',
              border: '1px solid #f3f4f6',
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#4b5563', background: '#f1f5f9', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                  NEXT · 10:30 AM
                </span>
                
                {/* Dot + Risk Tag */}
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                  LOW RISK
                </span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                Mr. Ramesh Gupta
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem', margin: 0 }}>
                Cardiology Consultation · First visit
              </p>

              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#374151', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                  👴 Elderly · Caregiver setup active
                </span>
                <span style={{ fontSize: '0.72rem', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Check size={12} strokeWidth={2.5} /> Family confirmed
                </span>
              </div>
            </div>

            {/* Card 3 (Open slot) */}
            <div style={{
              background: '#f8fafc', borderRadius: '8px', padding: '1.25rem',
              border: '2px dashed #cbd5e1', position: 'relative',
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#b45309', background: '#fff3d6', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                  AFTER · 11:00 AM
                </span>
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 600, color: '#64748b', fontStyle: 'italic', margin: 0 }}>
                — Slot Open —
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem', margin: 0 }}>
                Previously: Priya Sharma (Rescheduled)
              </p>

              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d97706', fontSize: '0.78rem', fontWeight: 500 }}>
                <RefreshCw size={12} style={{ animation: 'spin 1.5s linear infinite' }} />
                <span>Finding replacement from waitlist{loadingDots}</span>
              </div>
            </div>

          </div>
        </div>

        {/* SCHEDULE TIMELINE */}
        <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', border: '1px solid #f3f4f6' }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1rem', fontWeight: 500, color: '#1a1a2e', marginBottom: '1rem', margin: 0 }}>
            Today's Schedule
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            {[
              { time: '11:30 AM', name: 'Sneha Patil', status: 'Confirmed', isBreak: false },
              { time: '12:00 PM', name: 'Ankit Verma', status: 'Awaiting Confirm', isBreak: false },
              { time: '12:30 PM', name: 'OPD Lunch Break', status: '', isBreak: true },
              { time: '01:30 PM', name: 'Kavya Reddy', status: 'Confirmed', isBreak: false },
              { time: '02:00 PM', name: 'Walk-in TBD', status: 'Awaiting', isBreak: false },
            ].map((slot, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.5rem 0.75rem', borderRadius: '4px',
                  background: slot.isBreak ? '#fafbfc' : 'white',
                  border: slot.isBreak ? '1px dashed #cbd5e1' : '1px solid #f3f4f6',
                }}
              >
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#4b5563', width: '80px', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                  {slot.time}
                </span>

                <span style={{ fontSize: '0.825rem', fontWeight: 500, color: slot.isBreak ? '#94a3b8' : '#1a1a2e', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {slot.name}
                </span>

                {!slot.isBreak && (
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 600,
                    color: slot.status.includes('Confirmed') ? '#16a34a' : '#94a3b8',
                  }}>
                    {slot.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* STICKY BOTTOM ACTION */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white', borderTop: '1px solid #f3f4f6',
        height: 68, display: 'flex', alignItems: 'center',
        padding: '0 1.5rem', zIndex: 99,
        boxShadow: '0 -4px 12px rgba(0,0,0,0.02)',
      }}>
        <div style={{ maxWidth: 600, width: '100%', margin: '0 auto' }}>
          <button
            onClick={() => setShowLateModal(true)}
            style={{
              width: '100%', height: 38, background: '#1b504c', color: 'white', border: 'none',
              borderRadius: '6px', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 500,
              fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            }}
          >
            I'm Running Late — Notify Patients
          </button>
        </div>
      </div>

      {/* LATE MODAL */}
      <AnimatePresence>
        {showLateModal && (
          <>
            <div onClick={() => setShowLateModal(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 199 }} />
            
            <div
              style={{
                position: 'fixed', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
                background: 'white', borderRadius: '8px', padding: '1.5rem',
                width: 'calc(100% - 2rem)', maxWidth: 360, zIndex: 200,
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #cbd5e1',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#1a1a2e', margin: 0 }}>
                    How late are you running?
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.15rem', margin: 0 }}>
                    We will send automated WhatsApp pings to update slots.
                  </p>
                </div>
                <button
                  onClick={() => setShowLateModal(false)}
                  style={{ background: '#f3f4f6', border: 'none', borderRadius: '4px', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={12} />
                </button>
              </div>

              {lateStatus === null && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                  {['10 min', '20 min', '30 min', '45 min'].map(option => (
                    <button
                      key={option}
                      onClick={() => handleLateSelect(option)}
                      style={{
                        height: 38, background: '#e5f9f8', color: '#1b504c', border: 'none',
                        borderRadius: '6px', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {lateStatus === 'sending' && (
                <div style={{ padding: '1.5rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <RefreshCw size={20} style={{ animation: 'spin 1.5s linear infinite' }} color="#1b504c" />
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>
                    Notifying waiting patients...
                  </span>
                </div>
              )}

              {lateStatus === 'done' && (
                <div style={{ padding: '1rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e8faee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={14} color="#16a34a" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#16a34a' }}>
                    All waiting patients notified
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </AnimatePresence>

      <Toaster position="top-right" />
    </div>
  );
}
