// app/api/transactions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // ⬅ correct relative path
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("medyo_care");

  const transactions = await db
    .collection("transactions")
    .find({ studentId: session.user.id })
    .sort({ date: -1 })
    .toArray();

  return NextResponse.json(transactions);
}
