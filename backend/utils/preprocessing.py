"""
Preprocessing utilities for Pyro Cast AI
"""
import pandas as pd
import numpy as np
from typing import Dict, Any, Optional

class PyroCastAIPreprocessor:
    """
    Preprocessing class for Pyro Cast AI data
    """
    
    def __init__(self):
        """Initialize the preprocessor"""
        self.feature_means = None
        self.feature_stds = None
        self.feature_mins = None
        self.feature_maxs = None
    
    def fit(self, X: pd.DataFrame):
        """
        Fit the preprocessor on the training data
        
        Args:
            X: Input features as a pandas DataFrame
        """
        self.feature_means = X.mean()
        self.feature_stds = X.std()
        self.feature_mins = X.min()
        self.feature_maxs = X.max()
    
    def transform(self, X: pd.DataFrame, fit: bool = False) -> np.ndarray:
        """
        Transform the input data
        
        Args:
            X: Input features as a pandas DataFrame
            fit: Whether to fit the preprocessor on the input data
            
        Returns:
            Transformed features as a numpy array
        """
        if fit:
            self.fit(X)
            
        if self.feature_means is None:
            raise ValueError("Preprocessor has not been fitted. Call fit() first.")
            
        # Handle missing values
        X = X.fillna(self.feature_means)
        
        # Normalize features
        X_normalized = (X - self.feature_means) / (self.feature_stds + 1e-8)
        
        return X_normalized.values
    
    def fit_transform(self, X: pd.DataFrame) -> np.ndarray:
        """
        Fit the preprocessor and transform the data
        
        Args:
            X: Input features as a pandas DataFrame
            
        Returns:
            Transformed features as a numpy array
        """
        self.fit(X)
        return self.transform(X)
    
    def inverse_transform(self, X: np.ndarray, feature_names: list = None) -> pd.DataFrame:
        """
        Transform the data back to the original space
        
        Args:
            X: Transformed features as a numpy array
            feature_names: List of feature names
            
        Returns:
            DataFrame with features in the original space
        """
        if self.feature_means is None:
            raise ValueError("Preprocessor has not been fitted. Call fit() first.")
            
        # Convert back to original scale
        X_original = X * (self.feature_stds + 1e-8) + self.feature_means
        
        if feature_names is not None:
            return pd.DataFrame(X_original, columns=feature_names)
        return X_original
