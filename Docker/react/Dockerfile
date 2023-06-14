FROM node
LABEL "5986905" "5986905@alu.murciaeduca.es"
EXPOSE 5173
WORKDIR /app
RUN yarn install
RUN yarn
RUN yarn add react-router-dom
ENTRYPOINT [ "yarn", "dev", "--host"]
