const SignIn = async (e, a, firstName, lastName, email, password, Type) => {
    e.preventDefault();
    // Fetch the 'userName' document from the collection named 'a'
    const docRef = doc(db, a, "userName");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // Get the array field from the document
        const emailArray = docSnap.data().yourArrayField; // replace 'yourArrayField' with the actual field name

        // Check if the email exists in the array
        const doesEmailExist = emailArray.includes(email);

        if (!doesEmailExist) {
        // Register the user
        await registerUser(email, password);

        // Add the email to the array in the document
        await updateDoc(docRef, {
            yourArrayField: arrayUnion(email) // replace 'yourArrayField' with the actual field name
        });

        return true;
        } else {
        console.log("Email already exists!");
        return false;
        }
    } else {
        console.log("No such document!");
        return false;
    }
  };
  export default SignIn;