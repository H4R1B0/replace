-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: j9b307.p.ssafy.io    Database: vegetable
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ai_voice`
--

DROP TABLE IF EXISTS `ai_voice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ai_voice` (
  `ai_voice_id` bigint NOT NULL AUTO_INCREMENT,
  `ai_voice_url` varchar(255) NOT NULL,
  `ai_voice_name` varchar(255) NOT NULL,
  `situation` varchar(50) NOT NULL,
  `regist_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `room_uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`ai_voice_id`),
  KEY `FK_room_TO_ai_voice_1` (`room_uuid`),
  CONSTRAINT `FK_room_TO_ai_voice_1` FOREIGN KEY (`room_uuid`) REFERENCES `room` (`room_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=372 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ai_voice`
--

LOCK TABLES `ai_voice` WRITE;
/*!40000 ALTER TABLE `ai_voice` DISABLE KEYS */;
INSERT INTO `ai_voice` VALUES (336,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:20.269403249aucongrats-1.wav?generation=1696491080530944&alt=media','2023-10-05T16:31:20.269403249aucongrats-1.wav','CONGRATULATION','2023-10-05 16:31:21','faa0ced8-68c9-47c8-9680-793f82257638'),(337,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:20.819886178aucongrats-2.wav?generation=1696491080953259&alt=media','2023-10-05T16:31:20.819886178aucongrats-2.wav','CONGRATULATION','2023-10-05 16:31:21','faa0ced8-68c9-47c8-9680-793f82257638'),(338,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:21.293979491aucongrats-3.wav?generation=1696491081429030&alt=media','2023-10-05T16:31:21.293979491aucongrats-3.wav','CONGRATULATION','2023-10-05 16:31:21','faa0ced8-68c9-47c8-9680-793f82257638'),(339,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:21.814924279aucongrats-4.wav?generation=1696491081944036&alt=media','2023-10-05T16:31:21.814924279aucongrats-4.wav','CONGRATULATION','2023-10-05 16:31:22','faa0ced8-68c9-47c8-9680-793f82257638'),(340,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:22.262936089aucongrats-5.wav?generation=1696491082392725&alt=media','2023-10-05T16:31:22.262936089aucongrats-5.wav','CONGRATULATION','2023-10-05 16:31:22','faa0ced8-68c9-47c8-9680-793f82257638'),(341,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:22.677075211aucongrats-6.wav?generation=1696491082800299&alt=media','2023-10-05T16:31:22.677075211aucongrats-6.wav','CONGRATULATION','2023-10-05 16:31:23','faa0ced8-68c9-47c8-9680-793f82257638'),(342,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:23.137875923auconsolation-1.wav?generation=1696491083260343&alt=media','2023-10-05T16:31:23.137875923auconsolation-1.wav','CONSOLATION','2023-10-05 16:31:23','faa0ced8-68c9-47c8-9680-793f82257638'),(343,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:23.688064118auconsolation-2.wav?generation=1696491083818386&alt=media','2023-10-05T16:31:23.688064118auconsolation-2.wav','CONSOLATION','2023-10-05 16:31:24','faa0ced8-68c9-47c8-9680-793f82257638'),(344,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:24.102109751auconsolation-3.wav?generation=1696491084239851&alt=media','2023-10-05T16:31:24.102109751auconsolation-3.wav','CONSOLATION','2023-10-05 16:31:24','faa0ced8-68c9-47c8-9680-793f82257638'),(345,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:24.515650546auconsolation-4.wav?generation=1696491084637532&alt=media','2023-10-05T16:31:24.515650546auconsolation-4.wav','CONSOLATION','2023-10-05 16:31:25','faa0ced8-68c9-47c8-9680-793f82257638'),(346,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:24.977827597auconsolation-5.wav?generation=1696491085104512&alt=media','2023-10-05T16:31:24.977827597auconsolation-5.wav','CONSOLATION','2023-10-05 16:31:25','faa0ced8-68c9-47c8-9680-793f82257638'),(347,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:25.511557546auconsolation-6.wav?generation=1696491085634703&alt=media','2023-10-05T16:31:25.511557546auconsolation-6.wav','CONSOLATION','2023-10-05 16:31:26','faa0ced8-68c9-47c8-9680-793f82257638'),(348,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:25.950599128auencourage-1.wav?generation=1696491086070482&alt=media','2023-10-05T16:31:25.950599128auencourage-1.wav','ENCOURAGE','2023-10-05 16:31:26','faa0ced8-68c9-47c8-9680-793f82257638'),(349,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:26.416491514auencourage-2.wav?generation=1696491086559600&alt=media','2023-10-05T16:31:26.416491514auencourage-2.wav','ENCOURAGE','2023-10-05 16:31:27','faa0ced8-68c9-47c8-9680-793f82257638'),(350,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:26.870581683auencourage-3.wav?generation=1696491087000303&alt=media','2023-10-05T16:31:26.870581683auencourage-3.wav','ENCOURAGE','2023-10-05 16:31:27','faa0ced8-68c9-47c8-9680-793f82257638'),(351,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:27.338099541auencourage-4.wav?generation=1696491087450334&alt=media','2023-10-05T16:31:27.338099541auencourage-4.wav','ENCOURAGE','2023-10-05 16:31:27','faa0ced8-68c9-47c8-9680-793f82257638'),(352,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:27.853208346auencourage-5.wav?generation=1696491087984009&alt=media','2023-10-05T16:31:27.853208346auencourage-5.wav','ENCOURAGE','2023-10-05 16:31:28','faa0ced8-68c9-47c8-9680-793f82257638'),(353,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:28.290535189auencourage-6.wav?generation=1696491088417078&alt=media','2023-10-05T16:31:28.290535189auencourage-6.wav','ENCOURAGE','2023-10-05 16:31:28','faa0ced8-68c9-47c8-9680-793f82257638'),(354,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:28.677795699ausafety-1.wav?generation=1696491088793465&alt=media','2023-10-05T16:31:28.677795699ausafety-1.wav','SAFETY','2023-10-05 16:31:29','faa0ced8-68c9-47c8-9680-793f82257638'),(355,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:29.186649086ausafety-2.wav?generation=1696491089301692&alt=media','2023-10-05T16:31:29.186649086ausafety-2.wav','SAFETY','2023-10-05 16:31:29','faa0ced8-68c9-47c8-9680-793f82257638'),(356,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:29.689490869ausafety-3.wav?generation=1696491089810999&alt=media','2023-10-05T16:31:29.689490869ausafety-3.wav','SAFETY','2023-10-05 16:31:30','faa0ced8-68c9-47c8-9680-793f82257638'),(357,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:30.205559244ausafety-4.wav?generation=1696491090316269&alt=media','2023-10-05T16:31:30.205559244ausafety-4.wav','SAFETY','2023-10-05 16:31:30','faa0ced8-68c9-47c8-9680-793f82257638'),(358,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:30.714138227ausafety-5.wav?generation=1696491090828924&alt=media','2023-10-05T16:31:30.714138227ausafety-5.wav','SAFETY','2023-10-05 16:31:31','faa0ced8-68c9-47c8-9680-793f82257638'),(359,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:31.237270607ausafety-6.wav?generation=1696491091350435&alt=media','2023-10-05T16:31:31.237270607ausafety-6.wav','SAFETY','2023-10-05 16:31:31','faa0ced8-68c9-47c8-9680-793f82257638'),(360,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:31.688495708authanks-1.wav?generation=1696491091835225&alt=media','2023-10-05T16:31:31.688495708authanks-1.wav','THANKS','2023-10-05 16:31:32','faa0ced8-68c9-47c8-9680-793f82257638'),(361,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:32.088232893authanks-2.wav?generation=1696491092218489&alt=media','2023-10-05T16:31:32.088232893authanks-2.wav','THANKS','2023-10-05 16:31:32','faa0ced8-68c9-47c8-9680-793f82257638'),(362,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:32.575968070authanks-3.wav?generation=1696491092703438&alt=media','2023-10-05T16:31:32.575968070authanks-3.wav','THANKS','2023-10-05 16:31:33','faa0ced8-68c9-47c8-9680-793f82257638'),(363,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:33.094769279authanks-4.wav?generation=1696491093216320&alt=media','2023-10-05T16:31:33.094769279authanks-4.wav','THANKS','2023-10-05 16:31:33','faa0ced8-68c9-47c8-9680-793f82257638'),(364,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:33.515878198authanks-5.wav?generation=1696491093643285&alt=media','2023-10-05T16:31:33.515878198authanks-5.wav','THANKS','2023-10-05 16:31:34','faa0ced8-68c9-47c8-9680-793f82257638'),(365,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:33.941835865authanks-6.wav?generation=1696491094069712&alt=media','2023-10-05T16:31:33.941835865authanks-6.wav','THANKS','2023-10-05 16:31:34','faa0ced8-68c9-47c8-9680-793f82257638'),(366,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:34.423828077auwelcome-1.wav?generation=1696491094541170&alt=media','2023-10-05T16:31:34.423828077auwelcome-1.wav','WELCOME','2023-10-05 16:31:35','faa0ced8-68c9-47c8-9680-793f82257638'),(367,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:34.913124786auwelcome-2.wav?generation=1696491095030125&alt=media','2023-10-05T16:31:34.913124786auwelcome-2.wav','WELCOME','2023-10-05 16:31:35','faa0ced8-68c9-47c8-9680-793f82257638'),(368,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:35.431631024auwelcome-3.wav?generation=1696491095556425&alt=media','2023-10-05T16:31:35.431631024auwelcome-3.wav','WELCOME','2023-10-05 16:31:36','faa0ced8-68c9-47c8-9680-793f82257638'),(369,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:35.866662783auwelcome-4.wav?generation=1696491095984176&alt=media','2023-10-05T16:31:35.866662783auwelcome-4.wav','WELCOME','2023-10-05 16:31:36','faa0ced8-68c9-47c8-9680-793f82257638'),(370,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:36.351534633auwelcome-5.wav?generation=1696491096462012&alt=media','2023-10-05T16:31:36.351534633auwelcome-5.wav','WELCOME','2023-10-05 16:31:36','faa0ced8-68c9-47c8-9680-793f82257638'),(371,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:31:36.351534633auwelcome-5.wav?generation=1696491096462012&alt=media','2023-10-05T16:31:36.351534633auwelcome-5.wav','THANKS','2023-10-05 16:31:36','3016cc07-d814-4d19-864f-0c191f3193d6');
/*!40000 ALTER TABLE `ai_voice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alarm`
--

DROP TABLE IF EXISTS `alarm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alarm` (
  `alarm_id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(100) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`alarm_id`),
  KEY `FK_user_TO_alert_1` (`user_id`),
  CONSTRAINT `FK_user_TO_alert_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alarm`
