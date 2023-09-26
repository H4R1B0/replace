FROM openjdk:17

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} samochiro-0.0.1-SNAPSHOT.jar

COPY build/libs/avid-lock-397313-6129fb95bb28.json .

ENTRYPOINT ["java","-jar","-Dserver.port=5000","samochiro-0.0.1-SNAPSHOT.jar"]
