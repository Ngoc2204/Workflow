import React, { useState } from 'react';
import { 
  Kanban, 
  LayoutList, 
  Plus, 
  Filter, 
  MoreHorizontal,
  Calendar,
  MessageCircle,
  Paperclip,
  ChevronRight,
  UserPlus,
  X,
  Flag
} from 'lucide-react';
import './KanbanBoard.css';

// ─── Mock Data ───
const PROJECT = {
  id: 1,
  name: 'TaskFlow Internal',
  description: 'Hệ thống quản lý công việc nội bộ',
  members: [
    { id: 1, name: 'Admin', avatar: 'AD', color: '#7c6dfa' },
    { id: 2, name: 'Tri', avatar: 'TR', color: '#34d399' },
    { id: 3, name: 'Hieu', avatar: 'HI', color: '#f59e0b' },
    { id: 4, name: 'Ngoc', avatar: 'NG', color: '#f472b6' },
  ]
};

const INITIAL_COLUMNS = [
  {
    id: 'todo',
    label: 'Chưa bắt đầu',
    colorClass: 'todo',
    tasks: [
      {
        id: 't1',
        title: 'Thiết kế ERD Database và phân tích nghiệp vụ',
        priority: 'high',
        dueDate: '2026-03-20',
        comments: 5,
        attachments: 2,
        assignees: [{ id: 1, avatar: 'AD', color: '#7c6dfa' }]
      },
      {
        id: 't2',
        title: 'Khởi tạo project .NET BackEnd và cấu hình môi trường',
        priority: 'medium',
        dueDate: '2026-03-22',
        comments: 2,
        attachments: 0,
        assignees: [{ id: 2, avatar: 'TR', color: '#34d399' }, { id: 3, avatar: 'HI', color: '#f59e0b' }]
      },
      {
        id: 't3',
        title: 'Viết unit tests cho Auth service',
        priority: 'low',
        dueDate: '2026-03-25',
        comments: 0,
        attachments: 1,
        assignees: [{ id: 3, avatar: 'HI', color: '#f59e0b' }]
      }
    ]
  },
  {
    id: 'doing',
    label: 'Đang thực hiện',
    colorClass: 'doing',
    tasks: [
      {
        id: 't4',
        title: 'Phát triển trang Login, Dashboard và Sidebar layout',
        priority: 'high',
        dueDate: '2026-03-14',
        isOverdue: true,
        comments: 12,
        attachments: 3,
        assignees: [{ id: 1, avatar: 'AD', color: '#7c6dfa' }, { id: 4, avatar: 'NG', color: '#f472b6' }]
      },
      {
        id: 't5',
        title: 'Tích hợp React Router và cấu hình routing bảo vệ',
        priority: 'medium',
        dueDate: '2026-03-15',
        comments: 3,
        attachments: 0,
        assignees: [{ id: 2, avatar: 'TR', color: '#34d399' }]
      }
    ]
  },
  {
    id: 'done',
    label: 'Hoàn thành',
    colorClass: 'done',
    tasks: [
      {
        id: 't6',
        title: 'Khởi tạo project React với Vite và cấu hình Tailwind CSS',
        priority: 'medium',
        dueDate: '2026-03-10',
        comments: 7,
        attachments: 1,
        assignees: [{ id: 1, avatar: 'AD', color: '#7c6dfa' }]
      },
      {
        id: 't7',
        title: 'Phân tích yêu cầu hệ thống và thiết kế kiến trúc',
        priority: 'high',
        dueDate: '2026-03-05',
        comments: 14,
        attachments: 5,
        assignees: [{ id: 1, avatar: 'AD', color: '#7c6dfa' }, { id: 2, avatar: 'TR', color: '#34d399' }, { id: 3, avatar: 'HI', color: '#f59e0b' }]
      }
    ]
  }
];

