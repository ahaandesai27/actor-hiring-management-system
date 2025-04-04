/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: actor
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `professional` varchar(15) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`professional`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`professional`) REFERENCES `professionals` (`username`),
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES
('cillian',1),
('aamirkhan',2),
('iamsrk',2),
('aamirkhan',3),
('cillian',4),
('iamsrk',5),
('amitabhb',6),
('dicaprio',7);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookings` (
  `latitude` float(9,6) NOT NULL,
  `longitude` float(9,6) NOT NULL,
  `org_id` int(11) NOT NULL,
  `startbookingdate` date DEFAULT NULL,
  `endbookingdate` date DEFAULT NULL,
  PRIMARY KEY (`latitude`,`longitude`,`org_id`),
  KEY `org_id` (`org_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`latitude`, `longitude`) REFERENCES `locations` (`latitude`, `longitude`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES
(27.988100,86.925003,1,'2025-04-16','2025-08-18'),
(28.704060,77.102493,2,'2025-05-01','2025-09-01'),
(34.052200,-118.243698,4,'2025-04-16','2025-08-18'),
(35.689487,139.691711,10,'2025-06-10','2025-10-10'),
(39.904202,116.407394,4,'2025-07-01','2025-11-01'),
(40.712776,-74.005974,3,'2025-05-05','2025-09-05'),
(48.856613,2.352222,1,'2025-07-05','2025-11-05'),
(51.507351,-0.127758,9,'2025-06-01','2025-10-01');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `contents` varchar(100) DEFAULT NULL,
  `post` int(11) DEFAULT NULL,
  `creator` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `post` (`post`),
  KEY `creator` (`creator`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post`) REFERENCES `posts` (`post_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`creator`) REFERENCES `professionals` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES
(1,'I give my best wishes for his future. :)',1,'amitabhb'),
(2,'Very excited for this collab, hope this achieves the status that I wish it to!',2,'CNolan'),
(3,'Excited for this movie, its been a long time since I have seen u on the big screen bhai, #Sikandar',3,'iamsrk'),
(6,'reply to sample post 1',4,'iamsrk'),
(7,'reply to sample post 2',5,'SajidNadiadwala'),
(8,'reply to sample post 3',6,'Kjo'),
(9,'reply to sample post 4',7,'amitabhb');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `connections`
--

DROP TABLE IF EXISTS `connections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `connections` (
  `professional1` varchar(15) NOT NULL,
  `professional2` varchar(15) NOT NULL,
  PRIMARY KEY (`professional1`,`professional2`),
  KEY `professional2` (`professional2`),
  CONSTRAINT `connections_ibfk_1` FOREIGN KEY (`professional1`) REFERENCES `professionals` (`username`),
  CONSTRAINT `connections_ibfk_2` FOREIGN KEY (`professional2`) REFERENCES `professionals` (`username`),
  CONSTRAINT `same_connection` CHECK (`professional1` <> `professional2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `connections`
--

LOCK TABLES `connections` WRITE;
/*!40000 ALTER TABLE `connections` DISABLE KEYS */;
INSERT INTO `connections` VALUES
('aamirkhan','amitabhb'),
('cillian','CNolan'),
('amitabhb','dicaprio'),
('GulshanKumar','EktaKapoor'),
('amitabhb','iamsrk'),
('iamsrk','rdj'),
('VikramBhatt','SajidNadiadwala'),
('dicaprio','spielberg');
/*!40000 ALTER TABLE `connections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `films` (
  `film_id` int(11) NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `genre` varchar(20) DEFAULT NULL,
  `summary` varchar(300) DEFAULT NULL,
  `rating` float(4,2) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`film_id`),
  KEY `fk_org_id` (`org_id`),
  CONSTRAINT `fk_org_id` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`org_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES
(1,'Inception','thriller','Inception (2010) follows Dom Cobb, a thief who steals secrets from dreams. He’s tasked with performing an \'inception\' — planting an idea in someone\'s mind. As Cobb and his team dive into multiple dream layers, reality and illusion blur.',9.30,'2010-07-16',NULL),
(2,'Lagaan','Drama','Set in colonial India, *Lagaan* follows a group of villagers who challenge British officers to a cricket match to avoid a crippling tax. The villagers, led by Bhuvan (Aamir Khan), must overcome their differences and train to win. The film explores themes of unity, resistance, and resilience.',8.10,'2001-06-15',NULL),
(3,'Satyagraha','Drama','In *Satyagraha*, a group of activists led by the determined leader Dwarka Anand (Amitabh Bachchan) wage a peaceful fight against corruption and injustice. The film explores themes of civil disobedience, social justice, and the power of nonviolent resistance.',6.80,'2013-08-30',NULL),
(4,'Batman Begins','Action','In *Batman Begins*, Bruce Wayne (Christian Bale) embarks on a journey to become the vigilante Batman, fighting crime in Gotham City. Cillian Murphy plays Dr. Jonathan Crane, a psychiatrist who transforms into the villain Scarecrow. The film explores themes of fear, justice, and redemption.',8.20,'2005-06-15',11),
(5,'The Silent Sea','Sci-Fi','A group of astronauts embark on a dangerous mission to the Moon in search of a mysterious substance.',4.50,'2023-12-24',NULL),
(6,'Mystery of the Abyss','Adventure','An adventurer seeks an ancient treasure hidden deep beneath the ocean.',4.20,'2022-08-15',NULL),
(7,'Echoes of Time','Drama','A family deals with the impact of time travel on their lives.',3.80,'2021-05-10',NULL),
(8,'Fan','thriller','A man named Gaurav is obsessed with Bollywood superstar Aryan Khanna, who he bears a striking resemblance to. However, when his hero rejects him, he decides to seek revenge.',6.80,'2016-04-15',1),
(23,'Brahmastra 2','Thriller','*Brahmastra: Part Two – Dev* follows Dev (Ranveer Singh), a warrior who once wielded the Brahmastra. Shiva (Ranbir Kapoor) and Isha (Alia Bhatt) uncover their connections to the Astras while dark forces hunt for the weapon. The cosmic battle intensifies, setting the stage for bigger conflicts.',NULL,'2026-10-15',2),
(24,'RRR 2','Comedy','\n\nRRR 2 will likely continue the story of Raju (Ram Charan) and Bheem (N. T. Rama Rao Jr.), exploring their post-rebellion struggles against the British. Expect more intense action, emotional drama, and grand visuals, expanding their fight for freedom.',NULL,NULL,NULL),
(44,'F1','racing','A story about F1 races',NULL,'2025-12-12',NULL),
(53,'The Batman 2','suspense, thriller','The batman continues to protect gotham in the aftermath of the riddler\'s attack. New villians emerge and the batman will have to face them all.',NULL,'2027-10-01',NULL);
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `latitude` float(9,6) NOT NULL,
  `longitude` float(9,6) NOT NULL,
  `freq_of_booking` int(11) DEFAULT NULL,
  `rating` float(3,2) DEFAULT NULL,
  `cost_of_booking` int(11) DEFAULT NULL,
  `conditions` varchar(256) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`latitude`,`longitude`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES
(27.988100,86.925003,75,3.80,300,'Mountain view, No smoking','Himalayas Resort'),
(28.704060,77.102493,120,4.50,250,'City view, No smoking','Delhi Palace'),
(34.052200,-118.243698,200,4.30,150,'Beachfront, Pets allowed','Oceanic Hotel'),
(35.689487,139.691711,110,4.20,280,'City lights, Free breakfast','Tokyo Towers'),
(39.904202,116.407394,160,4.30,270,'Mountain view, No smoking','Beijing Resort'),
(40.712776,-74.005974,150,4.10,200,'Urban setting, Free Wi-Fi','New York Inn'),
(48.856613,2.352222,180,4.60,350,'Historical site, No pets','Paris Heritage'),
(51.507351,-0.127758,90,3.90,300,'River view, Pets allowed','London Bridge Hotel');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `org_address`
--

DROP TABLE IF EXISTS `org_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `org_address` (
  `org_id` int(11) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  KEY `org_id` (`org_id`),
  CONSTRAINT `org_address_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `org_address`
--

LOCK TABLES `org_address` WRITE;
/*!40000 ALTER TABLE `org_address` DISABLE KEYS */;
INSERT INTO `org_address` VALUES
(2,'Mumbai','Maharashtra',400067);
/*!40000 ALTER TABLE `org_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizations` (
  `org_id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `number_of_employees` int(11) DEFAULT NULL,
  `owner` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`org_id`),
  KEY `fk_owner` (`owner`),
  CONSTRAINT `fk_owner` FOREIGN KEY (`owner`) REFERENCES `professionals` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES
(1,'Yash Raj Films',1200,NULL),
(2,'Dharma Productions',1300,'Kjo'),
(3,'Nadiadwala Entertainment',1000,'SajidNadiadwala'),
(4,'Eros International',1400,NULL),
(9,'Phantom Films',1500,NULL),
(10,' DVV Entertainment',1500,NULL),
(11,'Warner Brothers',2500,NULL);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `contents` varchar(200) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `creator` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_creator` (`creator`),
  CONSTRAINT `fk_creator` FOREIGN KEY (`creator`) REFERENCES `professionals` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES
(1,'I am aamir khan pleaseed to announce that my son is going to act as well!! congratulations',45,'aamirkhan'),
(2,'Hello fellas, I will be acting in Nolans next: Odessey, its going to be a blockbuster, so dont miss it!',4785,'cillian'),
(3,'Greetings to all people, this eid, do check out my new release: Sikandar, an action thriller that will keep u at the edge of ur seats.',45463,'s_khan'),
(4,'I am pleased to announce that I have started production on my new film',50,'VikramBhatt'),
(5,'Sample post 2',6,'s_khan'),
(6,'Sample post 3',7,'EktaKapoor'),
(7,'Sample post 4',8,'spielberg');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professionals`
--

DROP TABLE IF EXISTS `professionals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `professionals` (
  `username` varchar(15) NOT NULL,
  `full_name` varchar(25) NOT NULL,
  `profession` varchar(8) NOT NULL,
  `years_of_experience` int(11) DEFAULT 0,
  `rating` decimal(4,2) DEFAULT 5.00,
  `createdAt` date DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professionals`
--

LOCK TABLES `professionals` WRITE;
/*!40000 ALTER TABLE `professionals` DISABLE KEYS */;
INSERT INTO `professionals` VALUES
('aamirkhan','Aamir Khan','actor',25,10.00,NULL),
('ahaandesai27','Ahaan Desai','actor',0,5.00,'2025-03-14'),
('amitabhb','Amitabh Bachchan','actor',60,10.00,NULL),
('cillian','Cillian Murphy','actor',35,9.00,NULL),
('CNolan','Christopher Nolan','director',30,10.00,NULL),
('dicaprio','Leonardo DiCaprio','actor',20,9.00,NULL),
('EktaKapoor','Ekta Kapoor','Producer',0,5.00,NULL),
('GulshanKumar','Gulshan Kumar','Producer',0,5.00,NULL),
('iamsrk','Shah Rukh Khan','actor',30,10.00,NULL),
('Kjo','Karan Johar','director',27,9.00,NULL),
('rdj','Robert Downey Jr.','actor',20,9.00,NULL),
('SajidNadiadwala','Sajid Nadiadwala','Producer',0,5.00,NULL),
('spielberg','Steven Spielberg','producer',20,9.50,NULL),
('s_khan','Salman Khan','actor',30,9.00,NULL),
('VikramBhatt','Vikram Bhatt','Producer',0,5.00,NULL);
/*!40000 ALTER TABLE `professionals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `information` varchar(500) DEFAULT NULL,
  `role_for` varchar(30) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `pay` int(11) DEFAULT NULL,
  `creator` varchar(15) DEFAULT NULL,
  `film_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`role_id`),
  KEY `creator` (`creator`),
  KEY `fk_film_id` (`film_id`),
  CONSTRAINT `fk_film_id` FOREIGN KEY (`film_id`) REFERENCES `films` (`film_id`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `professionals` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'To play max verstappen in the F1 film. Experience in racing movies preferred.','actor','2023-12-12','2025-12-12',100000,'CNolan',44),
(2,'To play shiva in brahmastra 2','actor','2024-10-15','2026-10-15',1000000,'Kjo',23),
(3,'To play a brilliant scientist in a sci-fi thriller. Experience in high-tech roles preferred.','actor','2025-01-01','2027-01-01',200000,'spielberg',53),
(4,'To play a detective solving a mysterious case. Experience in crime thrillers preferred.','actor','2025-05-01','2027-05-01',150000,'Cillian',7),
(5,'To play a lead role in a historical drama. Experience in period films preferred.','actor','2025-06-01','2027-06-01',180000,'EktaKapoor',24),
(6,'Extras as racers for the F1 film','actor','2025-03-01','2027-03-01',250000,'spielberg',44),
(7,'To play commisioner gordon in the new batman film','actor','2025-07-01','2027-07-01',120000,'CNolan',53),
(8,'To play a villain in a thriller film. Must be good at intense roles.','actor','2025-09-01','2027-09-01',300000,'SajidNadiadwala',5);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `worked_on`
--

DROP TABLE IF EXISTS `worked_on`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worked_on` (
  `professional` varchar(15) DEFAULT NULL,
  `film` int(11) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  KEY `professional` (`professional`),
  KEY `film` (`film`),
  CONSTRAINT `worked_on_ibfk_1` FOREIGN KEY (`professional`) REFERENCES `professionals` (`username`),
  CONSTRAINT `worked_on_ibfk_2` FOREIGN KEY (`film`) REFERENCES `films` (`film_id`),
  CONSTRAINT `chk_dates` CHECK (`start_date` < `end_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `worked_on`
--

LOCK TABLES `worked_on` WRITE;
/*!40000 ALTER TABLE `worked_on` DISABLE KEYS */;
INSERT INTO `worked_on` VALUES
('dicaprio',1,'2008-07-16','2010-07-16'),
('CNolan',4,'2003-06-17','2005-06-17'),
('CNolan',1,'2008-07-16','2010-07-16'),
('aamirkhan',2,'1999-06-15',NULL),
('aamirkhan',5,'2025-01-01','2025-12-31'),
('amitabhb',3,'2025-02-01','2025-12-31'),
('cillian',6,'2025-03-01','2025-12-31'),
('CNolan',7,'2025-04-01','2025-12-31'),
('dicaprio',8,'2025-05-01','2025-12-31'),
('iamsrk',23,'2025-06-01','2025-12-31');
/*!40000 ALTER TABLE `worked_on` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-04-03 18:33:10
