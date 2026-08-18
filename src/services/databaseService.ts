import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch,
  query,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db, FIREBASE_PROJECT_ID, FIRESTORE_DB_NAME } from '../lib/firebase';
import { Booking, CalendarDateOverride } from '../types';
import { INITIAL_BOOKINGS, INITIAL_DATE_OVERRIDES } from '../data/weddingData';

export const BOOKINGS_COLLECTION = 'bookings';
export const DATE_OVERRIDES_COLLECTION = 'calendarDateOverrides';

/**
 * Real-time listener for Bookings in Cloud Firestore
 */
export const subscribeToBookings = (
  onUpdate: (bookings: Booking[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const colRef = collection(db, BOOKINGS_COLLECTION);
    const q = query(colRef);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate([]);
          return;
        }

        const bookings: Booking[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            customerName: data.customerName || '',
            brideName: data.brideName || '',
            groomName: data.groomName || '',
            mobile: data.mobile || '',
            whatsapp: data.whatsapp || '',
            email: data.email || '',
            weddingDate: data.weddingDate || '',
            eventDate: data.eventDate || data.weddingDate || '',
            eventType: data.eventType || 'Wedding Ceremony',
            venue: data.venue || '',
            city: data.city || 'Sirhind',
            selectedPackage: data.selectedPackage || '',
            packagePrice: Number(data.packagePrice) || 0,
            numberOfEvents: Number(data.numberOfEvents) || 1,
            specialRequirements: data.specialRequirements || '',
            advancePayment: Number(data.advancePayment) || 0,
            remainingAmount: Number(data.remainingAmount) || 0,
            bookingNotes: data.bookingNotes || '',
            status: data.status || 'CONFIRMED',
            createdAt: data.createdAt || new Date().toISOString().split('T')[0],
            functions: data.functions || [],
            invoiceNumber: data.invoiceNumber,
            agreementNumber: data.agreementNumber,
            agreementDate: data.agreementDate,
            paymentMethod: data.paymentMethod,
            discountAmount: data.discountAmount,
          } as Booking;
        });

        // Sort latest created first or by wedding date
        bookings.sort((a, b) => (b.weddingDate || '').localeCompare(a.weddingDate || ''));
        onUpdate(bookings);
      },
      (error) => {
        console.error('Error in Firestore bookings subscription:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Failed to setup bookings subscription:', error);
    if (onError && error instanceof Error) onError(error);
    return () => {};
  }
};

/**
 * Real-time listener for Calendar Date Overrides in Cloud Firestore
 */
export const subscribeToDateOverrides = (
  onUpdate: (overrides: CalendarDateOverride[]) => void,
  onError?: (error: Error) => void
) => {
  try {
    const colRef = collection(db, DATE_OVERRIDES_COLLECTION);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate([]);
          return;
        }

        const overrides: CalendarDateOverride[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            date: docSnap.id,
            status: data.status || 'AVAILABLE',
            notes: data.notes || '',
          };
        });

        onUpdate(overrides);
      },
      (error) => {
        console.error('Error in Firestore date overrides subscription:', error);
        if (onError) onError(error);
      }
    );

    return unsubscribe;
  } catch (error) {
    console.error('Failed to setup date overrides subscription:', error);
    if (onError && error instanceof Error) onError(error);
    return () => {};
  }
};

/**
 * Save / Create Booking to Cloud Firestore backend
 */
export const saveBookingToDb = async (booking: Booking): Promise<void> => {
  const docId = booking.id;
  const docRef = doc(db, BOOKINGS_COLLECTION, docId);

  // Clean data for Firestore
  const dataToSave = {
    ...booking,
    updatedAt: new Date().toISOString(),
  };

  await setDoc(docRef, dataToSave, { merge: true });

  // Automatically sync calendar date override for the booked wedding date
  if (booking.weddingDate && booking.status === 'CONFIRMED') {
    await saveDateOverrideToDb({
      date: booking.weddingDate,
      status: 'BOOKED',
      notes: `${booking.customerName} (${booking.selectedPackage})`,
    });
  } else if (booking.weddingDate && booking.status === 'HOLD') {
    await saveDateOverrideToDb({
      date: booking.weddingDate,
      status: 'HOLD',
      notes: `${booking.customerName} (Tentative Hold)`,
    });
  }
};

/**
 * Update Booking in Cloud Firestore backend
 */
