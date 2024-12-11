import pandas as pd
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
import joblib

# Beğeni verilerini yükleyin
likes = pd.read_csv('likes.csv') # user_id, recipe_id, rating

reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(likes[['user_id', 'recipe_id', 'rating']], reader)

# Eğitim ve test verilerini ayırın
trainset, testset = train_test_split(data, test_size=0.25)

# Modeli eğitin
algo = SVD()
algo.fit(trainset)

# Modeli kaydedin
joblib.dump(algo, 'recommendation_model.pkl')
