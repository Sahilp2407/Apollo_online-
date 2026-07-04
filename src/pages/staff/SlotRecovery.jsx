import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock, Check, Send, AlertTriangle, Plus, Sparkles
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

export default function SlotRecoveryPage() {
  const [revenueAtRisk, setRevenueAtRisk] = useState(180000);
  const [recoveredAmount, setRecoveredAmount] = useState(60000);

  // Open Slots State
  const [openSlots, setOpenSlots] = useState([
    {
      id: 'slot-1',
      time: '11:00 AM',
      doctor: 'Dr. Rajesh Mehta',
      department: 'Cardiology',
      cancelledBy: 'Priya Sharma',
      timeAgo: '15 min ago',
      reason: 'Rescheduled via WhatsApp',
      fee: 2500,
      waitlistCount: 3,
      expanded: false,
      filled: false,
      filledBy: '',
      notifiedList: {}, // maps patientId -> true
    },
    {
      id: 'slot-2',
      time: '01:00 PM',
      doctor: 'Dr. Arjun Deshmukh',
      department: 'Neurology',
      cancelledBy: 'Vijay Malhotra',
      timeAgo: '28 min ago',
      reason: 'Automated cancellation',
      fee: 1800,
      waitlistCount: 2,
      expanded: false,
      filled: false,
      filledBy: '',
      notifiedList: {},
    },
    {
      id: 'slot-3',
      time: '02:30 PM',
      doctor: 'Dr. Kavita Reddy',
      department: 'General Medicine',
      cancelledBy: 'Suresh Rao',
      timeAgo: '42 min ago',
      reason: 'Cancelled via IVR call',
      fee: 2200,
      waitlistCount: 4,
      expanded: false,
      filled: false,
      filledBy: '',
      notifiedList: {},
    }
  ]);

  // Waitlist Mock Data
  const waitlistData = {
    'slot-1': [
      { id: 'w-1', name: 'Rahul Verma', risk: 12, riskLevel: 'LOW', waitTime: '2 days' },
      { id: 'w-2', name: 'Meera Singh', risk: 25, riskLevel: 'LOW', waitTime: '5 days' },
      { id: 'w-3', name: 'Amit Patel', risk: 45, riskLevel: 'MEDIUM', waitTime: '1 day' },
    ],
    'slot-2': [
      { id: 'w-4', name: 'Suresh Kumar', risk: 18, riskLevel: 'LOW', waitTime: '4 days' },
      { id: 'w-5', name: 'Lakshmi Narayan', risk: 38, riskLevel: 'MEDIUM', waitTime: '3 days' },
    ],
    'slot-3': [
      { id: 'w-6', name: 'Kavya Reddy', risk: 9, riskLevel: 'LOW', waitTime: '1 day' },
      { id: 'w-7', name: 'Ravi Shankar', risk: 52, riskLevel: 'MEDIUM', waitTime: '6 days' },
      { id: 'w-8', name: 'Meera Joshi', risk: 15, riskLevel: 'LOW', waitTime: '2 days' },
    ],
  };

  const [feed, setFeed] = useState([
    { id: 1, text: '10:30 AM slot filled by Rahul', meta: '₹2,000 recovered · 3 min ago', type: 'success' },
    { id: 2, text: 'WhatsApp sent to Meera for 11:00 AM', meta: 'Delivered · 5 min ago', type: 'info' },
    { id: 3, text: 'Ankit declined 2:00 PM slot', meta: 'Auto-reply: Busy · 10 min ago', type: 'decline' },
  ]);

  const [suggestionAccepted, setSuggestionAccepted] = useState(null); // null | 'accepted' | 'dismissed'
  const [leadTimeHrs, setLeadTimeHrs] = useState(24);
  const currentNoShowRate = 28;
  const projectedNoShowRate = Math.round(28 - ((leadTimeHrs - 24) / 48) * 10);
  const revenueSavedVal = ((leadTimeHrs - 24) / 48) * 4.2;

  const stats = [
    { label: 'Slots Recovered Today', value: '2' },
    { label: 'Average Recovery Time', value: '12 min' },
    { label: 'Waitlist Patients', value: '8' },
    { label: 'Recovery Rate', value: '67%' },
  ];

  const handleNotify = (slotId, patient) => {
    toast.success(`Notification sent to ${patient.name}!`);

    setOpenSlots(prev => prev.map(s => {
      if (s.id === slotId) {
        const updatedNotified = { ...s.notifiedList, [patient.id]: true };
        
        setTimeout(() => {
          setOpenSlots(current => current.map(currSlot => {
            if (currSlot.id === slotId && !currSlot.filled) {
              setRevenueAtRisk(r => Math.max(0, r - currSlot.fee * 10));
              setRecoveredAmount(rec => rec + currSlot.fee * 10);
              
              setFeed(f => [
                {
                  id: Date.now(),
                  text: `${currSlot.time} slot filled by ${patient.name}`,
                  meta: `₹${currSlot.fee} recovered · Just now`,
                  type: 'success'
                },
                ...f
              ]);

              toast.success(`Slot Filled! ${patient.name} confirmed the 11:00 AM slot.`);
              return { ...currSlot, filled: true, filledBy: patient.name };
            }
            return currSlot;
          }));
        }, 1200);

        return { ...s, notifiedList: updatedNotified };
      }
      return s;
    }));
  };

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      
      {/* LIVE REVENUE TICKER (No pulse animation, simple display) */}
      <div
        style={{
          background: '#1b504c',
          borderRadius: '8px',
          padding: '1.5rem',
          color: 'white',
          marginBottom: '1.5rem',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              Revenue at Risk Today
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums', transition: 'all 0.3s ease' }}>
              ₹{revenueAtRisk.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
              <span>₹{recoveredAmount.toLocaleString('en-IN')} recovered</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.375rem' }}>
              Updated in real-time
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.35rem' }}>
            <span>Recovery Target Progress</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{Math.round((recoveredAmount / 240000) * 100)}% Complete</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(recoveredAmount / 240000) * 100}%`, background: '#22c55e', borderRadius: 99 }} />
          </div>
        </div>
      </div>

      {/* 2-COLUMN LIVE CONTROL */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '2rem', alignItems: 'start', marginBottom: '2.5rem' }}>
        
        {/* LEFT COLUMN: OPEN SLOTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.15rem', fontWeight: 500, color: '#1a1a2e', margin: 0 }}>
              Open Slots
            </h2>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, background: '#f1f5f9', color: '#475569', padding: '0.15rem 0.5rem', borderRadius: '4px', fontVariantNumeric: 'tabular-nums' }}>
              {openSlots.filter(s => !s.filled).length} Available
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {openSlots.map(slot => {
              const waitlist = waitlistData[slot.id] || [];
              
              return (
                <div
                  key={slot.id}
                  style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '1.25rem',
                    border: '1px solid #f3f4f6',
                    borderLeft: slot.filled ? '3px solid #22c55e' : '1px dashed #cbd5e1',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    
                    {/* Time & Doc */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1b504c', flexShrink: 0 }}>
                        <Clock size={16} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#1a1a2e', fontVariantNumeric: 'tabular-nums' }}>
                          {slot.time}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          {slot.doctor} · {slot.department}
                        </div>
                      </div>
                    </div>

                    {/* Cancellation details */}
                    <div>
                      <div style={{ fontSize: '0.78rem', color: '#374151' }}>
                        Cancelled by <strong>{slot.cancelledBy}</strong> · {slot.timeAgo}
                      </div>
                      <span style={{ display: 'inline-block', fontSize: '0.68rem', background: '#f8fafc', color: '#64748b', padding: '0.15rem 0.5rem', borderRadius: '4px', marginTop: '0.25rem' }}>
                        {slot.reason}
                      </span>
                    </div>

                    {/* Risk / Fill state */}
                    <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                      {slot.filled ? (
                        <span style={{ color: '#16a34a', fontSize: '0.78rem', fontWeight: 600 }}>FILLED</span>
                      ) : (
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#b45309', fontFamily: 'Space Grotesk, sans-serif', fontVariantNumeric: 'tabular-nums' }}>
                            ₹{slot.fee.toLocaleString('en-IN')}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                            at risk
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  {slot.filled && (
                    <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6', fontSize: '0.78rem', color: '#16a34a', fontWeight: 500 }}>
                      Assigned to {slot.filledBy} · Notification sent
                    </div>
                  )}

                  {!slot.filled && (
                    <div style={{ marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px dashed #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                      <button
                        onClick={() => {
                          setOpenSlots(prev => prev.map(s => s.id === slot.id ? { ...s, expanded: !s.expanded } : s));
                        }}
                        style={{ background: 'none', border: 'none', color: '#1b504c', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                      >
                        {slot.waitlistCount} matches available
                        <span>{slot.expanded ? '▴' : '▾'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setOpenSlots(prev => prev.map(s => s.id === slot.id ? { ...s, expanded: !s.expanded } : s));
                        }}
                        style={{ padding: '0.4rem 0.8rem', background: '#1b504c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500 }}
                      >
                        Match Slot
                      </button>
                    </div>
                  )}

                  {/* Waitlist Patients Expandable List */}
                  {slot.expanded && !slot.filled && (
                    <div style={{ overflow: 'hidden', marginTop: '1rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {waitlist.map(patient => {
                        const isNotified = slot.notifiedList[patient.id];
                        const riskColor = patient.risk <= 15 ? '#16a34a' : patient.risk <= 30 ? '#d97706' : '#ef4444';
                        
                        return (
                          <div
                            key={patient.id}
                            style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                              padding: '0.5rem 0.75rem', background: 'white', borderRadius: '4px',
                              border: '1px solid #e2e8f0', flexWrap: 'wrap',
                            }}
                          >
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a1a2e' }}>{patient.name}</span>
                                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: riskColor, display: 'flex', alignItems: 'center', gap: '0.2' }}>
                                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: riskColor }} />
                                  {patient.risk}%
                                </span>
                              </div>
                              <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                                Waiting {patient.waitTime}
                              </div>
                            </div>

                            {/* Sent with green text / No confetti */}
                            {isNotified ? (
                              <span style={{ color: '#16a34a', fontSize: '0.75rem', fontWeight: 600 }}>✅ Sent</span>
                            ) : (
                              <button
                                onClick={() => handleNotify(slot.id, patient)}
                                style={{
                                  padding: '0.3rem 0.6rem', borderRadius: '4px', border: 'none', fontSize: '0.72rem', fontWeight: 500,
                                  background: '#1b504c',
                                  color: 'white',
                                  cursor: 'pointer',
                                }}
                              >
                                Notify
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Overbooking Recommendation Card (Normal border-amber-200 card, no animation) */}
          {suggestionAccepted === null && (
            <div style={{ background: 'white', borderRadius: '8px', padding: '1.25rem', border: '1px solid #fcd34d' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <AlertTriangle size={15} color="#b45309" />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#b45309', textTransform: 'uppercase' }}>
                  Overbooking Recommendation
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#92400e', lineHeight: 1.5, margin: '0 0 0.75rem 0' }}>
                Dr. Mehta's 11:00 AM patient has 84% no-show probability. Consider booking a backup patient.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => {
                    setSuggestionAccepted('accepted');
                    toast.success('Overbook backup created.');
                  }}
                  style={{ flex: 1, padding: '0.4rem', background: '#1b504c', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 500, cursor: 'pointer' }}
                >
                  Accept
                </button>
                <button
                  onClick={() => setSuggestionAccepted('dismissed')}
                  style={{ padding: '0.4rem 0.6rem', background: 'transparent', color: '#4b5563', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 500, cursor: 'pointer' }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* What-If Simulator (Simple slider + two numbers, no chart) */}
          <div style={{ background: 'white', borderRadius: '8px', padding: '1.25rem', border: '1px solid #f3f4f6' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#1a1a2e', margin: '0 0 0.75rem 0' }}>
              What-If Simulator
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#374151' }}>
                <span>Send reminders earlier:</span>
                <span style={{ fontWeight: 600, color: '#1b504c', fontVariantNumeric: 'tabular-nums' }}>{leadTimeHrs} hrs</span>
              </div>
              <input
                type="range"
                min="12"
                max="72"
                step="12"
                value={leadTimeHrs}
                onChange={e => setLeadTimeHrs(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#1b504c', height: 4 }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
              <div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>PROJECTED NO-SHOW</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#1b504c', fontVariantNumeric: 'tabular-nums' }}>
                  {projectedNoShowRate}%
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.62rem', color: '#94a3b8' }}>REVENUE SAVED</div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#16a34a', fontVariantNumeric: 'tabular-nums' }}>
                  ₹{revenueSavedVal.toFixed(1)}L
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Feed */}
          <div style={{ background: 'white', borderRadius: '8px', padding: '1.25rem', border: '1px solid #f3f4f6' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.95rem', fontWeight: 500, color: '#1a1a2e', margin: '0 0 0.75rem 0' }}>
              Recovery Feed
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {feed.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '0.35rem 0',
                    borderBottom: '1px solid #f8fafc',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: '#374151' }}>{item.text}</div>
                  <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.1' }}>{item.meta}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* STATISTICS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: 'white', borderRadius: '8px', padding: '1.25rem', border: '1px solid #f3f4f6',
              textAlign: 'left',
            }}
          >
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#1b504c', marginBottom: '0.25rem', fontVariantNumeric: 'tabular-nums' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
