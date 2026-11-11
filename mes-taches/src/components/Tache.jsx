function Tache({ titre, terminee }) {
  return (
    <li className={terminee ? 'tache terminee' : 'tache'}>
      {terminee ? '✅' : '⬜'} {titre}
    </li>
  )
}

export default Tache