FROM node:lts-slim as BUILD

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml /app/
COPY .yarn /app/.yarn
COPY packages/frontend/package.json /app/packages/frontend/package.json
COPY packages/backend/package.json /app/packages/backend/package.json

RUN yarn install

COPY packages/frontend /app/packages/frontend

RUN yarn workspace @mbidc/frontend build

COPY packages/backend /app/packages/backend

RUN yarn workspace @mbidc/backend build

COPY scripts /app/scripts

RUN ./scripts/build.sh

FROM node:lts-slim as RUN

ENV API_PORT 8000

WORKDIR /app

COPY packages/backend/package.json /app/

RUN yarn install --prod

COPY --from=BUILD /app/dist /app

COPY docker/docker-entrypoint /app/
RUN chmod +x /app/docker-entrypoint

COPY config.yml /app/

EXPOSE 8000

ENTRYPOINT ["/app/docker-entrypoint"]