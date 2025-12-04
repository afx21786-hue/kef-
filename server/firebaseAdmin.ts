import admin from 'firebase-admin';
import type { RequestHandler } from 'express';

function ensureInitialized() {
  try {
    admin.app();
  } catch {
    const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'kerala-economic-form';
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      try {
        // Handle potential escape issues with the JSON
        let cleanedKey = serviceAccountKey.trim();
        if (cleanedKey.startsWith('"') && cleanedKey.endsWith('"')) {
          cleanedKey = cleanedKey.slice(1, -1);
        }
        cleanedKey = cleanedKey.replace(/\\n/g, '\n');
        
        const serviceAccount = JSON.parse(cleanedKey);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id || projectId,
        });
      } catch (parseError) {
        console.error('Failed to parse service account key:', parseError);
        admin.initializeApp({ projectId: projectId });
      }
    } else {
      admin.initializeApp({ projectId: projectId });
    }
    console.log('Firebase Admin SDK initialized');
  }
}

export function getFirestoreDb() {
  ensureInitialized();
  return admin.firestore();
}

export async function verifyFirebaseToken(idToken: string): Promise<admin.auth.DecodedIdToken | null> {
  ensureInitialized();
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return null;
  }
}

export const requireFirebaseAuth: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await verifyFirebaseToken(idToken);
    
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
    (req as any).firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error('Error in Firebase auth middleware:', error);
    return res.status(401).json({ message: "Unauthorized: Token verification failed" });
  }
};

export const requireFirebaseAdmin: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  
  const idToken = authHeader.split('Bearer ')[1];
  
  try {
    const decodedToken = await verifyFirebaseToken(idToken);
    
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    
    const { storage } = await import('./storage');
    const dbUser = await storage.getUser(decodedToken.uid);
    
    if (!dbUser || dbUser.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    
    (req as any).firebaseUser = decodedToken;
    (req as any).dbUser = dbUser;
    next();
  } catch (error) {
    console.error('Error in Firebase admin middleware:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
