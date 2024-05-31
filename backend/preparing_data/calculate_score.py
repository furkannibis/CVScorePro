import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
import string
from tqdm import tqdm

nltk.download('stopwords')

def preprocess_text(text):
    if isinstance(text, float): 
        return ""
    stop_words = set(stopwords.words('english'))
    text = text.lower()
    text = ''.join([char for char in text if char not in string.punctuation])
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

vectorizer = TfidfVectorizer(max_features=10000, ngram_range=(1, 2))

def calculate_similarity(cv_text, job_text):
    texts = [cv_text, job_text]
    vectors = vectorizer.fit_transform(texts)
    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:2])
    return round(cosine_sim[0][0] * 100, 3)

combined_file_path = 'combined.csv'
result_file_path = 'result.csv'


chunk_size = 10000  
chunks = []

for chunk in tqdm(pd.read_csv(combined_file_path, chunksize=chunk_size), desc="Processing chunks"):
    chunk['score'] = chunk['score'].astype(float)

    chunk['user_job'] = chunk['user_job'].apply(preprocess_text)
    chunk['cv_text'] = chunk['cv_text'].apply(preprocess_text)
    chunk['job_title'] = chunk['job_title'].apply(preprocess_text)
    chunk['job_desc'] = chunk['job_desc'].apply(preprocess_text)
    
    for index, row in tqdm(chunk.iterrows(), total=chunk.shape[0], desc="Calculating Scores", leave=False):
        combined_text_cv = row['cv_text'] + ' ' + row['user_job']
        combined_text_job = row['job_desc'] + ' ' + row['job_title']
        chunk.at[index, 'score'] = calculate_similarity(combined_text_cv, combined_text_job)
    
    chunks.append(chunk)

combined_df = pd.concat(chunks, ignore_index=True)

combined_df.to_csv(result_file_path, index=False)

print(f"All data with scores saved to {result_file_path}")

average_score = combined_df['score'].mean()
highest_score = combined_df['score'].max()
lowest_score = combined_df['score'].min()

print(f"The average score is: {average_score}")
print(f"The highest score is: {highest_score}")
print(f"The lowest score is: {lowest_score}")

scores_summary_df = pd.DataFrame({
    'average_score': [average_score],
    'highest_score': [highest_score],
    'lowest_score': [lowest_score]
})
scores_summary_df.to_csv('scores_summary.csv', index=False)

print("Scores summary saved to scores_summary.csv")
