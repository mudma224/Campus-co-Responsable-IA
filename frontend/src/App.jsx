import { useState, useEffect } from 'react'
import axios from 'axios'
import SignalementForm from './components/SignalementForm'
import SignalementList from './components/SignalementList'

const API_URL = 'http://localhost:8080/api/signalements'

function App() {
  const [signalements, setSignalements] = useState([])   // Liste qui s'actualise automatiquement

  // Charger la liste dès le démarrage
  useEffect(() => {
    fetchSignalements()
  }, [])

  const fetchSignalements = async () => {
    const response = await axios.get(API_URL)
    setSignalements(response.data)
  }

  const ajouterSignalement = async (nouveau) => {
    const response = await axios.post(API_URL, nouveau)
    setSignalements([...signalements, response.data])   // Ajoute immédiatement à l'écran
  }

  const changerStatut = async (id, nouveauStatut) => {
    await axios.put(`${API_URL}/${id}/statut`, nouveauStatut)
    fetchSignalements()   // Rafraîchit la liste
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-success">
        🌍 Campus Éco-Responsable & IA
      </h1>

      <div className="row">
        <div className="col-md-5">
          <SignalementForm onAjout={ajouterSignalement} />
        </div>

        <div className="col-md-7">
          <SignalementList
            signalements={signalements}
            onStatutChange={changerStatut}
          />
        </div>
      </div>
    </div>
  )
}

export default App