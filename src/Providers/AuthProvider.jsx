import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import app from "./../Firebase/firebase.config";


export const AuthContext = createContext(null);

const auth = getAuth(app);

// Adding Google Scopes to ensure profile info is fetched
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("profile");
googleProvider.addScope("email");

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up with email and password, including photoURL
  const createUser = async (email, password, displayName, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update user profile with display name and photo URL
      await user.updateProfile({
        displayName: displayName,
        photoURL: photoURL,
      });
  
      console.log('User registered:', user);
      setUser(user);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = userCredential.user;

    console.log("User logged in:", loggedInUser); // Log user info on successful login
    setUser(loggedInUser); // Set user state
    setLoading(false);
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true); // Set loading state to true
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const googleUser = userCredential.user;
  
      console.log("User logged in with Google:", googleUser); // Log user info on Google login
      setUser(googleUser); // Set user state
      return googleUser; // Return googleUser for further use
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      // Handle any errors that occur during sign-in
      throw error; // Rethrow the error to be caught in the calling function
    } finally {
      setLoading(false); // Always set loading state to false at the end
    }
  };
  
  

  // Log out
  const logOut = async () => {
    setLoading(true);
    await signOut(auth);
    console.log("User logged out"); // Log logout action
    setUser(null); // Clear user state
    setLoading(false);
  };

  // Listen to auth state changes
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        console.log("User state changed:", currentUser); // Log user state changes
      } else {
        console.log("No user is logged in"); // Log when no user is logged in
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    signInWithGoogle,
    signIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
