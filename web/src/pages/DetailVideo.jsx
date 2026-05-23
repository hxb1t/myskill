import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/detailVideo.css";
import contentService from "../services/content.service";

const DetailVideo = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { contentId } = useParams();

  useEffect(() => {
    const fetchContentDetail = async () => {
      try {
        const response = await contentService.getContentDetail(contentId);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch video details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchContentDetail();
    }
  }, [contentId]);

  if (loading) {
    return <div className="video-loading">Loading video...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="video-loading">Video not found.</div>;
  }

  return (
    <div className="video-detail-container">
      <div className="video-detail-wrapper">
        {data.videoUrl && (
          <video
            src={data.videoUrl}
            controls
            loop
            className="native-video-player"
            poster={data.thumbnailUrl}
          >
            Your browser does not support the video tag.
          </video>
        )}

        <div className="video-content-wrapper">
          <h1 className="video-main-title">{data.title}</h1>

          <div className="video-author-row">
            <img
              src={data.authorId?.avatarUrl || "/default-avatar.png"}
              alt={data.authorId?.fullName || "Author"}
              className="video-author-avatar"
            />
            <div>
              <p className="video-author-name">
                {data.authorId?.fullName || "Unknown Author"}
              </p>
              <p className="video-author-school">
                {data.authorId?.school || "Unknown School"}
              </p>
            </div>
          </div>

          {/* Injected HTML Description */}
          {data.descriptionHtml && (
            <div
              className="video-html-description"
              dangerouslySetInnerHTML={{ __html: data.descriptionHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailVideo;
