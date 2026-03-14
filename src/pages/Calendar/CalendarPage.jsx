import React, { useState } from 'react';
import {
  ChevronLeft, ChevronRight, CalendarDays, LayoutList,
  Plus, Clock, FolderKanban, Flag, AlertCircle
} from 'lucide-react';
import './CalendarPage.css';

/* ── Mock Events ── */
const EVENTS = [
  { id: 1, title: 'Dự án TaskFlow – Bắt đầu', date: '2026-03-01', type: 'project' },
  { id: 2, title: 'Hạn: Thiết kế ERD Database', date: '2026-03-20', type: 'deadline' },
  { id: 3, title: 'Hạn: Trang Login & Dashboard', date: '2026-03-14', type: 'overdue' },
  { id: 4, title: 'Hạn: Cấu hình Backend .NET', date: '2026-03-22', type: 'deadline' },
  { id: 5, title: 'Dự án E-commerce – Bắt đầu', date: '2026-04-01', type: 'project' },
  { id: 6, title: 'Hạn: Viết Unit Tests', date: '2026-03-25', type: 'deadline' },
  { id: 7, title: 'Sprint Review Meeting', date: '2026-03-15', type: 'project' },
  { id: 8, title: 'Hạn: Tài liệu API', date: '2026-03-12', type: 'overdue' },
  { id: 9, title: 'Hạn: Deploy Staging', date: '2026-03-28', type: 'deadline' },
  { id: 10, title: 'Kick-off Mobile App', date: '2026-03-18', type: 'project' },
  { id: 11, title: 'Code Review Session', date: '2026-03-13', type: 'project' },
];

const WEEK_EVENTS = [
  { id: 1, title: 'Sprint Review', dayIndex: 1, hour: 9, type: 'project' },
  { id: 2, title: 'Hạn: Dashboard', dayIndex: 1, hour: 11, type: 'overdue' },
  { id: 3, title: 'API Design Meeting', dayIndex: 2, hour: 14, type: 'project' },
  { id: 4, title: 'Hạn: ERD Database', dayIndex: 4, hour: 10, type: 'deadline' },
  { id: 5, title: 'Deploy Staging', dayIndex: 5, hour: 15, type: 'deadline' },
  { id: 6, title: 'Code Review', dayIndex: 3, hour: 13, type: 'project' },
];

const WEEK_HOURS = Array.from({ length: 14 }, (_, i) => i + 7);
const WEEKDAY_LABELS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const MONTH_NAMES = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
  'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

const TYPE_COLOR = { project: 'var(--accent)', deadline: '#f59e0b', overdue: '#ff5f57' };
const TYPE_ICON = { project: FolderKanban, deadline: Flag, overdue: AlertCircle };

/* ── Helpers ── */
const fmt = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const getWeekDates = (date) => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  return Array.from({ length: 7 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d; });
};

