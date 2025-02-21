########################
#  Stage 1: Builder    #
########################
FROM python:3.9-slim AS builder

# Install system packages (including build-essential for Mythril's pyethash)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    nodejs \
    npm \
    cargo \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Install solc-select, mythril, slither-analyzer
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# Pre-install common Solidity versions
RUN solc-select install 0.6.0 0.7.0 0.8.0

# Copy your pinned requirements.txt
COPY requirements.txt .
# Build wheels for pinned deps
RUN pip wheel --no-cache-dir --wheel-dir=/wheels -r requirements.txt

########################
#  Stage 2: Final      #
########################
FROM python:3.9-slim

# Install system packages needed at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    nodejs \
    npm \
    cargo \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Copy wheels from builder
COPY --from=builder /wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Re-install solc-select, mythril, and slither (with pre-installed solc versions)
RUN pip install --no-cache-dir solc-select mythril slither-analyzer
COPY --from=builder /root/.solc-select /root/.solc-select  # Copy pre-installed solc versions

# Install OpenZeppelin 3.4.2 for Solidity 0.6.x compatibility
RUN npm init -y
RUN npm install @openzeppelin/contracts@3.4.2

# Copy the rest of your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]