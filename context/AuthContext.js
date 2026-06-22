import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

const emailRedirectUrl =
  process.env.EXPO_PUBLIC_AUTH_REDIRECT_URL ||
  "http://localhost:8081";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const {
        data: { session: currentSession },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      setSession(currentSession);
    } catch (error) {
      console.error("Session load error:", error);
      setSession(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    refreshSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!isMounted) {
          return;
        }

        setSession(nextSession);
        setIsAuthLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [refreshSession]);

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: emailRedirectUrl,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }
  }, []);

  const value = useMemo(() => {
    return {
      session,
      user: session?.user || null,
      isAnonymous: Boolean(session?.user?.is_anonymous),
      isAuthLoading,
      signUp,
      signIn,
      signOut,
    };
  }, [
    isAuthLoading,
    session,
    signIn,
    signOut,
    signUp,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
}