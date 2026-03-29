import { useState, useEffect } from 'react'
import axios from 'axios'
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'

const API_URL = 'http://localhost:8080/api'

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'))
  const [role, setRole] = useState(sessionStorage.getItem('role'))
  const [userName, setUserName] = useState(sessionStorage.getItem('userName'))

  const handleLogin = (data) => {
    sessionStorage.setItem('token', data.token)
    sessionStorage.setItem('role', data.role)
    sessionStorage.setItem('userName', `${data.prenom} ${data.nom}`)
    setToken(data.token)
    setRole(data.role)
    setUserName(`${data.prenom} ${data.nom}`)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    setToken(null)
    setRole(null)
    setUserName(null)
  }

  // L'application démarre toujours sur le login
  if (!token) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-success">🌍 Campus Éco-Responsable & IA</h1>
        <div>
          <span className="me-3">👤 {userName} ({role})</span>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {role === 'USER' ? (
        <UserDashboard token={token} />
      ) : (
        <AdminDashboard token={token} />
      )}
    </div>
  )
}

export default App