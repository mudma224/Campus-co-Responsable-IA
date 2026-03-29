import { useState, useEffect } from 'react'
import axios from 'axios'
import SignalementForm from './SignalementForm'
import SignalementList from './SignalementList'

const API_URL = 'http://localhost:8080/api/signalements'

const UserDashboard = ({ token }) => {
  const [signalements, setSignalements] = useState([])

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const fetchSignalements = async () => {
    try {
      const res = await axios.get(API_URL, config)
      // Tri du plus récent au plus ancien
      const sorted = res.data.sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation))
      setSignalements(sorted)
      console.log("✅ Liste chargée :", sorted.length, "signalements")
    } catch (err) {
      console.error("❌ Erreur chargement liste :", err.response?.data || err.message)
    }
  }

  useEffect(() => {
    fetchSignalements()
  }, [])

  const ajouterSignalement = async (data) => {
    try {
      console.log("🚀 Envoi du signalement :", data)
      const res = await axios.post(API_URL, data, config)
      console.log("✅ Signalement créé avec succès :", res.data)

      // Rafraîchissement immédiat de la liste
      fetchSignalements()
    } catch (err) {
      console.error("❌ Erreur création signalement :", err.response?.data || err.message)
      alert("Erreur lors de l'envoi du signalement. Regarde la console (F12).")
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <SignalementForm onAjout={ajouterSignalement} />
      </div>
      <div className="col-md-7">
        <SignalementList signalements={signalements} isAdmin={false} />
      </div>
    </div>
  )
}

export default UserDashboard