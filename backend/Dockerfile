# /backend/Dockerfile

FROM python:3.9-slim 

WORKDIR /app

# Copy your API dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything from /backend => /app
COPY . .

EXPOSE 8000

# The CMD references api.main:app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
