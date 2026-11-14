# OpenAPI and Swagger UI

Open StudyLab.csproj in Visual Studio. Set the development environment. In PowerShell run `$env:ASPNETCORE_ENVIRONMENT="Development"` then `dotnet run --urls http://localhost:5100`. Open http://localhost:5100/swagger and http://localhost:5100/openapi/v1.json.

The built-in OpenAPI generator produces the JSON document. The SwaggerUI package displays it. No AddSwaggerGen is needed in this combination. The UI/document routes are exposed only in Development.
