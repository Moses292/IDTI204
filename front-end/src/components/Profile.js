import { useState } from "react";
import API_URL from "../api";
import { FaUserCircle } from "react-icons/fa";

function Profile({ user }) {
  const [isEditing, setIsEditing] = useState(false);

  // ✅ IMAGE STATE (new)
  const [image, setImage] = useState(user.image || "");

  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    country: user.country || "",
    dob: user.dob || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ IMAGE UPLOAD FUNCTION
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);

      const updatedUser = {
        ...user,
        image: reader.result
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    reader.readAsDataURL(file);
  };

  // ✅ ✅ ✅ FIXED HANDLE SAVE (ONLY CHANGE MADE)
  const handleSave = async () => {
    const updatedUser = {
      ...user,
      ...formData,
      image: image,
      name: formData.firstName + " " + formData.lastName
    };

    try {
      const res = await fetch(`${API_URL}/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      });

      const data = await res.json();

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.reload();
      } else {
        alert("Failed to update profile");
      }

    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        {/* ✅ PROFILE IMAGE SECTION */}
        <div className="profile-image-section">

          {image ? (
            <img src={image} className="profile-image" alt="profile" />
          ) : (
            <FaUserCircle className="profile-avatar" />
          )}

          <label className="upload-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>

        </div>

        <h2>{user.name}</h2>

        {/* ✅ VIEW MODE */}
        {!isEditing && (
          <>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Country:</strong> {user.country}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>

            <button
              className="profile-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}

        {/* ✅ EDIT MODE */}
        {isEditing && (
          <>
            <div className="input-box">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>

            <div className="input-box">
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>

            <div className="input-box">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="input-box">
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>

            <div className="input-box">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <button className="profile-btn" onClick={handleSave}>
              Save Changes
            </button>

            <button
              className="profile-btn cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default Profile;