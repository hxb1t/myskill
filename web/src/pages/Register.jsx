import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/auth.css";

import { register } from "../services/auth.service";
import { uploadProfilePicture } from "../services/file.service";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password || !fullName || !school) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let avatarUrl = "";
      if (avatarFile) {
        const { url } = await uploadProfilePicture(avatarFile);
        avatarUrl = url;
      }

      await register(fullName, username, password, avatarUrl, school);

      alert("Registration Successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Create your Account</h1>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleRegister} className="login-form">
          <div className="avatar-section">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden-input"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="avatar-placeholder"
              disabled={loading}
            >
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="avatar-image"
                />
              )}
            </button>
            <label className="avatar-label">Upload Image</label>
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>School Name</label>
            <input
              type="text"
              placeholder="Binus University"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="johndoeusr"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="*************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="*************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="login-footer">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
