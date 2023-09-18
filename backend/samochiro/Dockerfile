FROM openjdk:17

WORKDIR /app

COPY ./samochiro-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","-Dserver.port=8000","-Dspring.profiles.active=oauth","samochiro-0.0.1-SNAPSHOT.jar"]
