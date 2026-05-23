import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import contentService from "../services/content.service";
import { uploadFile } from "../services/file.service";

import "../assets/createArticle.css";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [title, setTitle] = useState("");
  const [descriptionHtml, setDescriptionHtml] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePostVideo = async () => {
    if (!videoFile) return alert("Please select a video to upload.");
    if (!imageFile) return alert("Please upload a thumbnail image.");
    if (!title.trim()) return alert("Please enter a video title.");
    if (!descriptionHtml.trim()) return alert("Please write a description.");

    setIsSubmitting(true);

    try {
      const [videoUploadRes, imageUploadRes] = await Promise.all([
        uploadFile(videoFile),
        uploadFile(imageFile),
      ]);

      await contentService.createContent({
        title,
        descriptionHtml,
        videoUrl: videoUploadRes.url,
        thumbnailUrl: imageUploadRes.url,
        type: "video",
      });

      alert("Your video has been published!");
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
          <label className="form-label">Select Video</label>
          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={handleVideoSelect}
            className="hidden-input"
          />

          {videoPreview ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <video src={videoPreview} controls className="preview-video" />
              <button
                type="button"
                onClick={() => videoInputRef.current.click()}
                className="nav-btn-outline"
                style={{ alignSelf: "flex-start" }}
              >
                Change Video
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => videoInputRef.current.click()}
              disabled={isSubmitting}
              className="upload-placeholder"
            >
              <span className="upload-text">Tap to select a video</span>
            </button>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            onChange={handleImageSelect}
            className="hidden-input"
          />
          <button
            type="button"
            onClick={() => imageInputRef.current.click()}
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
            placeholder="Enter video title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <div className="quill-wrapper">
            <ReactQuill
              theme="snow"
              value={descriptionHtml}
              onChange={setDescriptionHtml}
            />
          </div>
        </div>

        <button
          onClick={handlePostVideo}
          disabled={isSubmitting}
          className="btn-primary"
        >
          {isSubmitting ? "Publishing..." : "Publish Video"}
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
