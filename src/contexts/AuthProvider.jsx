import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState(null);
const Provider = new GoogleAuthProvider();
  // new Register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
//   sign in user
const signinUser =(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
}

// google login
const googleLogin=()=>{
return signInWithPopup(auth, Provider)
}



// state change

useEffect(()=>{
const unSubscribe=onAuthStateChanged(auth,currentUser=>{
    setUser(currentUser);
    setLoading(false);

})
return()=>{
    unSubscribe();
}
},[])


  const authInfo = {
    createUser,
    loading,
    signinUser,
    googleLogin,
    user,
  };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
