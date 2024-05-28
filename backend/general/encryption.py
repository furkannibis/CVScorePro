from hashlib import sha256

def hash_data(data: str) -> str:
    return sha256(data.encode()).hexdigest()
    