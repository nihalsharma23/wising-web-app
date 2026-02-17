$env:JAVA_HOME = "C:\Users\Lenovo\OneDrive\Stocksy\Wising-Dev\openjdk-17\jdk-17.0.18+8"
$env:Path = "C:\Users\Lenovo\OneDrive\Stocksy\Wising-Dev\openjdk-17\jdk-17.0.18+8\bin;C:\Users\Lenovo\OneDrive\Stocksy\Wising-Dev\apache-maven-3.9.6\bin;" + $env:Path

Write-Host "Starting Wising Backend..."
cd backend
mvn spring-boot:run
