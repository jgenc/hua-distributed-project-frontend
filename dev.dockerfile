# To build:
#   - podman build -f dev.dockerfile -t devops-frontend-dev .
# To run this localy:
#   - podman run -it -p 3000:3000/tcp localhost/devops-frontend-dev:latest


FROM node:lts-alpine

WORKDIR /app

COPY package*.json vite.config.js /app/
RUN npm install

COPY index.html /app/
COPY src/ /app/src

EXPOSE 3000/tcp
CMD ["npm", "run", "start"]