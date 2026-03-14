import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg, #0c0c10)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 24,
      fontFamily: "'Be Vietnam Pro', sans-serif",
      color: '#f0f0f5',
      textAlign: 'center',
      padding: '24px',
    }}>
      {/* Giant 404 */}
      <div style={{
        fontSize: 'clamp(80px, 18vw, 160px)',
        fontWeight: 800,
        fontFamily: "'Lora', serif",
        background: 'linear-gradient(135deg, #7c6dfa 0%, #a99fff 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
        letterSpacing: '-0.04em',
      }}>404</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f0f0f5', margin: 0 }}>
          Trang không tồn tại
        </h1>
        <p style={{ fontSize: 14, color: '#8b8b9a', margin: 0 }}>
          Đường dẫn bạn truy cập không hợp lệ hoặc đã bị xóa.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#c0c0d0', fontSize: 14, fontWeight: 500,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <ArrowLeft size={16} /> Quay lại
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 10,
            background: '#7c6dfa',
            border: 'none',
            color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', fontFamily: 'inherit',
            boxShadow: '0 4px 16px rgba(124,109,250,0.4)',
          }}
        >
          <Home size={16} /> Về trang chủ
        </button>
      </div>
    </div>
  );
}
