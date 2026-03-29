import { useState } from 'react'
import axios from 'axios'

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ email: '', password: '', nom: '', prenom: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:8080/api/auth/login', {
          email: form.email,
          password: form.password
        })
        onLogin(res.data)
      } else {
        await axios.post('http://localhost:8080/api/auth/register', form)
        alert("Compte créé avec succès ! Connectez-vous maintenant.")
        setIsLogin(true)
      }
    } catch (err) {
      setError(err.response?.data || "Erreur")
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow" style={{ width: '420px' }}>
        <div className="card-body">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item"><button className={`nav-link ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Connexion</button></li>
            <li className="nav-item"><button className={`nav-link ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Créer un compte</button></li>
          </ul>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-3">
                  <input name="nom" placeholder="Nom" className="form-control" value={form.nom} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <input name="prenom" placeholder="Prénom" className="form-control" value={form.prenom} onChange={handleChange} required />
                </div>
              </>
            )}
            <div className="mb-3">
              <input name="email" type="email" placeholder="Email" className="form-control" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <input name="password" type="password" placeholder="Mot de passe" className="form-control" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-success w-100">
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <small className="text-muted d-block text-center mt-3">
            {isLogin ? "Pas encore de compte ? Cliquez sur Créer un compte" : "Déjà un compte ? Cliquez sur Connexion"}
          </small>
        </div>
      </div>
    </div>
  )
}

export default Login