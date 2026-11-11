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
  const [horlogeVisible, setHorlogeVisible] = useState(true)

  const restantes = taches.filter((tache) => !tache.terminee).length

  useEffect(() => {
    let annule = false

    try {
      const sauvegarde = localStorage.getItem('mes-taches')
      if (sauvegarde !== null) {
        const donnees = JSON.parse(sauvegarde)
        if (!Array.isArray(donnees) || !donnees.every((tache) =>
          tache !== null && typeof tache === 'object' &&
          typeof tache.id === 'number' && typeof tache.titre === 'string' &&
          typeof tache.terminee === 'boolean',
        )) throw new Error('Sauvegarde invalide')
        Promise.resolve().then(() => {
          if (annule) return
          setTaches(donnees)
          setChargement(false)
        })
        return () => { annule = true }
      }
    } catch (err) {
      console.warn('Sauvegarde locale indisponible, chargement du JSON.', err)
    }

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
    if (chargement || erreur !== null) return
    try {
      localStorage.setItem('mes-taches', JSON.stringify(taches))
    } catch (err) {
      console.warn('Impossible de sauvegarder les tâches localement.', err)
    }
  }, [taches, chargement, erreur])

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

  function supprimerTerminees() {
    setTaches((tachesActuelles) => tachesActuelles.filter((tache) => !tache.terminee))
  }

  function modifierTache(id, titre) {
    const titreNettoye = titre.trim()
    if (!titreNettoye) return
    setTaches((tachesActuelles) => tachesActuelles.map((tache) =>
      tache.id === id ? { ...tache, titre: titreNettoye } : tache,
    ))
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
          <button
            type="button"
            aria-expanded={horlogeVisible}
            onClick={() => setHorlogeVisible((visible) => !visible)}
          >
            {horlogeVisible ? "Masquer l’horloge" : "Afficher l’horloge"}
          </button>
          {horlogeVisible && <Horloge />}
        </Carte>

        <Carte titre="Nouvelle tâche">
          {!chargement && <FormulaireAjout onAjouter={ajouterTache} />}
        </Carte>

        <Carte titre="Ma liste">
          <Filtres filtre={filtre} onChanger={setFiltre} />
          <button
            type="button"
            className="danger"
            disabled={!taches.some((tache) => tache.terminee)}
            onClick={supprimerTerminees}
          >
            Supprimer les tâches terminées
          </button>

          {chargement && <p className="vide">Chargement des tâches…</p>}
          {erreur !== null && <p className="erreur">{erreur}</p>}

          {!chargement && erreur === null && (
            <ListeTaches
              taches={tachesVisibles}
              onBasculer={basculerTache}
              onSupprimer={supprimerTache}
              onModifier={modifierTache}
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
