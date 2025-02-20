########################
#  Stage 1: Builder    #
########################
FROM python:3.9-slim AS builder

# Install system packages needed to compile Mythril (pyethash, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git \
    nodejs \
    npm \
    cargo \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Upgrade pip for improved dependency resolution
RUN pip install --no-cache-dir --upgrade pip

# Install the extra tools (solc-select, mythril, slither-analyzer)
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# Copy your pinned requirements.txt for normal Python deps
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

# Copy wheels from builder stage and install them
COPY --from=builder /wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Also reinstall solc-select, mythril, slither-analyzer in the final image
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# Install @openzeppelin/contracts so local node_modules includes them
RUN npm init -y
RUN npm install @openzeppelin/contracts

# Copy the rest of your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
