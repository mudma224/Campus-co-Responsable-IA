import { useState } from 'react'

const SignalementForm = ({ onAjout }) => {
  const [form, setForm] = useState({
    type: '',
    description: '',
    localisation: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const handleSubmit = (e) => {
   e.preventDefault();
   if (!form.type || !form.description || !form.localisation) {
     alert("Tous les champs sont obligatoires !");
     return;
   }

   // On envoie explicitement le statut initial
   const nouveauSignalement = {
     ...form,
     statut: "EN_COURS"
   };

   onAjout(nouveauSignalement);
   setForm({ type: '', description: '', localisation: '' });
 };

  return (
    <div className="card shadow">
      <div className="card-header bg-success text-white">
        <h5>📝 Nouveau signalement</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Type de problème</label>
            <select name="type" className="form-select" value={form.type} onChange={handleChange} required>
              <option value="">Choisissez...</option>
              <option value="Gaspillage d'énergie">Gaspillage d'énergie</option>
              <option value="Fuite d'eau">Fuite d'eau</option>
              <option value="Salle inutilisée éclairée">Salle inutilisée éclairée</option>
              <option value="Déchet">Déchet / Poubelle</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea name="description" className="form-control" rows="3" value={form.description} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Localisation sur le campus</label>
            <input type="text" name="localisation" className="form-control" value={form.localisation} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-success w-100">Envoyer le signalement</button>
        </form>
      </div>
    </div>
  )
}

export default SignalementForm