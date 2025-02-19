# /backend/Dockerfile
FROM python:3.8-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy everything from /backend => /app
COPY . .

EXPOSE 8000

# Now the code is in /app/api and /app/services
# so uvicorn can find "api/main.py"
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
