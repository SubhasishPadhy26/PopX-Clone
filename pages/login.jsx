import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="center">
      <div className="card">
        <div className="header-dot">1</div>
        <h1 className="h1">Welcome to PopX</h1>
        <p className="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <button className="btn btn-primary" onClick={() => nav("/signup")}>
          Create Account
        </button>

        <button className="btn btn-ghost mt8" onClick={() => nav("/login")}>
          Already Registered? Login
        </button>
      </div>
    </div>
  );
}
