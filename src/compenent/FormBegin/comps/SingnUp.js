import { db } from './../../../firebase';
import { collection, getDocs, getDoc, addDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { registerUser } from './../../data/logDetails';

const SignUp = async (e, password, password1, email, dateB, pollName, setMessage) => {
    e.preventDefault();
    if (password !== password1) {
        alert("Passwords do not match");
        return false;
    }
    const About = {
        email,
        dateB,
    } 
    const specialDocRef = collection(db, "specialDocument");
    let snapShot = await getDocs(specialDocRef);
    if (snapShot.size === 0) {
        const docRef = doc(specialDocRef, "pollName");
        await setDoc(docRef, { pollName: [pollName] });
    } else {
        const docRef = doc(specialDocRef, "pollName");
        const docSnap = await getDoc(docRef); 
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.pollName && data.pollName.includes(pollName)) {
                alert("The pollName already exists!");
                return;
            } else {
                if (data.pollName) {
                    data.pollName.push(pollName);
                } else {
                    data.pollName = [pollName];
                }
                await updateDoc(doc(specialDocRef, pollName), data); 
            }
        } else {
            console.log("No such document!");
            const newDocData = {
                pollName: pollName,
                email: email
            };
            await addDoc(specialDocRef, newDocData);
        }
    }
    const pollCollectionRef = collection(db, pollName);
    const userDocRef = doc(pollCollectionRef, 'User');
    await setDoc(userDocRef, { user: [email] });
    try {
        await registerUser(email, password);
    } catch (error) {
        console.error("Error creating user:", error);
    }
    const aboutDocRef = doc(pollCollectionRef, 'About');
    await setDoc(aboutDocRef, About);
    return true;
}

export default SignUp;