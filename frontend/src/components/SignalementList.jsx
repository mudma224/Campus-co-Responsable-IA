const SignalementList = ({ signalements, isAdmin, onStatutChange }) => {
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
                  <th>Description</th>           {/* ← Colonne ajoutée */}
                  <th>Localisation</th>
                  <th>Statut</th>
                  <th>Suggestion IA</th>
                  {isAdmin && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {signalements.map(s => {
                  let buttonText = '';
                  let buttonClass = '';
                  let nextStatut = '';

                  if (s.statut === 'NOUVEAU') {
                    buttonText = 'Commencer';
                    buttonClass = 'btn-success';
                    nextStatut = 'EN_COURS';
                  } else if (s.statut === 'EN_COURS') {
                    buttonText = 'Marquer traité';
                    buttonClass = 'btn-success';
                    nextStatut = 'TRAITE';
                  } else if (s.statut === 'TRAITE') {
                    buttonText = 'Réouvrir';
                    buttonClass = 'btn-warning';
                    nextStatut = 'EN_COURS';
                  }

                  return (
                    <tr key={s.id}>
                      <td>{new Date(s.dateCreation).toLocaleString('fr-FR')}</td>
                      <td><strong>{s.type}</strong></td>
                      <td>{s.description}</td>               {/* ← Description affichée */}
                      <td>{s.localisation}</td>
                      <td>
                        <span className={`badge
                          ${s.statut === 'NOUVEAU' ? 'bg-info' :
                            s.statut === 'EN_COURS' ? 'bg-warning' : 'bg-success'}`}>
                          {s.statut}
                        </span>
                      </td>
                      <td><small className="text-muted">{s.suggestionEco}</small></td>
                      {isAdmin && (
                        <td>
                          <button
                            className={`btn btn-sm ${buttonClass}`}
                            onClick={() => onStatutChange(s.id, nextStatut)}
                          >
                            {buttonText}
                          </button>
                        </td>
                      )}
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