import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import joblib
import nltk
from nltk.corpus import stopwords
import string

nltk.download('stopwords')

def preprocess_text(text):
    if isinstance(text, float):  
        return ""
    stop_words = set(stopwords.words('english'))
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

scores_summary_file_path = 'result.csv'
scores_df = pd.read_csv(scores_summary_file_path)

print("Columns in CSV:", scores_df.columns)

scores_df['user_job'] = scores_df['user_job'].apply(preprocess_text)
scores_df['cv_text'] = scores_df['cv_text'].apply(preprocess_text)
scores_df['job_title'] = scores_df['job_title'].apply(preprocess_text)
scores_df['job_desc'] = scores_df['job_desc'].apply(preprocess_text)

X = scores_df[['user_job', 'cv_text', 'job_title', 'job_desc']]
y = scores_df['score']

vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2))
X_vectorized = vectorizer.fit_transform(X.apply(lambda row: ' '.join(row.values.astype(str)), axis=1))

X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, 'similarity_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')

print("Model and vectorizer saved.")
