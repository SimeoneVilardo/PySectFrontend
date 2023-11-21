# Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install project dependencies
RUN npm install && npm install --only=dev

# Copy the rest of the application code to the working directory
COPY client/. .

# Build the Vite project
RUN npm run build


RUN npm install -g serve

# Expose the port that your application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["serve", "-s", "dist"]
