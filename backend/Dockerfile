FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    nodejs \
    npm \
    cargo \
 && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Install solc-select, mythril, and slither-analyzer
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install specific OpenZeppelin versions if needed
RUN npm init -y
RUN npm install @openzeppelin/contracts@3.4.2 --prefix ./oz-3.4.2
RUN npm install @openzeppelin/contracts@4.9.3 --prefix ./oz-4.9.3

# Install llama-stack CLI
RUN pip install --no-cache-dir llama-stack -U

# Ensure models directory exists
RUN mkdir -p /app/models

# Download Llama 3.2-3B model
RUN llama model download --source meta --model-id Llama3.2-3B --output /app/models/llama-3.2-3b.gguf

# Copy your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]