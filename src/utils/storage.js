const USER_KEY = "user";
const PENDING_REGISTRATION_KEY = "pendingUserRegistration";

export function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getPendingRegistration() {
  const rawUser = sessionStorage.getItem(PENDING_REGISTRATION_KEY);
  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser);
  } catch {
    sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
    return null;
  }
}

export function setPendingRegistration(user) {
  sessionStorage.setItem(PENDING_REGISTRATION_KEY, JSON.stringify(user));
}

export function clearPendingRegistration() {
  sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
}

export function clearSessionStorage() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("sessionId");
  sessionStorage.clear();
}
