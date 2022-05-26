FROM node

COPY ["package-lock.json","package.json","/home/Proyecto/"]

WORKDIR /home/Proyecto/

RUN npm install


COPY ["./","./Backend"]

WORKDIR /home/Proyecto/Backend/

EXPOSE 8080

CMD ["npm","run","start"]