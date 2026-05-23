import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/detailArticle.css";
import contentService from "../services/content.service";

const DetailArticle = () => {
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
        console.error("Failed to fetch article details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (contentId) {
      fetchContentDetail();
    }
  }, [contentId]);

  if (loading) {
    return <div className="article-loading">Loading article...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div className="article-loading">Article not found.</div>;
  }

  return (
    <div className="article-detail-container">
      <div className="article-detail-wrapper">
        <div className="article-detail-header"></div>

        {data.thumbnailUrl && (
          <img
            src={data.thumbnailUrl}
            alt={data.title}
            className="article-hero-image"
          />
        )}

        <div className="article-content-wrapper">
          <h1 className="article-main-title">{data.title}</h1>

          <div className="article-author-row">
            <img
              src={data.authorId?.avatarUrl || "/default-avatar.png"}
              alt={data.authorId?.fullName || "Author"}
              className="article-author-avatar"
            />
            <div>
              <p className="article-author-name">
                {data.authorId?.fullName || "Unknown Author"}
              </p>
              <p className="article-author-school">
                {data.authorId?.school || "Unknown School"}
              </p>
            </div>
          </div>

          <div
            className="article-html-content"
            dangerouslySetInnerHTML={{ __html: data.contentHtml }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
