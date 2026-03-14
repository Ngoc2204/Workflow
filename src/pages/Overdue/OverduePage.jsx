import React from 'react';
import { AlertTriangle, Calendar, FolderKanban, MoreVertical, CheckCircle } from 'lucide-react';
import './OverduePage.css';

const OVERDUE_TASKS = [
  {
    id: 't1',
    title: 'Thiết kế giao diện Dashboard và trang Đăng nhập',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    priority: 'high',
    dueDate: '2026-03-14',
    daysOverdue: Math.floor((new Date() - new Date('2026-03-14')) / 86400000),
  },
  {
    id: 't2',
    title: 'Fix lỗi hiển thị trên Safari iOS 17',
    project: 'Website E-commerce',
    projectColor: '#34d399',
    priority: 'high',
    dueDate: '2026-03-11',
    daysOverdue: Math.floor((new Date() - new Date('2026-03-11')) / 86400000),
  },
  {
    id: 't3',
    title: 'Cập nhật tài liệu API v2',
    project: 'Dev Portal',
    projectColor: '#f472b6',
    priority: 'medium',
    dueDate: '2026-03-12',
    daysOverdue: Math.floor((new Date() - new Date('2026-03-12')) / 86400000),
  },
];

export default function OverduePage() {
  const count = OVERDUE_TASKS.length;

  return (
    <div className="overdue-container">

      {/* Alert Banner */}
      {count > 0 && (
        <div className="overdue-alert-banner">
          <div className="overdue-alert-icon">
            <AlertTriangle size={20} />
          </div>
          <div className="overdue-alert-text">
            <span className="overdue-alert-title">
              Bạn có {count} công việc đã quá hạn!
            </span>
            <span className="overdue-alert-sub">
              Vui lòng xử lý ngay để tránh ảnh hưởng tiến độ dự án.
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="overdue-header">
        <div className="overdue-title-group">
          <h1 className="overdue-title">
            Quá hạn
            {count > 0 && <span className="overdue-count-badge">{count}</span>}
          </h1>
          <p className="overdue-subtitle">
            Các công việc đã vượt quá ngày kết thúc mà chưa hoàn thành.
          </p>
        </div>
      </div>

      {/* Task List */}
      {count === 0 ? (
        <div className="overdue-empty">
          <CheckCircle size={56} className="overdue-empty-icon" />
          <p className="overdue-empty-text">Không có task nào quá hạn! 🎉</p>
          <p className="overdue-empty-sub">Tất cả công việc đang được xử lý đúng hạn.</p>
        </div>
      ) : (
        OVERDUE_TASKS.map(task => (
          <div key={task.id} className="overdue-task-card">
            <div className="overdue-task-left">
              <p className="overdue-task-title">{task.title}</p>
              <div className="overdue-task-meta">
                <div className="overdue-meta-chip">
                  <span className="overdue-project-dot" style={{ background: task.projectColor }} />
                  {task.project}
                </div>
                <div className="overdue-meta-chip red">
                  <Calendar size={12} />
                  Hạn: {new Date(task.dueDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>

            <div className="overdue-task-right">
              {task.daysOverdue > 0 && (
                <span className="days-overdue-badge">
                  Trễ {task.daysOverdue} ngày
                </span>
              )}
              <span className={`priority-badge ${task.priority}`}>
                {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'TB' : 'Thấp'}
              </span>
              <button className="task-action-btn"><MoreVertical size={16} /></button>
            </div>
          </div>
        ))
      )}

    </div>
  );
}
