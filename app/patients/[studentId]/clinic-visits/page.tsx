import { getAppointments } from "@/lib/getAppointments";
import ClinicVisitsList from "@/components/ClinicVisitsList";

export default async function ClinicVisitsPage({ params }: any) {
  const visits = await getAppointments(params.studentId);

  return (
    <div className="p-6">
      <ClinicVisitsList visits={visits} />
    </div>
  );
}
