import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, findUserByEmail, setAuthed } from "../utils/storage.js";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "", password: "", company: "", isAgency: "yes"
  });
  const [error, setError] = useState("");

  function set(k, v){ setForm(p => ({...p, [k]: v})); }

  function validate(){
    if(!form.fullName || !form.phone || !form.email || !form.password) return "All * fields are required";
    if(!/^\S+@\S+\.\S+$/.test(form.email)) return "Enter a valid email";
    if(form.password.length < 6) return "Password must be 6+ chars";
    if(findUserByEmail(form.email)) return "User with this email already exists";
    return "";
  }

  function onSubmit(e){
    e.preventDefault();
    const v = validate();
    if(v){ setError(v); return; }
    // Save
    saveUser({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,           // plain text for assignment demo only
      company: form.company.trim(),
      isAgency: form.isAgency === "yes",
      bio: "Lorem ipsum dolor sit amet, Consetetur Sadipscing Elitr..."
    });
    setAuthed(form.email.trim().toLowerCase());
    nav("/profile");
  }

  return (
    <div className="center">
      <div className="card">
        <h1 className="h1">Create your<br/>PopX account</h1>

        <form onSubmit={onSubmit}>
          <div className="field">
            <label className="label">Full Name*</label>
            <input className="input" value={form.fullName}
              onChange={e=>set("fullName", e.target.value)} placeholder="Marry Doe" />
          </div>

          <div className="field">
            <label className="label">Phone number*</label>
            <input className="input" value={form.phone}
              onChange={e=>set("phone", e.target.value)} placeholder="9876543210" />
          </div>

          <div className="field">
            <label className="label">Email address*</label>
            <input className="input" type="email" value={form.email}
              onChange={e=>set("email", e.target.value)} placeholder="marry@doe.com" />
          </div>

          <div className="field">
            <label className="label">Password*</label>
            <input className="input" type="password" value={form.password}
              onChange={e=>set("password", e.target.value)} placeholder="Create a password" />
          </div>

          <div className="field">
            <label className="label">Company name</label>
            <input className="input" value={form.company}
              onChange={e=>set("company", e.target.value)} placeholder="Acme Inc." />
          </div>

          <div className="field">
            <label className="label">Are you an Agency?*</label>
            <div className="radio-row">
              <label><input type="radio" name="agency" value="yes"
                checked={form.isAgency==="yes"} onChange={e=>set("isAgency", e.target.value)} /> Yes</label>
              <label><input type="radio" name="agency" value="no"
                checked={form.isAgency==="no"} onChange={e=>set("isAgency", e.target.value)} /> No</label>
            </div>
          </div>

          {error && <div className="error">{error}</div>}

          <button className="btn btn-primary mt16" type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}
