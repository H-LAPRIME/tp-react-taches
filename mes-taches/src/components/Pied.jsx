

function Pied({ auteur }) {
  const ANNEE = new Date().getFullYear();
  return (
    <footer className="pied">
      <p>TP React – réalisé par {auteur} – {ANNEE}</p>
    </footer>
  )
}

export default Pied