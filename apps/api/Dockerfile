FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/package.json
RUN npm ci --omit=dev
COPY apps/api ./apps/api
EXPOSE 4000
CMD ["node", "apps/api/src/index.js"]
