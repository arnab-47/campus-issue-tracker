import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const initialForm = {
  fullname: "",
  username: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const { fullname, username, email, role, password, confirmPassword } = formData;

    if (!fullname || !username || !email || !role) {
      setError("Please fill in every field.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    // confirmPassword never leaves the browser — the API has no use for it,
    // it only exists so this form can catch a typo before submitting.
    const result = await register({ fullname, username, email, password, role });
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
          <h1>Create your account</h1>
          <p className="subtext">Report issues. Track fixes. Keep campus running.</p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Riya Sharma"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

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
              <label htmlFor="email">College Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="riya@college.edu"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Register as</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange}>
                <option value="" disabled>
                  Choose a role
                </option>
                <option value="student">Student</option>
                <option value="admin">Hostel Admin</option>
              </select>
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

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {error && <p className="error-text visible">{error}</p>}

            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="subtext" style={{ marginTop: "1.25rem", marginBottom: 0 }}>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default SignUp;
