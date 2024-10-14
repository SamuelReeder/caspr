import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { AuthenticatedUser, User } from "@/types";

const AuthContext = createContext<AuthenticatedUser>({ firebaseUser: null, firestoreUser: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
	const [firestoreUser, setFirestoreUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  const unsubscribe = onAuthStateChanged(auth, async (user) => {
		setFirebaseUser(user);
		setLoading(false);
	  });
  
	  return () => unsubscribe();
	}, []);
  
	return (
	  <AuthContext.Provider value={{ firebaseUser, firestoreUser, loading }}>
		{children}
	  </AuthContext.Provider>
	);
  };
  
  export const useAuth = () => useContext(AuthContext);