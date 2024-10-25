# node version
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally (if not included in package.json)
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

# Expose the port your app runs on
EXPOSE 5000

# Command to run your app
CMD [ "node", "./dist/app.js" ]
