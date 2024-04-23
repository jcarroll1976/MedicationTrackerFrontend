
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from
  "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyDZlOXTOn9fZAPFwWbR8LCXqSNhfEnfdXM",
    authDomain: "health-app-65191.firebaseapp.com",
    projectId: "health-app-65191",
    storageBucket: "health-app-65191.appspot.com",
    messagingSenderId: "357202564507",
    appId: "1:357202564507:web:3e054af90d668e88993d3e"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const authProvider = new GoogleAuthProvider();

export function signInWithGoogle(): void {
 signInWithPopup(auth, authProvider);
}
export function signOut(): void {
 auth.signOut();
}

