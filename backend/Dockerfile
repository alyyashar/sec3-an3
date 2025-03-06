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

# Download Llama-3.2-3B Model (~3GB)
RUN mkdir -p /app/models
RUN curl -L -o /app/models/llama-3.2-3B.gguf \
    "https://llama3-2-lightweight.llamameta.net/*?Policy=eyJTdGF0ZW1lbnQiOlt7InVuaXF1ZV9oYXNoIjoidzVqbW1yangybHl4NDB3Z3A0N2p0cTd2IiwiUmVzb3VyY2UiOiJodHRwczpcL1wvbGxhbWEzLTItbGlnaHR3ZWlnaHQubGxhbWFtZXRhLm5ldFwvKiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc0MTQwMTA1Nn19fV19&Signature=uRa03sDQW71b0RjfGuX2JEW7AWhIquggFnYCIZ3k24387yYllZS9rYRTHnfSB9fSd3Jy-9-B2gXf0tk6nFwydgRQkvVS5Vn7-Ot6RlUEZKkVm6tyDxZfK8a3sp9TvpU06jpoZ0-YbH4BqFPd-%7EEPbl3XM7Sk66EZWG3BQURGaMMoxPPVkqbCnvjFnhAY6-QMaR2U%7EBlO62A8otJbayMvfdO45HWO1G3l6meCRmTzaDl6OloMQNbtgvfrYVKcVOR0xAC0hID37Eq%7ECg8smcRRAzxYfutExXSKIPnQVxpTK3S%7EXektGOS9WkPL92NHz9Owzz3pVP5jVlHohGnU%7EBycSA__&Key-Pair-Id=K15QRJLYKIFSLZ&Download-Request-ID=657491556741419"

# Copy your backend code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]