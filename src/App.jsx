import { useState } from "react";
import UploadForm from "./components/UploadForm";
import MotifGallery from "./components/MotifGallery";
import "./App.css";

function App() {
  const [motifs, setMotifs] = useState([]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Tile Motif Extractor</h1>
        <p className="subtitle">Extract beautiful motifs from your tile images</p>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          <section className="upload-section">
            <UploadForm setMotifs={setMotifs} />
          </section>

          <section className="gallery-section">
            <div className="section-header">
              <h2>Extracted Motifs</h2>
              {motifs.length > 0 && (
                <div className="motif-count">
                  {motifs.length} motif{motifs.length !== 1 ? 's' : ''} found
                </div>
              )}
            </div>
            <MotifGallery motifs={motifs} />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>© 2024 Tile Motif Extractor. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
