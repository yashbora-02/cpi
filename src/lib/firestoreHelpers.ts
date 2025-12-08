/**
 * Firestore Helper Utilities
 * Client-side Firestore operations and type definitions
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentReference,
  CollectionReference,
  QueryConstraint,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface FirestoreUser {
  id?: string;
  username: string;
  password: string; // Base64 encoded (matching your current system)
  role: 'admin' | 'instructor';
  fullName: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreCredit {
  id?: string;
  userId: string;
  userEmail: string;
  courseType: string;
  credits: number;
  updatedAt: Timestamp;
}

export interface FirestoreDigitalCard {
  id?: string;
  classId: string;
  userId: string;
  userEmail: string;
  program: string;
  site: string;
  classType: string;
  startDate: Timestamp;
  endDate: Timestamp;
  accreditingInstructor: string;
  assistingInstructor: string | null;
  openEnrollment: boolean;
  isLocked: boolean;
  submittedAt: Timestamp;
  submittedBy: string;
  creditsUsed: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreStudent {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  certificateUrl: string | null;
  createdAt: Timestamp;
}

export interface FirestoreTicket {
  id?: string;
  ticketNumber: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  reportedBy: string;
  email: string;
  phone: string;
  fileUrl: string | null;
  fileName: string | null;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreVideo {
  id?: string;
  videoId: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreSavedCard {
  id?: string;
  userId: string;
  userEmail: string;
  cardLastFour: string;
  cardType: string;
  cardholderName: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface FirestoreTransaction {
  id?: string;
  userId: string;
  userEmail: string;
  packageId: string;
  courseType: string;
  credits: number;
  price: number;
  purchaseDate: Timestamp;
  status: 'completed' | 'pending' | 'failed';
}

// ============================================================================
// COLLECTION REFERENCES
// ============================================================================

export const usersCollection = () => collection(db, 'users');
export const creditsCollection = () => collection(db, 'credits');
export const digitalCardsCollection = () => collection(db, 'digitalCards');
export const ticketsCollection = () => collection(db, 'tickets');
export const videosCollection = () => collection(db, 'videos');
export const savedCardsCollection = () => collection(db, 'savedCards');
export const transactionsCollection = () => collection(db, 'transactions');

// Document references
export const userDoc = (userId: string) => doc(db, 'users', userId);
export const creditDoc = (creditId: string) => doc(db, 'credits', creditId);
export const digitalCardDoc = (classId: string) => doc(db, 'digitalCards', classId);
export const ticketDoc = (ticketId: string) => doc(db, 'tickets', ticketId);
export const videoDoc = (videoId: string) => doc(db, 'videos', videoId);
export const savedCardDoc = (cardId: string) => doc(db, 'savedCards', cardId);

// Subcollection references
export const studentsCollection = (classId: string) =>
  collection(db, 'digitalCards', classId, 'students');

// ============================================================================
// GENERIC CRUD OPERATIONS
// ============================================================================

/**
 * Get a single document
 */
export async function getDocument<T>(
  docRef: DocumentReference
): Promise<T | null> {
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as T;
}

/**
 * Update a document
 */
export async function updateDocument(
  docRef: DocumentReference,
  data: Record<string, any>
): Promise<void> {
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

/**
 * Delete a document
 */
export async function deleteDocument(docRef: DocumentReference): Promise<void> {
  await deleteDoc(docRef);
}

/**
 * Query documents with constraints
 */
export async function queryDocuments<T>(
  collectionRef: CollectionReference,
  ...constraints: QueryConstraint[]
): Promise<T[]> {
  const q = query(collectionRef, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert Firestore Timestamp to Date
 */
export function timestampToDate(timestamp: Timestamp | null | undefined): Date | null {
  if (!timestamp) return null;
  return timestamp.toDate();
}

/**
 * Generate unique class ID
 */
export function generateClassId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DC-${timestamp}-${random}`;
}

/**
 * Generate unique ticket number
 */
export function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TICKET-${timestamp}-${random}`;
}
