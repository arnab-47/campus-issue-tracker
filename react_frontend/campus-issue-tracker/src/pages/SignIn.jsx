import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  //usestate ---- current state values goes to form data variable that is state --- 
  // formdata --- statevariable,  setformdata ---- is a statefunction
 //useState ---its an hook
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.username || !formData.password) {
      setError("Please enter both username and password.");
      return;
    }

    setSubmitting(true);
    // Real POST /api/auth/login now — the result carries whatever message
    // authController.js sent back ("No account with that username." /
    // "Incorrect password."), so the error shown here is the server's own.
    const result = await login(formData.username, formData.password);
    setSubmitting(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
  }

  return (
    <main>
      <div className="auth-wrap">
        <section className="auth-card">
          <h1>Sign in</h1>
          <p className="subtext">Welcome back — report an issue or check on one you raised.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="riya_sharma"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-text visible">{error}</p>}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="subtext" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
            New here? <Link to="/signup">Create an account</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default SignIn;

//formdata --- statevariable
//setformadata -- state functiton 
//usestate -- hook/built in component

//useeffect --- updtate the state it will auto gives data