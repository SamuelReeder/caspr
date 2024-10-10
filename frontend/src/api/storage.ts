/**
 * Storage related functions. ie. upload, download, etc.
 */

import { app, db, auth } from "@/config/firebaseConfig";
import * as storage from "firebase/storage"; // change this

/**
 * Upload a file to Firebase Storage.
 * @param file - The file to upload.
 * @param path - The path to store the file in.
 * @returns A promise that resolves to the download URL of the uploaded file.
 * @Jaeyong
 */
export const uploadFile = async (file: File, path: string): Promise<any> => {

};