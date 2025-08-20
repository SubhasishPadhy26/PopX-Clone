const KEYS = {
  USERS: "px_users",
  AUTH: "px_auth", 
};

export function getUsers() {
  try { return JSON.parse(localStorage.getItem(KEYS.USERS)) || []; }
  catch { return []; }
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(KEYS.USERS, JSON.stringify(users));
}

export function findUserByEmail(email) {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function setAuthed(email) {
  localStorage.setItem(KEYS.AUTH, email);
}

export function getAuthed() {
  return localStorage.getItem(KEYS.AUTH);
}

export function clearAuth() {
  localStorage.removeItem(KEYS.AUTH);
}

export function login(email, password) {
  const u = findUserByEmail(email);
  if (!u) return { ok:false, message:"User not found" };
  if (u.password !== password) return { ok:false, message:"Incorrect password" };
  setAuthed(u.email);
  return { ok:true, user:u };
}

export function getAuthedUser() {
  const email = getAuthed();
  if (!email) return null;
  return findUserByEmail(email) || null;
}

