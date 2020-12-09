import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { Asset } from "../utils/types";

const buildAssetPath = (id: string) => `${id}/${id}-original`;

export const createAsset = async (asset: Asset) => {
  return firebase
    .firestore()
    .collection("Assets")
    .doc(asset.id)
    .set(asset);
};

export const uploadMedia = (id: string, file: any) => {
  const childRef = firebase
    .storage()
    .ref()
    .child(buildAssetPath(id));

  return childRef.put(file);
};

export const getDownloadUrl = (id: string) => {
  return firebase
    .storage()
    .ref()
    .child(buildAssetPath(id))
    .getDownloadURL();
};

export const getAssets = async () => {
  const snapshot = await firebase
    .firestore()
    .collection("Assets")
    .get();
  return snapshot && snapshot.docs ? snapshot.docs.map(doc => doc.data()) : [];
};
