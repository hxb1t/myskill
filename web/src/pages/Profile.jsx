import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/profile.css";
import contentService from "../services/content.service";
import profileService from "../services/profile.service";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userContents, setUserContents] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await contentService.getOwnedContents();
        setUserContents(data);
      } catch (error) {
        console.error("Failed to fetch profile contents:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const data = await profileService.getUserProfile();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchContents();
  }, []);

  return (
    <div className="profile-container">
      <header className="profile-header-nav">
        <div className="header-spacer"></div>
      </header>

      <section className="profile-info-section">
        <img
          src={userData.avatarUrl || "/default-avatar.png"}
          alt={userData.fullName}
          className="profile-avatar-large"
        />
        <h2 className="profile-fullname">{userData.fullName || "User Name"}</h2>
        <p className="profile-username">@{userData.username || "username"}</p>
      </section>

      <div className="info-card">
        <p className="info-label">School</p>
        <p className="info-value">{userData.school || "Not Provided"}</p>
      </div>

      <h3 className="section-title">Your Posts</h3>

      {loading ? (
        <p className="empty-state">Loading your content...</p>
      ) : userContents.length === 0 ? (
        <p className="empty-state">No content published yet.</p>
      ) : (
        <div className="grid-container">
          {userContents.map((item) => (
            <Link
              key={item._id}
              to={
                item.type === "article"
                  ? `/article/${item._id}`
                  : `/video/${item._id}`
              }
              className="card"
            >
              <div className="card-image-wrapper">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="card-image"
                />
                <span
                  className={`card-badge ${item.type === "article" ? "badge-article" : "badge-video"}`}
                >
                  {item.type.toUpperCase()}
                </span>
              </div>

              <div className="card-content">
                <h4 className="card-item-title">{item.title}</h4>
                <div className="card-author-row">
                  <img
                    src={item.authorId?.avatarUrl || "/default-avatar.png"}
                    alt={item.authorId?.fullName || "Author"}
                    className="author-avatar"
                  />
                  <div>
                    <p className="author-name">
                      {item.authorId?.fullName || "Unknown Author"}
                    </p>
                    <p className="author-school">
                      {item.authorId?.school || "Unknown School"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
