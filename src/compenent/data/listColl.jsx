import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './../../firebase'
import { Link } from 'react-router-dom'

function CollectionList() {
  const [collections, setCollections] = useState([])
  const [pollName, setPollName] = useState()

  useEffect(() => {
    const fetchCollectionNames = async () => {
      const docRef = doc(db, 'specialDocument', 'pollName')
      const docSnap = await getDoc(docRef)

      if (docSnap.exists() && docSnap.data().pollName.length > 0) {
        const pollNames = docSnap.data().pollName
        setPollName(pollName)
        const links = pollNames.map((pollName) => (
          <Link to={`/signin/createAccount/${pollName}`}>{pollName}</Link>
        ))
        setCollections(links)
      } else {
        setCollections(['There is no poll yet'])
      }
    }

    fetchCollectionNames()
  }, [])

  return collections.map((collection) => {
    return <li>{collection}</li>
  })
}

export default CollectionList
