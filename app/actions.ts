
import axios from "axios";

interface PredictionResponse {
  disease: string;
  confidence: string;
  suggestion: string;
}

export const predictDisease = async (formData: FormData): Promise<PredictionResponse> => {
  const response = await axios.post<PredictionResponse>("http://localhost:5000/api/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

