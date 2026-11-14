# STUDY PART: Build stage with SDK tools
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
# STUDY PART: Restore the project libraries
COPY StudyLab.csproj ./
RUN dotnet restore
# STUDY PART: Publish the application source
COPY . .
RUN dotnet publish StudyLab.csproj -c Release -o /out --no-restore
# STUDY PART: Prepare the smaller runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /out .
# STUDY PART: Configure the port and non-root process
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "StudyLab.dll"]
