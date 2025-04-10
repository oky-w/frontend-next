export default function convertTime(time) {
  const expiresAt = time;
  const expiresAtDate = new Date(expiresAt);
  const now = new Date();
  const maxAge = Math.abs(Math.floor((expiresAtDate - now) / 1000));

  return maxAge;
}
