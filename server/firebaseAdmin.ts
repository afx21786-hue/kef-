import admin from 'firebase-admin';
import type { RequestHandler } from 'express';
import { storage } from './storage';

const projectId = process.env.VITE_FIREBASE_PROJECT_ID || 'kerala-economic-form';

let isInitialized = false;

function initializeFirebase() {
  if (isInitialized) return;
  
  try {
    admin.initializeApp({
      projectId: projectId,
    });
    isInitialized = true;
    console.log('Firebase Admin SDK initialized');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);
  }
}

initializeFirebase();

export async function verifyFirebaseToken(idToken: string): Promise<admin.auth.DecodedIdToken | null> {
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
