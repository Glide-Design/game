FROM node:10

ENV PORT 3000

COPY ./ /src/app/

WORKDIR /src/app

RUN yarn

CMD ["yarn", "workspace", "corp", "start"]

EXPOSE 3000