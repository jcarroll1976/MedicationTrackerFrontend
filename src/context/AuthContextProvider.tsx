
import { ReactNode, useContext, useEffect, useState }
    from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import AuthContext from './AuthContext';

function AuthContextProvider({children}: {children: ReactNode}) {
 const [ user, setUser ] = useState<User | null>(null);

 useEffect(() => { // useEffect to only register once at start
   return auth.onAuthStateChanged(newUser => {
     setUser(newUser);
   });
 }, []);

 return (
   <AuthContext.Provider value={{ user }}>
     {children}
   </AuthContext.Provider>
 );
};
export default AuthContextProvider;

