########################
#  Stage 1: Builder    #
########################
FROM python:3.9-slim AS builder

# Install system packages for Mythril & Slither (including gcc for pyethash compilation).
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

# Important: Update solc-select's remote solc list, so older versions like 0.6.0 can be installed
RUN solc-select update

# Copy your pinned requirements.txt
COPY requirements.txt .
# Build wheels for these pinned deps
RUN pip wheel --no-cache-dir --wheel-dir=/wheels -r requirements.txt


########################
#  Stage 2: Final      #
########################
FROM python:3.9-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    nodejs \
    npm \
    cargo \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Upgrade pip in final image
RUN pip install --no-cache-dir --upgrade pip

# Copy wheels from the builder stage
COPY --from=builder /wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Also re-install solc-select, mythril, slither-analyzer
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# Update solc-select's remote list again in the final image
RUN solc-select update

# Install OpenZeppelin for @openzeppelin/contracts
RUN npm init -y
RUN npm install @openzeppelin/contracts

# Copy the rest of your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
