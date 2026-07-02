# Dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

#Building Image
FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npx prisma generate

RUN npm run build

#Production Image
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production

# Install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD [ "sh", "-c", "npx prisma migrate deploy && node dist/src/server.js" ]