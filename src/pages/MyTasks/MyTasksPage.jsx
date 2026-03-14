import React, { useState } from 'react';
import {
  CheckCircle,
  Calendar,
  FolderKanban,
  MoreVertical,
  Plus,
  Filter,
  ArrowDownUp,
  Clock,
  CheckSquare,
  AlertCircle,
} from 'lucide-react';
import './MyTasksPage.css';

// ─── Mock Data ───
const TASKS = [
  {
    id: 't1',
    title: 'Thiết kế giao diện Dashboard và trang Đăng nhập',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    status: 'doing',
    priority: 'high',
    dueDate: '2026-03-14',
    isOverdue: true,
    done: false,
  },
  {
    id: 't2',
    title: 'Phát triển Sidebar và Topbar component',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    status: 'doing',
    priority: 'high',
    dueDate: '2026-03-15',
    done: false,
  },
  {
    id: 't3',
    title: 'Thiết kế màn hình Kanban Board',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-03-20',
    done: false,
  },
  {
    id: 't4',
    title: 'Xây dựng trang Lịch biểu (Month / Week view)',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-03-22',
    done: false,
  },
  {
    id: 't5',
    title: 'Tối ưu hóa responsive trên mobile',
    project: 'Website E-commerce',
    projectColor: '#34d399',
    status: 'todo',
    priority: 'low',
    dueDate: '2026-03-25',
    done: false,
  },
  {
    id: 't6',
    title: 'Khởi tạo project React với Vite & cấu hình Tailwind CSS',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    status: 'done',
    priority: 'medium',
    dueDate: '2026-03-10',
    done: true,
  },
  {
    id: 't7',
    title: 'Phân tích yêu cầu hệ thống và thiết kế ERD database',
    project: 'TaskFlow Internal',
    projectColor: '#7c6dfa',
    status: 'done',
    priority: 'high',
    dueDate: '2026-03-08',
    done: true,
  },
  {
    id: 't8',
    title: 'Tạo tài khoản test và cấu hình môi trường CI/CD',
    project: 'Website E-commerce',
    projectColor: '#34d399',
    status: 'done',
    priority: 'low',
    dueDate: '2026-03-12',
    isOverdue: true,
    done: true,
  },
];

const TABS = [
  { id: 'all', label: 'Tất cả', icon: CheckSquare },
  { id: 'todo', label: 'Chưa bắt đầu', icon: Clock },
  { id: 'doing', label: 'Đang làm', icon: FolderKanban },
  { id: 'done', label: 'Hoàn thành', icon: CheckCircle },
  { id: 'overdue', label: 'Quá hạn', icon: AlertCircle },
];

const STATUS_COLOR = {
  todo: 'var(--text-3)',
  doing: '#f59e0b',
  done: 'var(--green)',
};

const STATUS_LABEL = {
  todo: 'Chưa bắt đầu',
  doing: 'Đang thực hiện',
  done: 'Hoàn thành',
};

function TaskCard({ task, onToggle }) {
  const dateLabel = new Date(task.dueDate).toLocaleDateString('vi-VN');
  return (
    <div
      className={`task-card status-${task.status}${task.isOverdue && !task.done ? ' overdue' : ''}`}
    >
      {/* Left */}
      <div className="task-card-left">
        <div
          className={`task-checkbox${task.done ? ' checked' : ''}`}
          onClick={() => onToggle(task.id)}
          role="checkbox"
          aria-checked={task.done}
        >
          {task.done && <CheckCircle size={13} />}
        </div>

        <div className="task-body">
          <p className={`task-card-title${task.done ? ' done-text' : ''}`}>
            {task.title}
          </p>
          <div className="task-card-meta">
            <div className="meta-chip">
              <span
                className="meta-project-dot"
                style={{ background: task.projectColor }}
              />
              {task.project}
            </div>
            <div className={`meta-chip${task.isOverdue && !task.done ? ' overdue' : ''}`}>
              <Calendar size={12} />
              {task.isOverdue && !task.done ? `Quá hạn: ` : `Hạn: `}
              {dateLabel}
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="task-card-right">
        <span className={`priority-badge ${task.priority}`}>
          {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'TB' : 'Thấp'}
        </span>
        <button className="task-action-btn">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [tasks, setTasks] = useState(TASKS);

  const handleToggle = (id) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, done: !t.done, status: !t.done ? 'done' : 'todo' }
          : t
      )
    );
  };

  // Filter
  const filtered = tasks.filter(t => {
    if (activeTab === 'all') return true;
    if (activeTab === 'overdue') return t.isOverdue && !t.done;
    return t.status === activeTab;
  });

  // Count per tab
  const counts = {
    all: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    done: tasks.filter(t => t.status === 'done').length,
    overdue: tasks.filter(t => t.isOverdue && !t.done).length,
  };

  // Group by status when "all" is selected
  const grouped =
    activeTab === 'all'
      ? ['doing', 'todo', 'done'].map(s => ({
          status: s,
          items: filtered.filter(t => t.status === s),
        })).filter(g => g.items.length > 0)
      : [{ status: activeTab, items: filtered }];

  return (
    <div className="mytasks-container">
      {/* Header */}
      <div className="mytasks-header">
        <div className="mytasks-title-group">
          <h1 className="mytasks-title">Việc của tôi</h1>
          <p className="mytasks-subtitle">
            Danh sách các task được giao cho bạn trong tất cả dự án.
          </p>
        </div>
        <div className="mytasks-actions">
          <button className="secondary-btn">
            <Filter size={15} />
            Bộ lọc
          </button>
          <button className="primary-btn">
            <Plus size={16} strokeWidth={2.5} />
            Thêm task
          </button>
        </div>
      </div>

      {/* Toolbar: Tab Filters + Sort */}
      <div className="mytasks-toolbar">
        <div className="filter-tab-list">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`filter-tab${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={14} strokeWidth={2} />
                {tab.label}
                <span className="filter-tab-count">{counts[tab.id]}</span>
              </button>
            );
          })}
        </div>

        <select className="task-sort-select">
          <option value="due">Sắp xếp: Hạn chót</option>
          <option value="priority">Sắp xếp: Ưu tiên</option>
          <option value="project">Sắp xếp: Dự án</option>
        </select>
      </div>

      {/* Task Groups */}
      {grouped.length === 0 ? (
        <div className="tasks-empty">
          <CheckCircle size={48} className="tasks-empty-icon" />
          <p className="tasks-empty-text">Không có task nào</p>
          <p className="tasks-empty-sub">
            {activeTab === 'done'
              ? 'Bạn chưa hoàn thành task nào.'
              : 'Tất cả công việc đã được xử lý xong!'}
          </p>
        </div>
      ) : (
        grouped.map(group => (
          <div key={group.status} className="task-group">
            {/* Group Header (only if showing All) */}
            {activeTab === 'all' && (
              <div className="task-group-header">
                <span
                  className="task-group-indicator"
                  style={{ background: STATUS_COLOR[group.status] }}
                />
                <span className="task-group-label">{STATUS_LABEL[group.status]}</span>
                <span className="task-group-count">{group.items.length}</span>
                <div className="task-group-divider" />
              </div>
            )}

            {/* Task Cards */}
            {group.items.map(task => (
              <TaskCard key={task.id} task={task} onToggle={handleToggle} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
