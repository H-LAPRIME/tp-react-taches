import { useState } from 'react'

function Compteur() {
  const [valeur, setValeur] = useState(0)

  return (
    <>
      <p className="valeur-compteur">{valeur}</p>

      <div className="ligne">
        <button
          type="button"
          disabled={valeur === 0}
          onClick={() => setValeur((precedente) => precedente - 1)}
        >
          −1
        </button>

        <button
          type="button"
          className="principal"
          onClick={() => setValeur((precedente) => precedente + 1)}
        >
          +1
        </button>

        <button type="button" onClick={() => setValeur(0)}>
          Remettre à zéro
        </button>
      </div>
    </>
  )
}

export default Compteur