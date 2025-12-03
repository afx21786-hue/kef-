// Firebase configuration and authentication setup
import { initializeApp, type FirebaseApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  type User,
  type Auth
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  type Firestore,
  type DocumentData,
  type QueryConstraint
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project"}.firebasestorage.app`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

const isConfigured = !!(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID && 
  import.meta.env.VITE_FIREBASE_APP_ID
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

try {
  if (isConfigured) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  }
} catch (error) {
  console.warn('Firebase initialization failed. Authentication and Firestore features will be disabled.', error);
}

export { auth };

const googleProvider = new GoogleAuthProvider();

// Get the current user's ID token for API authentication
export async function getIdToken(): Promise<string | null> {
  if (!auth?.currentUser) {
    return null;
  }
  try {
    return await auth.currentUser.getIdToken();
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
}

// Sync Firebase user to PostgreSQL database
async function syncUserToDatabase(user: User) {
  try {
    // Get the ID token for authentication
    const idToken = await user.getIdToken();
    
    const response = await fetch('/api/auth/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to sync user to database');
    }
  } catch (error) {
    console.error('Error syncing user to database:', error);
  }
}

export async function signInWithGoogle() {
  if (!auth) {
    return { user: null, error: 'Authentication is not configured. Please contact the administrator.' };
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // Sync user to PostgreSQL database
    await syncUserToDatabase(result.user);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function signInWithEmail(email: string, password: string) {
  if (!auth) {
    return { user: null, error: 'Authentication is not configured. Please contact the administrator.' };
  }
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Sync user to PostgreSQL database
    await syncUserToDatabase(result.user);
    return { user: result.user, error: null };
  } catch (error: any) {
    let message = error.message;
    if (error.code === 'auth/user-not-found') {
      message = 'No account found with this email';
    } else if (error.code === 'auth/wrong-password') {
      message = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    }
    return { user: null, error: message };
  }
}

export async function signUpWithEmail(email: string, password: string) {
  if (!auth) {
    return { user: null, error: 'Authentication is not configured. Please contact the administrator.' };
  }
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Sync user to PostgreSQL database
    await syncUserToDatabase(result.user);
    return { user: result.user, error: null };
  } catch (error: any) {
    let message = error.message;
    if (error.code === 'auth/email-already-in-use') {
      message = 'An account with this email already exists';
    } else if (error.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      message = 'Invalid email address';
    }
    return { user: null, error: message };
  }
}

export async function logOut() {
  if (!auth) {
    return { error: 'Authentication is not configured. Please contact the administrator.' };
  }
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Sync user to database on auth state change
      await syncUserToDatabase(user);
    }
    callback(user);
  });
}

// Firestore exports
export { db };

// Firestore helper functions
export async function addDocument<T extends DocumentData>(
  collectionName: string, 
  data: T
): Promise<{ id: string | null; error: string | null }> {
  if (!db) {
    return { id: null, error: 'Firestore is not configured. Please contact the administrator.' };
  }
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
}

export async function setDocument<T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: T,
  merge: boolean = false
): Promise<{ error: string | null }> {
  if (!db) {
    return { error: 'Firestore is not configured. Please contact the administrator.' };
  }
  try {
    await setDoc(doc(db, collectionName, docId), {
      ...data,
      updatedAt: serverTimestamp()
    }, { merge });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getDocument<T = DocumentData>(
  collectionName: string,
  docId: string
): Promise<{ data: T | null; error: string | null }> {
  if (!db) {
    return { data: null, error: 'Firestore is not configured. Please contact the administrator.' };
  }
  try {
    const docSnap = await getDoc(doc(db, collectionName, docId));
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() } as T, error: null };
    }
    return { data: null, error: 'Document not found' };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function getDocuments<T = DocumentData>(
  collectionName: string,
  ...queryConstraints: QueryConstraint[]
): Promise<{ data: T[]; error: string | null }> {
  if (!db) {
    return { data: [], error: 'Firestore is not configured. Please contact the administrator.' };
  }
  try {
    const q = query(collection(db, collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    return { data: docs, error: null };
  } catch (error: any) {
    return { data: [], error: error.message };
  }
}

export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<{ error: string | null }> {
  if (!db) {
    return { error: 'Firestore is not configured. Please contact the administrator.' };
  }
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<{ error: string | null }> {
  if (!db) {
    return { error: 'Firestore is not configured. Please contact the administrator.' };
  }
  try {
    await deleteDoc(doc(db, collectionName, docId));
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export function subscribeToCollection<T = DocumentData>(
  collectionName: string,
  callback: (data: T[]) => void,
  ...queryConstraints: QueryConstraint[]
): () => void {
  if (!db) {
    callback([]);
    return () => {};
  }
  const q = query(collection(db, collectionName), ...queryConstraints);
  return onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
    callback(docs);
  });
}

export function subscribeToDocument<T = DocumentData>(
  collectionName: string,
  docId: string,
  callback: (data: T | null) => void
): () => void {
  if (!db) {
    callback(null);
    return () => {};
  }
  return onSnapshot(doc(db, collectionName, docId), (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() } as T);
    } else {
      callback(null);
    }
  });
}

// Re-export Firestore query helpers for use in components
export { collection, doc, query, where, orderBy, limit, serverTimestamp };

export type { User, DocumentData };
