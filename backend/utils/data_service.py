#!/usr/bin/env python3
"""
Lightweight data service without third‑party scientific dependencies.
Implements simple, mock data providers using Python's standard library so the
backend can run on minimal environments (e.g., Render Free) without compiling
numpy/pandas.
"""
import random
from statistics import mean
from pathlib import Path

class WildfireDataService:
    def __init__(self):
        self.data_path = Path(__file__).parent.parent / "data" / "raw" / "wildfire_dataset.csv"
        self.records = []
        self.load_data()

    def load_data(self):
        """Load dataset if present; otherwise build mock data."""
        # For simplicity and portability, always create mock data when file
        # doesn't exist. No third‑party libs are used.
        if self.data_path.exists():
            # Optional: could parse CSV using csv module, but mock is fine here
            print("⚠️  Dataset loading from CSV is disabled in lightweight mode; using mock data")
            self.create_mock_data()
        else:
            print("⚠️  Dataset not found, using mock data")
            self.create_mock_data()

    def create_mock_data(self, n_samples: int = 1000):
        random.seed(42)
        self.records = []
        for _ in range(n_samples):
            self.records.append({
                'daynight_N': 1 if random.random() < 0.15 else 0,
                'lat': random.uniform(-60, 70),
                'lon': random.uniform(-180, 180),
                'fire_weather_index': random.gauss(15, 10),
                'temp_mean': random.gauss(25, 8),
                'humidity_min': random.uniform(10, 90),
                'wind_speed_max': random.gammavariate(2, 8),
                'pressure_mean': random.gauss(1013, 30),
                'frp': random.expovariate(1/20),
                'occured': 1 if random.random() < 0.5 else 0,
            })
        print("📊 Created mock dataset for demonstration")
    
    def get_dataset_statistics(self):
        """Get comprehensive dataset statistics"""
        if not self.records:
            return {}
        
        total = len(self.records)
        fire_inc = sum(r['occured'] for r in self.records)
        stats = {
            'total_records': total,
            'total_features': 9,  # fixed in mock
            'fire_incidents': fire_inc,
            'no_fire_cases': total - fire_inc,
            'fire_percentage': fire_inc / total * 100.0,
            'no_fire_percentage': (1 - fire_inc / total) * 100.0,
            'missing_values': 0,
            'missing_percentage': 0.0,
        }
        return stats
    
    def get_correlation_data(self):
        """Get feature correlations with target"""
        # Lightweight static correlations similar to app fallback
        return {
            'correlations': {
                'daynight_N': 0.293,
                'frp': 0.290,
                'humidity_min': 0.138,
                'fire_weather_index': 0.127,
                'temp_range': 0.119,
            },
            'top_positive_correlations': [
                {'feature': 'daynight_N', 'correlation': 0.293},
                {'feature': 'frp', 'correlation': 0.290},
                {'feature': 'humidity_min', 'correlation': 0.138},
                {'feature': 'fire_weather_index', 'correlation': 0.127},
                {'feature': 'temp_range', 'correlation': 0.119},
            ],
            'top_negative_correlations': []
        }
    
    def get_feature_distributions(self):
        """Get statistical distributions for all features"""
        if not self.records:
            return {}
        keys = ['temp_mean', 'humidity_min', 'wind_speed_max', 'fire_weather_index']
        distributions = {}
        for k in keys:
            vals = [r.get(k, 0.0) for r in self.records]
            if not vals:
                continue
            distributions[k] = {
                'mean': float(mean(vals)),
                'std': 0.0,  # omitted for lightweight mode
                'min': float(min(vals)),
                'max': float(max(vals)),
                'median': float(sorted(vals)[len(vals)//2]),
                'q25': float(sorted(vals)[int(0.25*len(vals))]),
                'q75': float(sorted(vals)[int(0.75*len(vals))]),
            }
        return distributions
    
    def get_geographical_data(self, sample_size=500):
        """Get geographical fire occurrence data"""
        if not self.records:
            return []
        
        geo_data = []
        for row in random.sample(self.records, k=min(sample_size, len(self.records))):
            geo_data.append({
                'lat': float(row['lat']),
                'lon': float(row['lon']),
                'fire_occurred': bool(row['occured']),
                'fire_weather_index': float(row.get('fire_weather_index', 0)),
                'temperature': float(row.get('temp_mean', 20)),
                'humidity': float(row.get('humidity_min', 50)),
                'wind_speed': float(row.get('wind_speed_max', 10)),
                'frp': float(row.get('frp', 0))
            })
        
        return geo_data
    
    def get_outlier_analysis(self):
        """Get outlier detection results"""
        if not self.records:
            return {}
        
        # Lightweight static outlier summary
        return {
            'temp_mean': {'outlier_count': 3338, 'percentage': 2.81},
            'humidity_min': {'outlier_count': 1358, 'percentage': 1.14},
            'wind_speed_max': {'outlier_count': 3735, 'percentage': 3.14},
            'fire_weather_index': {'outlier_count': 8855, 'percentage': 7.45},
        }
    
    def get_risk_distribution(self):
        """Get risk level distribution data"""
        if not self.records:
            return {}
        
        return {
            'distribution': [
                {'name': 'Low', 'value': 25, 'percentage': 25.0},
                {'name': 'Medium', 'value': 35, 'percentage': 35.0},
                {'name': 'High', 'value': 30, 'percentage': 30.0},
                {'name': 'Extreme', 'value': 10, 'percentage': 10.0},
            ]
        }

    def get_historical_trends(self):
        """Get historical fire trends data"""
        # Since we don't have temporal data, create seasonal pattern
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        
        # Simulate seasonal fire patterns
        fire_patterns = [15, 18, 28, 42, 58, 73, 89, 81, 64, 38, 22, 15]
        risk_patterns = [25, 30, 45, 65, 75, 85, 92, 88, 70, 55, 35, 28]
        
        return [
            {
                'month': month,
                'fires': fires,
                'riskLevel': risk
            }
            for month, fires, risk in zip(months, fire_patterns, risk_patterns)
        ]

# Global instance
data_service = WildfireDataService()
