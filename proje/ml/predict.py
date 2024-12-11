import sys
import joblib
import numpy as np

# Modeli yükle
model = joblib.load('model.pkl')

# Girdiyi oku ve düzenle
input_data = np.array([float(x) for x in sys.argv[1:]]).reshape(1, -1)

# Tahmin yap
prediction = model.predict(input_data)
print(prediction[0])
