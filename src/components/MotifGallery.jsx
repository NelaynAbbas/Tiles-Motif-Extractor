import { useState } from "react";
import "./styles.css";

const MotifGallery = ({ motifs }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleDownload = async (motif) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/motifs/${motif}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = motif;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  if (motifs.length === 0) {
    return (
      <div className="empty-state">
        <svg
          className="empty-icon"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <p>No motifs extracted yet</p>
        <p className="empty-subtext">Upload an image to extract motifs</p>
      </div>
    );
  }

  return (
    <div className="motif-gallery">
      {motifs.map((motif, index) => (
        <div
          key={index}
          className={`motif-card ${hoveredIndex === index ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="motif-image-container">
            <img
              src={`http://127.0.0.1:5000/motifs/${motif}`}
              alt={`Motif ${index + 1}`}
              className="motif-image"
            />
            <div className="motif-overlay">
              <button
                className="download-button"
                onClick={() => handleDownload(motif)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            </div>
          </div>
          <div className="motif-info">
            <span className="motif-number">Motif {index + 1}</span>
            <span className="motif-filename">{motif}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MotifGallery;
  