import {
  doc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
} from 'firebase/firestore'
import { db } from './firebase'

export default class Service {
  // Vérifie si une collection existe
  isCollectionExist = async (collectionName) => {
    const collectionRef = collection(db, collectionName)
    try {
      const snapshot = await getDocs(collectionRef)
      return { error: false, message: '', exists: snapshot.empty }
    } catch (e) {
      return {
        error: true,
        message: `Error checking if collection exists: ${e}`,
      }
    }
  }

  // Vérifie si un document existe dans une collection
  isDocumentExist = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId)
    try {
      const docSnap = await docRef.get()
      return { error: false, message: '', exists: docSnap.empty }
    } catch (e) {
      return {
        error: true,
        message: `Error checking if document exists: ${e}`,
      }
    }
  }

  // Crée un document dans une collection, créant la collection si nécessaire
  createDocInCollection = async (data, collectionName, id) => {
    const collectionExists = await this.isCollectionExist(collectionName)
    if (collectionExists.error) {
      return collectionExists
    }

    if (!collectionExists.exists) {
      // Si la collection n'existe pas, créez le premier document pour créer la collection
      return this.createDoc(data, collectionName, id)
    } else {
      // Si la collection existe, ajoutez simplement le document
      return this.createDoc(data, collectionName, id)
    }
  }

  //cree une collection
  createCollection = async (collectionName) => {
    try {
      this.collectionRef = collection(db, collectionName)
      return { error: false, message: 'Colection create' }
    } catch (e) {
      return { error: true, message: `Error creating the collection: ${e}` }
    }
  }

  // Crée un document
  createDoc = async (data, collection, id) => {
    const ref = doc(db, collection, id)
    try {
      await setDoc(ref, data)
      return {
        error: false,
        message: 'doc creating',
      }
    } catch (e) {
      return {
        error: true,
        message: `error creating the doc ${e}`,
        errorobj: e,
      }
    }
  }

  // Met à jour un document
  upDoc = async (data, collection, id) => {
    const ref = doc(db, collection, id)
    try {
      await updateDoc(ref, data)
      return {
        error: false,
        message: `doc ${id} update`,
      }
    } catch (e) {
      return {
        error: true,
        message: `error updating the data ${e}`,
        errorobj: e,
      }
    }
  }

  // Récupère tous les documents d'une collection
  getAllDocs = async (collectionName) => {
    const collectionRef = collection(db, collectionName)
    try {
      const snapshot = await getDocs(collectionRef)
      const data = []
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
      })
      return { error: false, message: 'Documents found', data }
    } catch (e) {
      return { error: true, message: `Error getting documents: ${e}` }
    }
  }

  // Récupère un document spécifique d'une collection
  getDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId)
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return {
          error: false,
          exists: true,
          message: 'Document found',
          data: docSnap.data(),
        }
      } else {
        return { error: false, exists: false, message: 'No such document!' }
      }
    } catch (e) {
      return { error: true, message: `Error getting document: ${e}` }
    }
  }

  // Supprime un document
  deleteDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId)
    try {
      await docRef.delete()
      return { error: false, message: 'Document deleted' }
    } catch (e) {
      return { error: true, message: `Error deleting document: ${e}` }
    }
  }
}