// ─── Sub Components ───
function KanbanCard({ task }) {
  return (
    <div className="kanban-card">
      {/* Labels / Priority */}
      <div className="kanban-card-labels">
        <span className={`card-label ${task.priority}`}>
          {task.priority === 'high' ? 'Ưu tiên cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
        </span>
      </div>

      {/* Title */}
      <p className="kanban-card-title">{task.title}</p>

      {/* Due Date */}
      <div className="kanban-card-meta">
        <div className={`card-date ${task.isOverdue ? 'overdue' : ''}`}>
          <Calendar size={12} />
          <span>{new Date(task.dueDate).toLocaleDateString('vi-VN')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="kanban-card-footer">
        <div className="card-stats">
          <div className="card-stat-item"><MessageCircle size={13} /><span>{task.comments}</span></div>
          <div className="card-stat-item"><Paperclip size={13} /><span>{task.attachments}</span></div>
        </div>
        <div className="card-assignees">
          {task.assignees.map(a => (
            <div
              key={a.id}
              className="card-assignee-avatar"
              title={a.avatar}
              style={{ background: a.color + '30', color: a.color }}
            >
              {a.avatar}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ column, onAddTask }) {
  return (
    <div className="kanban-column">
      {/* Column Header */}
      <div className="kanban-column-header">
        <div className="column-title-wrapper">
          <span className={`column-color-dot ${column.colorClass}`} />
          <span className="column-title">{column.label}</span>
          <span className="column-count">{column.tasks.length}</span>
        </div>
        <button className="column-more-btn"><MoreHorizontal size={16} /></button>
      </div>

      {/* Cards */}
      <div className="kanban-cards-container">
        {column.tasks.map(task => (
          <KanbanCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add Task */}
      <div style={{ padding: '0 16px 16px' }}>
        <button className="add-task-btn" onClick={() => onAddTask(column.id)}>
          <Plus size={16} />
          Thêm task
        </button>
      </div>
    </div>
  );
}

// ─── Task List View ───
function TaskListView({ columns }) {
  const allTasks = columns.flatMap(col => col.tasks.map(t => ({ ...t, columnId: col.id, columnLabel: col.label })));
  return (
    <div className="task-list-view">
      <div className="task-list-header">
        <span>Tên task</span>
        <span>Trạng thái</span>
        <span>Ưu tiên</span>
        <span>Hạn chót</span>
        <span>Người thực hiện</span>
      </div>
      {allTasks.map(task => (
        <div key={task.id} className="task-list-row">
          <div className="row-cell-main">
            <span className="row-task-title">{task.title}</span>
            <span className="row-task-id"># {task.id.toUpperCase()}</span>
          </div>
          <div>
            <span className={`status-badge ${task.columnId}`}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
              {task.columnLabel}
            </span>
          </div>
          <div>
            <span className={`card-label ${task.priority}`}>
              {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
            </span>
          </div>
          <div className={`card-date ${task.isOverdue ? 'overdue' : ''}`} style={{ width: 'fit-content' }}>
            <Calendar size={12} />
            <span>{new Date(task.dueDate).toLocaleDateString('vi-VN')}</span>
          </div>
          <div className="card-assignees">
            {task.assignees.map(a => (
              <div
                key={a.id}
                className="card-assignee-avatar"
                style={{ background: a.color + '30', color: a.color }}
              >{a.avatar}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Add Task Modal ───
function AddTaskModal({ isOpen, onClose, columnId }) {
  const [form, setForm] = useState({ title: '', priority: 'medium', dueDate: '' });
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div className="modal-header">
          <h2 className="modal-title">Thêm task mới</h2>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); console.log('Create task', form, 'in', columnId); onClose(); }}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Tiêu đề task *</label>
              <input className="form-input" placeholder="Mô tả ngắn gọn công việc..." required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Ưu tiên</label>
                <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Hạn chót</label>
                <input type="date" className="form-input" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>Hủy</button>
            <button type="submit" className="primary-btn"><Plus size={16} />Tạo task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Component ───
export default function KanbanBoard() {
  const [view, setView] = useState('kanban'); // 'kanban' | 'list'
  const [addTaskModal, setAddTaskModal] = useState({ open: false, columnId: null });

  return (
    <div className="project-detail-container">
      {/* Header */}
      <div className="project-detail-header">
        <div className="breadcrumb">
          <a href="/projects" className="breadcrumb-link">Dự án</a>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{PROJECT.name}</span>
        </div>

        <div className="project-detail-title-group">
          <div>
            <h1 className="project-detail-title">{PROJECT.name}</h1>
            <p className="project-detail-desc">
              <span className="project-detail-meta-item">
                <Flag size={14} />
                {PROJECT.description}
              </span>
            </p>
          </div>

          <div className="project-detail-actions">
            {/* Member Avatars */}
            <div className="members-group">
              {PROJECT.members.map(m => (
                <div
                  key={m.id}
                  className="member-avatar"
                  title={m.name}
                  style={{ background: m.color + '25', color: m.color }}
                >{m.avatar}</div>
              ))}
              <div className="member-avatar add-btn" title="Thêm thành viên">
                <UserPlus size={14} />
              </div>
            </div>

            <button className="primary-btn" onClick={() => setAddTaskModal({ open: true, columnId: 'todo' })}>
              <Plus size={18} strokeWidth={2.5} />
              Thêm task
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar / Tab Switcher */}
      <div className="project-toolbar">
        <div className="view-tabs">
          <button
            className={`view-tab-btn ${view === 'kanban' ? 'active' : ''}`}
            onClick={() => setView('kanban')}
          >
            <Kanban size={16} />
            Kanban
          </button>
          <button
            className={`view-tab-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
          >
            <LayoutList size={16} />
            Danh sách
          </button>
        </div>
        <div className="filter-group">
          <button className="filter-btn">
            <Filter size={14} />
            Bộ lọc
          </button>
        </div>
      </div>

      {/* Board Content */}
      {view === 'kanban' ? (
        <div className="kanban-board">
          {INITIAL_COLUMNS.map(col => (
            <KanbanColumn
              key={col.id}
              column={col}
              onAddTask={(colId) => setAddTaskModal({ open: true, columnId: colId })}
            />
          ))}
        </div>
      ) : (
        <TaskListView columns={INITIAL_COLUMNS} />
      )}

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={addTaskModal.open}
        columnId={addTaskModal.columnId}
        onClose={() => setAddTaskModal({ open: false, columnId: null })}
      />
    </div>
  );
}
