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

# If your solc-select supports "upgrade", you can do:
# RUN solc-select upgrade || true
# 
# Otherwise, remove this line entirely if it fails or isn't needed.
# 
# That said, "upgrade" attempts to update the solc-select script
# so you can see the latest solc versions.

# Copy your pinned requirements.txt
COPY requirements.txt .
# Build wheels for pinned deps
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

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Copy wheels from builder
COPY --from=builder /wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Also re-install solc-select, mythril, and slither
RUN pip install --no-cache-dir solc-select mythril slither-analyzer

# (Optional) Attempt to upgrade solc-select if your version supports it:
# RUN solc-select upgrade || true

# Install OpenZeppelin for @openzeppelin/contracts
RUN npm init -y
RUN npm install @openzeppelin/contracts

# Copy the rest of your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
