import { useState, useEffect } from 'react'
import axios from 'axios'
import SignalementList from './SignalementList'

const API_URL = 'http://localhost:8080/api/signalements'

const AdminDashboard = ({ token }) => {
  const [signalements, setSignalements] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatut, setFilterStatut] = useState('')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/plain'
    }
  }

  const fetchSignalements = async () => {
    const res = await axios.get(API_URL, config)
    setSignalements(res.data)
  }

  useEffect(() => { fetchSignalements() }, [])

  const changerStatut = async (id, statut) => {
    await axios.put(`${API_URL}/${id}/statut`, statut, config)
    fetchSignalements()
  }

  // Statistiques
  const total = signalements.length
  const nouveau = signalements.filter(s => s.statut === 'NOUVEAU').length
  const enCours = signalements.filter(s => s.statut === 'EN_COURS').length
  const traite = signalements.filter(s => s.statut === 'TRAITE').length

  // Filtre + Recherche (type + description + localisation)
  const filteredSignalements = signalements.filter(s => {
    const matchStatut = !filterStatut || s.statut === filterStatut
    const matchSearch = !searchTerm ||
      s.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.localisation.toLowerCase().includes(searchTerm.toLowerCase())
    return matchStatut && matchSearch
  })

  return (
    <div>
      {/* Statistiques */}
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body text-center">
              <h5>Total</h5>
              <h2 className="mb-0">{total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info">
            <div className="card-body text-center">
              <h5>Nouveau</h5>
              <h2 className="mb-0">{nouveau}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body text-center">
              <h5>En cours</h5>
              <h2 className="mb-0">{enCours}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body text-center">
              <h5>Traité</h5>
              <h2 className="mb-0">{traite}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Recherche + Filtre par statut */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="🔎 Rechercher (type, description, localisation)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select className="form-select" value={filterStatut} onChange={e => setFilterStatut(e.target.value)}>
            <option value="">Tous les statuts</option>
            <option value="NOUVEAU">Nouveau</option>
            <option value="EN_COURS">En cours</option>
            <option value="TRAITE">Traité</option>
          </select>
        </div>
      </div>

      <SignalementList
        signalements={filteredSignalements}
        isAdmin={true}
        onStatutChange={changerStatut}
      />
    </div>
  )
}

export default AdminDashboard