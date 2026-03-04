const SignalementList = ({ signalements, onStatutChange }) => {
  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h5>📋 Liste des signalements ({signalements.length})</h5>
      </div>
      <div className="card-body p-0">
        {signalements.length === 0 ? (
          <p className="text-center py-4 text-muted">Aucun signalement pour le moment...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Localisation</th>
                  <th>Statut</th>
                  <th>Suggestion IA</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {signalements.map(s => {
                  const isEnCours = s.statut === 'EN_COURS';
                  return (
                    <tr key={s.id}>
                      <td>{new Date(s.dateCreation).toLocaleString('fr-FR')}</td>
                      <td><strong>{s.type}</strong></td>
                      <td>{s.localisation}</td>
                      <td>
                        <span className={`badge ${isEnCours ? 'bg-warning' : 'bg-success'}`}>
                          {isEnCours ? 'EN COURS' : 'TRAITÉ'}
                        </span>
                      </td>
                      <td><small className="text-muted">{s.suggestionEco}</small></td>
                      <td>
                        <button
                          className={`btn btn-sm ${isEnCours ? 'btn-success' : 'btn-warning'}`}
                          onClick={() => onStatutChange(s.id, isEnCours ? 'TRAITE' : 'EN_COURS')}
                        >
                          {isEnCours ? 'Marquer traité' : 'Réouvrir'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalementList;