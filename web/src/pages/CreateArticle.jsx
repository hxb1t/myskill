import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import "../assets/createArticle.css";
import contentService from "../services/content.service";
import { uploadFile } from "../services/file.service";

const CreateArticle = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostArticle = async () => {
    if (!imageFile) return alert("Please upload a thumbnail image.");
    if (!title.trim()) return alert("Please enter an article title.");
    if (!contentHtml.trim()) return alert("Please write some content.");

    setIsSubmitting(true);

    try {
      const uploadResponse = await uploadFile(imageFile);
      const thumbnailUrl = uploadResponse.url;

      await contentService.createContent({
        title,
        contentHtml,
        thumbnailUrl,
        type: "article",
      });

      alert("Your article has been posted!");
      navigate("/");
    } catch (error) {
      alert(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-container">
      <div className="create-wrapper">
        <div className="form-group">
          <label className="form-label">Upload Thumbnail</label>
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
            disabled={isSubmitting}
            className="upload-placeholder"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="preview-image" />
            ) : (
              <span className="upload-text">Tap to upload thumbnail</span>
            )}
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            placeholder="Enter article title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Content</label>
          <div className="quill-wrapper">
            <ReactQuill
              theme="snow"
              value={contentHtml}
              onChange={setContentHtml}
            />
          </div>
        </div>

        <button
          onClick={handlePostArticle}
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? "Posting..." : "Post Article"}
        </button>
      </div>
    </div>
  );
};

export default CreateArticle;
