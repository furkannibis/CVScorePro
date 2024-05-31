import pandas as pd
from tqdm import tqdm

cv_file_path = 'cv.csv'
job_file_path = 'job.csv'
output_file_path = 'combined.csv'

cv_df = pd.read_csv(cv_file_path)

job_df = pd.read_csv(job_file_path)
job_df = job_df.sample(frac=1, random_state=42).reset_index(drop=True)
job_sample_df = job_df.sample(frac=0.00005, random_state=42)

combined_data = []

for _, cv in tqdm(cv_df.iterrows(), total=len(cv_df), desc="Processing CVs"):
    for _, job in tqdm(job_sample_df.iterrows(), total=len(job_sample_df), desc="Processing Jobs", leave=False):
        combined_data.append({
            'user_job': cv['Job Title'],
            'cv_text': cv['CV Text'],
            'job_title': job['job_title'],
            'job_desc': job['job_desc'],
            'score': 0
        })

combined_df = pd.DataFrame(combined_data)
combined_df.to_csv(output_file_path, index=False)

print(f"Combined data saved to {output_file_path}")
