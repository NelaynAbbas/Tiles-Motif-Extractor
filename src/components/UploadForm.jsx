import { useState, useRef } from "react";
import axios from "axios";
import "./styles.css";

const UploadForm = ({ setMotifs }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image first");
      return;
    }

    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      console.log("Upload response:", response.data);
      setMotifs(response.data.motifs || []);
    } catch (error) {
      console.error("Upload failed:", error);
      setError(error.response?.data?.error || "Failed to upload image");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="upload-form">
      <div
        className={`upload-area ${isDragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files[0])}
          style={{ display: 'none' }}
        />
        
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <div className="preview-overlay">
              <span className="preview-text">Click to change image</span>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder">
            <svg
              className="upload-icon"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="upload-text">Drag and drop your image here</p>
            <p className="upload-subtext">or click to browse</p>
          </div>
        )}
      </div>

      <div className="upload-actions">
        <button
          className={`upload-button ${isProcessing ? 'processing' : ''}`}
          onClick={handleUpload}
          disabled={!image || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            'Extract Motifs'
          )}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UploadForm;
