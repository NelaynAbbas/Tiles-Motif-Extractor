# 🧱 Tiles Motif Extractor

A computer vision-based tool for **extracting motifs from tile images in real-time** using **YOLO object detection** and traditional image processing. The system includes a clean **React frontend** to visualize uploads and extracted results, making it suitable for design professionals and researchers working with tile pattern recognition.

[![GitHub Repo](https://img.shields.io/badge/GitHub-View%20Repository-blue?logo=github)](https://github.com/NelaynAbbas/Tiles-Motif-Extractor)

---

## 🔍 Features

- ✅ Real-time tile image processing using camera or upload
- 🎯 YOLO model integration for accurate motif detection
- 🧠 Traditional image processing algorithms for cleanup and enhancement
- 🖼️ React-based frontend with drag-and-drop uploads and result preview
- 💾 Export or store extracted motifs
- 🧪 Modular backend for future model upgrades or analysis pipelines

---

## 🛠️ Tech Stack

| Layer       | Technologies Used                          |
|-------------|---------------------------------------------|
| Frontend    | React, Tailwind CSS, Axios                  |
| Backend     | Python, Flask (or FastAPI), OpenCV, NumPy   |
| ML Models   | YOLOv8 (via Ultralytics), Custom-trained dataset |
| Others      | Webpack/Vite, Git, GitHub Actions (optional) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/NelaynAbbas/Tiles-Motif-Extractor.git
cd Tiles-Motif-Extractor
````

---

### 2. Backend Setup (Python)

Install the required Python dependencies:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Run the Flask server:

```bash
python app.py
```

---

### 3. Frontend Setup (React)

```bash
cd ../frontend
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 📁 Folder Structure

```
Tiles-Motif-Extractor/
│
├── backend/
│   ├── app.py
│   ├── detector.py  # YOLO model integration
│   ├── extractor.py # Image processing logic
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── ...
│   └── public/
│
├── models/
│   └── yolo.pt  # YOLOv8 pretrained model
│
├── sample_tiles/
│   └── sample1.jpg
│
└── README.md
```

---

## 📦 Output Samples

Here are some example outputs:

| Input Tile Image              | Extracted Motifs                                |
| ----------------------------- | ----------------------------------------------- |
| ![](sample_tiles/sample1.jpg) | ![](outputs/motif1.jpg) ![](outputs/motif2.jpg) |

---

## 🧪 YOLO Model Training (Optional)

If you wish to re-train the model:

```bash
# Using Ultralytics YOLOv8
pip install ultralytics
yolo task=detect mode=train model=yolov8n.pt data=your_dataset.yaml epochs=100 imgsz=640
```

Replace `your_dataset.yaml` with your custom dataset configuration.

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the project
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌐 Live Demo (Optional)

If deployed, link your frontend here:
➡️ [Live App](#)

---

## 📬 Contact

**Nelayn Abbas**
[GitHub Profile](https://github.com/NelaynAbbas)

---

> Built with ❤️ using React, Python, OpenCV, and YOLO.

```
