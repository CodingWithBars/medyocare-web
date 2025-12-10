import clientPromise from "./mongodb";
import { Db } from "mongodb";

export interface Appointment {
  _id?: string;
  id: string;
  student_name: string;
  student_id: string;
  visit_time: string;
  status: string;
  reason: string;
  recommendation: string;
  created_at: string;
}

export async function getAppointments(studentId?: string): Promise<Appointment[]> {
  const client = await clientPromise;
  const db: Db = client.db("medcare_db");

  const query = studentId ? { student_id: studentId } : {};

  const appointments = await db
    .collection("appointments")
    .find(query)
    .sort({ created_at: -1 })
    .toArray();

  return appointments.map((v: any) => ({
    id: v.id,
    student_name: v.student_name,
    student_id: v.student_id,
    visit_time: v.visit_time,
    status: v.status,
    reason: v.reason,
    recommendation: v.recommendation,
    created_at: v.created_at,
  }));
}
