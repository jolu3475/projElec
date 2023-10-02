import  { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../firebase'; 
import { Link } from 'react-router-dom';

function CollectionList() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollectionNames = async () => {
      const docRef = doc(db, 'specialDocument', 'pollName');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && docSnap.data().pollName.length > 0) {
        setCollections(docSnap.data().pollName);
      } else {
        setCollections(["There is no poll yet"]);
      }
    };

    fetchCollectionNames();
  }, []);

  return collections.map((collection) => 
    <li key={collection}>
      <Link to={`/signin/${collection}`}>{collection}</Link>
    </li>
  );
}

export default CollectionList;
