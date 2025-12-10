import { NextResponse } from "next/server";
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

export async function GET(req: Request, { params }: { params: { filename: string } }) {
  try {
    const { filename } = params;
    if (!filename) return NextResponse.json({ success: false, error: "No filename provided" }, { status: 400 });

    const db = await getDb();
    const bucket = new GridFSBucket(db, { bucketName: "medicalFiles" });

    const files = await bucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, error: "File not found" }, { status: 404 });
    }

    const downloadStream = bucket.openDownloadStreamByName(filename);
    const chunks: Uint8Array[] = [];

    downloadStream.on("data", (chunk) => chunks.push(chunk));
    downloadStream.on("error", (err) => {
      console.error(err);
      return NextResponse.json({ success: false, error: "Failed to read file" }, { status: 500 });
    });

    return new Promise<NextResponse>((resolve) => {
      downloadStream.on("end", () => {
        const buffer = Buffer.concat(chunks);
        resolve(
          new NextResponse(buffer, {
            status: 200,
            headers: {
              "Content-Type": "image/*", // fallback content type
            },
          })
        );
      });
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message || "Server error" }, { status: 500 });
  }
}
