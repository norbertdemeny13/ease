FROM node:16
WORKDIR /app
COPY ./package* ./
COPY ./*js ./

RUN npm install
COPY . .
RUN echo "Done"
# EXPOSE 8080
CMD ["yarn","serve"]
# Run with docker run -p 9595:8080 easefe
# http://localhost:9595/ease/