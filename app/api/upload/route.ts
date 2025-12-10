// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, GridFSBucket } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = "medcare_db";
const client = new MongoClient(MONGODB_URI);
let db: any;

// Helper to get DB connection
async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db(DATABASE_NAME);
  }
  return db;
}

// POST handler for file uploads
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const studentId = (formData.get("student_id") as string) || "unknown";
    const type = (formData.get("type") as string) || "Unknown";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const db = await getDb();
    const bucket = new GridFSBucket(db, { bucketName: "medicalFiles" });

    // Generate unique filename (similar to JavaFX)
    const filename = `patient_${studentId}_${Date.now()}_${file.name}`;

    // Metadata
    const metadata = {
      student_id: studentId,
      type,
      original_filename: file.name,
      upload_date: new Date().toISOString(),
    };

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(filename, { metadata });
    uploadStream.end(buffer);

    // Wait for upload to finish
    await new Promise<void>((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    return NextResponse.json({
      success: true,
      file: {
        filename,
        student_id: studentId,
        type,
        original_filename: file.name,
        upload_date: metadata.upload_date,
      },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
