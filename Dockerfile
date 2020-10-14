FROM node:12
EXPOSE 4000
ADD src /app/src
COPY .babelrc package.json tsconfig.json README.md /app/
RUN cd app && npm i && npm run build
CMD cd /app && npm run server