/**
 * Firebase Admin SDK
 */
import admin from "firebase-admin";

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
		}),
		databaseURL: process.env.FIREBASE_DATABASE_URL
	});
}

const dbAdmin = admin.firestore();
const authAdmin = admin.auth();

export { dbAdmin, authAdmin };
