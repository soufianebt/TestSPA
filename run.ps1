# Define project directories
$PROJECT1 = "backbone-marionette-app"
$PROJECT2 = "root-mfe"

# Navigate to the first project
Write-Host "Cleaning up dist folder in $PROJECT1..."
if (Test-Path "$PROJECT1") {
    Set-Location "$PROJECT1"

    # Delete dist folder if it exists
    if (Test-Path "dist") {
        Remove-Item -Recurse -Force "dist"
        Write-Host "Deleted dist folder."
    } else {
        Write-Host "dist folder not found, skipping..."
    }

    # Run npm build
    Write-Host "Running npm build in $PROJECT1..."
    npm run build

    # Go back to parent directory
    Set-Location ..
} else {
    Write-Host "Directory $PROJECT1 not found!"
    exit 1
}

# Start the second project (root-mfe) in a new PowerShell window
Write-Host "Starting $PROJECT2 in a new terminal..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PROJECT2'; npm run start"

# Start the first project (backbone-marionette-app) in another new PowerShell window
Write-Host "Starting $PROJECT1 in a new terminal..."
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PROJECT1'; npm run start"

Write-Host "Both applications have been started in separate terminals."
