FROM node:10 AS builder


COPY ./ /src/app/

WORKDIR /src/app

RUN yarn
RUN yarn workspace web run build
RUN rm -rf packages/web/node_modules


FROM node:10-alpine

ENV PORT 3000
WORKDIR /src/app

COPY --from=builder /src/app/node_modules node_modules/
COPY --from=builder /src/app/yarn.lock /src/app/package.json  ./
COPY --from=builder /src/app/packages/xi-core  packages/xi-core/
COPY --from=builder /src/app/packages/server packages/server/
COPY --from=builder /src/app/packages/web packages/web/

COPY version.txt .

CMD ["yarn", "workspace", "server", "start"]

EXPOSE 3000
