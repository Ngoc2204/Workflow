import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ROLE_LABEL = { admin: 'Quản trị viên', leader: 'Trưởng nhóm', member: 'Thành viên' };
import {
  LayoutDashboard,
  CheckSquare,
  Clock,
  CheckCircle,
  FolderKanban,
  CalendarDays,
  Settings,
  LogOut,
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { id: 'dashboard', label: 'Tổng quan', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'my-tasks', label: 'Việc của tôi', icon: CheckSquare, path: '/tasks/my-tasks', badge: '4', badgeType: 'accent' },
  { id: 'overdue', label: 'Quá hạn', icon: Clock, path: '/tasks/overdue', badge: '2' },
  { id: 'completed', label: 'Đã hoàn thành', icon: CheckCircle, path: '/tasks/completed' },
];

const projectItems = [
  { id: 'projects', label: 'Quản lý dự án', icon: FolderKanban, path: '/projects' },
  { id: 'calendar', label: 'Lịch biểu', icon: CalendarDays, path: '/calendar' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay${isOpen ? ' show' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar${isOpen ? ' open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-content">
            <img
              src="/logo.png"
              alt="TaskFlow Logo"
              className="sidebar-logo-img"
            />
            <span className="sidebar-title">TaskFlow</span>
          </div>
        </div>

        <div className="sidebar-menu-wrapper">
          {/* Công Việc */}
          <section>
            <h3 className="sidebar-section-title">Công Việc</h3>
            <ul className="sidebar-nav-list">
              {navItems.map(({ id, label, icon: Icon, path, badge, badgeType }) => (
                <li key={id}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon size={17} strokeWidth={2} className="nav-icon" />
                    {label}
                    {badge && (
                      <span className={`sidebar-nav-badge${badgeType ? ` ${badgeType}` : ''}`}>
                        {badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>

          {/* Dự Án */}
          <section>
            <h3 className="sidebar-section-title">Dự Án & Thời Gian</h3>
            <ul className="sidebar-nav-list">
              {projectItems.map(({ id, label, icon: Icon, path }) => (
                <li key={id}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
                    onClick={onClose}
                  >
                    <Icon size={17} strokeWidth={2} className="nav-icon" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-nav-item${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <Settings size={17} strokeWidth={2} className="nav-icon" />
            Cài đặt
          </NavLink>

          <button
            className="sidebar-logout-btn"
            onClick={handleLogout}
          >
            <LogOut size={17} strokeWidth={2} />
            Đăng xuất
          </button>

          {/* Profile card */}
          <div className="sidebar-profile">
            <div className="sidebar-profile-avatar">{user?.avatar ?? '??'}</div>
            <div className="sidebar-profile-info">
              <span className="sidebar-profile-name">{user?.name ?? 'User'}</span>
              <span className="sidebar-profile-role">{ROLE_LABEL[user?.role] ?? user?.role}</span>
            </div>
            <div className="sidebar-profile-status" title="Đang hoạt động" />
          </div>
        </div>
      </aside>
    </>
  );
}