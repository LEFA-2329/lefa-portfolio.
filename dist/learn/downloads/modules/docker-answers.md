# Docker - worked answers

Compare your reasoning, not only the final result. Code fragments assume the schema and environment in each question. Test SQL Server, WPF and Docker examples in their native tools.

## Answer 1

An image is the packaged API and its runtime. A container is a running instance of that image. Several containers can run from one image.

## Answer 2

docker build -t school-api .
docker run --rm -p 8080:8080 school-api
Run in the folder containing the Dockerfile. The API must listen on container port 8080 and all container interfaces.

## Answer 3

Compile and publish in an SDK stage, then copy published files into an ASP.NET runtime stage. This keeps compilers out of the final image and usually reduces its size. Match SDK/runtime major versions to the project.

## Answer 4

No. localhost means the API container itself. In Compose use the database service name, for example db, and its container port. Both services must share a network. Readiness is separate from startup order.

## Answer 5

Mount a named volume at the database data directory. Run docker compose logs SERVICE and docker compose ps. Use docker compose down to stop the stack. Adding -v removes named volumes and can delete practice data. Keep passwords in a local ignored environment file or secrets manager.

