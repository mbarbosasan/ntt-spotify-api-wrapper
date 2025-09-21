FROM node:alpine AS build

WORKDIR /app

COPY package.json ./

COPY . .

RUN corepack enable && pnpm i

RUN pnpm run build

FROM nginx:alpine AS prod

COPY --from=build /app/dist/ntt-case-tecnico/browser /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80