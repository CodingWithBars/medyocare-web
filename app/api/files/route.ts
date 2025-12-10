import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DATABASE_NAME = "medcare_db";
const client = new MongoClient(MONGODB_URI);
let db: any;

async function getDb() {
  if (!db) {
    await client.connect();
    db = client.db(DATABASE_NAME);
  }
  return db;
}

export async function GET(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get("student_id") || "unknown";
    const db = await getDb();
    const files = await db
      .collection("medicalFiles.files")
      .find({ "metadata.student_id": studentId })
      .sort({ uploadDate: -1 })
      .toArray();

    // Map with explicit type
    return NextResponse.json({
      success: true,
      files: files.map((f: { filename: string; metadata: any }) => ({
        filename: f.filename,
        metadata: f.metadata,
      })),
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
