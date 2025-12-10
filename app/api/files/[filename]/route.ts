// app/api/files/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, GridFSBucket } from "mongodb";

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

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  if (!filename) return NextResponse.json({ success: false, error: "Missing filename" }, { status: 400 });

  try {
    const db = await getDb();
    const bucket = new GridFSBucket(db, { bucketName: "medicalFiles" });
    const downloadStream = bucket.openDownloadStreamByName(filename);

    // Convert Node stream to Web ReadableStream
    const readableStream = new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) => controller.enqueue(chunk));
        downloadStream.on("error", (err) => controller.error(err));
        downloadStream.on("end", () => controller.close());
      },
    });

    return new Response(readableStream, {
      headers: { "Content-Type": "application/octet-stream" },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
