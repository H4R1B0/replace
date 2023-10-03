FROM openjdk:17

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} samochiro-0.0.1-SNAPSHOT.jar

ENV TZ=Asia/Seoul

ENTRYPOINT ["java","-jar","-Dserver.port=5000","samochiro-0.0.1-SNAPSHOT.jar"]
