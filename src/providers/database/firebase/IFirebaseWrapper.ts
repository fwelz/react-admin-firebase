import { RAFirebaseOptions } from "providers/RAFirebaseOptions";
import * as firebase from "firebase/app";

export interface IFirebaseWrapper {
  init(firebaseConfig: {}, options: RAFirebaseOptions): void;
  db(): firebase.firestore.Firestore;
  storage(): firebase.storage.Storage;
  auth(): firebase.auth.Auth;
  serverTimestamp(): any;
}