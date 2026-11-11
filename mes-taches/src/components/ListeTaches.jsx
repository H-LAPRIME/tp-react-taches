import Tache from './Tache'

function ListeTaches({ taches, onBasculer, onSupprimer }) {
  if (taches.length === 0) {
    return <p className="vide">Aucune tâche à afficher.</p>
  }

  return (
    <ul>
      {taches.map((tache) => (
        <Tache
          key={tache.id}
          id={tache.id}
          titre={tache.titre}
          terminee={tache.terminee}
          onBasculer={onBasculer}
          onSupprimer={onSupprimer}
        />
      ))}
    </ul>
  )
}

export default ListeTaches