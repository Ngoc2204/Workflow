import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './MainLayout.css';

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="layout-content-wrapper">
        <Topbar onMenuToggle={() => setSidebarOpen((v) => !v)} />

        <main className="layout-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}