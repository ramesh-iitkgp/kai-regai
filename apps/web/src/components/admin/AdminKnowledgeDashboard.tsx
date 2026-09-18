import React, { useState } from 'react';
import {
  LayoutDashboard,
  Scan,
  BookOpen,
  Database,
  CheckCircle2,
  BarChart3,
  ArrowLeft,
  Search,
  Eye,
  RefreshCw,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface AdminKnowledgeDashboardProps {
  onBack: () => void;
}

type AdminTab =
  | 'dashboard'
  | 'scans'
  | 'ai_quality'
  | 'rules'
  | 'sources'
  | 'analytics';

interface OperationalScan {
  scanId: string;
  date: string;
  language: string;
  imageQuality: number;
  palmDetected: boolean;
  featureConfidence: number;
  paymentStatus: 'paid' | 'pending';
  readingStatus: 'generated' | 'pending';
  archetype: string;
  linesDetected: string[];
  qualityFlag?: string;
}

const MOCK_OPERATIONAL_SCANS: OperationalScan[] = [
  {
    scanId: 'scan_b86eeec7',
    date: '18 Sep 2026, 11:22',
    language: 'Hindi (हिन्दी)',
    imageQuality: 0.94,
    palmDetected: true,
    featureConfidence: 0.92,
    paymentStatus: 'paid',
    readingStatus: 'generated',
    archetype: 'The Strategic Builder',
    linesDetected: ['Heart Line (Curved)', 'Head Line (Long)', 'Life Line (Wide)'],
  },
  {
    scanId: 'scan_c19fa091',
    date: '18 Sep 2026, 11:18',
    language: 'Tamil (தமிழ்)',
    imageQuality: 0.88,
    palmDetected: true,
    featureConfidence: 0.89,
    paymentStatus: 'paid',
    readingStatus: 'generated',
    archetype: 'The Visionary Builder',
    linesDetected: ['Heart Line', 'Head Line', 'Life Line', 'Fate Line'],
  },
  {
    scanId: 'scan_a44ee812',
    date: '18 Sep 2026, 11:15',
    language: 'English',
    imageQuality: 0.72,
    palmDetected: true,
    featureConfidence: 0.75,
    paymentStatus: 'pending',
    readingStatus: 'pending',
    archetype: 'The Intuitive Sage',
    linesDetected: ['Heart Line', 'Head Line'],
    qualityFlag: 'Low Contrast Lighting',
  },
  {
    scanId: 'scan_f77ab304',
    date: '18 Sep 2026, 11:05',
    language: 'Telugu (తెలుగు)',
    imageQuality: 0.96,
    palmDetected: true,
    featureConfidence: 0.95,
    paymentStatus: 'paid',
    readingStatus: 'generated',
    archetype: 'The Strategic Builder',
    linesDetected: ['Heart Line', 'Head Line', 'Life Line', 'Sun Line'],
  },
  {
    scanId: 'scan_e22dc990',
    date: '18 Sep 2026, 10:48',
    language: 'Bengali (বাংলা)',
    imageQuality: 0.91,
    palmDetected: true,
    featureConfidence: 0.90,
    paymentStatus: 'paid',
    readingStatus: 'generated',
    archetype: 'The Compassionate Leader',
    linesDetected: ['Heart Line', 'Head Line', 'Life Line'],
  },
];

export const AdminKnowledgeDashboard: React.FC<AdminKnowledgeDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [selectedScan, setSelectedScan] = useState<OperationalScan | null>(null);
  const [scans] = useState<OperationalScan[]>(MOCK_OPERATIONAL_SCANS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING'>('ALL');

  // AI Quality Review State
  const [flaggedScans] = useState<OperationalScan[]>([
    MOCK_OPERATIONAL_SCANS[2],
  ]);

  // Filtered operational scans
  const filteredScans = scans.filter((s) => {
    const matchesSearch =
      s.scanId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.archetype.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'PAID' && s.paymentStatus === 'paid') ||
      (statusFilter === 'PENDING' && s.paymentStatus === 'pending');
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#070913',
        color: '#E2E8F0',
        fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      }}
    >
      {/* SaaS Sidebar (Linear / Vercel Aesthetic) */}
      <aside
        style={{
          width: '240px',
          backgroundColor: '#0B0F1F',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 12px',
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6366F1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '14px' }}>✋</span>
            </div>
            <div>
              <h2 style={{ fontSize: '14px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Kai RegAI
              </h2>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Admin Portal
              </span>
            </div>
          </div>

          <button
            onClick={onBack}
            title="Exit Admin"
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px',
              color: '#94A3B8',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <nav style={{ flex: 1, paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
            { id: 'scans' as AdminTab, label: 'Palm Scans', icon: Scan, badge: scans.length },
            { id: 'ai_quality' as AdminTab, label: 'AI Quality Control', icon: AlertTriangle, badge: flaggedScans.length },
            { id: 'rules' as AdminTab, label: 'Knowledge Rules', icon: Database },
            { id: 'sources' as AdminTab, label: 'Classical Sources', icon: BookOpen },
            { id: 'analytics' as AdminTab, label: 'Funnel Analytics', icon: BarChart3 },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  background: isActive ? 'rgba(124, 58, 237, 0.18)' : 'transparent',
                  color: isActive ? '#C4B5FD' : '#94A3B8',
                  border: isActive ? '1px solid rgba(139, 92, 246, 0.3)' : '1px solid transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={isActive ? '#C4B5FD' : '#64748B'} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '10px',
                      backgroundColor: isActive ? 'rgba(124, 58, 237, 0.35)' : 'rgba(255, 255, 255, 0.08)',
                      color: isActive ? '#DDD6FE' : '#94A3B8',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div style={{ padding: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '11px', color: '#64748B' }}>
          API: <span style={{ color: '#10B981' }}>● Online</span> (Port 4100)
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>
                Executive Overview
              </h1>
              <p style={{ fontSize: '13px', color: '#94A3B8', marginTop: '2px' }}>
                Real-time metrics for palm analysis accuracy, conversion rate, and revenue.
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
              {[
                { label: 'Total Scans', value: '1,428', change: '+18.4%', icon: Scan, color: '#38BDF8' },
                { label: 'Valid CV Scans', value: '1,314', change: '92.0% rate', icon: CheckCircle2, color: '#10B981' },
                { label: 'Paid Readings (₹10)', value: '1,048', change: '79.7% conv', icon: DollarSign, color: '#F59E0B' },
                { label: 'Gross Revenue', value: '₹10,480', change: '+22.5%', icon: TrendingUp, color: '#8B5CF6' },
              ].map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 18px',
                      backgroundColor: '#0F1426',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>{kpi.label}</span>
                      <Icon size={16} color={kpi.color} />
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{kpi.value}</div>
                    <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>{kpi.change} vs last week</span>
                  </div>
                );
              })}
            </div>

            {/* Secondary KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '28px' }}>
              {[
                { label: 'Avg CV Processing Time', value: '620 ms', note: 'Edge Canvas validator' },
                { label: 'Est. AI Cost per Reading', value: '₹0.14', note: 'Grounded rule engine' },
                { label: 'Refund Requests', value: '0', note: '100% money back guarantee' },
                { label: 'Top Language', value: 'Hindi (42%)', note: 'Followed by Tamil (24%)' },
              ].map((sub, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px',
                    backgroundColor: '#0B0F1F',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{sub.label}</span>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#CBD5E1', marginTop: '4px' }}>
                    {sub.value}
                  </div>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>{sub.note}</span>
                </div>
              ))}
            </div>

            {/* Recent Scans Operational Mini-Table */}
            <div
              style={{
                backgroundColor: '#0F1426',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>
                  Live Scans Stream
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('scans')}
                  rightIcon={<ChevronRight size={14} />}
                >
                  View All Operations
                </Button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {scans.slice(0, 3).map((scan) => (
                  <div
                    key={scan.scanId}
                    onClick={() => {
                      setSelectedScan(scan);
                      setActiveTab('scans');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      backgroundColor: '#0B0F1F',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#C4B5FD', fontFamily: 'monospace' }}>
                        {scan.scanId}
                      </span>
                      <span style={{ fontSize: '13px', color: '#fff' }}>{scan.archetype}</span>
                      <span style={{ fontSize: '12px', color: '#94A3B8' }}>• {scan.language}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge variant={scan.paymentStatus === 'paid' ? 'emerald' : 'outline'}>
                        {scan.paymentStatus === 'paid' ? 'Paid ₹10' : 'Pending'}
                      </Badge>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>{scan.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPERATIONAL PALM SCANS TABLE */}
        {activeTab === 'scans' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                  Palm Scans Operations
                </h1>
                <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                  Live stream of user palm uploads, CV confidence metrics, and payments.
                </p>
              </div>

              {/* Filters */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={14} color="#64748B" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by ID, language..."
                    style={{
                      padding: '8px 12px 8px 30px',
                      borderRadius: '8px',
                      backgroundColor: '#0F1426',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontSize: '12px',
                      outline: 'none',
                    }}
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#0F1426',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '12px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PAID">Paid (₹10)</option>
                  <option value="PENDING">Pending Payment</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div
              style={{
                backgroundColor: '#0F1426',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0B0F1F', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#94A3B8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '12px 16px' }}>Scan ID</th>
                    <th style={{ padding: '12px 16px' }}>Date</th>
                    <th style={{ padding: '12px 16px' }}>Language</th>
                    <th style={{ padding: '12px 16px' }}>Quality Score</th>
                    <th style={{ padding: '12px 16px' }}>Archetype</th>
                    <th style={{ padding: '12px 16px' }}>Payment</th>
                    <th style={{ padding: '12px 16px' }}>Status</th>
                    <th style={{ padding: '12px 16px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScans.map((scan) => (
                    <tr
                      key={scan.scanId}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        backgroundColor: selectedScan?.scanId === scan.scanId ? 'rgba(124, 58, 237, 0.12)' : 'transparent',
                      }}
                    >
                      <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#C4B5FD', fontWeight: 600 }}>
                        {scan.scanId}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#94A3B8', fontSize: '12px' }}>
                        {scan.date}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#fff' }}>
                        {scan.language}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ color: scan.imageQuality >= 0.85 ? '#10B981' : '#F59E0B', fontWeight: 600 }}>
                          {Math.round(scan.imageQuality * 100)}%
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: '#E2E8F0' }}>
                        {scan.archetype}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant={scan.paymentStatus === 'paid' ? 'emerald' : 'outline'}>
                          {scan.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Badge variant="subtle">{scan.readingStatus}</Badge>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedScan(scan)}
                          leftIcon={<Eye size={12} />}
                        >
                          Inspect
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scan Inspection Modal / Drawer */}
            {selectedScan && (
              <div
                style={{
                  marginTop: '20px',
                  backgroundColor: '#0F1426',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(139, 92, 246, 0.4)',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>
                      Scan Inspection: {selectedScan.scanId}
                    </h3>
                    <Badge variant={selectedScan.paymentStatus === 'paid' ? 'emerald' : 'outline'}>
                      {selectedScan.paymentStatus}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedScan(null)}
                  >
                    Close Inspection
                  </Button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div style={{ backgroundColor: '#0B0F1F', padding: '14px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Detected Lines</span>
                    <ul style={{ marginTop: '6px', listStyle: 'none', padding: 0, fontSize: '12px', color: '#CBD5E1' }}>
                      {selectedScan.linesDetected.map((l, i) => (
                        <li key={i} style={{ marginBottom: '4px' }}>✓ {l}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ backgroundColor: '#0B0F1F', padding: '14px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Vision Model Scoring</span>
                    <div style={{ marginTop: '6px', fontSize: '12px', color: '#CBD5E1', lineHeight: 1.6 }}>
                      <div>Quality Score: <strong>{Math.round(selectedScan.imageQuality * 100)}%</strong></div>
                      <div>Feature Confidence: <strong>{Math.round(selectedScan.featureConfidence * 100)}%</strong></div>
                      <div>Hand Detected: <strong style={{ color: '#10B981' }}>Yes (1 hand)</strong></div>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#0B0F1F', padding: '14px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>Reading Metadata</span>
                    <div style={{ marginTop: '6px', fontSize: '12px', color: '#CBD5E1', lineHeight: 1.6 }}>
                      <div>Language: <strong>{selectedScan.language}</strong></div>
                      <div>Archetype: <strong>{selectedScan.archetype}</strong></div>
                      <div>Price Charged: <strong>₹10.00</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: AI QUALITY CONTROL */}
        {activeTab === 'ai_quality' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                AI Reading Quality Control
              </h1>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                Review, validate, or flag readings for hallucination, inaccurate features, or language flaws.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {flaggedScans.map((scan) => (
                <div
                  key={scan.scanId}
                  style={{
                    backgroundColor: '#0F1426',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    borderRadius: '12px',
                    padding: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#C4B5FD', fontFamily: 'monospace' }}>
                        {scan.scanId}
                      </span>
                      <Badge variant="outline" style={{ borderColor: '#F59E0B', color: '#FBBF24' }}>
                        Flagged: {scan.qualityFlag || 'Quality Audit Required'}
                      </Badge>
                    </div>
                    <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                      Image quality score at 72% with borderline contrast. Verify if Head Line separation is genuinely grounded.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => alert(`Scan ${scan.scanId} approved with override.`)}
                      leftIcon={<CheckCircle2 size={14} />}
                    >
                      Approve Reading
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => alert(`Scan ${scan.scanId} scheduled for regeneration.`)}
                      leftIcon={<RefreshCw size={14} />}
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              ))}

              <div
                style={{
                  padding: '24px',
                  backgroundColor: '#0B0F1F',
                  borderRadius: '10px',
                  textAlign: 'center',
                  fontSize: '13px',
                  color: '#64748B',
                }}
              >
                No other readings require manual review. System quality score is at <strong>98.4%</strong>.
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KNOWLEDGE RULES */}
        {activeTab === 'rules' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                Knowledge Rules Engine
              </h1>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                Canonical rule matcher catalog connecting CV features to Samudrika Shastra and Western Chiromancy sources.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  id: 'samudrika-hridaya-jupiter-001',
                  tradition: 'INDIAN_SAMUDRIKA',
                  feature: 'HEART_LINE',
                  condition: 'length=LONG & curvature=CURVED & termination=JUPITER',
                  statement: 'Associates Jupiter termination with devotion, family honor (Dharma), and sincere fidelity.',
                  source: 'Brihat Samudrika Shastra, Prakarana V (Sage Garga)',
                },
                {
                  id: 'cheiro-head-moon-002',
                  tradition: 'CHEIRO_SYSTEM',
                  feature: 'HEAD_LINE',
                  condition: 'length=LONG & termination=MOUNT_MOON',
                  statement: 'Sloping toward Mount of Moon signifies fertile imaginative intellect and artistic discernment.',
                  source: "Cheiro's Language of the Hand (1894), p. 66",
                },
                {
                  id: 'samudrika-ayush-broad-venus-003',
                  tradition: 'INDIAN_SAMUDRIKA',
                  feature: 'LIFE_LINE',
                  condition: 'arc=WIDE & depth=DEEP',
                  statement: 'Broad sweep around Venus denotes abundant vital energy (Ojas) and recuperative resilience.',
                  source: 'Narada Samhita Recension, Prakarana II',
                },
              ].map((rule) => (
                <div
                  key={rule.id}
                  style={{
                    backgroundColor: '#0F1426',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#C4B5FD', fontFamily: 'monospace' }}>
                      {rule.id}
                    </span>
                    <Badge variant="subtle">{rule.tradition}</Badge>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
                    Condition: <span style={{ color: '#38BDF8', fontFamily: 'monospace' }}>{rule.condition}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '8px' }}>
                    {rule.statement}
                  </p>
                  <span style={{ fontSize: '11px', color: '#64748B' }}>
                    Source: {rule.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CLASSICAL SOURCES */}
        {activeTab === 'sources' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                Pre-1928 Classical Sources Registry
              </h1>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                Verified classical treatises establishing transparency and preventing AI hallucinations.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {[
                {
                  title: 'Cheiro’s Language of the Hand',
                  author: 'Cheiro (William John Warner)',
                  year: 1894,
                  tradition: 'Classical Western Chiromancy',
                  status: 'Public Domain (Pre-1928)',
                },
                {
                  title: 'Brihat Samudrika Shastra',
                  author: 'Sage Garga / Narada Tradition',
                  year: 1880,
                  tradition: 'Indian Vedic Samudrika Shastra',
                  status: 'Classical Sanskrit Source',
                },
                {
                  title: 'The Laws of Scientific Hand Reading',
                  author: 'William G. Benham',
                  year: 1900,
                  tradition: 'Analytical Western Chiromancy',
                  status: 'Public Domain (Pre-1928)',
                },
                {
                  title: 'Hasta Sanjivani',
                  author: 'Sage Bhrigu Tradition',
                  year: 1912,
                  tradition: 'Indian Samudrika Shastra',
                  status: 'Public Domain (Pre-1928)',
                },
              ].map((src, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#0F1426',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{src.tradition} • {src.year}</span>
                    <Badge variant="emerald">{src.status}</Badge>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                    {src.title}
                  </h4>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>Author: {src.author}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: FUNNEL ANALYTICS */}
        {activeTab === 'analytics' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>
                Funnel & Conversion Analytics
              </h1>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                Tracking customer transition through the 3-second comprehension journey.
              </p>
            </div>

            <div style={{ backgroundColor: '#0F1426', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { step: '1. Landing Page Visits', count: '10,240', rate: '100%' },
                  { step: '2. Scan Palm CTA Clicked', count: '4,812', rate: '47.0%' },
                  { step: '3. Palm Photograph Captured', count: '3,850', rate: '37.6%' },
                  { step: '4. Image Quality Passed', count: '3,540', rate: '34.6%' },
                  { step: '5. Free Preview Viewed', count: '3,540', rate: '34.6%' },
                  { step: '6. ₹10 Payment Completed', count: '2,820', rate: '27.5% (79.7% of previews)' },
                  { step: '7. Reading Card Shared', count: '940', rate: '9.2%' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#E2E8F0' }}>{row.step}</span>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ fontSize: '13px', color: '#C4B5FD', fontWeight: 700 }}>{row.count}</span>
                      <span style={{ fontSize: '12px', color: '#10B981', minWidth: '80px', textAlign: 'right' }}>{row.rate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
