import { initializeApp, getApp, getApps } from "firebase/app";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getStorage } from "firebase/storage";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";
import { Platform } from "react-native";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  // databaseURL: FIREBASE_DATABASE_URL,
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

const uploadToFirebase = async (blob, path, onProgress) => {
  console.log('hello from fb')
  
  const fetchResponse = Platform.OS === 'ios' ? await fetch(blob) : blob;
  const theBlob = await fetchResponse.blob();
  const storageRef = ref(storage, `${path}`);
  const uploadTask = uploadBytesResumable(storageRef, theBlob);


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
        console.log(error, 'from fb');
        reject(error);
      },
      async () => {
        console.log("Uploaded a blob or file!");
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          url,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export { storage, fbApp, uploadToFirebase };
