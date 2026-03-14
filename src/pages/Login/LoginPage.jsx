import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      const result = login(email, password);
      setLoading(false);
      if (result.ok) {
        navigate(from, { replace: true });
      }
    }, 600); // small delay for UX
  };

  return (
    <div className="login-container">
      {/* ── Left: Brand panel ── */}
      <div className="login-left">
        <div className="login-left-bg" />
        <div className="login-left-orb-1" />
        <div className="login-left-orb-2" />

        <div className="login-left-content">
          {/* Logo */}
          <div className="login-logo-container">
            <img
              src="/logo.png"
              alt="TaskFlow Logo"
              style={{ width: 52, height: 52, borderRadius: 14, objectFit: 'cover' }}
            />
            <h1 className="login-logo-text">TaskFlow</h1>
          </div>

          {/* Headline */}
          <h2 className="login-heading">
            Quản lý công việc<br />
            <span className="login-heading-highlight">thông minh & hiệu quả.</span>
          </h2>
          <p className="login-description">
            Nền tảng nội bộ giúp đội ngũ kết nối, theo dõi tiến độ và hoàn thành mục tiêu nhanh chóng hơn bao giờ hết.
          </p>

          {/* Floating mockup */}
          <div className="login-mockup-card">
            <div className="login-mockup-header">
              <span className="login-mockup-dot red" />
              <span className="login-mockup-dot yellow" />
              <span className="login-mockup-dot green" />
              <div className="login-mockup-title-bar" />
            </div>
            <div className="login-mockup-line-1" />
            <div className="login-mockup-line-2" />
            <div className="login-mockup-line-3" />
            <div className="login-mockup-avatars">
              <div className="login-mockup-avatar-1" />
              <div className="login-mockup-avatar-2" />
              <div className="login-mockup-avatar-3" />
              <span>12 thành viên đang hoạt động</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="login-right">
        <div className="login-form-container">
          {/* Mobile logo */}
          <div className="login-mobile-logo-wrapper">
            <div className="login-mobile-logo-icon">
              <Briefcase size={18} color="#fff" strokeWidth={2} />
            </div>
            <h1 className="login-mobile-logo-text">TaskFlow</h1>
          </div>

          <div className="login-form-header">
            <h2 className="login-form-title">Đăng nhập</h2>
            <p className="login-form-subtitle">Vui lòng nhập tài khoản do Admin cung cấp.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email doanh nghiệp</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Mail className="input-icon" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Mật khẩu</label>
              <div className="input-wrapper">
                <div className="input-icon-wrapper">
                  <Lock className="input-icon" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                background: 'rgba(255, 95, 87, 0.1)',
                border: '1px solid rgba(255, 95, 87, 0.3)',
                borderRadius: '10px',
                padding: '10px 14px',
                color: '#ff7070',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                ⚠️ {error}
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="login-actions">
              <div className="remember-wrapper">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="checkbox-input"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a href="#" className="forgot-password">Quên mật khẩu?</a>
            </div>

            {/* Submit */}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Đang xử lý…' : 'Đăng nhập'}
              {!loading && <ArrowRight className="login-button-icon" />}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">
              Chỉ những nhân viên được cấp quyền mới có thể truy cập hệ thống.
              <br />Liên hệ Admin để được hỗ trợ.
            </p>
          </div>
        </div>

        <div className="login-right-blob" />
      </div>
    </div>
  );
}
