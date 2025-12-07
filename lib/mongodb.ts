// lib/mongodb.ts
import { MongoClient, Db, Collection } from "mongodb";

// Ensure environment variable is set
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ Please add your MongoDB URI to .env");
}

const options = {}; // Add any MongoClient options here if needed

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Global variable for caching in development
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Define your TypeScript interface for a student
export interface Student {
  _id?: string;
  student_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  date_of_birth: string;
  blood_type: string;
  allergies: string;
  medical_history: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  profile_image?: {
    $binary: { base64: string; subType?: string };
  };
}

// Helper function to get the database and collection
export async function getStudentCollection(): Promise<Collection<Student>> {
  const client = await clientPromise;
  const db: Db = client.db(); // Default database from URI
  return db.collection<Student>("students"); // Your collection name
}

export default clientPromise;
