import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/home.css";
import contentService from "../services/content.service";
import profileService from "../services/profile.service";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, contentsRes] = await Promise.all([
          profileService.getUserProfile(),
          contentService.getContents(),
        ]);
        setUserData(profileRes);
        setData(contentsRes);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );

  return (
    <div className="home-container">
      <header className="home-header">
        <div>
          <p className="greeting-text">Hello, {userData.fullName}</p>
          <h1 className="home-title">Sharpen Your Skills Today!</h1>
        </div>
        <button
          className="profile-btn"
          onClick={() => navigate("/profile", { state: userData })}
        >
          <img
            src={userData.avatarUrl}
            alt="Profile"
            className="profile-avatar"
          />
        </button>
      </header>

      <div className="action-row">
        <Link to="/article/create" className="action-btn btn-create">
          Create Article
        </Link>
        <Link to="/video/upload" className="action-btn btn-upload">
          Upload Video
        </Link>
      </div>

      <h2 className="section-title">Discover</h2>

      <div className="grid-container">
        {data.map((item) => (
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
              <h3 className="card-item-title">{item.title}</h3>
              <div className="card-author-row">
                <img
                  src={item.authorId.avatarUrl}
                  alt={item.authorId.fullName}
                  className="author-avatar"
                />
                <div>
                  <p className="author-name">{item.authorId.fullName}</p>
                  <p className="author-school">{item.authorId.school}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