/* ── Month View ── */
function MonthView({ year, month, todayStr }) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--)     cells.push({ date: new Date(year, month - 1, prevMonthDays - i), cur: false });
  for (let d = 1; d <= daysInMonth; d++)     cells.push({ date: new Date(year, month, d), cur: true });
  while (cells.length < 42) cells.push({ date: new Date(year, month + 1, cells.length - firstDay - daysInMonth + 1), cur: false });

  return (
    <div className="month-grid-wrapper">
      <div className="month-weekdays">
        {WEEKDAY_LABELS.map((wd, i) => (
          <div key={wd} className={`month-weekday${i === 0 || i === 6 ? ' weekend' : ''}`}>{wd}</div>
        ))}
      </div>
      <div className="month-days-grid">
        {cells.map(({ date, cur }, idx) => {
          const ds = fmt(date);
          const evs = EVENTS.filter(e => e.date === ds);
          const isToday = ds === todayStr;
          return (
            <div key={idx} className={`month-day-cell${!cur ? ' other-month' : ''}${isToday ? ' today' : ''}`}>
              <span className="day-number">{date.getDate()}</span>
              <div className="day-events">
                {evs.slice(0, 2).map(ev => (
                  <div key={ev.id} className={`day-event-chip ${ev.type}`} title={ev.title}>{ev.title}</div>
                ))}
                {evs.length > 2 && <span className="day-more">+{evs.length - 2} khác</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Week View ── */
function WeekView({ currentDate, todayStr }) {
  const weekDates = getWeekDates(currentDate);
  return (
    <div className="week-grid-wrapper">
      <div className="week-header-row">
        <div className="week-time-gutter" />
        {weekDates.map((d, i) => (
          <div key={i} className={`week-day-header${fmt(d) === todayStr ? ' today' : ''}`}>
            <div className="week-day-name">{WEEKDAY_LABELS[i]}</div>
            <div className="week-day-date">{d.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="week-body">
        <div className="week-time-column">
          {WEEK_HOURS.map(h => (
            <div key={h} className="week-time-slot-label">{h}:00</div>
          ))}
        </div>
        {weekDates.map((_, di) => (
          <div key={di} className="week-day-column">
            {WEEK_HOURS.map(h => {
              const slotEvs = WEEK_EVENTS.filter(e => e.dayIndex === di && e.hour === h);
              return (
                <div key={h} className="week-time-slot">
                  {slotEvs.map(ev => (
                    <div key={ev.id} className={`week-event-block ${ev.type}`}>{ev.title}</div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sidebar ── */
function CalendarSidebar() {
  const sorted = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 6);
  const totalDeadlines = EVENTS.filter(e => e.type === 'deadline').length;
  const totalOverdue = EVENTS.filter(e => e.type === 'overdue').length;

  return (
    <div className="calendar-sidebar">
      {/* Mini stats */}
      <div className="sidebar-stats">
        <div className="sidebar-stat-card">
          <div className="sidebar-stat-value" style={{ color: '#f59e0b' }}>{totalDeadlines}</div>
          <div className="sidebar-stat-label">Deadline</div>
        </div>
        <div className="sidebar-stat-card">
          <div className="sidebar-stat-value" style={{ color: '#ff7070' }}>{totalOverdue}</div>
          <div className="sidebar-stat-label">Quá hạn</div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="sidebar-upcoming">
        <div className="sidebar-upcoming-header">
          <Clock size={13} /> Sắp tới
        </div>
        <div className="upcoming-event-list">
          {sorted.map(ev => {
            const Icon = TYPE_ICON[ev.type];
            return (
              <div key={ev.id} className="upcoming-event-item">
                <div className="upcoming-event-color-bar" style={{ background: TYPE_COLOR[ev.type] }} />
                <div className="upcoming-event-info">
                  <div className="upcoming-event-title">{ev.title}</div>
                  <div className="upcoming-event-date" style={{ color: TYPE_COLOR[ev.type] }}>
                    <Icon size={11} />
                    {new Date(ev.date).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Main ── */
export default function CalendarPage() {
  const today = new Date();
  const todayStr = fmt(today);
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(today));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goBack = () => {
    const d = new Date(currentDate);
    view === 'month' ? d.setMonth(d.getMonth() - 1) : d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };
  const goForward = () => {
    const d = new Date(currentDate);
    view === 'month' ? d.setMonth(d.getMonth() + 1) : d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };
  const goToday = () => setCurrentDate(new Date(today));

  const getLabel = () => {
    if (view === 'month') return `${MONTH_NAMES[month]}, ${year}`;
    const wd = getWeekDates(currentDate);
    return `${wd[0].getDate()} – ${wd[6].getDate()} ${MONTH_NAMES[wd[6].getMonth()]}, ${wd[6].getFullYear()}`;
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="calendar-title-group">
          <h1 className="calendar-title">Lịch biểu</h1>
          <p className="calendar-subtitle">Theo dõi tiến độ dự án và deadline công việc.</p>
        </div>
        <div className="calendar-header-actions">
          <button className="primary-btn">
            <Plus size={15} strokeWidth={2.5} />
            Thêm sự kiện
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="calendar-toolbar">
        <div className="calendar-nav">
          <button className="cal-nav-btn" onClick={goBack}><ChevronLeft size={15} /></button>
          <span className="calendar-current-label">{getLabel()}</span>
          <button className="cal-nav-btn" onClick={goForward}><ChevronRight size={15} /></button>
          <button className="today-btn" onClick={goToday}>Hôm nay</button>
        </div>

        <div className="view-toggle">
          <button className={`view-toggle-btn${view === 'month' ? ' active' : ''}`} onClick={() => setView('month')}>
            <CalendarDays size={14} /> Tháng
          </button>
          <button className={`view-toggle-btn${view === 'week' ? ' active' : ''}`} onClick={() => setView('week')}>
            <LayoutList size={14} /> Tuần
          </button>
        </div>

        <div className="calendar-legend">
          <div className="legend-item"><span className="legend-dot project" />  Dự án</div>
          <div className="legend-item"><span className="legend-dot deadline" /> Deadline</div>
          <div className="legend-item"><span className="legend-dot overdue" />  Quá hạn</div>
        </div>
      </div>

      {/* Body */}
      <div className="calendar-layout">
        <div className="calendar-main">
          {view === 'month'
            ? <MonthView year={year} month={month} todayStr={todayStr} />
            : <WeekView currentDate={currentDate} todayStr={todayStr} />
          }
        </div>
        <CalendarSidebar />
      </div>
    </div>
  );
}