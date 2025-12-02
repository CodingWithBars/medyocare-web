import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("medcare_db");
    const count = await db.collection("patients").countDocuments();

    return Response.json({ ok: true, count });
  } catch (err) {
    return Response.json({ ok: false, error: err.message });
  }
}
