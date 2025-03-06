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

# Install llama-stack CLI globally (move this up so it's cached)
RUN pip install --no-cache-dir llama-stack -U

# Install solc-select, mythril, and slither-analyzer
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# Copy only requirements file first (to cache dependencies)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the full application (so this layer only changes when code changes)
COPY . .

# Create models directory
RUN mkdir -p /app/models

# Download Llama Model
RUN llama model download --source meta --model-id Llama3.2-3B --output /app/models/llama-3.2-3b.gguf

# Expose port
EXPOSE 8000

# Start app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]