const OPTIONS = [
  { valeur: 'toutes', libelle: 'Toutes' },
  { valeur: 'actives', libelle: 'À faire' },
  { valeur: 'terminees', libelle: 'Terminées' },
]

function Filtres({ filtre, onChanger }) {
  return (
    <div className="filtres">
      {OPTIONS.map(({ valeur, libelle }) => (
        <button
          key={valeur}
          type="button"
          className={filtre === valeur ? 'actif' : undefined}
          aria-pressed={filtre === valeur}
          onClick={() => onChanger(valeur)}
        >
          {libelle}
        </button>
      ))}
    </div>
  )
}

export default Filtres