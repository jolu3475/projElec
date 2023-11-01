import { db } from './../../../firebase';
import { getDoc, doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { loginUser, registerUser } from './../../data/logDetails';

class User {
    constructor(id, firstName, lastName, email, type) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.type = type;
        if (type === 'candidate') {
            this.count = 0;
        }
    }
}

const SignIn = async (a, id, firstName, lastName, email, password, Type) => {
    // Fetch the 'userName' document from the collection named 'a'
    const docRef = doc(db, a, "User");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // Get the array field from the document
        const emailArray = docSnap.data().user; 

        // Check if the email exists in the array
        if (emailArray.includes(email)) {
            return { success: false, message: "This user has already created an account" };
        }

        // Register the user
        try {
            await registerUser(email, password);
        } catch (error) {
            console.error("Registration failed:", error);
            return { success: false, message: "Registration failed" };
        }

        // Add the email to the array in the document only if it doesn't already exist
        await updateDoc(docRef, {
            user: arrayUnion(email) 
        });

        // Create a new 'User' document
        const user = new User(id, firstName, lastName, email, Type);
        const userDocRef = doc(db, a, id);
        await setDoc(userDocRef, user);

        return { success: true, message: "User registered successfully" };
    } else {
        console.log("No such document!");
        // Handle the case when the document doesn't exist
        // This depends on your application's requirements
    }
};

export default SignIn;