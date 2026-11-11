

function Pied() {
  const ANNEE = new Date().getFullYear();
  return (
    <footer className="pied">
      TP React – {ANNEE}
    </footer>
  )
}

export default Pied