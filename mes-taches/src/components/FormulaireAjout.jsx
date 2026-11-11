import { useState } from 'react'

function FormulaireAjout({ onAjouter }) {
  const [titre, setTitre] = useState('')
  const titreNettoye = titre.trim()

  function gererSoumission(event) {
    event.preventDefault()

    if (titreNettoye === '') {
      return
    }

    onAjouter(titreNettoye)
    setTitre('')
  }

  return (
    <form className="formulaire" onSubmit={gererSoumission}>
      <input
        type="text"
        aria-label="Titre de la nouvelle tâche"
        value={titre}
        onChange={(event) => setTitre(event.target.value)}
        placeholder="Ex. : Réviser les hooks"
      />

      <button
        type="submit"
        className="principal"
        disabled={titreNettoye === ''}
      >
        Ajouter
      </button>
    </form>
  )
}

export default FormulaireAjout