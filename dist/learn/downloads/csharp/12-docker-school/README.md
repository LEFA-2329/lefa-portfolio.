# Docker school stack

Requires Docker Desktop with Linux containers and an x64 host supported by SQL Server containers. On unsupported ARM hardware use a compatible remote SQL Server or the standalone SQLite lesson instead; do not promise native SQL Server ARM support.

1. Extract into a new folder. Copy .env.example to .env and choose your own strong password. Never publish .env.
2. Generate an API migration once BEFORE building images: from Api run dotnet tool install --global dotnet-ef --version 10.0.15 (skip if already installed), then dotnet ef migrations add InitialCreate. This does not need a running database. The generated migrations must be included in the image.
3. From the root run docker compose config --quiet, then docker compose up --build -d.
4. Check docker compose ps and docker compose logs api. Wait for the API to finish its migration before opening the website.
5. API: http://localhost:5100/api/students . Website: http://localhost:5200 . API health: http://localhost:5100/health .
6. Add a student in the website. Run docker compose down, then docker compose up -d. The student remains because the named volume survives.
7. Stop with docker compose down. docker compose down -v deletes the database volume; use it ONLY when you intend to erase this practice data.

The sa account, certificate trust bypass and startup migration are classroom shortcuts. Production needs a least-privilege application login, validated certificates, a secrets manager, separate migration job, backups and TLS/reverse proxy.
