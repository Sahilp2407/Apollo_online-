import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Send, Phone, CheckCheck, RefreshCw, X, ChevronRight,
  Sparkles, Check, Play, Square, Volume2, ArrowRight
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const PERSONA_ICONS = {
  'Working Professional': '💼',
  'Elderly': '👴',
  'Student': '🎓',
  'Default': '👤',
};

export default function ReminderLogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('p-1');
  const [customMsg, setCustomMsg] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('Custom');
  const [voicePlaying, setVoicePlaying] = useState({}); // messageId -> bool

  const templates = {
    '48h Reminder': "Hi {name}, your appointment with Dr. Mehta is in 48 hours. Please reply '1' to confirm or '2' to reschedule.",
    '24h Reminder': "Urgent: Your slot with Dr. Mehta is tomorrow at {time}. Reply '1' to confirm. Safe transit!",
    'Reschedule Option': "Hello {name}, we noticed your high no-show risk. Would you prefer to move your slot to tomorrow morning?",
    'Custom': ""
  };

  const [conversations, setConversations] = useState([
    {
      id: 'p-1',
      name: 'Priya Sharma',
      persona: 'Working Professional',
      riskScore: 84,
      riskLevel: 'HIGH',
      phone: '+91 98765 43210',
      unread: true,
      lastMsg: 'Replied: Confirmed (1)',
      time: '10:05 AM',
      messages: [
        { id: 'm1', type: 'system', text: 'Appointment booked: Thursday 3 July, 10:00 AM', time: '12 Jun, 2:30 PM' },
        { id: 'm2', type: 'outgoing', text: 'Apollo Hospital: Hi Priya. Your appointment with Dr. Mehta is confirmed for 3 July at 10:00 AM.', time: '12 Jun, 2:30 PM', channel: 'WhatsApp', status: 'read' },
        { id: 'm3', type: 'outgoing', text: 'To help personalize your visit, please reply with your profile:\n1 - Working Professional 💼\n2 - Elderly / Needs Assistance 👴\n3 - Student 🎓', time: '12 Jun, 2:31 PM', channel: 'WhatsApp', status: 'read' },
        { id: 'm4', type: 'incoming', text: '1', time: '12 Jun, 2:35 PM' },
        { id: 'm5', type: 'system', text: 'Persona set: Working Professional 💼', time: '12 Jun, 2:35 PM' },
        { id: 'm6', type: 'outgoing', text: 'Thank you! We\'ve noted your preference. We will send reminders 48h before your visit.', time: '12 Jun, 2:36 PM', channel: 'WhatsApp', status: 'read' },
        { id: 'm7', type: 'outgoing', text: 'Hi Priya, your slot is in 48 hours. Plan your leave for Thursday. Tap to confirm.', time: '1 Jul, 10:00 AM', channel: 'WhatsApp', status: 'read' },
        { id: 'm8', type: 'incoming', text: 'Confirmed', time: '1 Jul, 10:05 AM' },
        { id: 'm9', type: 'outgoing', text: 'Urgent: Your appointment is tomorrow at 10:00 AM. Please confirm if you are coming.', time: '2 Jul, 10:00 AM', channel: 'WhatsApp', status: 'sent' },
        { id: 'm10', type: 'voice', text: 'Voice Call — Hindi — 45 seconds', outcome: 'Confirmed', time: '2 Jul, 11:30 AM', duration: 45, language: 'Hindi' },
        { id: 'm11', type: 'outgoing', text: 'Dr. Mehta is on schedule. We see you at 10:00 AM. Tap for live navigation.', time: '3 Jul, 9:00 AM', channel: 'WhatsApp', status: 'sent', isScheduled: true }
      ]
    },
    {
      id: 'p-2',
      name: 'Ramesh Gupta',
      persona: 'Elderly',
      riskScore: 71,
      riskLevel: 'HIGH',
      phone: '+91 76543 21098',
      unread: false,
      lastMsg: 'Family: Mrs. Gupta notified',
      time: 'Yesterday',
      messages: [
        { id: 'm21', type: 'system', text: 'Appointment booked: Thursday 3 July, 11:00 AM', time: '15 Jun, 11:00 AM' },
        { id: 'm22', type: 'outgoing', text: 'Apollo Hospital: Hi Ramesh, your appointment is confirmed for 3 July at 11:00 AM.', time: '15 Jun, 11:00 AM', channel: 'WhatsApp', status: 'read' },
        { id: 'm23', type: 'outgoing', text: 'Please reply with caregiver / family contact number to coordinate assistance.', time: '15 Jun, 11:02 AM', channel: 'WhatsApp', status: 'read' },
        { id: 'm24', type: 'incoming', text: '9876543211 Mrs. Gupta', time: '15 Jun, 11:15 AM' },
        { id: 'm25', type: 'system', text: 'Family Coordinator set: Mrs. Gupta (9876543211)', time: '15 Jun, 11:15 AM' },
        { id: 'm26', type: 'outgoing', text: 'To Family (Mrs. Gupta): Hi, we will coordinate Ramesh\'s orthopedics visit with you. Please confirm transit.', time: '15 Jun, 11:16 AM', channel: 'WhatsApp', status: 'read' },
        { id: 'm27', type: 'outgoing', text: 'To Family (Mrs. Gupta): Reminder — Ramesh\'s Cardiology slot is in 48 hours. Assistance desk is reserved.', time: '1 Jul, 11:00 AM', channel: 'WhatsApp', status: 'read' },
        { id: 'm28', type: 'incoming', text: 'Thank you, we will bring him.', time: '1 Jul, 11:12 AM' }
      ]
    },
    {
      id: 'p-3',
      name: 'Sneha Patil',
      persona: 'Student',
      riskScore: 15,
      riskLevel: 'LOW',
      phone: '+91 65432 10987',
      unread: false,
      lastMsg: 'Replied: Ok, thanks!',
      time: '3 Jul',
      messages: [
        { id: 'm31', type: 'outgoing', text: 'Apollo Hospital: Hi Sneha, your slot is confirmed for 3 July, 11:30 AM.', time: '2 Jul, 11:30 AM', channel: 'WhatsApp', status: 'read' },
        { id: 'm32', type: 'incoming', text: 'Ok, thanks!', time: '2 Jul, 11:42 AM' }
      ]
    }
  ]);

  const activeConv = conversations.find(c => c.id === selectedPatientId) || conversations[0];

  const filteredConversations = conversations.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.lastMsg.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      type: 'outgoing',
      text: customMsg,
      time: 'Just now',
      channel: 'WhatsApp',
      status: 'sent'
    };

    setConversations(prev => prev.map(c => {
      if (c.id === selectedPatientId) {
        return {
          ...c,
          lastMsg: customMsg,
          time: 'Just now',
          messages: [...c.messages, newMsg]
        };
      }
      return c;
    }));

    setCustomMsg('');
    toast.success('Message queued to outbound WhatsApp.');
  };

  const handleTemplateChange = (e) => {
    const t = e.target.value;
    setSelectedTemplate(t);
    if (t === 'Custom') {
      setCustomMsg('');
    } else {
      let txt = templates[t]
        .replace('{name}', activeConv.name)
        .replace('{time}', activeConv.messages.find(m => m.text?.includes('confirmed'))?.time || '10:00 AM');
      setCustomMsg(txt);
    }
  };

  const toggleVoicePlay = (msgId) => {
    setVoicePlaying(prev => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  return (
    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      
      {/* Two-panel messaging interface layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        background: 'white',
        borderRadius: '8px',
        border: '1px solid #f3f4f6',
        height: 'calc(100vh - 120px)',
        overflow: 'hidden',
      }}>
        
        {/* LEFT PANEL: PATIENT LIST */}
        <div style={{
          borderRight: '1px solid #f3f4f6',
          display: 'flex',
          flexDirection: 'column',
          background: '#f8fafc',
        }}>
          {/* Left Header Search */}
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6', background: 'white' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: 34,
                  background: '#f1f5f9',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0 1rem 0 2rem',
                  fontSize: '0.8rem',
                  outline: 'none',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              />
            </div>
          </div>

          {/* Patient Items Queue */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConversations.map(conv => {
              const active = conv.id === selectedPatientId;
              const emoji = PERSONA_ICONS[conv.persona] || '👤';

              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedPatientId(conv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    background: active ? '#e5f9f8' : 'transparent',
                    borderLeft: active ? '3px solid #1b504c' : '3px solid transparent',
                    transition: 'all 120ms',
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: active ? '#1b504c' : '#e2e8f0',
                    color: active ? 'white' : '#4b5563',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 600, fontSize: '0.75rem', flexShrink: 0,
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}>
                    {conv.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.15rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.82rem', color: '#1a1a2e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {conv.name}
                      </span>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                        {conv.time}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>
                        {conv.lastMsg}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.68rem' }}>{emoji}</span>
                        {conv.unread && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1b504c' }} />
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#f8fafc',
        }}>
          
          {/* Header */}
          <div style={{
            padding: '0.75rem 1rem',
            background: 'white',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#1b504c', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.75rem', fontFamily: 'Space Grotesk, sans-serif' }}>
                {activeConv.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1a1a2e' }}>{activeConv.name}</span>
                  <span style={{ fontSize: '0.65rem', background: '#f1f5f9', color: '#475569', borderRadius: '4px', padding: '0.15rem 0.35rem' }}>
                    {PERSONA_ICONS[activeConv.persona]} {activeConv.persona}
                  </span>
                  
                  {/* Dot + Risk Tag */}
                  <span style={{ fontSize: '0.68rem', fontWeight: 600, color: activeConv.riskLevel === 'HIGH' ? '#ef4444' : '#16a34a', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: activeConv.riskLevel === 'HIGH' ? '#ef4444' : '#16a34a' }} />
                    RISK: {activeConv.riskScore}%
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                  {activeConv.phone}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/staff/patient/p-1`)}
              style={{
                background: 'none', border: 'none', color: '#1b504c', fontWeight: 600, fontSize: '0.78rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem',
              }}
            >
              View Profile <ArrowRight size={12} />
            </button>
          </div>

          {/* Conversation Bubble Stream */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            {activeConv.messages.map((msg) => {
              
              if (msg.type === 'system') {
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'center', margin: '0.25rem 0' }}>
                    <span style={{
                      background: '#f1f5f9', color: '#475569', fontSize: '0.7rem',
                      padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #cbd5e1'
                    }}>
                      {msg.text}
                    </span>
                  </div>
                );
              }

              if (msg.type === 'voice') {
                const isPlaying = voicePlaying[msg.id];
                const color = msg.outcome === 'Confirmed' ? '#16a34a' : '#ef4444';
                
                return (
                  <div
                    key={msg.id}
                    style={{
                      alignSelf: 'center', width: '100%', maxWidth: '300px',
                      background: 'white', borderRadius: '6px', padding: '0.875rem',
                      border: '1px solid #cbd5e1', margin: '0.25rem 0',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1a1a2e' }}>Automated Voice Call</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, color }}>
                        {msg.outcome}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '4px' }}>
                      <button
                        onClick={() => toggleVoicePlay(msg.id)}
                        style={{ width: 24, height: 24, borderRadius: '50%', background: '#1b504c', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                      >
                        {isPlaying ? <Square size={8} fill="white" /> : <Play size={9} fill="white" />}
                      </button>
                      
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '2px', height: 16 }}>
                        {[3, 5, 2, 7, 8, 4, 3, 5, 6, 8, 4, 6, 2].map((height, i) => (
                          <div
                            key={i}
                            style={{ width: 2, height: height * 1.5, background: isPlaying ? '#1b504c' : '#cbd5e1', borderRadius: 99 }}
                          />
                        ))}
                      </div>
                      <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{msg.duration}s</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                      <span>{msg.language}</span>
                      <span>{msg.time}</span>
                    </div>
                  </div>
                );
              }

              const isOutgoing = msg.type === 'outgoing';
              const isScheduled = msg.isScheduled;

              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {msg.text.includes('To Family') && (
                    <span style={{ fontSize: '0.65rem', color: '#7c3aed', fontWeight: 600, marginBottom: '0.15rem' }}>
                      Family Coordinator
                    </span>
                  )}

                  <div style={{
                    background: isOutgoing ? '#e8faee' : 'white',
                    border: isOutgoing ? 'none' : '1px solid #cbd5e1',
                    color: '#1a1a2e',
                    padding: '0.75rem 1rem',
                    borderRadius: isOutgoing ? '8px 8px 0 8px' : '8px 8px 8px 0',
                    lineHeight: 1.4,
                    fontSize: '0.8rem',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.text}
                  </div>

                  <div style={{
                    alignSelf: isOutgoing ? 'flex-end' : 'flex-start',
                    fontSize: '0.65rem',
                    color: '#94a3b8',
                    marginTop: '0.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                  }}>
                    <span>{msg.time}</span>
                    {isOutgoing && (
                      <span>
                        · {msg.channel} 
                        {isScheduled ? (
                          <span style={{ color: '#d97706', fontWeight: 500 }}> (Scheduled)</span>
                        ) : (
                          <span style={{ color: msg.status === 'read' ? '#3b82f6' : '#94a3b8' }}> ✓✓</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Bar */}
          <div style={{
            padding: '0.75rem 1rem',
            background: 'white',
            borderTop: '1px solid #f3f4f6',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Use Template:
              </span>
              <select
                value={selectedTemplate}
                onChange={handleTemplateChange}
                style={{
                  padding: '0.2rem 0.4rem', border: '1px solid #cbd5e1', borderRadius: '4px',
                  fontSize: '0.75rem', color: '#374151', outline: 'none', background: 'white'
                }}
              >
                <option value="Custom">Custom Message</option>
                <option value="48h Reminder">48h Confirmation Alert</option>
                <option value="24h Reminder">24h Urgency Ping</option>
                <option value="Reschedule Offer">Reschedule Offer</option>
              </select>
            </div>

            <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Type message..."
                value={customMsg}
                onChange={e => setCustomMsg(e.target.value)}
                style={{
                  flex: 1,
                  height: 34,
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '0 0.75rem',
                  fontSize: '0.82rem',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  width: 34, height: 34, borderRadius: '50%', background: '#1b504c', color: 'white',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>

      <Toaster position="top-right" />
    </div>
  );
}
