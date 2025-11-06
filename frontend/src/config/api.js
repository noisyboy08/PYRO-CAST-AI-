// API Configuration
// - In development: use Vite proxy (empty base URL)
// - In production: read the public env var VITE_API_BASE_URL set in Netlify
//   Example: https://your-backend-host.example.com
const API_BASE_URL = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_BASE_URL || '')

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


