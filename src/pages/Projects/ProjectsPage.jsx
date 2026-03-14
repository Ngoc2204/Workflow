import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Calendar,
  X
} from 'lucide-react';
import './ProjectsPage.css';

// Mock data
const mockProjects = [
  {
    id: 1,
    name: 'TaskFlow Internal',
    description: 'Hệ thống quản lý công việc và dự án nội bộ dành cho toàn bộ nhân viên công ty.',
    status: 'active', // active, planning, completed
    startDate: '2026-03-01',
    endDate: '2026-12-31',
    leader: { name: 'Admin User', avatar: 'AD' },
    members: [
      { id: 1, name: 'Tri', avatar: 'TR' },
      { id: 2, name: 'Hieu', avatar: 'HI' },
      { id: 3, name: 'Ngoc', avatar: 'NG' }
    ]
  },
  {
    id: 2,
    name: 'Website E-commerce',
    description: 'Xây dựng website bán hàng trực tuyến với đầy đủ tính năng thanh toán, giỏ hàng, quản lý kho.',
    status: 'planning',
    startDate: '2026-04-01',
    endDate: '2026-08-15',
    leader: { name: 'Tri', avatar: 'TR' },
    members: [
      { id: 4, name: 'Binh', avatar: 'BI' },
      { id: 5, name: 'An', avatar: 'AN' }
    ]
  },
  {
    id: 3,
    name: 'Mobile App React Native',
    description: 'Ứng dụng mobile cho khách hàng thân thiết, tích hợp thẻ thành viên và ưu đãi.',
    status: 'completed',
    startDate: '2025-09-01',
    endDate: '2026-02-28',
    leader: { name: 'Ngoc', avatar: 'NG' },
    members: [
      { id: 1, name: 'Tri', avatar: 'TR' },
      { id: 6, name: 'Linh', avatar: 'LI' }
    ]
  }
];

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Project Form State
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return <span className="project-badge active">Đang chạy</span>;
      case 'planning': return <span className="project-badge planning">Kế hoạch</span>;
      case 'completed': return <span className="project-badge completed">Hoàn thành</span>;
      default: return null;
    }
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    console.log('Create Project:', newProject);
    setIsModalOpen(false);
    // TODO: Call API to create project
  }

  return (
    <div className="projects-container">
      
      {/* Header */}
      <div className="projects-header">
        <div className="projects-title-group">
          <h1 className="projects-title">Quản lý dự án</h1>
          <p className="projects-subtitle">Danh sách các dự án đang hoạt động trong công ty.</p>
        </div>
        <div className="projects-actions">
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} strokeWidth={2.5} />
            Tạo dự án mới
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="projects-toolbar">
        <div className="projects-search">
          <Search className="projects-search-icon" />
          <input 
            type="text" 
            className="projects-search-input" 
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {mockProjects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(project => (
          <div key={project.id} className={`project-card status-${project.status}`}>
            
            <div className="project-header">
              <div>
                <h3 className="project-name">{project.name}</h3>
                {getStatusBadge(project.status)}
              </div>
              <button className="project-menu-btn">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <p className="project-description">
              {project.description}
            </p>

            <div className="project-meta">
              <div className="project-date">
                <Calendar size={14} />
                <span>{new Date(project.startDate).toLocaleDateString('vi-VN')} - {new Date(project.endDate).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            <div className="project-footer">
              <div className="project-leader">
                <div className="project-leader-avatar">{project.leader.avatar}</div>
                <span className="project-leader-name">{project.leader.name} (Leader)</span>
              </div>
              
              <div className="project-members-stacked">
                {project.members.slice(0,3).map(member => (
                  <div key={member.id} className="project-member-avatar" title={member.name}>
                    {member.avatar}
                  </div>
                ))}
                {project.members.length > 3 && (
                  <div className="project-member-avatar">
                    +{project.members.length - 3}
                  </div>
                )}
              </div>
            </div>
            
          </div>
        ))}
      </div>

      {/* Create Project Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Tạo dự án mới</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProject}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Tên dự án *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Nhập tên dự án..." 
                    required 
                    value={newProject.name}
                    onChange={e => setNewProject({...newProject, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Mô tả</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Mô tả mục tiêu của dự án..."
                    value={newProject.description}
                    onChange={e => setNewProject({...newProject, description: e.target.value})}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Ngày bắt đầu *</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      required
                      value={newProject.startDate}
                      onChange={e => setNewProject({...newProject, startDate: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Ngày kết thúc *</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      required
                      value={newProject.endDate}
                      onChange={e => setNewProject({...newProject, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Hủy bỏ
                </button>
                <button type="submit" className="primary-btn">
                  Tạo dự án
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
