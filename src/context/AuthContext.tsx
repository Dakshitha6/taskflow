'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/services/firebase.config';

interface AuthContextType {
  user: User | null;
  token: string | null;
  refreshToken: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider= ({ children }:any) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const path=usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (path === '/signup') return;

      if (currentUser) {
        setUser(currentUser);
        const idToken = await currentUser.getIdToken();
        setToken(idToken);
        router.push('/dashboard'); 
      } else {
        setUser(null);
        setToken(null);
        if (path !== '/login') {
          router.push('/login');
        }
      }
    });
  
    return () => unsubscribe();
  }, [router]);

  const refreshToken = async () => {
    if (user) {
      const idToken = await user.getIdToken(true); 
      setToken(idToken);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('Component is not wrapped within AuthProvider');
  }
  return context;
};
