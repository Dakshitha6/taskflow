"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/services/firebase.config";
import SplashScreen from "@/components/SplashScreen";

export interface AuthContextType {
  user: User | null | undefined;
  token: string | null;
  refreshToken?: () => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken();
        setUser(currentUser);
        setToken(idToken);
        router.push("/dashboard");
      } else {
        setUser(null);
        setToken(null);
        if (path !== "/login" && path !== "/signup") {
          router.push("/login");
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
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, logout }}>
      {user === undefined ? (
        <SplashScreen />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Component is not wrapped within AuthProvider");
  }
  return context;
};
