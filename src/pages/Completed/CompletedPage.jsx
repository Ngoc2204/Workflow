import React from 'react';
import { CheckCircle, Calendar, FolderKanban, MoreVertical, Trophy, Clock, List } from 'lucide-react';
import './CompletedPage.css';

const COMPLETED_TASKS = [
  {
    id: 'c1',
    title: 'Khởi tạo project React với Vite & cấu hình Tailwind CSS',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    priority: 'medium',
    dueDate: '2026-03-10',
    completedDate: '2026-03-09',
  },
  {
    id: 'c2',
    title: 'Phân tích yêu cầu hệ thống và thiết kế kiến trúc',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    priority: 'high',
    dueDate: '2026-03-08',
    completedDate: '2026-03-07',
  },
  {
    id: 'c3',
    title: 'Xây dựng màn hình đăng nhập với animation',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    priority: 'high',
    dueDate: '2026-03-12',
    completedDate: '2026-03-11',
  },
  {
    id: 'c4',
    title: 'Hoàn thành tài liệu thiết kế UI/UX cho dự án',
    project: 'Website E-commerce',
    projectColor: '#34d399',
    priority: 'medium',
    dueDate: '2026-03-06',
    completedDate: '2026-03-05',
  },
  {
    id: 'c5',
    title: 'Deploy ứng dụng lên môi trường Staging',
    project: 'Mobile App',
    projectColor: '#f472b6',
    priority: 'low',
    dueDate: '2026-03-13',
    completedDate: '2026-03-13',
  },
];

export default function CompletedPage() {
  const total = COMPLETED_TASKS.length;
  const thisWeek = COMPLETED_TASKS.filter(t => {
    const d = new Date(t.completedDate);
    const now = new Date();
    const diff = (now - d) / 86400000;
    return diff <= 7;
  }).length;

  return (
    <div className="completed-container">

      {/* Header */}
      <div className="completed-header">
        <div className="completed-title-group">
          <h1 className="completed-title">
            Đã hoàn thành
            <span className="completed-count-badge">{total}</span>
          </h1>
          <p className="completed-subtitle">
            Lịch sử các công việc đã xử lý xong của bạn.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="completed-stats">
        <div className="completed-stat-card">
          <div className="completed-stat-icon green"><CheckCircle size={18} /></div>
          <div className="completed-stat-value">{total}</div>
          <div className="completed-stat-label">Tổng đã hoàn thành</div>
        </div>
        <div className="completed-stat-card">
          <div className="completed-stat-icon blue"><Clock size={18} /></div>
          <div className="completed-stat-value">{thisWeek}</div>
          <div className="completed-stat-label">Tuần này</div>
        </div>
        <div className="completed-stat-card">
          <div className="completed-stat-icon yellow"><Trophy size={18} /></div>
          <div className="completed-stat-value">
            {total > 0 ? Math.round((total / (total + 3)) * 100) : 0}%
          </div>
          <div className="completed-stat-label">Tỷ lệ hoàn thành</div>
        </div>
      </div>

      {/* Section */}
      <div className="completed-section-title">
        <List size={14} />
        Danh sách
        <div className="completed-section-divider" />
      </div>

      {/* Task Cards */}
      {total === 0 ? (
        <div className="completed-empty">
          <CheckCircle size={48} className="completed-empty-icon" />
          <p className="completed-empty-text">Chưa có task nào hoàn thành</p>
          <p className="completed-empty-sub">Hãy bắt đầu làm việc và đánh dấu hoàn thành nhé!</p>
        </div>
      ) : (
        COMPLETED_TASKS.map(task => (
          <div key={task.id} className="completed-task-card">
            <div className="completed-check-icon">
              <CheckCircle size={14} />
            </div>

            <div className="completed-task-left">
              <p className="completed-task-title">{task.title}</p>
              <div className="completed-task-meta">
                <div className="completed-meta-chip">
                  <span className="completed-project-dot" style={{ background: task.projectColor }} />
                  {task.project}
                </div>
                <div className="completed-meta-chip green">
                  <CheckCircle size={11} />
                  Xong: {new Date(task.completedDate).toLocaleDateString('vi-VN')}
                </div>
                <div className="completed-meta-chip">
                  <Calendar size={11} />
                  Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>

            <div className="completed-task-right">
              <button className="task-action-btn"><MoreVertical size={16} /></button>
            </div>
          </div>
        ))
      )}

    </div>
  );
}
