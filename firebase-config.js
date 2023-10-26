import { initializeApp, getApp, getApps } from "firebase/app";
import { PhoneAuthProvider, getAuth } from "firebase/auth"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getStorage } from "firebase/storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const storage = getStorage();
const fbAuth = getAuth(fbApp);

const uploadToFirebase = async (blob, path, onProgress) => {
  const response = await fetch(blob);
  const blobData = await response.blob();
  console.log("Uploading file to Firebase:", blobData);

  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, blobData);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        onProgress && onProgress(progress);
      },
      (error) => {
        console.error("Error uploading file to Firebase:", error);
        reject(error);
      },
      async () => {
        console.log("File uploaded to Firebase successfully!");
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

const fbOtp = async (phone, recaptchaVerifier) => {
  const phoneProvider = new PhoneAuthProvider(fbAuth);
  const verificationId = await phoneProvider.verifyPhoneNumber(
    phone,
    recaptchaVerifier.current
  );
  return verificationId;
}

export { storage, fbApp, uploadToFirebase, fbAuth, fbOtp };
