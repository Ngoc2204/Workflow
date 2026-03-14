import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/common/PrivateRoute'
import LoginPage from './pages/Login/LoginPage'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/Dashboard/DashboardPage'
import ProjectsPage from './pages/Projects/ProjectsPage'
import KanbanBoard from './pages/ProjectDetail/KanbanBoard'
import CalendarPage from './pages/Calendar/CalendarPage'
import MyTasksPage from './pages/MyTasks/MyTasksPage'
import OverduePage from './pages/Overdue/OverduePage'
import CompletedPage from './pages/Completed/CompletedPage'
import NotFoundPage from './pages/NotFound/NotFoundPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected – must be logged in */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id/board" element={<KanbanBoard />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/tasks/my-tasks" element={<MyTasksPage />} />
              <Route path="/tasks/overdue" element={<OverduePage />} />
              <Route path="/tasks/completed" element={<CompletedPage />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
