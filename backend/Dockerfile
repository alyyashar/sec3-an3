FROM python:3.9-slim

WORKDIR /app

# Install system packages needed at runtime
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

# Install Python dependencies from requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install multiple OpenZeppelin versions for different Solidity versions
RUN npm init -y
RUN npm install @openzeppelin/contracts@3.4.2 --prefix ./oz-3.4.2
RUN npm install @openzeppelin/contracts@4.9.3 --prefix ./oz-4.9.3

# Copy the rest of your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]