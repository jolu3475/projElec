import { collection, addDoc, getDocs, getDoc, updateDoc,deleteDoc, doc } from "firebase/firestore";
import { db } from "./../../firebase";

class Service {

    collectionRef;
    
    constructor() {
        this.collectionRef = null;
    }
    addUsr = (newElc) => {
        return addDoc(this.dbCollectionRef, newElc)
    }
    updateUsr = (id, updatedUsr, docName) => {
        const Usr = doc(id, docName, id);
        return updateDoc(Usr, updatedUsr);
    }
    deleteUsr = () => {
        const Usr = doc(id, docName, id);
        return deleteDoc(Usr);
    }
    getAllDocs = () => {
        return getDocs(this.collectionRef);
    }
    getDoc = ( id, collectionName) => {
        const Usr = getDoc(db, collectionName, id);
        return getDoc(this.collectionRef);
    }
    createCollection = (collectionName) => {
        this.collectionRef = collection(db, collectionName);
    }
    setCollectionRef = (collectionName) => {
        this.collectionRef = collection(db, collectionName);
    }
    isCollectionExist = async () => {
        let snapShot = await getDocs(this.collectionRef);
        return snapShot.size !== 0;
    }

}

export default Service;