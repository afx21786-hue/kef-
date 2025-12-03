import { useQuery } from "@tanstack/react-query";
import { useAuth as useFirebaseAuth } from "@/lib/AuthContext";
import { getIdToken } from "@/lib/firebase";
import type { User } from "@shared/schema";

export function useAuth() {
  const { user: firebaseUser } = useFirebaseAuth();
  
  const { data: dbUser, isLoading } = useQuery<User>({
    queryKey: ["/api/auth/firebase-user", firebaseUser?.uid],
    queryFn: async () => {
      if (!firebaseUser?.uid) return null;
      
      // Get the ID token for authentication
      const idToken = await getIdToken();
      if (!idToken) return null;
      
      const res = await fetch(`/api/auth/firebase-user/${firebaseUser.uid}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });
      if (!res.ok) return null;
      return res.json();
    },
    enabled: !!firebaseUser?.uid,
    retry: false,
  });

  return {
    user: dbUser,
    isLoading,
    isAuthenticated: !!dbUser,
    isAdmin: dbUser?.role === "admin",
  };
}
