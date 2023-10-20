-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Database: vegetable
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

-- Dump completed on 2023-10-20 16:29:07
