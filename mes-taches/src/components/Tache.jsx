import { useState } from 'react'

function Tache({ id, titre, terminee, onBasculer, onSupprimer, onModifier }) {
  const [edition, setEdition] = useState(false)
  const [brouillon, setBrouillon] = useState(titre)

  function commencerEdition() {
    setBrouillon(titre)
    setEdition(true)
  }

  function enregistrer() {
    if (!brouillon.trim()) return
    onModifier(id, brouillon)
    setEdition(false)
  }

  return (
    <li className={terminee ? 'tache terminee' : 'tache'}>
        <input
          type="checkbox"
          aria-label={`Marquer « ${titre} » comme ${terminee ? 'à faire' : 'terminée'}`}
          checked={terminee}
          onChange={() => onBasculer(id)}
        />
      {edition ? (
        <form className="formulaire" onSubmit={(event) => {
          event.preventDefault()
          enregistrer()
        }}>
          <input
            type="text"
            aria-label="Modifier le titre"
            autoFocus
            value={brouillon}
            onChange={(event) => setBrouillon(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setEdition(false)
            }}
          />
          <button type="submit" disabled={!brouillon.trim()}>Enregistrer</button>
          <button type="button" onClick={() => setEdition(false)}>Annuler</button>
        </form>
      ) : (
        <span
          className="titre"
          role="button"
          tabIndex={0}
          title="Double-cliquez pour modifier"
          onDoubleClick={commencerEdition}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              commencerEdition()
            }
          }}
        >{titre}</span>
      )}

      <button
        type="button"
        className="danger"
        onClick={() => onSupprimer(id)}
      >
        Supprimer
      </button>
    </li>
  )
}

export default Tache
