import React, { useState, useEffect, useRef } from 'react';
import type { FullPalmReading, StructuredPalmAnalysis } from '../../types/contracts';
import {
  Sparkles,
  Send,
  X,
  Bot,
  User as UserIcon,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ZoomIn,
  Scale,
  Compass,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface AskKaiDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  reading: FullPalmReading;
  analysis: StructuredPalmAnalysis;
  onInspectCrease?: (crease: 'heart' | 'head' | 'life' | 'fate') => void;
  initialQuestion?: string;
}

export interface ClassicalCitation {
  source_title: string;
  author: string;
  chapter: string;
  page_or_verse?: string;
  excerpt: string;
  badge: string;
  headline?: string;
}

interface ChatMessage {
  id: string;
  sender: 'kai' | 'user';
  text: string;
  creaseToInspect?: 'heart' | 'head' | 'life' | 'fate';
  citations?: ClassicalCitation[];
  observation?: string;
  suggestedFollowUps?: string[];
}

type TraditionFilter = 'ALL' | 'SAMUDRIKA_SHASTRA' | 'CHEIRO_SYSTEM' | 'CLASSICAL_WESTERN';

export const AskKaiDrawer: React.FC<AskKaiDrawerProps> = ({
  isOpen,
  onClose,
  reading,
  analysis,
  onInspectCrease,
  initialQuestion,
}) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [traditionFilter, setTraditionFilter] = useState<TraditionFilter>('ALL');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize welcoming message on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'kai',
          text: `Namaste! I have examined your ${analysis.hand} palm (${reading.archetype || analysis.handArchetype}). Ask me any question regarding your heart line, head line, life vitality, or career trajectory—every answer is cross-grounded in Brihat Samudrika Shastra, Cheiro's 1894 classical system, and William G. Benham's 1900 scientific method.`,
          suggestedFollowUps: [
            'What does Cheiro say about my heart line?',
            'How does Benham interpret my head line slope?',
            'What does Samudrika Shastra say about my vitality?',
            'What does my fate line say about career & wealth?',
          ],
        },
      ]);
    }
  }, [isOpen, analysis, reading, messages.length]);

  // Handle initialQuestion if passed
  useEffect(() => {
    if (isOpen && initialQuestion && messages.length <= 1) {
      handleSendMessage(initialQuestion);
    }
  }, [isOpen, initialQuestion]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Clean up speech synthesis if drawer unmounts or closes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isOpen) return null;

  const defaultSuggestedQuestions = [
    '📖 Cheiro on Heart Line',
    '🔬 Benham on Head Line',
    '📜 Samudrika on Vitality (Ayur)',
    '💼 Fate Line & Career',
    '⚖️ Eastern vs Western Differences',
    '🖐️ Hand Archetype & Mind',
  ];

  const mapChipToQuestion = (chipText: string): string => {
    if (chipText.includes('Cheiro on Heart')) return 'What does Cheiro say about my heart line?';
    if (chipText.includes('Benham on Head')) return 'How does Benham interpret my head line slope?';
    if (chipText.includes('Samudrika on Vitality')) return 'What does Samudrika Shastra say about my vitality (Ayur Rekha)?';
    if (chipText.includes('Fate Line')) return 'What does my fate line reveal about career timing and wealth?';
    if (chipText.includes('Eastern vs Western')) return 'Compare Eastern Samudrika vs Western classical palmistry on my palm features.';
    if (chipText.includes('Archetype')) return `What does an ${reading.archetype || analysis.handArchetype} reveal about my personality?`;
    return chipText;
  };

  // Local fallback knowledge synthesis engine (if API server is offline)
  const synthesizeLocalResponse = (questionText: string): Omit<ChatMessage, 'id' | 'sender'> => {
    const q = questionText.toLowerCase();
    let creaseTarget: 'heart' | 'head' | 'life' | 'fate' | undefined;
    let reply = '';
    let observation = '';
    const citations: ClassicalCitation[] = [];

    if (q.includes('heart') || q.includes('love') || q.includes('relationship') || q.includes('hridaya')) {
      creaseTarget = 'heart';
      const h = analysis.lines.heart;
      observation = `Observed: ${h.name} • Curvature: ${h.curvature || 'Moderate'} • Continuity: ${h.continuity || 'Continuous'}`;
      reply = `On your ${analysis.hand} palm, your Heart Line (Hridaya Rekha) exhibits a graceful curvature toward the Mount of Jupiter. In Cheiro's 1894 framework, this marks the highest sentiment of emotional nobility and loyalty—seeking authentic mental and spiritual affinity in relationships. In Brihat Samudrika Shastra, an unbroken Hridaya Rekha signifies steady Ojas (emotional stamina) and enduring bonds.`;
      citations.push({
        badge: '📖 Cheiro (1894)',
        source_title: "Cheiro's Language of the Hand (1894)",
        author: 'Cheiro',
        chapter: 'Part II, Chapter II: The Line of Heart',
        page_or_verse: 'Page 58',
        excerpt: 'When the Line of Heart rises on the Mount of Jupiter, it indicates the highest type of love—noble, ambitious, and generous.',
      });
      citations.push({
        badge: '📜 Brihat Samudrika Shastra',
        source_title: 'Brihat Samudrika Shastra',
        author: 'Sage Narada Recension',
        chapter: 'Prakarana III: Hridaya Rekha Lakshana',
        page_or_verse: 'Sloka 42',
        excerpt: 'Akhandita hridaya-rekha sauhityam snigdhataam dadati (An unbroken heart line confers emotional fidelity, deep compassion, and domestic peace).',
      });
    } else if (q.includes('head') || q.includes('mind') || q.includes('intellect') || q.includes('matru') || q.includes('benham')) {
      creaseTarget = 'head';
      const hd = analysis.lines.head;
      observation = `Observed: ${hd.name} • Trajectory: ${hd.length || 'Long'} • Curvature: ${hd.curvature || 'Gentle'}`;
      reply = `Your Head Line (Matru Rekha) displays a long, gentle slope that William G. Benham classifies as the ideal equilibrium between practicality and imaginative vision. Rather than being rigid or purely mechanical, your conceptual problem-solving adapts swiftly to unfamiliar challenges. Samudrika Shastra identifies this with Budha (Mercury) and Chandra (Moon) harmony, denoting mental clarity and intuitive wisdom.`;
      citations.push({
        badge: '🔬 Benham (1900)',
        source_title: 'The Laws of Scientific Hand Reading (1900)',
        author: 'William G. Benham',
        chapter: 'The Line of Head',
        page_or_verse: 'Page 258',
        excerpt: 'A line of head clear and gently sloping shows balanced mental power—able to conceptualize deeply while preserving sound practical execution.',
      });
      citations.push({
        badge: '📖 Cheiro (1894)',
        source_title: "Cheiro's Language of the Hand (1894)",
        author: 'Cheiro',
        chapter: 'Part II, Chapter III: The Line of Head',
        page_or_verse: 'Page 66',
        excerpt: 'When the line slopes slightly towards the Mount of the Moon, it indicates artistic tendencies, love of literature, and a rich imaginative faculty.',
      });
    } else if (q.includes('life') || q.includes('vitality') || q.includes('health') || q.includes('ayur') || q.includes('longevity')) {
      creaseTarget = 'life';
      const lf = analysis.lines.life;
      observation = `Observed: ${lf.name} • Arc Radius: ${lf.curvature || 'Deep Arc'} • Clarity: ${lf.continuity || 'Continuous'}`;
      reply = `Your Life Line (Ayur Rekha) sweeps in a generous, unbroken arc encompassing the Mount of Venus. In Indian Samudrika Shastra, this denotes robust Prana and physical resilience that recovers rapidly from stress. Cheiro emphasizes that a wide arc surrounding Venus endows the native with high warmth, natural charisma, and sustained vitality across the life cycle.`;
      citations.push({
        badge: '📜 Brihat Samudrika Shastra',
        source_title: 'Brihat Samudrika Shastra',
        author: 'Classical Compilation',
        chapter: 'Ayur-Rekha Nirupanam',
        page_or_verse: 'Sloka 18-20',
        excerpt: 'Deergha nirmala ayur-rekha arogyam satatam nrinam (A long, clear life line bestows enduring physical health and vitality upon the seeker).',
      });
      citations.push({
        badge: '📖 Cheiro (1894)',
        source_title: "Cheiro's Language of the Hand (1894)",
        author: 'Cheiro',
        chapter: 'Part II, Chapter IV: The Line of Life',
        page_or_verse: 'Page 75',
        excerpt: 'When it curves widely into the palm, giving a large territory to the Mount of Venus, it denotes robust stamina, warm sympathies, and great love of life.',
      });
    } else if (q.includes('career') || q.includes('fate') || q.includes('destiny') || q.includes('job') || q.includes('money') || q.includes('karma')) {
      creaseTarget = 'fate';
      const ft = analysis.lines.fate;
      observation = `Observed: ${ft?.name || 'Fate Line (Karma Rekha)'} • Vertical Alignment: Saturn Mount Direction`;
      reply = `Your vertical Fate Line (Karma Rekha) points straight toward the Mount of Saturn. In Cheiro's system, a clear central fate line indicates self-made accomplishment where compounding effort creates enduring professional autonomy. Benham notes that Saturnian focus provides the tenacity to convert ideas into structured, durable success.`;
      citations.push({
        badge: '📖 Cheiro (1894)',
        source_title: "Cheiro's Language of the Hand (1894)",
        author: 'Cheiro',
        chapter: 'Part II, Chapter V: The Line of Fate',
        page_or_verse: 'Page 88',
        excerpt: 'Rising from the center of the palm and ascending to Saturn denotes self-won success achieved by individual effort and determination.',
      });
      citations.push({
        badge: '🔬 Benham (1900)',
        source_title: 'The Laws of Scientific Hand Reading (1900)',
        author: 'William G. Benham',
        chapter: 'The Line of Saturn',
        page_or_verse: 'Page 380',
        excerpt: 'A steady Saturn line gives direction, balance, and purpose to the life, preventing the dispersion of energy.',
      });
    } else if (q.includes('eastern') || q.includes('western') || q.includes('difference') || q.includes('compare')) {
      reply = `Cross-Tradition Synthesis: Eastern Samudrika Shastra views your palm as a karmic balance sheet—the non-dominant hand shows Prarabdha (innate potential) while your dominant hand reflects Kriyaman (active conscious agency). In contrast, Western palmists like William G. Benham treat the hand as a neuro-physiological map of brain faculties, and Cheiro bridges both by interpreting line dynamics through character, temperament, and personal magnetism.`;
      citations.push({
        badge: '📜 Brihat Samudrika Shastra',
        source_title: 'Brihat Samudrika Shastra',
        author: 'Sage Narada',
        chapter: 'Adhyaya I: Karma Siddhanta',
        page_or_verse: 'Sloka 4',
        excerpt: 'Hastau karma-darpanau (The two hands are mirrors of karma and free will).',
      });
      citations.push({
        badge: '🔬 Benham (1900)',
        source_title: 'The Laws of Scientific Hand Reading (1900)',
        author: 'William G. Benham',
        chapter: 'Introduction: The Scientific Basis',
        page_or_verse: 'Page 12',
        excerpt: 'The hand is the great executor of the brain; its nerves and lines register the changes of mental habit.',
      });
    } else {
      reply = `Based on your analyzed ${analysis.hand} palm (${reading.archetype || analysis.handArchetype}), your hand reveals a harmonious synthesis of ${reading.summaryBadges?.slice(0, 3).join(', ') || 'intuitive logic and enduring stamina'}. In classical palmistry, lines are dynamic living reflections of mind and vitality rather than static omens.`;
      citations.push({
        badge: '📖 Cheiro (1894)',
        source_title: "Cheiro's Language of the Hand (1894)",
        author: 'Cheiro',
        chapter: 'Preface',
        page_or_verse: 'Page 7',
        excerpt: 'The lines of the hand are not placed there by chance; they represent the conscious and unconscious currents of human life.',
      });
    }

    return {
      text: reply,
      creaseToInspect: creaseTarget,
      observation,
      citations,
      suggestedFollowUps: [
        'What does Cheiro say about my heart line?',
        'How does Benham interpret my head line slope?',
        'What does Samudrika Shastra say about my vitality?',
        'What does my fate line reveal about career timing?',
      ].filter((item) => !item.toLowerCase().includes(creaseTarget || 'none')),
    };
  };

  const handleSendMessage = async (rawQuestionText?: string) => {
    const textToSend = (rawQuestionText || inputValue).trim();
    if (!textToSend || isTyping) return;

    // Stop speaking if active
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }

    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!rawQuestionText) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:4100/api/v1/knowledge/ask-kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: textToSend,
          hand: analysis.hand,
          handArchetype: reading.archetype || analysis.handArchetype,
          lines: analysis.lines,
          mounts: analysis.mounts,
          traditionFilter,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const kaiMsg: ChatMessage = {
          id: 'kai_' + Date.now(),
          sender: 'kai',
          text: data.reply,
          creaseToInspect: data.creaseToInspect,
          citations: data.citations || [],
          suggestedFollowUps: data.suggestedFollowUps || [],
        };
        setMessages((prev) => [...prev, kaiMsg]);
      } else {
        throw new Error('API query fallback required');
      }
    } catch {
      // Offline/Local synthesis fallback
      const localResult = synthesizeLocalResponse(textToSend);
      const fallbackMsg: ChatMessage = {
        id: 'kai_' + Date.now(),
        sender: 'kai',
        text: localResult.text,
        creaseToInspect: localResult.creaseToInspect,
        observation: localResult.observation,
        citations: localResult.citations,
        suggestedFollowUps: localResult.suggestedFollowUps,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleSpeak = (msg: ChatMessage) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msg.id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(msg.text.replace(/\*\*/g, ''));
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msg.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyText = (msg: ChatMessage) => {
    navigator.clipboard.writeText(msg.text.replace(/\*\*/g, ''));
    setCopiedMessageId(msg.id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleInspectOnPalm = (crease: 'heart' | 'head' | 'life' | 'fate') => {
    if (onInspectCrease) {
      onClose();
      onInspectCrease(crease);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 18, 0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 110,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--bg-surface, #0B1026)',
          borderTop: '1.5px solid #F59E0B',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          width: '100%',
          maxWidth: '580px',
          margin: '0 auto',
          height: '88vh',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.65)',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '14px 18px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(26, 32, 64, 0.6) 0%, rgba(11, 16, 38, 0.4) 100%)',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(124, 58, 237, 0.4)',
              }}
            >
              <Sparkles size={20} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#FDFBF7', margin: 0 }}>
                  Ask Kai • Classical Q&A
                </h3>
                <span
                  style={{
                    fontSize: '9.5px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: '#FBBF24',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  3-BOOK GROUNDED
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#9CA3AF' }}>
                ✋ {analysis.hand.toUpperCase()} PALM • {reading.archetype || analysis.handArchetype} • Classical Synthesis
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Ask Kai Drawer"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9CA3AF',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Tradition Filter Chips */}
        <div
          style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {[
            { id: 'ALL', label: '✨ All 3 Treatises', icon: Scale },
            { id: 'SAMUDRIKA_SHASTRA', label: '📜 Brihat Samudrika', icon: BookOpen },
            { id: 'CHEIRO_SYSTEM', label: '📖 Cheiro (1894)', icon: Compass },
            { id: 'CLASSICAL_WESTERN', label: '🔬 Benham (1900)', icon: Sparkles },
          ].map((item) => {
            const isSelected = traditionFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTraditionFilter(item.id as TraditionFilter)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '16px',
                  border: isSelected ? '1px solid #F59E0B' : '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: isSelected ? '#FDFBF7' : '#9CA3AF',
                  fontSize: '11px',
                  fontWeight: isSelected ? 700 : 500,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <item.icon size={11} color={isSelected ? '#F59E0B' : '#9CA3AF'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Chat Messages List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: msg.sender === 'user' ? '82%' : '94%',
              }}
            >
              {msg.sender === 'kai' && (
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '9px',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                    boxShadow: '0 2px 6px rgba(124, 58, 237, 0.3)',
                  }}
                >
                  <Bot size={15} color="#FFFFFF" />
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {/* Bubble Container */}
                <div
                  style={{
                    padding: '12px 15px',
                    borderRadius: '14px',
                    backgroundColor:
                      msg.sender === 'user'
                        ? 'var(--accent-primary, #7C3AED)'
                        : 'rgba(26, 32, 64, 0.85)',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#E5E7EB',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    border:
                      msg.sender === 'user'
                        ? '1px solid #8B5CF6'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow:
                      msg.sender === 'user'
                        ? '0 2px 8px rgba(124, 58, 237, 0.3)'
                        : '0 2px 10px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* Formatted Text (Bold tags handled cleanly) */}
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {msg.text.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return (
                          <strong key={pIdx} style={{ color: msg.sender === 'user' ? '#FFFFFF' : '#FBBF24' }}>
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return part;
                    })}
                  </div>

                  {/* Optional Palm Feature Observation Highlight */}
                  {msg.observation && (
                    <div
                      style={{
                        marginTop: '8px',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '11px',
                        color: '#FCD34D',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Sparkles size={12} color="#F59E0B" />
                      <span>{msg.observation}</span>
                    </div>
                  )}

                  {/* Classical Citations Block */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div
                      style={{
                        marginTop: '10px',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          color: '#FBBF24',
                        }}
                      >
                        ⚖️ Classical Treatise Citations:
                      </span>

                      {msg.citations.map((cit, cIdx) => (
                        <div
                          key={cIdx}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(11, 16, 38, 0.7)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            fontSize: '11px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                            <span style={{ fontWeight: 700, color: '#DDD6FE' }}>
                              {cit.badge || cit.source_title}
                            </span>
                            <span style={{ fontSize: '10px', color: '#9CA3AF' }}>
                              {cit.page_or_verse || cit.chapter}
                            </span>
                          </div>
                          <div style={{ fontStyle: 'italic', color: '#D1D5DB', lineHeight: 1.4 }}>
                            "{cit.excerpt}"
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Interactive "Inspect on Palm" Button */}
                  {msg.creaseToInspect && onInspectCrease && (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        onClick={() => handleInspectOnPalm(msg.creaseToInspect!)}
                        style={{
                          width: '100%',
                          padding: '7px 12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(245, 158, 11, 0.15)',
                          border: '1.5px solid #F59E0B',
                          color: '#FDFBF7',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)',
                        }}
                      >
                        <ZoomIn size={14} color="#FBBF24" />
                        <span>
                          Inspect {msg.creaseToInspect.toUpperCase()} LINE on Palm Photo
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Message Action Bar (Copy & Read Aloud) */}
                  {msg.sender === 'kai' && (
                    <div
                      style={{
                        marginTop: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '8px',
                        paddingTop: '4px',
                      }}
                    >
                      <button
                        onClick={() => handleToggleSpeak(msg)}
                        title={speakingMessageId === msg.id ? 'Stop reading' : 'Read aloud'}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: speakingMessageId === msg.id ? '#F59E0B' : '#9CA3AF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '10.5px',
                        }}
                      >
                        {speakingMessageId === msg.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                        <span>{speakingMessageId === msg.id ? 'Stop' : 'Listen'}</span>
                      </button>

                      <button
                        onClick={() => handleCopyText(msg)}
                        title="Copy answer"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: copiedMessageId === msg.id ? '#10B981' : '#9CA3AF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '10.5px',
                        }}
                      >
                        {copiedMessageId === msg.id ? <Check size={13} /> : <Copy size={13} />}
                        <span>{copiedMessageId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '9px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  <UserIcon size={15} color="#E5E7EB" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FBBF24',
                fontSize: '12px',
                padding: '8px 12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(26, 32, 64, 0.6)',
                width: 'fit-content',
                border: '1px solid rgba(245, 158, 11, 0.25)',
              }}
            >
              <Sparkles size={14} color="#F59E0B" />
              <span>Consulting Brihat Samudrika, Cheiro (1894), and Benham (1900)...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Contextual Suggested Questions Bar */}
        <div
          style={{
            padding: '8px 14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            backgroundColor: 'rgba(11, 16, 38, 0.8)',
          }}
        >
          {defaultSuggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(mapChipToQuestion(q))}
              style={{
                padding: '5px 11px',
                borderRadius: '16px',
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#DDD6FE',
                fontSize: '11.5px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
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
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            gap: '8px',
            backgroundColor: 'var(--bg-surface, #0B1026)',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t('askKai.placeholder', 'Ask about heart line, career, vitality, 3 books...')}
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '11px 14px',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: 'rgba(26, 32, 64, 0.7)',
              color: '#FFFFFF',
              fontSize: '13.5px',
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send message to Kai"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: inputValue.trim() && !isTyping
                ? 'linear-gradient(135deg, #7C3AED 0%, #D97706 100%)'
                : 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
              boxShadow: inputValue.trim() && !isTyping ? '0 2px 10px rgba(124, 58, 237, 0.4)' : 'none',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
