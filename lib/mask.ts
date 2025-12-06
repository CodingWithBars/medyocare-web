export function maskName(name: string) {
  if (!name) return "";
  const parts = name.split(" ");
  return parts
    .map(p => p[0] + "*".repeat(Math.max(1, p.length - 1)))
    .join(" ");
}

export function maskEmail(email: string) {
  if (!email) return "";
  const [user, domain] = email.split("@");
  const maskedUser = user.slice(0, 3) + "***";
  const [domainName, extension] = domain.split(".");
  const maskedDomain = domainName.slice(0, 3) + "***";
  return `${maskedUser}@${maskedDomain}.${extension}`;
}
