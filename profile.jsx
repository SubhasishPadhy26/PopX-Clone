import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthedUser, clearAuth } from "../utils/storage.js";

export default function Profile() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(()=>{ setUser(getAuthedUser()); },[]);

  if(!user) return null;

  const initials = user.fullName?.trim()?.[0]?.toUpperCase() || "U";

  return (
    <div className="center">
      <div className="card">
        <h1 className="h1">Account Settings</h1>

        <div className="profile-card mt8">
          <div className="avatar">{initials}</div>
          <div>
            <div style={{fontWeight:800}}>{user.fullName}</div>
            <div style={{color:"#6b7280", marginTop:4}}>{user.email}</div>
            <div className="mt8">
              <span className="badge">{user.isAgency ? "Agency" : "Individual"}</span>
            </div>
            <p className="p" style={{marginTop:10}}>
              Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr,
              Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore
              Magna Aliquyam Erat, Sed Diam
            </p>
          </div>
        </div>

        <button
          className="logout"
          onClick={() => { clearAuth(); nav("/"); }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
