import { Timestamp } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";

/**
 * Represents a user object from a Firebase document. Not to be confused with Firebase Auth's User object.
 */
export interface User {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  createdAt: Timestamp;
  roles: string[];
}

export interface AuthenticatedUser {
  firebaseUser: FirebaseUser | null;
  firestoreUser: User | null;
  loading: boolean;
}
