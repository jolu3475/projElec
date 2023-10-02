import { collection, getDocs, getDoc, doc} from 'firebase/firestore'; 
import { db } from './../../firebase';

export async function getDocumentNames(e, email) {
  const collectionRef = collection(db, e);
  const snapshot = await getDocs(collectionRef);
  const documentNames = snapshot.docs.map(doc => doc.id);
  return documentNames.includes(email);
}


export async function getAdminName(e) {
  const docRef = doc(db, e, e);
  const docSnap = await getDoc(docRef);
  const adminName = docSnap.get('adminEmail');
  return adminName;
}