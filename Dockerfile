FROM node:12.18-alpine

WORKDIR /app

COPY . .

RUN npm install && npm install -g pm2

RUN addgroup -g 1002 appgroup
RUN adduser -D -u 1001 appuser -G appgroup
RUN chown -R appuser:appgroup /app
USER appuser


CMD ["pm2-runtime", "ecosystem.config.js"]