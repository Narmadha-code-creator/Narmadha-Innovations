# Start Maritime Guard AI FastAPI Backend
Write-Host "Starting Maritime Guard AI Backend on http://127.0.0.1:8000..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend"
python -m uvicorn main:app --host 127.0.0.1 --port 8000
