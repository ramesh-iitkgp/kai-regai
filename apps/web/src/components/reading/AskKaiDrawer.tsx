import React, { useState } from 'react';
import type { FullPalmReading, StructuredPalmAnalysis } from '../../types/contracts';
import { Sparkles, Send, X, Bot, User as UserIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface AskKaiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reading: FullPalmReading;
  analysis: StructuredPalmAnalysis;
}

interface ChatMessage {
  id: string;
  sender: 'kai' | 'user';
  text: string;
}

export const AskKaiDrawer: React.FC<AskKaiDrawerProps> = ({
  isOpen,
  onClose,
  reading,
  analysis,
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'kai',
      text: `Hello! I have analyzed your ${analysis.hand} palm with an ${analysis.handArchetype} structure. Ask me anything about your heart line, head line, career trajectory, or classical interpretations.`,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const suggestedQuestions = [
    'What does my heart line mean?',
    'What does my head line suggest?',
    'What does my career section say?',
    'Tell me more about my palm shape.',
  ];

  const handleSendMessage = (questionText?: string) => {
    const textToSend = questionText || inputValue.trim();
    if (!textToSend) return;

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      // Grounded answer strictly derived from observed palm features
      let reply = '';
      const qLower = textToSend.toLowerCase();

      if (qLower.includes('heart') || qLower.includes('love') || qLower.includes('relationship')) {
        const heartSec = reading.sections.find((s) => s.id === 'love');
        reply = heartSec
          ? `Regarding your heart line: Kai observed that ${heartSec.keyObservation}. In traditional palmistry, ${heartSec.traditionalInterpretation} Reflection prompt: "${heartSec.reflectiveAdvice}"`
          : `Your heart line shows a curvature that traditional palmistry associates with sincere emotional fidelity.`;
      } else if (qLower.includes('head') || qLower.includes('mind') || qLower.includes('intellect')) {
        const mindSec = reading.sections.find((s) => s.id === 'mind');
        reply = mindSec
          ? `For your head line: ${mindSec.keyObservation}. Traditional interpretation: ${mindSec.traditionalInterpretation}`
          : `Your head line exhibits steady trajectory reflecting structured conceptual problem-solving.`;
      } else if (qLower.includes('life') || qLower.includes('vitality') || qLower.includes('health') || qLower.includes('energy')) {
        const vitalitySec = reading.sections.find((s) => s.id === 'vitality');
        reply = vitalitySec
          ? `For your life line (Ayur Rekha): ${vitalitySec.keyObservation}. Traditional interpretation: ${vitalitySec.traditionalInterpretation} Advice: "${vitalitySec.reflectiveAdvice}"`
          : `Your life line encompasses the Venus mount with steady continuity, reflecting sustained vitality and resilience.`;
      } else if (qLower.includes('career') || qLower.includes('job') || qLower.includes('fate') || qLower.includes('money')) {
        const careerSec = reading.sections.find((s) => s.id === 'career');
        reply = careerSec
          ? `In terms of vocation: ${careerSec.keyObservation}. ${careerSec.traditionalInterpretation}`
          : `Your vertical fate line denotes self-directed focus that compounds through persistent dedication.`;
      } else if (qLower.includes('mount') || qLower.includes('jupiter') || qLower.includes('venus') || qLower.includes('parvata')) {
        const mountSec = reading.sections.find((s) => s.id === 'strengths' || s.id === 'mounts');
        reply = mountSec
          ? `Regarding your planetary mounts: ${mountSec.keyObservation}. Traditional meaning: ${mountSec.traditionalInterpretation}`
          : `Your Mount of Jupiter and Mount of Venus display prominent elevation, traditionally signaling aspirational leadership combined with generous warmth.`;
      } else if (qLower.includes('shape') || qLower.includes('archetype') || qLower.includes('hand')) {
        reply = `Your hand reflects an ${reading.archetype}. ${reading.archetypeDescription}`;
      } else {
        reply = `Based on your analyzed ${reading.hand} palm (${reading.archetype}), your primary traits reflect: ${reading.summaryBadges.join(', ')}. In traditional Samudrika Shastra, these features are tools for self-reflection rather than deterministic destiny. Feel free to ask about your heart line, head line, life line, or career trajectory!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'kai_' + Date.now(),
          sender: 'kai',
          text: reply,
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-active)',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '540px',
          margin: '0 auto',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: 'rgba(124, 58, 237, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={16} color="var(--accent-lavender)" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                Ask Kai
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Grounded strictly in your palm features
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Chat Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minHeight: '260px',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              {msg.sender === 'kai' && (
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(124, 58, 237, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <Bot size={14} color="var(--accent-lavender)" />
                </div>
              )}

              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: msg.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface-elevated)',
                  color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-primary)',
                  fontSize: '13px',
                  lineHeight: 1.45,
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <UserIcon size={14} color="var(--text-secondary)" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px' }}>
              <Bot size={14} color="var(--accent-lavender)" />
              <span>Consulting your analyzed palm features...</span>
            </div>
          )}
        </div>

        {/* Suggested Question Chips */}
        <div
          style={{
            padding: '8px 16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                color: 'var(--accent-lavender-warm)',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '12px 16px',
            paddingBottom: 'max(14px, env(safe-area-inset-bottom))',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '8px',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('askKai.placeholder', 'Ask about your palm lines...')}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-medium)',
              backgroundColor: 'var(--bg-surface-elevated)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: inputValue.trim() ? 'var(--accent-primary)' : 'var(--border-medium)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
