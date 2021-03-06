import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "../../firebase.config"
import React, { useState, createContext, useContext, useEffect } from "react";
import {
    Route, Redirect
} from "react-router-dom";

firebase.initializeApp(firebaseConfig)

const AuthContext= createContext();

export const AuthContextProvider=(props)=>{
    const auth=Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext)
}

export const PrivateRoute = ({ children, ...rest }) =>{
    const auth=useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

const getUser=(user)=>{
    const {displayName, email, photoURL}=user
    return {name: displayName, email, photo: photoURL}
}



const Auth=()=>{
    const [user, setUser]=useState(null);

    // const [user, setUser]= useState({
    //   isSignedIn: false,
    //   name: '',
    //   email: '',
    //   photoURL: ''
    // });
    
    const signInwithGoogle=()=>{
      const provider = new firebase.auth.GoogleAuthProvider();
    
      return firebase.auth().signInWithPopup(provider)
      .then(res=>{
          const signedInUser= getUser(res.user)
          setUser(signedInUser)
          return res.user
      })
      .catch(err=>{
          // console.log(err)
          setUser(null)
          return err.message
      })
    }
    
    const signOut=()=>{
      return firebase.auth().signOut()
      .then(()=> {
          setUser(null)
          return true
      }).catch(err =>{
          console.log(err)
          return false
      });
    }
    

    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const currUser=getUser(user)
                setUser(currUser);
            } else {
              // No user is signed in.
            }
          });
    },[])

    return({
        user,
        signInwithGoogle,
        signOut
      }
      )
}

export default Auth;