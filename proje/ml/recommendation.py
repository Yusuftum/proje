import sys
import joblib
import pandas as pd

# Modeli yükle
model = joblib.load('recommendation_model.pkl')

# Kullanıcı ID'sini al
user_id = int(sys.argv[1])

# Beğeni verilerini yükle
likes = pd.read_csv('likes.csv')  # user_id, recipe_id, rating

# Kullanıcıya benzer tarifler öner
def get_recommendations(user_id, model, likes, top_n=10):
    # Kullanıcının beğenmediği tarifleri filtreleyin
    all_recipes = likes['recipe_id'].unique()
    liked_recipes = likes[likes['user_id'] == user_id]['recipe_id']
    recommendations = [r for r in all_recipes if r not in liked_recipes.values]

    # Tariflere tahmin yap ve en yüksek puanlıları al
    predictions = [(recipe, model.predict(user_id, recipe).est) for recipe in recommendations]
    top_recommendations = sorted(predictions, key=lambda x: x[1], reverse=True)[:top_n]
    return [r[0] for r in top_recommendations]

# Önerileri alın
recommended_recipes = get_recommendations(user_id, model, likes)
print(recommended_recipes)
