import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
} from 'firebase/firestore'
import { db } from './firebase'

class Service {
  collectionRef

  constructor() {
    this.collectionRef = null
  }
  setCollectionRef = (collectionName) => {
    this.collectionRef = collection(db, collectionName)
  }
  addDocu = async (newElement, collName, id) => {
    try {
      const docRef = doc(db, collName, id)
      await setDoc(docRef, newElement)
      console.log('create :', id)
      return { error: false, message: '' }
    } catch (e) {
      return {
        error: true,
        message: `Error adding document: ${e}`,
        errorObj: e,
      }
    }
  }
  updateDocu = async (id, updatedUsr, docName) => {
    try {
      const Usr = doc(db, docName, id)
      await updateDoc(Usr, updatedUsr)
      console.log('update :', id)
      return { error: false, message: '' }
    } catch (e) {
      return { error: true, message: `Error updating document: ${e}` }
    }
  }

  deleteDocu = async (id, docName) => {
    try {
      const Usr = doc(db, docName, id)
      await deleteDoc(Usr)
      return { error: false, message: '' }
    } catch (e) {
      return { error: true, message: `Error deleting the document: ${e}` }
    }
  }

  getDoc = async (id, collectionName) => {
    try {
      const Usr = doc(db, collectionName, id)
      const docSnap = await getDoc(Usr)
      if (docSnap.exists()) {
        return { error: false, data: docSnap.data() }
      } else {
        return { error: true, message: 'No such document' }
      }
    } catch (e) {
      return { error: true, message: `Error getting the document: ${e}` }
    }
  }
  getAllDocs = async () => {
    try {
      const snapshot = await getDocs(this.collectionRef)
      const docs = snapshot.docs.map((doc) => doc.data())
      return { error: false, data: docs }
    } catch (e) {
      return { error: true, message: `Error getting all the document: ${e}` }
    }
  }
  createCollection = async (collectionName) => {
    try {
      this.collectionRef = collection(db, collectionName)
      return { error: false, message: '' }
    } catch (e) {
      return { error: true, message: `Error creating the collection: ${e}` }
    }
  }
  isCollectionExist = async () => {
    try {
      let snapShot = await getDocs(this.collectionRef)
      return { error: false, message: '', exists: snapShot.size !== 0 }
    } catch (e) {
      return {
        error: true,
        message: `Error checking if collection exists: ${e}`,
      }
    }
  }
  async getDocumentsByPollname(collectionName, pollnameValue) {
    const q = query(
      collection(db, collectionName),
      where('pollname', '==', pollnameValue),
    )
    const querySnapshot = await getDocs(q)

    let documents = []
    querySnapshot.forEach((doc) => {
      documents.push(doc.data())
    })

    return documents
  }
}

export default Service
