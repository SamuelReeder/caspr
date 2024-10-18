// fetchCollection.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface GraphMetadata {
  id: string;
  title: string;
  description: string;
}

const fetchGraphMetadata = async (): Promise<GraphMetadata[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "graph_metadata"));
    const metadata: GraphMetadata[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as GraphMetadata));

    return metadata;
  } catch (error) {
    console.error("Error fetching Graph Metadata:", error);
    throw error;
  }
};

export default fetchGraphMetadata;
