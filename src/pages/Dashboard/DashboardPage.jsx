import React, { useState } from 'react';
import {
  CheckSquare, Clock, CheckCircle, BarChart2,
  TrendingUp, TrendingDown, MoreVertical,
  Calendar, Filter, ArrowRight, Plus, Zap
} from 'lucide-react';
import './DashboardPage.css';

/* ── Mock Data ── */
const stats = [
  { id: 1, title: 'Tổng công việc', value: '124', icon: BarChart2, colorClass: 'blue', trend: '+12%', trendType: 'positive' },
  { id: 2, title: 'Đang thực hiện', value: '45', icon: CheckSquare, colorClass: 'orange', trend: '+5%', trendType: 'positive' },
  { id: 3, title: 'Quá hạn', value: '8', icon: Clock, colorClass: 'purple', trend: '-2', trendType: 'neutral' },
  { id: 4, title: 'Đã hoàn thành', value: '71', icon: CheckCircle, colorClass: 'green', trend: '+18%', trendType: 'positive' },
];

const recentTasks = [
  { id: 1, name: 'Thiết kế giao diện Dashboard', project: 'TaskFlow Internal', dotColor: '#7c6dfa', dueDate: '2026-03-15', status: 'doing', priority: 'high' },
  { id: 2, name: 'Tối ưu hóa Database Queries', project: 'Backend API', dotColor: '#3b82f6', dueDate: '2026-03-13', status: 'doing', priority: 'medium' },
  { id: 3, name: 'Cập nhật tài liệu API', project: 'Dev Portal', dotColor: '#34d399', dueDate: '2026-03-12', status: 'todo', priority: 'low', isOverdue: true },
  { id: 4, name: 'Fix bug đăng nhập trên Safari', project: 'TaskFlow Internal', dotColor: '#7c6dfa', dueDate: '2026-03-10', status: 'done', priority: 'high' },
];

const activities = [
  { id: 1, text: <><strong>Minh Anh</strong> đã hoàn thành "Thiết kế màn Login"</>, time: '5 phút trước', color: '#34d399' },
  { id: 2, text: <><strong>Tuấn Kiệt</strong> bình luận trong "Tối ưu API Response"</>, time: '22 phút trước', color: '#7c6dfa' },
  { id: 3, text: <><strong>Hoàng Long</strong> tạo dự án mới "Mobile App v2"</>, time: '1 giờ trước', color: '#f59e0b' },
  { id: 4, text: <><strong>Admin</strong> đã giao việc cho Minh Anh</>, time: '2 giờ trước', color: '#3b82f6' },
  { id: 5, text: <><strong>Tuấn Kiệt</strong> đã cập nhật deadline "Backend API"</>, time: '3 giờ trước', color: '#ff7070' },
];

/* ── Helpers ── */
const statusDot = (status) => {
  if (status === 'todo') return <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#5a5a6e' }} />;
  if (status === 'doing') return <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />;
  if (status === 'done') return <CheckCircle size={14} />;
  return null;
};

const priorityLabel = { high: 'Cao', medium: 'TB', low: 'Thấp' };

/* ── Progress Ring SVG ── */
function ProgressRing({ pct = 57, size = 96, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="url(#ring-grad)" strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
      <defs>
        <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c6dfa" />
          <stop offset="100%" stopColor="#a99fff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Component ── */
export default function DashboardPage() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? recentTasks : recentTasks.slice(0, 3);

  return (
    <div className="dashboard-container">

      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title-group">
          <h1 className="dashboard-title">Tổng quan</h1>
          <p className="dashboard-subtitle">Theo dõi tiến độ và hiệu suất công việc của bạn.</p>
        </div>
        <div className="dashboard-actions">
          <button className="secondary-btn">
            <Filter size={15} /> Bộ lọc
          </button>
          <button className="secondary-btn">
            <Calendar size={15} /> Hôm nay
          </button>
          <button className="primary-btn">
            <Plus size={15} /> Tạo việc
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map(({ id, title, value, icon: Icon, colorClass, trend, trendType }) => (
          <div key={id} className={`stat-card ${colorClass}`}>
            <div className="stat-info">
              <span className="stat-title">{title}</span>
              <span className="stat-value">{value}</span>
              <div className={`stat-trend ${trendType}`}>
                {trendType === 'positive' && <TrendingUp size={13} />}
                {trendType === 'negative' && <TrendingDown size={13} />}
                <span>{trend} so với tháng trước</span>
              </div>
            </div>
            <div className="stat-icon-wrapper">
              <Icon size={22} strokeWidth={2} />
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-col grid */}
      <div className="dashboard-main-grid">

        {/* Tasks */}
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Công việc gần đây</h2>
            <a href="#" className="view-all-link">Xem tất cả <ArrowRight size={13} /></a>
          </div>

          <div className="task-list">
            {visible.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-main">
                  <div className={`task-status-icon ${task.status}`}>
                    {statusDot(task.status)}
                  </div>
                  <div className="task-details">
                    <span className={`task-name${task.status === 'done' ? ' completed' : ''}`}>
                      {task.name}
                    </span>
                    <div className="task-meta">
                      <div className="task-project">
                        <div className="task-project-dot" style={{ '--dot-color': task.dotColor }} />
                        <span>{task.project}</span>
                      </div>
                      <span>·</span>
                      <div className={`task-due${task.isOverdue ? ' overdue' : ''}`}>
                        <Calendar size={11} />
                        <span>
                          {task.isOverdue ? 'Quá hạn: ' : 'Hạn: '}
                          {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="task-right">
                  <span className={`task-priority ${task.priority}`}>{priorityLabel[task.priority]}</span>
                  <button className="task-menu-btn"><MoreVertical size={15} /></button>
                </div>
              </div>
            ))}

            <button className="task-load-more" onClick={() => setShowAll(v => !v)}>
              {showAll ? 'Thu gọn' : 'Xem thêm công việc'}
              <ArrowRight size={14} style={{ transform: showAll ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Progress ring */}
          <div className="progress-ring-wrapper">
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ProgressRing pct={57} />
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div className="progress-ring-value">57%</div>
              </div>
            </div>
            <div className="progress-ring-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={13} color="#f59e0b" /> Tiến độ tháng này
            </div>
            <div className="progress-ring-sub">71 / 124 công việc hoàn thành</div>
          </div>

          {/* Activity feed */}
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">Hoạt động</h2>
            </div>
            <div className="activity-feed">
              {activities.map((a) => (
                <div key={a.id} className="activity-item">
                  <div className="activity-dot-col">
                    <div className="activity-dot" style={{ '--dot-color': a.color, background: a.color }} />
                    <div className="activity-line" />
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">{a.text}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}