export const updateBookingInDb = async (id: string, updates: Partial<Booking>): Promise<void> => {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Delete Booking from Cloud Firestore backend
 */
export const deleteBookingFromDb = async (id: string): Promise<void> => {
  const docRef = doc(db, BOOKINGS_COLLECTION, id);
  await deleteDoc(docRef);
};

/**
 * Save Date Override to Cloud Firestore backend
 */
export const saveDateOverrideToDb = async (override: CalendarDateOverride): Promise<void> => {
  const docRef = doc(db, DATE_OVERRIDES_COLLECTION, override.date);
  await setDoc(docRef, {
    date: override.date,
    status: override.status,
    notes: override.notes || '',
    updatedAt: new Date().toISOString(),
  }, { merge: true });
};

/**
 * Delete Date Override from Cloud Firestore backend
 */
export const deleteDateOverrideFromDb = async (date: string): Promise<void> => {
  const docRef = doc(db, DATE_OVERRIDES_COLLECTION, date);
  await deleteDoc(docRef);
};

/**
 * Initialize / Seed Cloud Database with Studio Data if collection is empty
 */
export const seedInitialDatabaseIfEmpty = async (): Promise<{ seeded: boolean; bookingsCount: number; overridesCount: number }> => {
  try {
    const bookingsSnap = await getDocs(collection(db, BOOKINGS_COLLECTION));
    const overridesSnap = await getDocs(collection(db, DATE_OVERRIDES_COLLECTION));

    let seeded = false;
    const batch = writeBatch(db);

    if (bookingsSnap.empty) {
      for (const booking of INITIAL_BOOKINGS) {
        const bRef = doc(db, BOOKINGS_COLLECTION, booking.id);
        batch.set(bRef, {
          ...booking,
          updatedAt: new Date().toISOString(),
        });
      }
      seeded = true;
    }

    if (overridesSnap.empty) {
      for (const override of INITIAL_DATE_OVERRIDES) {
        const oRef = doc(db, DATE_OVERRIDES_COLLECTION, override.date);
        batch.set(oRef, {
          date: override.date,
          status: override.status,
          notes: override.notes || '',
          updatedAt: new Date().toISOString(),
        });
      }
      seeded = true;
    }

    if (seeded) {
      await batch.commit();
    }

    return {
      seeded,
      bookingsCount: bookingsSnap.size || INITIAL_BOOKINGS.length,
      overridesCount: overridesSnap.size || INITIAL_DATE_OVERRIDES.length,
    };
  } catch (error) {
    console.error('Error seeding initial Firestore database:', error);
    throw error;
  }
};

/**
 * Reset / Re-seed Cloud Database with Default Studio Records
 */
export const resetDatabaseToDefaults = async (): Promise<void> => {
  // Clear existing
  const bookingsSnap = await getDocs(collection(db, BOOKINGS_COLLECTION));
  const overridesSnap = await getDocs(collection(db, DATE_OVERRIDES_COLLECTION));

  const deleteBatch = writeBatch(db);
  bookingsSnap.docs.forEach((d) => deleteBatch.delete(d.ref));
  overridesSnap.docs.forEach((d) => deleteBatch.delete(d.ref));
  await deleteBatch.commit();

  // Re-seed
  const seedBatch = writeBatch(db);
  for (const booking of INITIAL_BOOKINGS) {
    const bRef = doc(db, BOOKINGS_COLLECTION, booking.id);
    seedBatch.set(bRef, {
      ...booking,
      updatedAt: new Date().toISOString(),
    });
  }
  for (const override of INITIAL_DATE_OVERRIDES) {
    const oRef = doc(db, DATE_OVERRIDES_COLLECTION, override.date);
    seedBatch.set(oRef, {
      date: override.date,
      status: override.status,
      notes: override.notes || '',
      updatedAt: new Date().toISOString(),
    });
  }
  await seedBatch.commit();
};

/**
 * Export Full Database JSON
 */
export const exportDatabaseData = async () => {
  const bookingsSnap = await getDocs(collection(db, BOOKINGS_COLLECTION));
  const overridesSnap = await getDocs(collection(db, DATE_OVERRIDES_COLLECTION));

  const bookings = bookingsSnap.docs.map((d) => d.data());
  const overrides = overridesSnap.docs.map((d) => d.data());

  return {
    studio: 'SONY PHOTOGRAPHY SIRHIND',
    projectId: FIREBASE_PROJECT_ID,
    databaseId: FIRESTORE_DB_NAME,
    exportedAt: new Date().toISOString(),
    totalBookings: bookings.length,
    totalDateOverrides: overrides.length,
    bookings,
    calendarDateOverrides: overrides,
  };
};
