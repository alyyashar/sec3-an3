# /backend/Dockerfile
FROM python:3.9-slim

WORKDIR /app

# Copy API dependencies and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend code into the image
COPY . .

# Expose port 8000 for FastAPI
EXPOSE 8000

# Launch the FastAPI app
# (Update the entrypoint if your main app file is different)
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
