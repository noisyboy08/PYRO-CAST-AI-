// API Configuration
// Uses proxy in development, absolute URLs in production
const API_BASE_URL = import.meta.env.DEV 
  ? ''  // Use proxy in development (vite.config.js handles this)
  : 'http://localhost:5000'  // Absolute URL for production

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  HEALTH: `${API_BASE_URL}/health`,
  MODEL_INFO: `${API_BASE_URL}/model/info`,
  DATASET_STATS: `${API_BASE_URL}/api/dataset-stats`,
  CORRELATIONS: `${API_BASE_URL}/api/correlations`,
  GEOGRAPHICAL_DATA: `${API_BASE_URL}/api/geographical-data`,
  OUTLIER_ANALYSIS: `${API_BASE_URL}/api/outlier-analysis`,
  FEATURE_DISTRIBUTIONS: `${API_BASE_URL}/api/feature-distributions`,
  RISK_DISTRIBUTION: `${API_BASE_URL}/api/risk-distribution`,
  HISTORICAL_TRENDS: `${API_BASE_URL}/api/historical-trends`,
}

export default API_BASE_URL


