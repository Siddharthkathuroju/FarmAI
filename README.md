# FarmAI - AI-Based Chatbot for Farmers

Introduction
FarmAI is an AI-powered chatbot designed to assist farmers with essential agricultural insights. Built using **Next.js** for the frontend and **Flask** for the backend, FarmAI leverages the **DeepSeek-Coder** model, trained on over 100 samples, to provide intelligent recommendations and real-time updates.

Features
- Crop Suggestion System – Get recommendations on the best crops to grow based on soil type, climate, and season.
- Fertilizer Recommendation System – Suggests optimal fertilizers and N-P-K values based on soil conditions.
- Market Price Insights – Provides real-time market prices for various crops to help farmers make informed selling decisions.
- Weather Alerts – Notifies users about upcoming weather conditions to optimize farming activities.
- AI-Powered Chatbot – Answers queries related to farming practices, crop diseases, and best agricultural practices.

##  Technologies Used
- Frontend: Next.js
- Backend: Flask
- AI Model: DeepSeek-Coder (custom-trained on agricultural data)
- Database: MongoDB (optional for storing user queries and preferences)
- APIs: Weather and market price APIs(AGMARKET) for real-time data retrieval

##  Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (for Next.js frontend)
- Python & Flask (for backend API and model handling)
- MongoDB (if database integration is required)

### Clone the Repository
```bash
git clone https://github.com/yourusername/FarmAI.git
cd FarmAI
```

### Backend Setup (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```



##  Usage
1. Start the Backend: Run the Flask server (`python app.py`).
2. Start the Frontend: Run the Next.js development server (`npm run dev`).
3. Interact with the chatbot: Ask for crop suggestions, fertilizer recommendations, and market price insights!



