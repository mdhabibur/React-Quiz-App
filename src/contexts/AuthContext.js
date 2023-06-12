import React from "react";
import { useContext } from "react";
import { useState } from "react";
import "../firebase";
import {getAuth, 
    createUserWithEmailAndPassword,
     updateProfile, 
     signInWithEmailAndPassword,
     signOut,
     onAuthStateChanged
    } from "firebase/auth";
import { useEffect } from "react";

//the state and status of current user will be stored in context and wrapped by context provider and make them available to the whole app.

const AuthContext = React.createContext();

//a custom hook , when called from anywhere in the application , will give all infos from here by "AuthContext"
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    //for maintaining the loading that will be done when user logs in or signs in as req need to validate by firebase
    const [loading, setLoading] = useState(true);

    //after loading for current user
    const [currentUser, setCurrentUser] = useState(); 

    //now after signup , user logs in and as soon as an user logs in the 'login state' changes and an event handler from firebase named 'onAuthStateChanged()' is called and when logs in is completed 'loading' state is set to false  and
    //as these events are side effect so use 'useEffect()' hook of react
    useEffect( () => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user); //updated current users
            setLoading(false);
        });
        //to prevent memory leaks
        return unsubscribe;

    }, []);




    //signup function
    async function signup(email, password, username){
        //first need an authentication object
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        //we will also give user option for updating profile by updating username 
        await updateProfile(auth.currentUser, {
            displayName: username
        });
        
        //now update the currentUser state locally in our application
        const user = auth.currentUser;
        setCurrentUser({ 
            ...user,
        });




    }

    //login function
    function login(email, password){
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
        //will return a Promise where is has been called
    }

    //logout function
    function logout(){
        const auth = getAuth();
        return signOut(auth);
        //will return a Promise where is has been called

    }


    //now pass everything(all state, current user, login, logout, signup functions) inside the 'value' object and wrap the object by context provider and make accessible from anywhere by calling the 'useAuth()' function

    const value = {
        currentUser,
        signup,
        login, 
        logout,
    };



    return(
        <AuthContext.Provider value={value}>
            {/* children will only be visible after the loading is done  */}
            {!loading && children} 
        </AuthContext.Provider>

    );
}