// utils/fetchStudent.ts
export async function fetchStudent(studentId: string) {
  try {
    const res = await fetch(`/api/students/${studentId}`);
    if (!res.ok) throw new Error("Failed to fetch student data");
    const data = await res.json();

    // Convert MongoDB binary images to base64 URLs
    if (data.profile_image?.$binary?.base64) {
      data.profileImageUrl = `data:image/jpeg;base64,${data.profile_image.$binary.base64}`;
    }

    if (data.qr_code?.$binary?.base64) {
      data.qrCodeUrl = `data:image/png;base64,${data.qr_code.$binary.base64}`;
    }

    if (data.documents?.length) {
      data.documents = data.documents.map((doc: any) => ({
        ...doc,
        fileUrl: doc.file_path?.$binary?.base64
          ? `data:image/jpeg;base64,${doc.file_path.$binary.base64}`
          : "/default-file.png",
      }));
    }

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}
