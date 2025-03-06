#!/bin/bash

# Define project directories
PROJECT1="backbone-marionette-app"
PROJECT2="root-mfe"

# Navigate to first project
echo "Cleaning up dist folder in $PROJECT1..."
cd "$PROJECT1" || { echo "Directory $PROJECT1 not found!"; exit 1; }

# Delete dist folder if it exists
if [ -d "dist" ]; then
    rm -rf dist
    echo "Deleted dist folder."
else
    echo "dist folder not found, skipping..."
fi

# Run npm build
echo "Running npm build in $PROJECT1..."
npm run build

# Go back to parent direc
cd ..

# Start the second project (root-mfe) in a new terminal window
echo "Starting $PROJECT2 in a new terminal..."
gnome-terminal -- bash -c "cd $PROJECT2 && npm run start; exec bash"

# Start the first project (backbone-marionette-app) in another new terminal window
echo "Starting $PROJECT1 in a new terminal..."
gnome-terminal -- bash -c "cd $PROJECT1 && npm run start; exec bash"

echo "Both applications have been started in separate terminals."