--

LOCK TABLES `alarm` WRITE;
/*!40000 ALTER TABLE `alarm` DISABLE KEYS */;
INSERT INTO `alarm` VALUES (40,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(41,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(42,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(43,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(44,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(45,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(46,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(47,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(48,'김됴아듀님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3036431511'),(55,'웅성웅성님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM'),(56,'웅성웅성님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM'),(58,'김조아조아님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3021774079'),(59,'김조아조아님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3021774079'),(60,'학습이 완료되었습니다.','3021774079'),(61,'웅성웅성님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3021774079'),(62,'웅성웅성님으로부터 보이스 메일이 도착했습니다! 지금 바로 확인해 볼까요?','3021774079');
/*!40000 ALTER TABLE `alarm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `declaration`
--

DROP TABLE IF EXISTS `declaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declaration` (
  `declaration_id` bigint NOT NULL AUTO_INCREMENT,
  `declaration_type` varchar(50) NOT NULL,
  `declaration_content` varchar(255) DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  `wreath_id` bigint NOT NULL,
  PRIMARY KEY (`declaration_id`),
  KEY `FK_user_TO_declaration_1` (`user_id`),
  KEY `FK_wreath_TO_declaration_1` (`wreath_id`),
  CONSTRAINT `FK_user_TO_declaration_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_wreath_TO_declaration_1` FOREIGN KEY (`wreath_id`) REFERENCES `wreath` (`wreath_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declaration`
--

LOCK TABLES `declaration` WRITE;
/*!40000 ALTER TABLE `declaration` DISABLE KEYS */;
/*!40000 ALTER TABLE `declaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter` (
  `letter_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `write_time` datetime NOT NULL,
  `room_uuid` varchar(36) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`letter_id`),
  KEY `FK_room_TO_letter_1` (`room_uuid`),
  KEY `FK_user_TO_letter_1` (`user_id`),
  CONSTRAINT `FK_room_TO_letter_1` FOREIGN KEY (`room_uuid`) REFERENCES `room` (`room_uuid`),
  CONSTRAINT `FK_user_TO_letter_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES (25,'새벽에 쓴 편지','새벽에 쓴 편지...감성적인 문구.... 찬 바람..... 사실 에어컨 바람임....왜 밖은 추운데 집은 더울까? 창문 열면 밭 냄새가 난다...','2023-09-26 15:36:09','3e91bd58-7a48-472e-9cc4-19c4c5b26c88','3038115215'),(42,'은성아 시간이 이상해','나는 3시 49분에 썼단다','2023-09-27 06:49:53','3e91bd58-7a48-472e-9cc4-19c4c5b26c88','3038115215'),(52,'^_^','행복한하루대세요~','2023-10-04 09:59:14','33497b1a-9064-45c0-a689-706724f29806','3036431511'),(59,'수혁에게','수혁아 잘 지내? 나는 오늘 샐러드 파스타를 먹었어 지원이가 해줬어\n너도 참 좋아했는데..','2023-10-05 09:18:50','77e364f8-fd6f-4802-941c-75aaa992a382','3037820358'),(82,'종횬','종현아 보고싶다','2023-10-05 15:53:03','69ae7449-5111-4b61-b880-997ce1263b51','lErSl9VR_jC0-GGKQwTLeNHeY4G7Nvd4sfIz8rhCVnQ'),(83,'편히 쉬어..','부디 하늘에서는 우울함에서 한 톨이라도 벗어나서 편히 쉬기를. 잊지 않을게요','2023-09-05 17:10:00','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(84,'나중에 다시 만나','나의 어린 시절과 나의 우울한 나날들을 함께 해준 너의 노래가 나에게 너무 고마워 나중에 다시 만나 잘지내','2023-09-12 17:10:24','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(85,'보고 싶어','종현아 꿈에서는 널 볼 수 있겠지 니가 너무 보고싶어','2023-09-17 17:10:37','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(86,'잊지 않을게','너무 마음 아프다 .. 초등학생 시절을 함께 보냈다고 해도 과언이 아닐 정도로 매일 친구들이랑 샤이니 영상 보고 노래 들으면서 자랐는데.. 정말 고생 많았어요 그 곳에선 누구보다 행복하셨으면 좋겠어요. 절대 잊지 않을게요','2023-09-18 17:10:58','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(87,'날이 추워졌어','날이 춥다 종현아. 네가 가는 길은 따뜻했으면 좋겠어','2023-09-23 17:11:06','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(88,'보고싶어','보고싶어 나의 자랑, 사랑해','2023-10-01 17:11:21','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(89,'넌 최고야','이젠 편히 행복했으면 좋겠어 놓아줘 듣는데 눈물난다 이렇게 표현하고 있었는데 몰랐던 내가 싫어 넌 언제나 최고였어 사랑해 종현아','2023-10-05 17:11:31','faa0ced8-68c9-47c8-9680-793f82257638','3021774079'),(96,'2015년 10월 6일의 종현이의 푸른밤','사람들은요, 말로만 얘기를 하는 건 아니라고 하잖아요?\n눈으로, 몸짓으로, 표정으로.\n어쩌면 더 많은 얘기를 하고 있는 걸지 모릅니다.\n여러분은 오늘 누구에게 어떤 눈빛으로\n어떤 표정으로 대화를 시도하셨나요?\n그 무언의 이야기들이 온전하게 전해졌으면 좋겠는데. 전해졌겠죠?\n\n10월 6일, 오늘과 내일 사이 여기는 푸른 밤입니다','2023-10-06 02:49:24','faa0ced8-68c9-47c8-9680-793f82257638','3021774079');
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photo` (
  `photo_id` bigint NOT NULL AUTO_INCREMENT,
  `photo_url` varchar(255) NOT NULL,
  `photo_name` varchar(255) NOT NULL,
  `regist_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `room_uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`photo_id`),
  KEY `FK_room_TO_photo_1` (`room_uuid`),
  CONSTRAINT `FK_room_TO_photo_1` FOREIGN KEY (`room_uuid`) REFERENCES `room` (`room_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=515 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (191,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T20:22:41.090990732ph%EC%A2%85%ED%98%84014.jpg?generation=1696418561336351&alt=media','2023-10-04T20:22:41.090990732ph종현014.jpg','2023-10-04 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(192,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T20:22:41.650035726ph%EC%A2%85%ED%98%84017.jpg?generation=1696418561768775&alt=media','2023-10-04T20:22:41.650035726ph종현017.jpg','2023-10-04 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(193,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T20:22:42.000608834ph%EC%A2%85%ED%98%84018.jpg?generation=1696418562106376&alt=media','2023-10-04T20:22:42.000608834ph종현018.jpg','2023-10-04 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(195,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T20:22:42.553715344ph%EC%A2%85%ED%98%84024.jpg?generation=1696418562671664&alt=media','2023-10-04T20:22:42.553715344ph종현024.jpg','2023-10-04 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(197,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T20:22:43.894692996ph%EC%A2%85%ED%98%84026.jpg?generation=1696418564011279&alt=media','2023-10-04T20:22:43.894692996ph종현026.jpg','2023-10-04 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(198,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T20:22:44.173149318ph%EC%A2%85%ED%98%84027.jpg?generation=1696418564278033&alt=media','2023-10-04T20:22:44.173149318ph종현027.jpg','2023-10-04 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(469,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:31.091808490phKakaoTalk_20231004_214710804.jpg?generation=1696424071622244&alt=media','2023-10-04T21:54:31.091808490phKakaoTalk_20231004_214710804.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(470,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:33.263823752phKakaoTalk_20231004_214711615.jpg?generation=1696424073411434&alt=media','2023-10-04T21:54:33.263823752phKakaoTalk_20231004_214711615.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(471,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:36.576094172phKakaoTalk_20231004_214713618.jpg?generation=1696424076786092&alt=media','2023-10-04T21:54:36.576094172phKakaoTalk_20231004_214713618.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(472,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:38.915440890phKakaoTalk_20231004_214715361.jpg?generation=1696424079178685&alt=media','2023-10-04T21:54:38.915440890phKakaoTalk_20231004_214715361.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(473,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:40.673880471phKakaoTalk_20231004_214716000.jpg?generation=1696424080799435&alt=media','2023-10-04T21:54:40.673880471phKakaoTalk_20231004_214716000.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(474,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:42.429258096phKakaoTalk_20231004_214716789.jpg?generation=1696424082623121&alt=media','2023-10-04T21:54:42.429258096phKakaoTalk_20231004_214716789.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(475,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T21:54:44.125662726phKakaoTalk_20231004_214730420.jpg?generation=1696424084275488&alt=media','2023-10-04T21:54:44.125662726phKakaoTalk_20231004_214730420.jpg','2023-10-04 00:00:00','48636a02-449a-49e2-a58b-b68a8450f0b0'),(476,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:00:10.681252128ph1696308793041.jpg?generation=1696424411015915&alt=media','2023-10-04T22:00:10.681252128ph1696308793041.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(477,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:00:27.002255021ph1696308793207.jpg?generation=1696424427601204&alt=media','2023-10-04T22:00:27.002255021ph1696308793207.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(478,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:00:50.454994711ph1696308793294.jpg?generation=1696424450961671&alt=media','2023-10-04T22:00:50.454994711ph1696308793294.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(479,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:01:06.753266631ph1696308793396.jpg?generation=1696424467208606&alt=media','2023-10-04T22:01:06.753266631ph1696308793396.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(480,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:05:03.537777489ph1696308793535.jpg?generation=1696424703898164&alt=media','2023-10-04T22:05:03.537777489ph1696308793535.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(481,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:05:20.435768348ph1696308640051.jpg?generation=1696424720811461&alt=media','2023-10-04T22:05:20.435768348ph1696308640051.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(482,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:05:50.907308888ph1696308640178.jpg?generation=1696424751320239&alt=media','2023-10-04T22:05:50.907308888ph1696308640178.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(483,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:06:29.444064486ph1696308640251.jpg?generation=1696424789840174&alt=media','2023-10-04T22:06:29.444064486ph1696308640251.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(484,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:06:57.707307991ph1696308640312.jpg?generation=1696424818097964&alt=media','2023-10-04T22:06:57.707307991ph1696308640312.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(485,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:07:13.069510075ph1696308640358.jpg?generation=1696424833464982&alt=media','2023-10-04T22:07:13.069510075ph1696308640358.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(486,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T22:07:29.533133931ph1696308640467.jpg?generation=1696424849991734&alt=media','2023-10-04T22:07:29.533133931ph1696308640467.jpg','2023-10-04 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(489,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T09:29:58.083182633phScreenshot_20231005_092550_Gallery.jpg?generation=1696465798391968&alt=media','2023-10-05T09:29:58.083182633phScreenshot_20231005_092550_Gallery.jpg','2023-10-05 00:00:00','77e364f8-fd6f-4802-941c-75aaa992a382'),(490,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T14:18:29.373037970ph%EB%8C%80%EC%A0%84_3%EB%B0%98_%EB%B0%95%EC%A7%80%EC%98%81.JPG?generation=1696483109674420&alt=media','2023-10-05T14:18:29.373037970ph대전_3반_박지영.JPG','2023-10-05 00:00:00','3016cc07-d814-4d19-864f-0c191f3193d6'),(503,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:49:56.631711975ph%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C%20(1).jpeg?generation=1696488596892713&alt=media','2023-10-05T15:49:56.631711975ph다운로드 (1).jpeg','2023-10-05 00:00:00','69ae7449-5111-4b61-b880-997ce1263b51'),(504,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:54:13.870117445ph20231003_181608.jpg?generation=1696488854284389&alt=media','2023-10-05T15:54:13.870117445ph20231003_181608.jpg','2023-10-05 00:00:00','ee4f1f10-e7f6-4330-817e-fca20fbabf97'),(505,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:54:17.387169535ph20231003_181608.jpg?generation=1696488857649341&alt=media','2023-10-05T15:54:17.387169535ph20231003_181608.jpg','2023-10-05 00:00:00','ee4f1f10-e7f6-4330-817e-fca20fbabf97'),(506,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:54:37.809839573ph20231003_153306.jpg?generation=1696488878221798&alt=media','2023-10-05T15:54:37.809839573ph20231003_153306.jpg','2023-10-05 00:00:00','ee4f1f10-e7f6-4330-817e-fca20fbabf97'),(507,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:58:46.065743182ph20231004_115339.jpg?generation=1696489126455073&alt=media','2023-10-05T15:58:46.065743182ph20231004_115339.jpg','2023-10-05 00:00:00','61edeb5b-98d4-4d37-ba3d-7a811fe2e729'),(508,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:59:00.381923691phScreenshot_20231005_092313_Gallery.jpg?generation=1696489140706838&alt=media','2023-10-05T15:59:00.381923691phScreenshot_20231005_092313_Gallery.jpg','2023-10-05 00:00:00','61edeb5b-98d4-4d37-ba3d-7a811fe2e729'),(509,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:59:17.558928972ph1696333927661.jpg?generation=1696489157908940&alt=media','2023-10-05T15:59:17.558928972ph1696333927661.jpg','2023-10-05 00:00:00','61edeb5b-98d4-4d37-ba3d-7a811fe2e729'),(510,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:54:27.698333371ph375525987_136994529434706_5932100394488805206_n.jpg?generation=1696492467981106&alt=media','2023-10-05T16:54:27.698333371ph375525987_136994529434706_5932100394488805206_n.jpg','2023-10-05 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(511,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:55:25.483479911ph367513157_842479510321577_2641711639922877004_n.jpg?generation=1696492525714836&alt=media','2023-10-05T16:55:25.483479911ph367513157_842479510321577_2641711639922877004_n.jpg','2023-10-05 00:00:00','faa0ced8-68c9-47c8-9680-793f82257638'),(512,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T17:17:35.919112619ph%EB%8C%80%EC%A0%84_2%EB%B0%98_%EB%B0%95%EC%A7%80%EC%98%81.JPG?generation=1696493856180469&alt=media','2023-10-05T17:17:35.919112619ph대전_2반_박지영.JPG','2023-10-05 00:00:00','3016cc07-d814-4d19-864f-0c191f3193d6'),(513,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T17:17:44.741532128ph%EB%8C%80%EC%A0%84_2%EB%B0%98_%EB%B0%95%EC%A7%80%EC%98%81.JPG?generation=1696493865166399&alt=media','2023-10-05T17:17:44.741532128ph대전_2반_박지영.JPG','2023-10-05 00:00:00','3016cc07-d814-4d19-864f-0c191f3193d6'),(514,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-06T02:29:38.669817294ph20231003_181608.jpg?generation=1696526979091176&alt=media','2023-10-06T02:29:38.669817294ph20231003_181608.jpg','2023-10-06 00:00:00','34100259-1bef-4520-8ba6-638e2fab72d6');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_uuid` varchar(36) NOT NULL,
  `target_name` varchar(20) DEFAULT NULL,
  `sequence` int NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `target_gender` char(1) DEFAULT NULL,
  PRIMARY KEY (`room_uuid`),
  KEY `FK_user_TO_room_1` (`user_id`),
  CONSTRAINT `FK_user_TO_room_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES ('053d4ad7-78b6-4511-865c-28501cd13746','김됴아듀',1,'xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8',NULL),('07e70f22-d565-4dc3-acbc-b6e6c2d43f26',NULL,3,'3021774079',NULL),('116ebc96-9b2c-4fff-a226-a2454bb7650d',NULL,2,'3048373691',NULL),('144fa9f5-512f-4f40-acd2-3611985214d9',NULL,3,'3039292638',NULL),('204a5c36-07a9-4802-a585-a648fc531a28',NULL,1,'3050577614',NULL),('206b47d9-a44f-41d3-88c1-0b2c2cc2bf62','테스트',1,'3040097857',NULL),('20aa2b7e-4ecb-4f8d-ad17-8e18baecf596','노수혀ㅛ',1,'osuX_U9H6oRMA79Eox5aI45F-e5Pa6aCeJqoNlhf04o',''),('27ed017c-29d9-4a09-b0cf-f07303f07847','nono',2,'mNj8CFYQLjqfAPu14JCC5O0OsDu26FUsen8264xs4Co',NULL),('3016cc07-d814-4d19-864f-0c191f3193d6','nana',1,'3037842085',NULL),('322cb223-18ff-4e69-bb9f-14fe7830091c','노수',1,'3038398768','M'),('33497b1a-9064-45c0-a689-706724f29806',NULL,2,'3036431511',NULL),('34100259-1bef-4520-8ba6-638e2fab72d6','웅성웅성',1,'3037820358','F'),('38889187-98fa-4cc3-baa0-a48b220864f3','gkdl',2,'osuX_U9H6oRMA79Eox5aI45F-e5Pa6aCeJqoNlhf04o',NULL),('3e91bd58-7a48-472e-9cc4-19c4c5b26c88',NULL,1,'3038115215',NULL),('4777218d-431c-4ed4-8373-40ab98ebd0d9','구경',1,'3048373691',''),('48636a02-449a-49e2-a58b-b68a8450f0b0','김조아조아',1,'3036431511','F'),('53c37ee5-b731-4422-9e07-5b49ffbf6b65','하위',1,'3048421191',''),('57ba8140-0bee-4315-bce6-a1595199ad4d','ddd',3,'3038115215',NULL),('5cffa778-6ca6-4906-8e77-d4b9ebfb3cbc',NULL,2,'xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8',NULL),('61edeb5b-98d4-4d37-ba3d-7a811fe2e729','김조아',1,'3021774079','M'),('69ae7449-5111-4b61-b880-997ce1263b51','종현',2,'lErSl9VR_jC0-GGKQwTLeNHeY4G7Nvd4sfIz8rhCVnQ',NULL),('6f69c031-d3f4-4943-a407-0b51edecad84',NULL,3,'3048651260',NULL),('76a0d576-1547-433e-8181-e4e93304f449',NULL,3,'3051202092',NULL),('77e364f8-fd6f-4802-941c-75aaa992a382','노수혁',2,'3037820358',NULL),('79403107-78ae-4d95-892f-9f8359cc134c',NULL,3,'osuX_U9H6oRMA79Eox5aI45F-e5Pa6aCeJqoNlhf04o',NULL),('7fcbd476-7901-4573-a1db-a2fdfff56e4c','폰강아지2',2,'106643394994741173496',NULL),('8359851a-b276-4bb5-a3e4-943f74a66afb',NULL,3,'xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8',NULL),('848e7001-c93d-4cff-9c32-1be5336d5703',NULL,1,'mNj8CFYQLjqfAPu14JCC5O0OsDu26FUsen8264xs4Co',NULL),('851a22b7-76a8-4ed7-829b-7b48b5f450fc',NULL,1,'3051202092',NULL),('869e8abc-6438-4502-b837-723ef1c1d124',NULL,2,'wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM',NULL),('8791bfd4-8ded-4ad9-b1a4-1031c9332c70',NULL,3,'3037842085',NULL),('88b64386-2088-4259-a9be-c32e1bc217b0','sdafdsa',3,'mNj8CFYQLjqfAPu14JCC5O0OsDu26FUsen8264xs4Co',NULL),('90630a53-9793-4fde-9184-80a198fe6b39',NULL,3,'3036431511',NULL),('9236f36b-7aa0-4717-9ffd-272e34598ccb',NULL,2,'3051202092',NULL),('97e9186b-481a-4ff7-b998-c25301fd6492',NULL,1,'106643394994741173496',NULL),('9a841eba-9778-45f5-87bb-be0cecfb7cd0',NULL,3,'lErSl9VR_jC0-GGKQwTLeNHeY4G7Nvd4sfIz8rhCVnQ',NULL),('9df50744-ee77-4dea-ac81-84fc10160a2a',NULL,3,'3048373691',NULL),('a21c6468-5f0e-4de0-9974-b390c156a338',NULL,2,'3048651260',NULL),('a377bc46-0655-4d29-bbe0-37aa41a5fb7e',NULL,1,'3039292638',NULL),('bb07d872-96e7-4d30-b52b-96fa1e0bbc01',NULL,3,'3037820358',NULL),('bc67c6e9-d021-4746-8bec-0360446c2253','하이루',3,'3038398768',NULL),('bce95df8-6c47-4eed-8aac-a503d27980b0','니나노',1,'wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM','M'),('ce4e1229-d19a-46c2-b688-c4368cb2758c',NULL,3,'106643394994741173496',NULL),('d0cca07a-5d21-4af5-aee6-a63070b37c7b',NULL,3,'3050577614',NULL),('d58a310b-949f-4b48-94ca-ac7ac6353ea5',NULL,3,'3048421191',NULL),('dd3075c2-e4ba-4fe1-b756-36154a9917c2',NULL,2,'3037842085',NULL),('e6f7929a-4118-4579-8d38-b0656901c865','Room',2,'3039292638',NULL),('e712f85c-46b1-4ac8-b675-7ac7d1d6d150','sss',2,'3038115215',NULL),('eb5be91b-7377-4d9d-ac2f-a4be7fb29894',NULL,2,'3050577614',NULL),('edb9385c-145b-469a-8a8a-6af11d63bae0','하이',2,'3038398768',NULL),('ee4f1f10-e7f6-4330-817e-fca20fbabf97','웅송이',1,'lErSl9VR_jC0-GGKQwTLeNHeY4G7Nvd4sfIz8rhCVnQ','F'),('ef998532-a664-4b4e-8a18-2c8f1f204edf','녹차왕',1,'3048651260','M'),('f1e669fa-51e1-4560-9f28-373c839cc3c8',NULL,3,'3040097857',NULL),('f67ccfa6-2bb9-4cdc-859e-c8378145de9c',NULL,2,'3040097857',NULL),('f7f618ea-2db0-4ec7-9650-f9970a837528','더미용',3,'wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM',NULL),('faa0ced8-68c9-47c8-9680-793f82257638','쫑디',2,'3021774079',NULL),('fe060af7-84f6-425e-ba79-4bfb189ce3bd','하위',2,'3048421191',NULL);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(50) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `is_change` bit(1) NOT NULL,
  `social_type` varchar(20) NOT NULL,
  `password` varchar(320) DEFAULT NULL,
  `role_type` varchar(20) NOT NULL,
  `gender` char(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('106643394994741173496','qkrguswns25@gmail.com','폰강아지2',_binary '','GOOGLE','NO_PASS','USER','M'),('3021774079','harib0@kakao.com','김조아',_binary '','KAKAO','NO_PASS','USER','M'),('3036431511','07juahlily21@naver.com','김조아조아',_binary '','KAKAO','NO_PASS','USER','F'),('3037820358','anytime0916@naver.com','웅성웅성',_binary '','KAKAO','NO_PASS','USER','F'),('3037842085','pgy1613@naver.com','nana',_binary '','KAKAO','NO_PASS','USER','F'),('3038115215','acd0825@gmail.com','제이제이',_binary '','KAKAO','NO_PASS','USER','F'),('3038398768','roh403@naver.com','노수',_binary '','KAKAO','NO_PASS','USER','M'),('3039292638','lab_chorus0z@icloud.com','앙앙앙앙',_binary '','KAKAO','NO_PASS','USER',''),('3040097857','hwain2k@nate.com','테스트',_binary '','KAKAO','NO_PASS','USER',''),('3048373691','suuwhoop@kakao.com','구경',_binary '','KAKAO','NO_PASS','USER',''),('3048421191','pum005@naver.com','하위',_binary '','KAKAO','NO_PASS','USER',''),('3048651260','yllh325@gmail.com','녹차왕',_binary '','KAKAO','NO_PASS','USER','M'),('3050577614','ghjadmb21@gmail.com','양희제',_binary '\0','KAKAO','NO_PASS','USER',NULL),('3051202092','quso12358@naver.com','나건',_binary '\0','KAKAO','NO_PASS','USER',NULL),('lErSl9VR_jC0-GGKQwTLeNHeY4G7Nvd4sfIz8rhCVnQ','anytime0916@naver.com','웅송이',_binary '','NAVER','NO_PASS','USER','F'),('mNj8CFYQLjqfAPu14JCC5O0OsDu26FUsen8264xs4Co','bewithu14@naver.com','nono',_binary '','NAVER','NO_PASS','USER','F'),('osuX_U9H6oRMA79Eox5aI45F-e5Pa6aCeJqoNlhf04o','roh403@naver.com','노수혀ㅛ',_binary '','NAVER','NO_PASS','USER',''),('wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM','qkrguswns25@naver.com','니나노',_binary '','NAVER','NO_PASS','USER','M'),('xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','07juahlily21@naver.com','김됴아듀',_binary '','NAVER','NO_PASS','USER','F');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice`
--

DROP TABLE IF EXISTS `voice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice` (
  `voice_id` bigint NOT NULL AUTO_INCREMENT,
  `voice_url` varchar(700) NOT NULL,
  `voice_name` varchar(255) NOT NULL,
  `regist_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `room_uuid` varchar(36) NOT NULL,
  PRIMARY KEY (`voice_id`),
  KEY `FK_room_TO_record_voice_1` (`room_uuid`),
  CONSTRAINT `FK_room_TO_record_voice_1` FOREIGN KEY (`room_uuid`) REFERENCES `room` (`room_uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice`
--

LOCK TABLES `voice` WRITE;
/*!40000 ALTER TABLE `voice` DISABLE KEYS */;
INSERT INTO `voice` VALUES (81,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-02T14:24:15.810222248au%EC%A0%84%EB%93%B1%EC%8A%A4%EC%9C%84%EC%B9%98.mp3?generation=1696224256088575&alt=media','2023-10-02T14:24:15.810222248au전등스위치.mp3','2023-10-02 14:24:16','e712f85c-46b1-4ac8-b675-7ac7d1d6d150'),(82,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-02T14:24:22.261112105au%EC%A0%84%EB%93%B1%EC%8A%A4%EC%9C%84%EC%B9%98.mp3?generation=1696224262539684&alt=media','2023-10-02T14:24:22.261112105au전등스위치.mp3','2023-10-02 14:24:23','e712f85c-46b1-4ac8-b675-7ac7d1d6d150'),(86,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-02T16:12:57.973003819aulighton.mp3?generation=1696230778231405&alt=media','2023-10-02T16:12:57.973003819aulighton.mp3','2023-10-02 16:12:58','e712f85c-46b1-4ac8-b675-7ac7d1d6d150'),(207,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T15:50:33.620086888aujonghyeon.wav?generation=1696488633895903&alt=media','2023-10-05T15:50:33.620086888aujonghyeon.wav','2023-10-05 15:50:34','69ae7449-5111-4b61-b880-997ce1263b51'),(243,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:13:02.068532640auV4X0h2byUdo.wav?generation=1696490013347248&alt=media','2023-10-05T16:13:02.068532640auV4X0h2byUdo.wav','2023-10-05 16:13:33','faa0ced8-68c9-47c8-9680-793f82257638'),(244,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:15:18.076789887auYkDRMDZ1Imw.wav?generation=1696490152790355&alt=media','2023-10-05T16:15:18.076789887auYkDRMDZ1Imw.wav','2023-10-05 16:15:53','faa0ced8-68c9-47c8-9680-793f82257638'),(245,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:17:14.669844580auyTaUJ4rYMRw.wav?generation=1696490260540819&alt=media','2023-10-05T16:17:14.669844580auyTaUJ4rYMRw.wav','2023-10-05 16:17:41','faa0ced8-68c9-47c8-9680-793f82257638'),(282,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:58:30.885698031aujonghyeon.wav?generation=1696492711163838&alt=media','2023-10-05T16:58:30.885698031aujonghyeon.wav','2023-10-05 16:58:31','faa0ced8-68c9-47c8-9680-793f82257638'),(283,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T17:24:20.679624515aublob?generation=1696494260989224&alt=media','2023-10-05T17:24:20.679624515aublob','2023-10-05 17:24:21','3016cc07-d814-4d19-864f-0c191f3193d6'),(284,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T17:37:56.193542485au63f0f56d-6243-4186-bdbc-2db67c8ce891.wav?generation=1696495076557260&alt=media','2023-10-05T17:37:56.193542485au63f0f56d-6243-4186-bdbc-2db67c8ce891.wav','2023-10-05 17:37:57','3016cc07-d814-4d19-864f-0c191f3193d6'),(285,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T17:38:45.921785011aublob?generation=1696495126378520&alt=media','2023-10-05T17:38:45.921785011aublob','2023-10-05 17:38:46','3016cc07-d814-4d19-864f-0c191f3193d6'),(286,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T17:40:00.450359624aublob?generation=1696495200748204&alt=media','2023-10-05T17:40:00.450359624aublob','2023-10-05 17:40:01','3016cc07-d814-4d19-864f-0c191f3193d6'),(289,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-06T01:34:07.814773858au%ED%97%A4%EC%96%B4%EC%A7%80%EC%9E%90%20%EB%A7%90%ED%95%B4%EC%9A%94_jonghyeon_version2-zptw89sdi7rnzy8zxm745j6zmh.wav?generation=1696523650401679&alt=media','2023-10-06T01:34:07.814773858au헤어지자 말해요_jonghyeon_version2-zptw89sdi7rnzy8zxm745j6zmh.wav','2023-10-06 01:34:10','69ae7449-5111-4b61-b880-997ce1263b51');
/*!40000 ALTER TABLE `voice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voice_mail`
--

DROP TABLE IF EXISTS `voice_mail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voice_mail` (
  `voicemail_id` bigint NOT NULL AUTO_INCREMENT,
  `voicemail_url` varchar(255) NOT NULL,
  `send_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `voicemail_name` varchar(255) NOT NULL,
  `from_user_id` varchar(50) NOT NULL,
  `to_user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`voicemail_id`),
  KEY `FK_user_TO_voice_mail_1` (`from_user_id`),
  KEY `FK_user_TO_voice_mail_2` (`to_user_id`),
  CONSTRAINT `FK_user_TO_voice_mail_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_user_TO_voice_mail_2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voice_mail`
--

LOCK TABLES `voice_mail` WRITE;
/*!40000 ALTER TABLE `voice_mail` DISABLE KEYS */;
INSERT INTO `voice_mail` VALUES (47,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:03:23.674033163vmblob?generation=1696381404051110&alt=media','2023-10-04 10:03:24','2023-10-04T10:03:23.674033163vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(48,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:03:39.154919294vmblob?generation=1696381419444570&alt=media','2023-10-04 10:03:39','2023-10-04T10:03:39.154919294vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(49,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:03:42.645791236vmblob?generation=1696381422766794&alt=media','2023-10-04 10:03:43','2023-10-04T10:03:42.645791236vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(50,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:03:47.467781935vmblob?generation=1696381427613831&alt=media','2023-10-04 10:03:48','2023-10-04T10:03:47.467781935vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(51,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:03:52.799244965vmblob?generation=1696381433126750&alt=media','2023-10-04 10:03:53','2023-10-04T10:03:52.799244965vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(52,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:03:57.080819328vmblob?generation=1696381437201599&alt=media','2023-10-04 10:03:57','2023-10-04T10:03:57.080819328vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(56,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:04:16.956122222vmblob?generation=1696381457298031&alt=media','2023-10-04 10:04:17','2023-10-04T10:04:16.956122222vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(57,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:04:22.300311888vmblob?generation=1696381462622708&alt=media','2023-10-04 10:04:23','2023-10-04T10:04:22.300311888vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(58,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:04:27.747444113vmblob?generation=1696381468069214&alt=media','2023-10-04 10:04:28','2023-10-04T10:04:27.747444113vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(59,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T10:04:31.988875056vmblob?generation=1696381472128040&alt=media','2023-10-04 10:04:32','2023-10-04T10:04:31.988875056vmblob','xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','3036431511'),(61,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-04T14:48:12.893988146vmblob?generation=1696398493532513&alt=media','2023-10-04 14:48:14','2023-10-04T14:48:12.893988146vmblob','3036431511','3037842085'),(64,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T10:20:44.650844461vmblob?generation=1696468844983392&alt=media','2023-10-05 10:20:45','2023-10-05T10:20:44.650844461vmblob','3036431511','3021774079'),(65,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-05T16:04:49.184989471vmblob?generation=1696489489488112&alt=media','2023-10-05 16:04:49','2023-10-05T16:04:49.184989471vmblob','3037820358','3021774079'),(66,'https://storage.googleapis.com/download/storage/v1/b/ssafy-storage/o/2023-10-06T02:31:02.070052573vmblob?generation=1696527062377862&alt=media','2023-10-06 02:31:02','2023-10-06T02:31:02.070052573vmblob','3037820358','3021774079');
/*!40000 ALTER TABLE `voice_mail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wreath`
--

DROP TABLE IF EXISTS `wreath`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wreath` (
  `wreath_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `sub_title` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `declaration_count` int NOT NULL DEFAULT '0',
  `declaration_status` varchar(50) NOT NULL DEFAULT 'NONE',
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`wreath_id`),
  KEY `FK_user_TO_wreath_1` (`user_id`),
  CONSTRAINT `FK_user_TO_wreath_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wreath`
--

LOCK TABLES `wreath` WRITE;
/*!40000 ALTER TABLE `wreath` DISABLE KEYS */;
INSERT INTO `wreath` VALUES (77,'서이초 교사 추모합니다.','추모합니다','7월 20일, 숨진 교사가 학교폭력 업무를 담당해 힘들어했다거나 학부모로부터 악성 민원에 시달렸다는 소문에 대해서도 사실관계를 확인 중이지만 아직까지 의혹을 뒷받침할 만한 근거를 발견하지는 못했다. 경찰은 CCTV 등을 분석해 고인이 17일 오전 정상적으로 출근한 사실을 확인했다. 타살을 의심할 만한 흔적이 없어 극단적 선택을 한 것으로 보고 있다.','2023-10-04','2023-10-11',0,'NONE','3021774079'),(78,'이태원 사고 희생자들을 추모합니다.','추모합니다','믿을 수 없는 비극적인 참사가 일어났습니다.\n비통한 마음을 가둘 수 없습니다.\n\n이번 참사로 말할 수 없는 고통과 실의에 빠진 가족분들께 깊은 애도와 위로를 드립니다.\n\n희생당하신 분들의 명복을 빕니다.','2023-10-04','2023-10-29',0,'NONE','3037820358'),(79,'세월호를 추모합니다.','추모합니다','잊지 않고 기억하겠습니다.','2023-10-04','2023-11-03',0,'NONE','3038398768'),(83,'천안함 희생 장병을 추모합니다.','추모합니다','조국을 지켜낸 그대들의 희생을 결코 잊지 않겠습니다.','2023-10-05','2023-10-20',0,'NONE','3037820358'),(84,'오송 궁평 지하차도 참사 희생자들을 애도합니다.','애도합니다','한 순간의 참사로 희생 당하신 분들을 애도합니다.\n다시는 같은 일에 되풀이 되지 않도록 노력하겠습니다.\n삼가 고인의 명복을 빕니다.','2023-10-05','2023-10-17',0,'NONE','3037820358'),(86,'정인아 미안해 사랑해','애도합니다','정인아 \n우리 모두가 너를 사랑해 \n그곳에서는 아프지 않기를 기원할게\n사랑해 정인아','2023-10-05','2023-10-16',0,'NONE','3037820358'),(87,'카라 구하라를 기억하며','추모합니다','누구보다 자신의 일을 사랑하고 열정적으로 활동했던 가수, 팬들과 격 없이 소통하며 긍정적인 영향력을 펼쳤던 구하라\n꽃다운 나이에 별이 된 그녀를 기억하고 사랑합니다. \n그곳에서는 더이상 아프지 말고 외롭지 않길','2023-10-05','2023-10-19',0,'NONE','3037820358'),(88,'연평도 포격 호국 영웅들을 기억합니다','애도합니다','그날의 호국영웅들을 기억합니다. 조국 수호를 위한 뜨거운 염원을 가슴에 품은 자랑스러운 대한민국의 젊은 영혼들이여 \n그대들의 숭고한 희생으로 인하여 우리가 이곳에 편히 있을 수 있다는 것을 조국은 절대 잊지 않을 것이니\n부디 저 하늘에서 평화의 수호신이 되어 우리를 굽어보며 편히 쉬소서','2023-10-05','2023-10-25',0,'NONE','3037820358'),(89,'윤승주 일병 사망 9주기, 기억합니다','추모합니다','군대 내 구타 사망, 일명 윤일병 사건\n다시는 제 2의 윤일병이 없도록 윤승주 일병을 기억합니다.\n삼가 고인의 명복을 빕니다.','2023-10-05','2023-10-20',0,'NONE','3037820358'),(90,'대구 지하철 참사 20주기','추모합니다','대구 지하철 참사 진상 규명과 희생자 명예 회복, 끊임없이 발생하는 사회적 참사 재발 방지\n안전한 사회를 염원하며 2.18 대구 지하철 참사를 기억합니다.','2023-10-05','2023-10-15',0,'NONE','3037820358'),(91,'삼풍 백화점 참사 피해자들을 추모합니다.','추모합니다','삼가 고인의 명복을 빕니다.','2023-10-05','2023-11-04',0,'NONE','3037820358'),(92,'송해님을 추모합니다','애도합니다','언제나 기억하겠습니다. \n좋은 곳에서 편히 쉬세요. 감사했습니다.','2023-10-05','2023-10-16',0,'NONE','3037820358'),(93,'아스트로 문빈을 추모합니다.','애도합니다','4월 19일 아스트로 멤버 문빈이 갑작스럽게 우리의 곁을 떠나 하늘의 별이 되었습니다. 문빈을 응원해 주시고 아낌없는 사랑을 보내주신 팬 여러분들께 갑작스러운 소식을 전해 드리게 되어 더욱 가슴이 아픕니다. 다시 한번 고인의 마지막 가는 길에 깊은 애도를 보냅니다.','2023-10-05','2023-10-15',0,'NONE','3037820358');
/*!40000 ALTER TABLE `wreath` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wreath_count`
--

DROP TABLE IF EXISTS `wreath_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wreath_count` (
  `wreath_count_id` bigint NOT NULL AUTO_INCREMENT,
  `flower` int NOT NULL DEFAULT '0',
  `candle` int NOT NULL DEFAULT '0',
  `ribbon` int NOT NULL DEFAULT '0',
  `wreath_id` bigint NOT NULL,
  PRIMARY KEY (`wreath_count_id`),
  KEY `FK_wreath_TO_wreath_count_1` (`wreath_id`),
  CONSTRAINT `FK_wreath_TO_wreath_count_1` FOREIGN KEY (`wreath_id`) REFERENCES `wreath` (`wreath_id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wreath_count`
--

LOCK TABLES `wreath_count` WRITE;
/*!40000 ALTER TABLE `wreath_count` DISABLE KEYS */;
INSERT INTO `wreath_count` VALUES (69,40,10,13,77),(70,22,10,29,78),(71,32,11,55,79),(75,10,3,26,83),(76,23,7,15,84),(78,16,17,11,86),(79,15,11,10,87),(80,10,11,23,88),(81,14,4,17,89),(82,3,2,18,90),(83,9,5,29,91),(84,27,4,27,92),(85,98,1,26,93);
/*!40000 ALTER TABLE `wreath_count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wreath_user`
--

DROP TABLE IF EXISTS `wreath_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wreath_user` (
  `wreath_user_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `wreath_id` bigint NOT NULL,
  PRIMARY KEY (`wreath_user_id`),
  KEY `FK_user_TO_wreath_user_1` (`user_id`),
  KEY `FK_wreath_TO_wreath_user_1` (`wreath_id`),
  CONSTRAINT `FK_user_TO_wreath_user_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_wreath_TO_wreath_user_1` FOREIGN KEY (`wreath_id`) REFERENCES `wreath` (`wreath_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wreath_user`
--

LOCK TABLES `wreath_user` WRITE;
/*!40000 ALTER TABLE `wreath_user` DISABLE KEYS */;
INSERT INTO `wreath_user` VALUES (22,'3036431511',77),(23,'3038115215',78),(24,'3038115215',77),(25,'3037842085',77),(26,'3038115215',79),(28,'3038115215',92),(29,'3038115215',88),(30,'3038115215',86),(32,'3048421191',93),(33,'wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM',79),(34,'3021774079',93),(35,'3021774079',92),(37,'3038398768',92);
/*!40000 ALTER TABLE `wreath_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06  8:52:22
