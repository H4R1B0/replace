FROM openjdk:17

WORKDIR /app

COPY ./application.yml .
COPY ./application-oauth.yml .

COPY ./samochiro-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","-Dserver.port=5000","-Dspring.profiles.active=oauth","samochiro-0.0.1-SNAPSHOT.jar"]
