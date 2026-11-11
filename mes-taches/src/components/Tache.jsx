function Tache({ id, titre, terminee, onBasculer, onSupprimer }) {
  return (
    <li className={terminee ? 'tache terminee' : 'tache'}>
      <label>
        <input
          type="checkbox"
          checked={terminee}
          onChange={() => onBasculer(id)}
        />
        <span>{titre}</span>
      </label>

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