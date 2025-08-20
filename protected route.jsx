import { Navigate, useLocation } from "react-router-dom";
import { getAuthed } from "../utils/storage.js";

export default function ProtectedRoute({ children }) {
  const authed = !!getAuthed();
  const loc = useLocation();
  if (!authed) return <Navigate to="/login" replace state={{ from: loc }} />;
  return children;
}
