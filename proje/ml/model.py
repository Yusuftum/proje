import numpy as np
import joblib
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Veri setini yükle
iris = load_iris()
X, y = iris.data, iris.target

# Veriyi eğitim ve test olarak ayır
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Modeli eğit
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Modeli kaydet
joblib.dump(model, 'model.pkl')

print("Model eğitildi ve kaydedildi.")
