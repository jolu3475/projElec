import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

export const registerUser = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email,password);
};

export const loginUser = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        goto();
    }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
    })
}
