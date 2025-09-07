# Backend Utils Package for Pyro Cast AI

# Import available modules
try:
    from .preprocessing import PyroCastAIPreprocessor
except ImportError:
    PyroCastAIPreprocessor = None

try:
    from .model import PyroCastAIModelTrainer
except ImportError:
    PyroCastAIModelTrainer = None

try:
    from .predict import SimpleWildfirePredictionService
    PyroCastAIPredictionService = SimpleWildfirePredictionService  # Alias for backward compatibility
except ImportError:
    PyroCastAIPredictionService = None
    SimpleWildfirePredictionService = None

__all__ = [
    'PyroCastAIPreprocessor',
    'PyroCastAIModelTrainer',
    'PyroCastAIPredictionService',
    'SimpleWildfirePredictionService'  # For backward compatibility
]
