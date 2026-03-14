import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Menu, ChevronDown, Settings, User, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Topbar.css';

const ROLE_LABEL = { admin: 'Quản trị viên', leader: 'Trưởng nhóm', member: 'Thành viên' };

export default function Topbar({ onMenuToggle }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Greeting by time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'buổi sáng' : hour < 18 ? 'buổi chiều' : 'buổi tối';

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="topbar">

      {/* ── Left ── */}
      <div className="topbar-left">
        <button className="topbar-mobile-menu-btn" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <h2 className="topbar-greeting">
          Chào {greeting}, <span className="topbar-greeting-name">{user?.name?.split(' ')[0] ?? 'bạn'}</span>! 👋
        </h2>
      </div>

      {/* ── Right Actions ── */}
      <div className="topbar-actions">

        {/* Search */}
        <div className="topbar-search">
          <div className="topbar-search-icon-wrapper">
            <Search className="topbar-search-icon" />
          </div>
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Tìm kiếm công việc, dự án..."
          />
        </div>

        {/* Notification */}
        <button className="topbar-icon-btn" title="Thông báo">
          <Bell size={18} />
          <span className="topbar-notification-badge" />
        </button>

        {/* Help */}
        <button className="topbar-icon-btn" title="Trợ giúp">
          <HelpCircle size={18} />
        </button>

        <div className="topbar-divider" />

        {/* User Profile */}
        <div
          className={`topbar-user${dropdownOpen ? ' open' : ''}`}
          ref={userRef}
        >
          <button
            className="topbar-user-btn"
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <div className="topbar-user-avatar">{user?.avatar ?? '??'}</div>
            <div className="topbar-user-info">
              <span className="topbar-user-name">{user?.name ?? 'User'}</span>
              <span className="topbar-user-role">{ROLE_LABEL[user?.role] ?? user?.role}</span>
            </div>
            <ChevronDown size={14} className="topbar-user-chevron" />
          </button>

          {/* Dropdown */}
          <div className="topbar-dropdown">
            <div className="topbar-dropdown-header">
              <div className="topbar-dropdown-header-name">{user?.name}</div>
              <div className="topbar-dropdown-header-email">{user?.email}</div>
            </div>

            <div className="topbar-dropdown-section">
              <button className="topbar-dropdown-item" onClick={() => navigate('/profile')}>
                <User size={15} /> Hồ sơ cá nhân
              </button>
              <button className="topbar-dropdown-item" onClick={() => navigate('/settings')}>
                <Settings size={15} /> Cài đặt
              </button>
            </div>

            <div className="topbar-dropdown-separator" />

            <div className="topbar-dropdown-section">
              <button className="topbar-dropdown-item danger" onClick={handleLogout}>
                <LogOut size={15} /> Đăng xuất
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
