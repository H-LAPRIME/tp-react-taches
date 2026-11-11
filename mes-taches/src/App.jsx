import { useEffect, useState } from 'react'
import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'
import Horloge from './components/Horloge.jsx'

function App() {
  const [taches, setTaches] = useState([])
  const [filtre, setFiltre] = useState('toutes')
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  const restantes = taches.filter((tache) => !tache.terminee).length

  useEffect(() => {
    let annule = false

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP ${reponse.status}`)
        }

        return reponse.json()
      })
      .then((donnees) => {
        if (!annule) setTaches(donnees)
      })
      .catch((err) => {
        if (!annule) setErreur(err.message)
      })
      .finally(() => {
        if (!annule) setChargement(false)
      })

    return () => {
      annule = true
    }
  }, [])

  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

  function ajouterTache(titre) {
    const nouvelleTache = { id: Date.now(), titre, terminee: false }
    setTaches((tachesActuelles) => [...tachesActuelles, nouvelleTache])
  }

  function basculerTache(id) {
    setTaches((tachesActuelles) =>
      tachesActuelles.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache,
      ),
    )
  }

  function supprimerTache(id) {
    setTaches((tachesActuelles) =>
      tachesActuelles.filter((tache) => tache.id !== id),
    )
  }

  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') return !tache.terminee
    if (filtre === 'terminees') return tache.terminee
    return true
  })

  return (
    <>
      <Entete titre="Mes tâches" sousTitre="Mon premier projet React" />

      <main>
        <Carte titre="Compteur">
          <Compteur />
        </Carte>

        <Carte titre="Heure actuelle">
          <Horloge />
        </Carte>

        <Carte titre="Nouvelle tâche">
          {!chargement && <FormulaireAjout onAjouter={ajouterTache} />}
        </Carte>

        <Carte titre="Ma liste">
          <Filtres filtre={filtre} onChanger={setFiltre} />

          {chargement && <p className="vide">Chargement des tâches…</p>}
          {erreur !== null && <p className="erreur">{erreur}</p>}

          {!chargement && erreur === null && (
            <ListeTaches
              taches={tachesVisibles}
              onBasculer={basculerTache}
              onSupprimer={supprimerTache}
            />
          )}
        </Carte>

        <Carte titre="Statistiques">
          <Statistiques taches={taches} />
        </Carte>
      </main>

      <Pied auteur="Mouad Hida" />
    </>
  )
}

export default App