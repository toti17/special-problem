-- MySQL dump 10.13  Distrib 5.6.24, for Win32 (x86)
--
-- Host: localhost    Database: sp1
-- ------------------------------------------------------
-- Server version	5.6.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `address_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `address_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (2,'Philippines'),(3,'Manila'),(7,'Manila, Philippines'),(20,'Guimbal, Iloilo'),(22,'Dumalag, Capiz'),(41,'Tududan, San Remegio, Antique'),(42,'Singangao, Zaragga, Iloilo'),(43,'Lanao del Sur'),(44,'Iloilo'),(46,'Miagao, iloilo'),(48,'Miagao'),(53,'Quezon'),(54,'1'),(55,'mandurraio');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `author` (
  `author_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`author_id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (12,'Save','the','Children'),(17,'Christian',' ','Aid'),(18,'CAFOD:',' ','Just one World'),(19,'Pio','Jr.','Andrade'),(25,'Ermi Basanes',' ','Garcesa'),(26,'Lolita','J.','Bulalacao'),(27,'Genevieve','L.','Asenjo'),(28,'Genevieve','I.','Asenjo'),(29,'Melanie','A.','Reteracion'),(30,'Ethel','P.','Braganza'),(31,'Joel','A.','Allones'),(32,'Ma. Elena','M.','Holfilena'),(33,'M. Cristina','S.','Guzman'),(34,'Jose Alvin','C.','Gonzaga'),(35,'Benjamin Isaac',' ','Marte'),(36,'Norma','V.','Ortega'),(37,'Carlomar',' ','Arcangel Daoana'),(38,'Nick',' ','Joaquin'),(43,'J.K',' ','Rowling'),(44,'John',' ','Green'),(47,'Ventura','Alonso','Realonda'),(48,'Jose','Salazar','Rizal'),(54,'Tomas','D.','Andres'),(57,'ihra','alonso','realonda'),(58,'Airisse Rae','Prieto','Basinang'),(60,'Charles',' ','Aposaga'),(61,'Charles','Sarroza','Aposaga'),(64,'ihra',' ','realonda'),(65,'jose',' ','salazar');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrow_transactions`
--

DROP TABLE IF EXISTS `borrow_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrow_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrow_transactions`
--

LOCK TABLES `borrow_transactions` WRITE;
/*!40000 ALTER TABLE `borrow_transactions` DISABLE KEYS */;
INSERT INTO `borrow_transactions` VALUES (8,'BK-01120','201522222','2017-05-22'),(9,'BK-01210','201522222','2017-05-22'),(11,'BK-01210','201504519','2017-05-22'),(12,'BK-01214','201504519','2017-05-22'),(13,'BK-01120','201712345','2017-05-22'),(14,'BK-01210','201712345','2017-05-22'),(15,'BK-01120','201712345','2017-05-22'),(16,'BK-01210','201712345','2017-04-22'),(17,'BK-01214','201712345','2017-04-22'),(18,'BK-01214','201712345','2017-04-22'),(20,'BK-01120','201712345','2017-05-23'),(21,'BK-01120','201504519','2017-05-23'),(22,'BK-01120','201712345','2017-05-23');
/*!40000 ALTER TABLE `borrow_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowed`
--

DROP TABLE IF EXISTS `borrowed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrowed` (
  `borrowed_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` int(11) NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('checked out','pending','borrowed') COLLATE utf8_unicode_ci NOT NULL,
  `borrowed_datetime` datetime NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`borrowed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed`
--

LOCK TABLES `borrowed` WRITE;
/*!40000 ALTER TABLE `borrowed` DISABLE KEYS */;
INSERT INTO `borrowed` VALUES (1,201504519,'BK-01120','checked out','2017-05-23 11:43:07','Dictionary of Filipino culture & values'),(2,201712345,'BK-01121','checked out','2017-05-23 11:43:28','Dictionary of Filipino culture & values');
/*!40000 ALTER TABLE `borrowed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colors` (
  `color_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `color_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (3,'black'),(4,'brown'),(5,'rusty brown'),(6,'1'),(7,'2');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `course_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (2,'B.A Social Science'),(6,'B.A History-Economics'),(7,'B.A Economics'),(10,'asdf'),(11,'computer science');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `decorations`
--

DROP TABLE IF EXISTS `decorations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `decorations` (
  `decoration_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `decoration_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`decoration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `decorations`
--

LOCK TABLES `decorations` WRITE;
/*!40000 ALTER TABLE `decorations` DISABLE KEYS */;
INSERT INTO `decorations` VALUES (7,'Smooth texture with defined mouthpiece'),(8,'The gongs are incised with markings except the largest one.'),(9,'1'),(10,'2');
/*!40000 ALTER TABLE `decorations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directed`
--

DROP TABLE IF EXISTS `directed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directed` (
  `directed_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `director_id` int(11) NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`directed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directed`
--

LOCK TABLES `directed` WRITE;
/*!40000 ALTER TABLE `directed` DISABLE KEYS */;
INSERT INTO `directed` VALUES (1,1,'TP-00007'),(2,2,'CD-00006'),(3,3,'CD-00039'),(4,4,'CD-00037'),(5,5,'CD-00033'),(6,6,'CD-00020'),(8,8,'CD-00019'),(9,9,'CD-02'),(10,10,'DVD-01'),(11,10,'DVD-01'),(12,10,'DVD-05'),(13,10,'DVD-05');
/*!40000 ALTER TABLE `directed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `director` (
  `director_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`director_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES (1,'Melvin','S.','de la Serna'),(2,'n/a','n/a','n/a'),(3,'Zairheen Marie','','Nuñal'),(4,'Faith','','Reforma'),(5,'Randy','','Madrid'),(6,'Carla','D.','Guilaran'),(8,'Ninfa','','Blance'),(9,'Ihra','Alonso','Realonda'),(10,'1','1','1');
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor`
--

DROP TABLE IF EXISTS `donor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donor` (
  `donor_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `donor_name_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `copy` int(11) NOT NULL,
  PRIMARY KEY (`donor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor`
--

LOCK TABLES `donor` WRITE;
/*!40000 ALTER TABLE `donor` DISABLE KEYS */;
INSERT INTO `donor` VALUES (12,3,'2014-01-01',1),(15,3,'2014-01-01',1),(16,3,'2014-01-01',3),(17,3,'2014-01-01',2),(18,10,'1990-01-01',0),(21,1,'1985-01-01',0),(22,1,'1985-01-01',0),(23,1,'1986-01-01',0),(24,1,'1998-01-01',0),(25,1,'1988-01-01',0),(26,1,'1986-01-01',0),(27,1,'1999-01-01',0),(28,1,'1995-01-01',0),(29,1,'1986-01-01',0),(30,6,'2002-01-01',0),(31,7,'1992-01-01',0),(32,8,'1990-01-01',0),(33,9,'2010-08-04',0),(35,10,'1988-01-01',0),(36,10,'1912-01-01',0),(37,10,'1900-01-01',0),(38,11,'2000-01-01',0),(39,12,'2016-08-16',0),(40,13,'2010-08-23',0),(41,1,'2010-02-19',0),(43,1,'2010-02-19',0),(46,1,'2017-05-20',0),(48,1,'2017-01-01',0),(52,54,'2000-01-01',0),(53,54,'2000-01-01',0),(54,54,'2001-01-01',0),(56,1,'2017-05-02',0),(58,60,'2017-05-21',0),(60,62,'2017-01-01',0),(65,10,'1994-01-01',1),(67,64,'2017-05-21',0),(69,66,'2017-05-21',0),(70,67,'2017-05-21',0),(72,69,'2000-01-01',2),(74,72,'2017-01-01',0),(75,70,'2000-01-01',1),(76,70,'2000-01-01',0);
/*!40000 ALTER TABLE `donor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donor_name`
--

DROP TABLE IF EXISTS `donor_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `donor_name` (
  `donor_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`donor_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donor_name`
--

LOCK TABLES `donor_name` WRITE;
/*!40000 ALTER TABLE `donor_name` DISABLE KEYS */;
INSERT INTO `donor_name` VALUES (1,'Division','of','Social Sciences'),(3,'Jorge','S.','Ebay'),(6,'Dr. Ma. Cecilia','Locsin','Nava'),(7,'Ma. Cecilia','Locsin','Nava'),(8,'Melvin','S.','de la Serna'),(9,'DOT','n/a','n/a'),(10,'CWVS','n/a','n/a'),(11,'Zairheen','Marie','Nuñal'),(12,'Faith','','Reforma'),(13,'Randy','','Madrid'),(28,'Simplicio','','Gedalangga'),(30,'Ino','','Fulge'),(46,'Joaquin','','Baldore'),(55,'n/a','n/a','n/a'),(56,'Calisto','','Pinuela'),(57,'Ilonggo','Cultural','Foundation'),(58,'Center of West','Visayan','Studies'),(60,'Ventura','Alonsa','Realonda'),(62,'Ihra','Realonso','Relaonda'),(64,'Ihra Divine','Jinon','Jagunap'),(66,'Charles Francis','','Aposaga'),(67,'Charles Francis','Sarroza','Aposaga'),(69,'Charles','Francis','Aposaga'),(70,'1','1','1'),(72,'ihra','wimdt','asdf'),(73,'francis','wundt','Wertheimer');
/*!40000 ALTER TABLE `donor_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `english_names`
--

DROP TABLE IF EXISTS `english_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `english_names` (
  `english_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `english_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`english_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `english_names`
--

LOCK TABLES `english_names` WRITE;
/*!40000 ALTER TABLE `english_names` DISABLE KEYS */;
INSERT INTO `english_names` VALUES (9,'Steel Plow'),(26,'Wooden Plow'),(27,'Gong Set'),(28,'Bamboo Xylophone'),(29,'fishing net'),(30,'FISHNET');
/*!40000 ALTER TABLE `english_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invent_materials`
--

DROP TABLE IF EXISTS `invent_materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invent_materials` (
  `material_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `material_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invent_materials`
--

LOCK TABLES `invent_materials` WRITE;
/*!40000 ALTER TABLE `invent_materials` DISABLE KEYS */;
INSERT INTO `invent_materials` VALUES (5,'wood'),(10,'Carabao horn'),(12,'steel'),(13,'Brass'),(14,'bamboo'),(15,'2'),(16,'1');
/*!40000 ALTER TABLE `invent_materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventories`
--

DROP TABLE IF EXISTS `inventories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventories` (
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `object` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `conditions` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `inventory_type_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `donor_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `location_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`acqNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventories`
--

LOCK TABLES `inventories` WRITE;
/*!40000 ALTER TABLE `inventories` DISABLE KEYS */;
INSERT INTO `inventories` VALUES ('AR-FI-001','Wooden Plow','n/a',3,34,31,'2017-05-18 17:00:45','2017-05-18 17:00:45','23'),('AR-FI-002','Steel Plow','n/a',3,13,13,'2017-05-18 15:25:36','2017-05-18 15:25:36','23'),('AR-FI-003','Karas','n/a',3,15,15,'2017-05-18 15:37:55','2017-05-18 15:37:55','24'),('AR-MI-003','Gong Set','The largest gong is quite deformed.',1,37,34,'2017-05-20 14:51:53','2017-05-20 14:51:53','19'),('AR-MI-004','Bamboo Xylophone','Rusty nails',1,38,35,'2017-05-20 14:52:04','2017-05-20 14:52:04','19'),('AR-MI-011','Budiong','With crack on one side',1,36,33,'2017-05-20 14:51:36','2017-05-20 14:51:36','19'),('AR-MI-012','Budiong 2','The budiong is unpolished with rough edges.',1,35,32,'2017-05-20 14:51:18','2017-05-20 14:51:18','19'),('fh-01','fishing net','still intact',4,39,36,'2017-05-21 13:21:50','2017-05-21 13:21:50','31'),('FISH-01','FISHNET','still intact',4,40,37,'2017-05-22 01:15:50','2017-05-22 01:15:50','33');
/*!40000 ALTER TABLE `inventories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_color`
--

DROP TABLE IF EXISTS `inventory_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_color` (
  `inventory_color_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `color_id` int(11) NOT NULL,
  PRIMARY KEY (`inventory_color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_color`
--

LOCK TABLES `inventory_color` WRITE;
/*!40000 ALTER TABLE `inventory_color` DISABLE KEYS */;
INSERT INTO `inventory_color` VALUES (13,'AR-FI-002',5),(30,'AR-FI-001',4),(31,'AR-MI-012',3),(32,'AR-MI-011',3),(33,'AR-MI-003',3),(34,'AR-MI-004',4),(35,'fh-01',6),(36,'FISH-01',6),(37,'FISH-01',7);
/*!40000 ALTER TABLE `inventory_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_decoration`
--

DROP TABLE IF EXISTS `inventory_decoration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_decoration` (
  `inventory_decoration_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `decoration_id` int(11) NOT NULL,
  PRIMARY KEY (`inventory_decoration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_decoration`
--

LOCK TABLES `inventory_decoration` WRITE;
/*!40000 ALTER TABLE `inventory_decoration` DISABLE KEYS */;
INSERT INTO `inventory_decoration` VALUES (7,'AR-MI-011',7),(8,'AR-MI-003',8),(9,'fh-01',9),(10,'FISH-01',9),(11,'FISH-01',10);
/*!40000 ALTER TABLE `inventory_decoration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_donors`
--

DROP TABLE IF EXISTS `inventory_donors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_donors` (
  `donor_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `donor_name_id` int(11) NOT NULL,
  `donor_date` date NOT NULL,
  PRIMARY KEY (`donor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_donors`
--

LOCK TABLES `inventory_donors` WRITE;
/*!40000 ALTER TABLE `inventory_donors` DISABLE KEYS */;
INSERT INTO `inventory_donors` VALUES (13,28,'1987-01-01'),(15,30,'1998-01-01'),(31,46,'1993-07-17'),(32,55,'2014-08-06'),(33,56,'2014-08-06'),(34,57,'2014-08-06'),(35,58,'2014-08-06'),(36,70,'2000-01-01'),(37,73,'2000-01-01');
/*!40000 ALTER TABLE `inventory_donors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_english_name`
--

DROP TABLE IF EXISTS `inventory_english_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_english_name` (
  `inventory_english_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `english_name_id` int(11) NOT NULL,
  PRIMARY KEY (`inventory_english_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_english_name`
--

LOCK TABLES `inventory_english_name` WRITE;
/*!40000 ALTER TABLE `inventory_english_name` DISABLE KEYS */;
INSERT INTO `inventory_english_name` VALUES (9,'AR-FI-002',9),(26,'AR-FI-001',26),(27,'AR-MI-003',27),(28,'AR-MI-004',28),(29,'fh-01',29),(30,'FISH-01',30);
/*!40000 ALTER TABLE `inventory_english_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_marks`
--

DROP TABLE IF EXISTS `inventory_marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_marks` (
  `inventory_marks_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mark_id` int(11) NOT NULL,
  PRIMARY KEY (`inventory_marks_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_marks`
--

LOCK TABLES `inventory_marks` WRITE;
/*!40000 ALTER TABLE `inventory_marks` DISABLE KEYS */;
INSERT INTO `inventory_marks` VALUES (11,'AR-MI-011',11),(12,'AR-MI-003',12),(13,'AR-MI-004',13),(14,'AR-MI-004',14),(15,'fh-01',15),(16,'FISH-01',15),(17,'FISH-01',16);
/*!40000 ALTER TABLE `inventory_marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_material`
--

DROP TABLE IF EXISTS `inventory_material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_material` (
  `inventory_material_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `material_id` int(11) NOT NULL,
  PRIMARY KEY (`inventory_material_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_material`
--

LOCK TABLES `inventory_material` WRITE;
/*!40000 ALTER TABLE `inventory_material` DISABLE KEYS */;
INSERT INTO `inventory_material` VALUES (15,'AR-FI-002',12),(32,'AR-FI-001',5),(33,'AR-MI-012',10),(34,'AR-MI-011',10),(35,'AR-MI-003',13),(36,'AR-MI-004',5),(37,'AR-MI-004',14),(38,'fh-01',15),(39,'FISH-01',16),(40,'FISH-01',15);
/*!40000 ALTER TABLE `inventory_material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_pictures`
--

DROP TABLE IF EXISTS `inventory_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_pictures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extension` enum('jpeg','png','jpg') COLLATE utf8_unicode_ci NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_pictures`
--

LOCK TABLES `inventory_pictures` WRITE;
/*!40000 ALTER TABLE `inventory_pictures` DISABLE KEYS */;
INSERT INTO `inventory_pictures` VALUES (10,'AR-FI-001','jpeg','AR-FI-001'),(11,'fh-01','jpeg','fh-01'),(12,'FISH-01','jpeg','FISH-01');
/*!40000 ALTER TABLE `inventory_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_purchased_details`
--

DROP TABLE IF EXISTS `inventory_purchased_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_purchased_details` (
  `inventory_purchased_details_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `amount` double(8,2) NOT NULL,
  `address_id` int(11) NOT NULL,
  `purchased_date` date NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`inventory_purchased_details_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_purchased_details`
--

LOCK TABLES `inventory_purchased_details` WRITE;
/*!40000 ALTER TABLE `inventory_purchased_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_purchased_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_types`
--

DROP TABLE IF EXISTS `inventory_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('Artifacts','Textiles','Farming Tools','Fishing Tools') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_types`
--

LOCK TABLES `inventory_types` WRITE;
/*!40000 ALTER TABLE `inventory_types` DISABLE KEYS */;
INSERT INTO `inventory_types` VALUES (1,'Artifacts'),(2,'Textiles'),(3,'Farming Tools'),(4,'Fishing Tools');
/*!40000 ALTER TABLE `inventory_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_venacular_name`
--

DROP TABLE IF EXISTS `inventory_venacular_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory_venacular_name` (
  `inventory_venacular_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `venacular_name_id` int(11) NOT NULL,
  PRIMARY KEY (`inventory_venacular_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_venacular_name`
--

LOCK TABLES `inventory_venacular_name` WRITE;
/*!40000 ALTER TABLE `inventory_venacular_name` DISABLE KEYS */;
INSERT INTO `inventory_venacular_name` VALUES (13,'AR-FI-002',12),(15,'AR-FI-003',13),(31,'AR-FI-001',12),(32,'AR-MI-012',14),(33,'AR-MI-011',15),(34,'AR-MI-003',16),(35,'AR-MI-004',17),(36,'fh-01',18),(37,'FISH-01',19);
/*!40000 ALTER TABLE `inventory_venacular_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'thesis shelf'),(3,'CWVS'),(5,'bookshelf'),(12,'cassette shelf'),(13,'cd shelf'),(16,'photo shelf'),(17,'photograph shelf'),(19,'CWVS Display Cabinet'),(20,''),(23,'CWVS Humay Museum'),(24,'CWVS Farming Museum'),(26,'cabinet 1'),(27,'multimedia shelf'),(29,'heart'),(30,'1'),(31,'fish shelf'),(32,'pictures'),(33,'MUSEUM');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marks`
--

DROP TABLE IF EXISTS `marks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marks` (
  `mark_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mark_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`mark_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marks`
--

LOCK TABLES `marks` WRITE;
/*!40000 ALTER TABLE `marks` DISABLE KEYS */;
INSERT INTO `marks` VALUES (11,'With provenance label in pentlepen'),(12,'The kulintang does not have a case. It can be hanged and suspended.'),(13,'Bamboo bars of different sizes are loosely held with nails in a trapezoidal wood box.'),(14,'Bamboo serves as keyboard while the wood as resonator.'),(15,'1'),(16,'2');
/*!40000 ALTER TABLE `marks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `material_type_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `publisher_id` int(11) DEFAULT NULL,
  `borrowed_count` int(11) DEFAULT NULL,
  `view_count` int(11) DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `copy_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`acqNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES ('BK-01120','Dictionary of Filipino culture & values',4,'2017-05-21 09:16:51','2017-05-23 03:45:18',26,10,8,5,NULL,1),('BK-01210','A first look at Philippine flowers',4,'2017-05-09 16:23:41','2017-05-22 09:32:53',11,3,NULL,5,NULL,0),('BK-01214','A first look at the Philippine fruits',4,'2017-05-09 16:29:46','2017-05-23 08:04:12',14,2,1,5,NULL,0),('BK-01226','The fooling of America: the untold story of Carlos P. Romulo',4,'2017-05-09 15:20:57','2017-05-22 01:19:34',6,NULL,NULL,5,NULL,0),('BK-01584','Taga-uma @ manila kag iba pa nga pakigsapalaran',4,'2017-05-09 16:23:57','2017-05-23 08:04:42',12,NULL,1,5,NULL,0),('BK-01745','Komposo ni Dandansoy: mga kwento sa Hiligaynon at Filipino',4,'2017-05-09 16:24:10','2017-05-20 16:56:37',13,NULL,NULL,5,NULL,0),('BK-02','Fantastic Beasts and Where to Find Them',4,'2017-05-20 10:36:42','2017-05-20 11:12:44',19,NULL,NULL,26,NULL,0),('CD-00006','Kabayao Family Quintet Christmas Songs',12,'2017-05-09 16:55:42','2017-05-09 16:55:42',NULL,NULL,NULL,13,NULL,0),('CD-00019','Komposo Contest',12,'2017-05-10 09:28:32','2017-05-10 09:28:32',NULL,NULL,NULL,13,NULL,0),('CD-00020','Komposo Contest',12,'2017-05-10 09:26:53','2017-05-10 09:26:53',NULL,NULL,NULL,13,NULL,0),('CD-00033','Seminar on Appreciation of Iloilo City Museums and Heritage Center for Department of Education',12,'2017-05-10 09:24:18','2017-05-10 09:24:18',NULL,NULL,NULL,13,NULL,0),('CD-00037','NCCA to give Grants to Arts and Culture Projects Now Open for Proposals',12,'2017-05-10 09:21:56','2017-05-10 09:21:56',NULL,NULL,NULL,13,NULL,0),('CD-00039','A Comparative Study of Jose Ma. Ingalla\'s Dumut kag Huya and Salvador Magno\'s Sultan Batabilin',12,'2017-05-10 09:18:24','2017-05-10 09:18:24',NULL,NULL,NULL,13,NULL,0),('CD-02','lion king',13,'2017-05-21 06:32:08','2017-05-21 06:32:08',NULL,NULL,NULL,27,NULL,0),('DVD-01','1',13,'2017-05-21 13:18:38','2017-05-21 13:18:38',NULL,NULL,NULL,30,'1',0),('DVD-05','1',13,'2017-05-22 01:13:48','2017-05-22 01:13:48',NULL,NULL,NULL,30,'1',0),('IHRA-001','Ihra Divine',11,'2017-05-21 13:17:27','2017-05-21 13:17:27',NULL,NULL,NULL,29,'dear dear',2),('MCN-BK-0001','Marginal Bliss',4,'2017-05-09 16:41:42','2017-05-20 16:59:15',15,NULL,NULL,5,NULL,0),('MCN-BK-0014','A portrait of the artist as Filipino',4,'2017-05-09 16:46:14','2017-05-09 16:46:14',16,NULL,NULL,5,NULL,0),('P-00001','Central School of Cabatuan, Iloilo',11,'2017-05-09 18:14:53','2017-05-09 18:14:53',NULL,NULL,NULL,17,'Black and White',0),('P-00054','Plaza Libertad',11,'2017-05-09 18:13:50','2017-05-09 18:13:50',NULL,NULL,NULL,16,'Colored view of Plaza Libertad Facing the San Jos Catholic Church partly hidden',0),('P-00061','Merchant warehouses at the Port of Iloilo',11,'2017-05-09 18:20:26','2017-05-09 18:20:26',NULL,NULL,NULL,17,NULL,0),('PHOTO-01','a rabbit',11,'2017-05-20 11:18:10','2017-05-20 11:18:10',NULL,NULL,NULL,16,NULL,0),('PHOTO-02','math 17 prob set',1,'2017-05-21 06:18:06','2017-05-21 06:18:06',21,NULL,NULL,5,'a problem set in algebra.',0),('PHOTO-03','a rabbit',11,'2017-05-21 06:30:53','2017-05-21 06:30:53',NULL,NULL,NULL,16,NULL,0),('PHOTO-05','rabbit',11,'2017-05-22 01:12:26','2017-05-22 01:12:26',NULL,NULL,NULL,32,NULL,1),('PP-1','food eng problem set',1,'2017-05-21 13:08:47','2017-05-21 13:08:47',28,NULL,NULL,5,'problem set in engineering',0),('R-01','research',2,'2017-05-22 01:10:44','2017-05-23 08:05:00',32,NULL,2,5,'a research',0),('TH-00001','A study of the youths in two Bliss Housing Projects',6,'2017-05-09 16:23:11','2017-05-09 16:23:11',NULL,NULL,NULL,1,NULL,0),('TH-00002','A study on the social benefits as perceived by women in a PUSH Barangay in Janiuay',6,'2017-05-09 16:24:26','2017-05-09 16:24:26',NULL,NULL,NULL,1,NULL,0),('TH-00003','A comparative study of the sense of nationalism of public and private school children in Barotac Nuevo',6,'2017-05-09 16:24:42','2017-05-09 16:24:42',NULL,NULL,NULL,1,NULL,0),('TH-00004','A contemporary religious movement in the Philippines: “the Divine Enlightenment” of Dingle, Iloilo',6,'2017-05-09 16:24:59','2017-05-09 16:24:59',NULL,NULL,NULL,1,NULL,0),('TH-00005','The economic effects of farm size and ownership of land on rice farming in Pavia, Iloilo',6,'2017-05-09 16:25:13','2017-05-09 16:25:13',NULL,NULL,NULL,1,NULL,0),('TH-00006','Mayoral performance in the municipality of Miag-ao Iloilo from 1948 to the present',6,'2017-05-09 16:26:59','2017-05-09 16:26:59',NULL,NULL,NULL,1,NULL,0),('TH-00008','A study on the training needs of the barangay officials in relation to community development',6,'2017-05-09 16:27:12','2017-05-09 16:27:12',NULL,NULL,NULL,1,NULL,0),('TH-00009','Political propaganda of the Marcos regime since 1972.  U.P. Visayas,  Iloilo City',6,'2017-05-09 16:26:45','2017-05-09 16:26:45',NULL,NULL,NULL,1,NULL,0),('TH-00010','The economics of squid jigger fishing in Estancia, Iloilo',6,'2017-05-09 16:25:39','2017-05-09 16:25:39',NULL,NULL,NULL,1,NULL,0),('TH-01','cwvs archive and inventory system',6,'2017-05-21 13:13:21','2017-05-21 13:13:21',NULL,NULL,NULL,1,NULL,0),('TH-02','cwvs archive and inventory system',6,'2017-05-21 13:11:25','2017-05-21 13:11:25',30,NULL,NULL,1,NULL,0),('TP-00007','Mga Komposo kang mga Atiqueños',15,'2017-05-09 16:53:12','2017-05-09 16:53:12',NULL,NULL,NULL,12,NULL,0),('WF-SR-0001','Children\'s Charter Progress Report: Disaster Risk Reduction and Typhoon Yolanda, Philippines 2014',7,'2017-05-08 09:17:58','2017-05-08 09:17:58',2,NULL,NULL,3,NULL,1),('WF-SR-0003','Are we there yet?: Children\'s views on Haiyan recovery and the road ahead',7,'2017-05-09 13:39:56','2017-05-09 13:39:56',4,NULL,NULL,5,NULL,1),('WF-SR-0005','In the Locus of Action: Local Actors as Locomotives of the humanitarian system in the Philippines',7,'2017-05-09 15:02:01','2017-05-09 15:02:01',NULL,NULL,NULL,5,NULL,3),('WF-SR-0009','Missed Again: Making Space for Partnership in the Typhoon Haiyan Response',7,'2017-05-09 15:12:34','2017-05-09 15:12:34',5,NULL,NULL,5,NULL,2);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_copies`
--

DROP TABLE IF EXISTS `material_copies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_copies` (
  `copy_acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`copy_acqNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_copies`
--

LOCK TABLES `material_copies` WRITE;
/*!40000 ALTER TABLE `material_copies` DISABLE KEYS */;
INSERT INTO `material_copies` VALUES ('BK-01121','BK-01120'),('IHRA-002','IHRA-001'),('IHRA-003','IHRA-001'),('PHOTO-06','PHOTO-05'),('WF-SR-0002','WF-SR-0001'),('WF-SR-0004','WF-SR-0003'),('WF-SR-0006','WF-SR-0005'),('WF-SR-0007','WF-SR-0005'),('WF-SR-0008','WF-SR-0005'),('WF-SR-0010','WF-SR-0009'),('WF-SR-0011','WF-SR-0009');
/*!40000 ALTER TABLE `material_copies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_donors`
--

DROP TABLE IF EXISTS `material_donors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_donors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `donor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_donors`
--

LOCK TABLES `material_donors` WRITE;
/*!40000 ALTER TABLE `material_donors` DISABLE KEYS */;
INSERT INTO `material_donors` VALUES (12,'WF-SR-0001',12),(15,'WF-SR-0003',15),(16,'WF-SR-0005',16),(17,'WF-SR-0009',17),(18,'BK-01226',18),(21,'TH-00001',21),(22,'TH-00002',22),(23,'TH-00003',23),(24,'TH-00004',24),(25,'TH-00005',25),(26,'TH-00010',26),(27,'TH-00009',27),(28,'TH-00006',28),(29,'TH-00008',29),(30,'MCN-BK-0001',30),(31,'MCN-BK-0014',31),(32,'TP-00007',32),(33,'CD-00006',33),(35,'P-00054',35),(36,'P-00001',36),(37,'P-00061',37),(38,'CD-00039',38),(39,'CD-00037',39),(40,'CD-00033',40),(41,'CD-00020',41),(43,'CD-00019',43),(46,'BK-02',46),(48,'PHOTO-01',48),(52,'CD-02',52),(53,'CD-02',53),(54,'CD-01',54),(56,'PHOTO-02',58),(58,'CD-02',60),(63,'BK-01120',65),(65,'PP-1',67),(67,'TH-02',69),(68,'TH-01',70),(70,'IHRA-001',72),(72,'R-01',74),(73,'PHOTO-05',75),(74,'DVD-05',76);
/*!40000 ALTER TABLE `material_donors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_pictures`
--

DROP TABLE IF EXISTS `material_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_pictures` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `extension` enum('jpeg','png','jpg') COLLATE utf8_unicode_ci NOT NULL,
  `photo_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_pictures`
--

LOCK TABLES `material_pictures` WRITE;
/*!40000 ALTER TABLE `material_pictures` DISABLE KEYS */;
INSERT INTO `material_pictures` VALUES (2,'PHOTO-01','jpeg',8),(3,'PHOTO-05','jpeg',13);
/*!40000 ALTER TABLE `material_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_tags`
--

DROP TABLE IF EXISTS `material_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_tags` (
  `material_tags_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `tags_id` int(11) NOT NULL,
  PRIMARY KEY (`material_tags_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_tags`
--

LOCK TABLES `material_tags` WRITE;
/*!40000 ALTER TABLE `material_tags` DISABLE KEYS */;
INSERT INTO `material_tags` VALUES (14,'WF-SR-0003',4),(15,'BK-01226',5),(16,'TH-00001',1),(17,'TH-00002',1),(18,'TH-00003',1),(19,'TH-00004',1),(20,'TH-00005',1),(21,'TH-00010',1),(22,'TH-00009',1),(23,'TH-00006',1),(24,'TH-00008',1),(25,'P-00054',6),(26,'P-00054',7),(31,'BK-02',12),(32,'BK-02',13),(34,'PHOTO-01',15),(38,'CD-01',19),(41,'PHOTO-02',22),(42,'PHOTO-02',23),(44,'CD-02',19),(46,'PP-1',26),(48,'TH-02',24),(49,'TH-01',24),(51,'R-01',28),(52,'PHOTO-05',29);
/*!40000 ALTER TABLE `material_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material_types`
--

DROP TABLE IF EXISTS `material_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('Photocopied Articles','Research Reports','Conference Papers','Private Collections','Rare Collections','Thesis','Serials','Newspapers','Journals','Magazines','Photographs','Compact Discs','Digital Versatile Discs','Video Home Systems','Cassette Tapes') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material_types`
--

LOCK TABLES `material_types` WRITE;
/*!40000 ALTER TABLE `material_types` DISABLE KEYS */;
INSERT INTO `material_types` VALUES (1,'Photocopied Articles'),(2,'Research Reports'),(3,'Conference Papers'),(4,'Private Collections'),(5,'Rare Collections'),(6,'Thesis'),(7,'Serials'),(8,'Newspapers'),(9,'Journals'),(10,'Magazines'),(11,'Photographs'),(12,'Compact Discs'),(13,'Digital Versatile Discs'),(14,'Video Home Systems'),(15,'Cassette Tapes');
/*!40000 ALTER TABLE `material_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurements`
--

DROP TABLE IF EXISTS `measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `measurements` (
  `measurement_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `length` double(8,2) NOT NULL,
  `width` double(8,2) NOT NULL,
  `unit` enum('mm','cm','m') COLLATE utf8_unicode_ci NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`measurement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurements`
--

LOCK TABLES `measurements` WRITE;
/*!40000 ALTER TABLE `measurements` DISABLE KEYS */;
INSERT INTO `measurements` VALUES (14,119.00,0.00,'cm','AR-FI-002'),(16,107.00,133.00,'cm','AR-FI-003'),(35,130.00,0.00,'cm','AR-FI-001'),(36,24.00,12.00,'cm','AR-MI-012'),(37,26.00,9.00,'cm','AR-MI-011'),(38,75.00,71.00,'cm','AR-MI-003'),(39,77.00,13.00,'cm','AR-MI-004'),(40,10.00,10.00,'cm','fh-01'),(41,1.00,1.00,'cm','FISH-01');
/*!40000 ALTER TABLE `measurements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2017_05_22_104306_create_borrow_transactions_table',1),(2,'2017_05_22_104313_create_view_transactions_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modified`
--

DROP TABLE IF EXISTS `modified`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modified` (
  `modified_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` int(11) NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`modified_id`)
) ENGINE=InnoDB AUTO_INCREMENT=292 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modified`
--

LOCK TABLES `modified` WRITE;
/*!40000 ALTER TABLE `modified` DISABLE KEYS */;
INSERT INTO `modified` VALUES (8,201354053,'b-01','2017-04-27 19:48:47','2017-04-27 19:48:47'),(9,201354053,'b-01','2017-04-27 19:48:53','2017-04-27 19:48:53'),(10,201354053,'b-01','2017-04-27 19:51:02','2017-04-27 19:51:02'),(11,201354053,'p-01','2017-04-27 19:51:27','2017-04-27 19:51:27'),(12,201354053,'b-01','2017-04-27 19:51:49','2017-04-27 19:51:49'),(13,201354053,'p-01','2017-04-27 19:52:00','2017-04-27 19:52:00'),(14,201354053,'p-01','2017-04-27 20:02:48','2017-04-27 20:02:48'),(15,201354053,'b-02','2017-04-27 20:51:20','2017-04-27 20:51:20'),(16,201354053,'p-01','2017-04-27 22:46:10','2017-04-27 22:46:10'),(17,201354053,'b-02','2017-04-27 22:46:17','2017-04-27 22:46:17'),(18,201354053,'p-01','2017-04-27 22:47:33','2017-04-27 22:47:33'),(19,201354053,'p-01','2017-04-27 23:01:14','2017-04-27 23:01:14'),(20,201354053,'p-01','2017-04-27 23:01:15','2017-04-27 23:01:15'),(21,201354053,'p-01','2017-04-27 23:43:25','2017-04-27 23:43:25'),(22,201354053,'bk-01','2017-04-27 23:58:55','2017-04-27 23:58:55'),(23,201354053,'bk-01','2017-04-27 23:59:55','2017-04-27 23:59:55'),(24,201354053,'p-01','2017-04-28 00:03:00','2017-04-28 00:03:00'),(25,201354321,'p-01','2017-04-28 02:28:21','2017-04-28 02:28:21'),(26,201354321,'p-01','2017-04-28 02:28:21','2017-04-28 02:28:21'),(27,201354053,'1','2017-04-28 02:55:27','2017-04-28 02:55:27'),(28,201354053,'b-01','2017-04-28 03:13:37','2017-04-28 03:13:37'),(29,201354053,'p-01','2017-04-28 03:15:54','2017-04-28 03:15:54'),(30,201354053,'t-01','2017-04-28 03:16:20','2017-04-28 03:16:20'),(31,201354053,'1','2017-04-28 03:17:00','2017-04-28 03:17:00'),(32,201354053,'t-01','2017-04-28 03:19:28','2017-04-28 03:19:28'),(33,201354053,'b-01','2017-04-28 03:19:38','2017-04-28 03:19:38'),(34,201354053,'b-01','2017-04-28 03:19:38','2017-04-28 03:19:38'),(35,201354053,'1','2017-04-28 03:26:16','2017-04-28 03:26:16'),(36,201354053,'b-01','2017-04-28 06:49:00','2017-04-28 06:49:00'),(37,201354053,'123','2017-04-28 08:01:18','2017-04-28 08:01:18'),(38,201354053,'b-01','2017-04-30 10:45:39','2017-04-30 10:45:39'),(39,201354053,'b-01','2017-04-30 10:45:48','2017-04-30 10:45:48'),(40,201354053,'bk-01','2017-04-30 11:52:22','2017-04-30 11:52:22'),(41,201354053,'bk-01','2017-04-30 11:52:37','2017-04-30 11:52:37'),(42,201354053,'2','2017-04-30 11:54:50','2017-04-30 11:54:50'),(43,201354053,'P-01','2017-05-06 06:20:11','2017-05-06 06:20:11'),(44,201354053,'P-01','2017-05-06 09:44:12','2017-05-06 09:44:12'),(45,201354053,'P-01','2017-05-06 09:44:14','2017-05-06 09:44:14'),(46,201354053,'c-01','2017-05-06 09:51:59','2017-05-06 09:51:59'),(47,201354053,'c-01','2017-05-06 09:53:29','2017-05-06 09:53:29'),(48,201354053,'c-01','2017-05-06 09:53:30','2017-05-06 09:53:30'),(49,201354053,'c-01','2017-05-06 09:54:04','2017-05-06 09:54:04'),(50,201354053,'1','2017-05-06 14:15:43','2017-05-06 14:15:43'),(51,201354053,'T-01','2017-05-06 16:14:16','2017-05-06 16:14:16'),(52,201354053,'T-01','2017-05-06 16:17:58','2017-05-06 16:17:58'),(53,201354053,'b1','2017-05-06 16:19:31','2017-05-06 16:19:31'),(54,201354053,'A-01','2017-05-07 15:35:59','2017-05-07 15:35:59'),(55,201354053,'A-01','2017-05-07 15:37:39','2017-05-07 15:37:39'),(56,201354053,'P-01','2017-05-07 15:37:43','2017-05-07 15:37:43'),(57,201354053,'a-01','2017-05-07 15:39:40','2017-05-07 15:39:40'),(58,201354053,'a-01','2017-05-07 15:39:45','2017-05-07 15:39:45'),(59,201354053,'a-01','2017-05-07 15:55:39','2017-05-07 15:55:39'),(60,201354053,'a-01','2017-05-07 15:55:53','2017-05-07 15:55:53'),(61,201354053,'bk-bk-001','2017-05-07 16:35:43','2017-05-07 16:35:43'),(62,201354053,'bk-bk-001','2017-05-07 16:38:10','2017-05-07 16:38:10'),(63,201354053,'bk-bk-001','2017-05-08 02:23:43','2017-05-08 02:23:43'),(64,201354053,'bk-bk-001','2017-05-08 02:23:56','2017-05-08 02:23:56'),(65,201354053,'bk-bk-001','2017-05-08 02:28:25','2017-05-08 02:28:25'),(66,201354053,'bk-001','2017-05-08 02:29:12','2017-05-08 02:29:12'),(67,201354053,'bk-001','2017-05-08 03:24:12','2017-05-08 03:24:12'),(68,201354053,'bk-bk-001','2017-05-08 03:24:15','2017-05-08 03:24:15'),(69,201354053,'bk-01','2017-05-08 03:24:44','2017-05-08 03:24:44'),(70,201354053,'bk-01','2017-05-08 03:24:57','2017-05-08 03:24:57'),(71,201354053,'bk-bk-001','2017-05-08 03:25:17','2017-05-08 03:25:17'),(72,201354053,'bk-bk-001','2017-05-08 03:28:25','2017-05-08 03:28:25'),(73,201354053,'bk-bk-001','2017-05-08 03:28:48','2017-05-08 03:28:48'),(74,201354053,'bk-bk-001','2017-05-08 03:32:43','2017-05-08 03:32:43'),(75,201354053,'bk-bk-001','2017-05-08 03:32:43','2017-05-08 03:32:43'),(76,201354053,'bk-bk-001','2017-05-08 03:41:37','2017-05-08 03:41:37'),(77,201354053,'bk-001','2017-05-08 03:55:36','2017-05-08 03:55:36'),(78,201354053,'bk-001','2017-05-08 03:55:56','2017-05-08 03:55:56'),(79,201354053,'bk-bk-001','2017-05-08 03:56:17','2017-05-08 03:56:17'),(80,201354053,'bk-bk-001','2017-05-08 03:56:35','2017-05-08 03:56:35'),(81,201354053,'bk-bk-001','2017-05-08 03:56:35','2017-05-08 03:56:35'),(82,201354053,'bk-bk-001','2017-05-08 04:15:40','2017-05-08 04:15:40'),(83,201354053,'bk-bk-01','2017-05-08 04:16:03','2017-05-08 04:16:03'),(84,201354053,'bk-bk-01','2017-05-08 04:16:18','2017-05-08 04:16:18'),(85,201354053,'bk-bk-01','2017-05-08 04:16:19','2017-05-08 04:16:19'),(86,201354053,'bk-bk-01','2017-05-08 04:43:46','2017-05-08 04:43:46'),(87,201354053,'bk-bk-01','2017-05-08 04:44:04','2017-05-08 04:44:04'),(88,201354053,'bk-bk-01','2017-05-08 04:45:19','2017-05-08 04:45:19'),(89,201354053,'bk-bk-01','2017-05-08 04:45:39','2017-05-08 04:45:39'),(90,201354053,'bk-bk-01','2017-05-08 04:52:33','2017-05-08 04:52:33'),(91,201354053,'bk-bk-01','2017-05-08 04:52:34','2017-05-08 04:52:34'),(92,201354053,'bk-bk-01','2017-05-08 04:58:12','2017-05-08 04:58:12'),(93,201354053,'bk-01','2017-05-08 04:59:49','2017-05-08 04:59:49'),(94,201354053,'bk-01','2017-05-08 05:00:14','2017-05-08 05:00:14'),(95,201354053,'bk-01','2017-05-08 05:00:14','2017-05-08 05:00:14'),(96,201354053,'bk-01','2017-05-08 05:00:25','2017-05-08 05:00:25'),(97,201354053,'wf-bk-001','2017-05-08 05:00:44','2017-05-08 05:00:44'),(98,201354053,'wf-bk-001','2017-05-08 05:01:01','2017-05-08 05:01:01'),(99,201354053,'wf-bk-001','2017-05-08 05:01:01','2017-05-08 05:01:01'),(100,201354053,'wf-bk-001','2017-05-08 05:01:31','2017-05-08 05:01:31'),(101,201354053,'Th-00001','2017-05-08 08:34:17','2017-05-08 08:34:17'),(102,201354053,'Th-00002','2017-05-08 08:37:02','2017-05-08 08:37:02'),(103,201354053,'Th-00003','2017-05-08 08:39:46','2017-05-08 08:39:46'),(104,201354053,'Th-00001','2017-05-08 08:40:53','2017-05-08 08:40:53'),(105,201354053,'Th-00001','2017-05-08 08:40:54','2017-05-08 08:40:54'),(106,201354053,'Th-00004','2017-05-08 08:43:28','2017-05-08 08:43:28'),(107,201354053,'Th-00005','2017-05-08 08:51:53','2017-05-08 08:51:53'),(108,201354053,'Th-00006','2017-05-08 08:54:05','2017-05-08 08:54:05'),(109,201354053,'Th-00008','2017-05-08 08:57:38','2017-05-08 08:57:38'),(110,201354053,'Th-00009','2017-05-08 09:01:22','2017-05-08 09:01:22'),(111,201354053,'Th-00010','2017-05-08 09:03:15','2017-05-08 09:03:15'),(112,201354053,'WF-Bk-0001','2017-05-08 09:08:14','2017-05-08 09:08:14'),(113,201354053,'WF-Bk-0001','2017-05-08 09:13:37','2017-05-08 09:13:37'),(114,201354053,'WF-SR-0001','2017-05-08 09:17:59','2017-05-08 09:17:59'),(115,201354053,'Th-00002','2017-05-08 09:18:47','2017-05-08 09:18:47'),(116,201354053,'Th-00002','2017-05-08 09:18:47','2017-05-08 09:18:47'),(117,201354053,'WF-SR-0003','2017-05-08 09:30:31','2017-05-08 09:30:31'),(118,201354053,'WF-SR-0003','2017-05-09 13:39:55','2017-05-09 13:39:55'),(119,201354053,'WF-SR-0003','2017-05-09 13:39:56','2017-05-09 13:39:56'),(120,201354053,'a-01','2017-05-09 14:42:15','2017-05-09 14:42:15'),(121,201354053,'a-01','2017-05-09 14:42:30','2017-05-09 14:42:30'),(122,201354053,'a-01','2017-05-09 14:44:22','2017-05-09 14:44:22'),(123,201354053,'a-01','2017-05-09 14:45:47','2017-05-09 14:45:47'),(124,201354053,'a-01','2017-05-09 14:47:22','2017-05-09 14:47:22'),(125,201354053,'a-01','2017-05-09 14:54:45','2017-05-09 14:54:45'),(126,201354053,'a-01','2017-05-09 14:55:02','2017-05-09 14:55:02'),(127,201354053,'a-01','2017-05-09 14:55:08','2017-05-09 14:55:08'),(128,201354053,'WF-SR-0005','2017-05-09 15:02:01','2017-05-09 15:02:01'),(129,201354053,'WF-SR-0009','2017-05-09 15:12:34','2017-05-09 15:12:34'),(130,201354053,'BK-01226','2017-05-09 15:20:57','2017-05-09 15:20:57'),(131,201354053,'BK-01120','2017-05-09 15:23:52','2017-05-09 15:23:52'),(132,201354053,'a','2017-05-09 15:44:26','2017-05-09 15:44:26'),(133,201354053,'Bk-01745','2017-05-09 15:48:32','2017-05-09 15:48:32'),(134,201354053,'Bk-01584','2017-05-09 15:51:11','2017-05-09 15:51:11'),(135,201354053,'Bk-01210','2017-05-09 16:17:33','2017-05-09 16:17:33'),(136,201354053,'bk-00120','2017-05-09 16:18:36','2017-05-09 16:18:36'),(137,201354053,'bk-00120','2017-05-09 16:18:57','2017-05-09 16:18:57'),(138,201354053,'Th-00001','2017-05-09 16:23:10','2017-05-09 16:23:10'),(139,201354053,'TH-00001','2017-05-09 16:23:11','2017-05-09 16:23:11'),(140,201354053,'Bk-01210','2017-05-09 16:23:41','2017-05-09 16:23:41'),(141,201354053,'BK-01210','2017-05-09 16:23:41','2017-05-09 16:23:41'),(142,201354053,'Bk-01584','2017-05-09 16:23:56','2017-05-09 16:23:56'),(143,201354053,'BK-01584','2017-05-09 16:23:57','2017-05-09 16:23:57'),(144,201354053,'Bk-01745','2017-05-09 16:24:10','2017-05-09 16:24:10'),(145,201354053,'BK-01745','2017-05-09 16:24:10','2017-05-09 16:24:10'),(146,201354053,'Th-00002','2017-05-09 16:24:25','2017-05-09 16:24:25'),(147,201354053,'TH-00002','2017-05-09 16:24:26','2017-05-09 16:24:26'),(148,201354053,'Th-00003','2017-05-09 16:24:41','2017-05-09 16:24:41'),(149,201354053,'TH-00003','2017-05-09 16:24:42','2017-05-09 16:24:42'),(150,201354053,'Th-00004','2017-05-09 16:24:58','2017-05-09 16:24:58'),(151,201354053,'TH-00004','2017-05-09 16:24:59','2017-05-09 16:24:59'),(152,201354053,'Th-00005','2017-05-09 16:25:13','2017-05-09 16:25:13'),(153,201354053,'TH-00005','2017-05-09 16:25:13','2017-05-09 16:25:13'),(154,201354053,'Th-00010','2017-05-09 16:25:39','2017-05-09 16:25:39'),(155,201354053,'TH-00010','2017-05-09 16:25:39','2017-05-09 16:25:39'),(156,201354053,'Th-00009','2017-05-09 16:26:45','2017-05-09 16:26:45'),(157,201354053,'TH-00009','2017-05-09 16:26:45','2017-05-09 16:26:45'),(158,201354053,'Th-00006','2017-05-09 16:26:58','2017-05-09 16:26:58'),(159,201354053,'TH-00006','2017-05-09 16:26:59','2017-05-09 16:26:59'),(160,201354053,'Th-00008','2017-05-09 16:27:11','2017-05-09 16:27:11'),(161,201354053,'TH-00008','2017-05-09 16:27:12','2017-05-09 16:27:12'),(162,201354053,'BK-01214','2017-05-09 16:29:46','2017-05-09 16:29:46'),(163,201354053,'MCN-BK-0001','2017-05-09 16:41:42','2017-05-09 16:41:42'),(164,201354053,'MCN-BK-0014','2017-05-09 16:46:14','2017-05-09 16:46:14'),(165,201354053,'TP-00007','2017-05-09 16:53:12','2017-05-09 16:53:12'),(166,201354053,'CD-00006','2017-05-09 16:55:42','2017-05-09 16:55:42'),(167,201354053,'P-01','2017-05-09 18:02:04','2017-05-09 18:02:04'),(168,201354053,'P-1','2017-05-09 18:05:00','2017-05-09 18:05:00'),(169,201354053,'P-1','2017-05-09 18:07:18','2017-05-09 18:07:18'),(170,201354053,'P-00001','2017-05-09 18:09:34','2017-05-09 18:09:34'),(171,201354053,'P-00054','2017-05-09 18:13:50','2017-05-09 18:13:50'),(172,201354053,'P-00001','2017-05-09 18:14:53','2017-05-09 18:14:53'),(173,201354053,'P-00001','2017-05-09 18:14:53','2017-05-09 18:14:53'),(174,201354053,'P-00061','2017-05-09 18:20:26','2017-05-09 18:20:26'),(175,201354053,'CD-00039','2017-05-10 09:18:24','2017-05-10 09:18:24'),(176,201354053,'CD-00037','2017-05-10 09:21:56','2017-05-10 09:21:56'),(177,201354053,'CD-00033','2017-05-10 09:24:18','2017-05-10 09:24:18'),(178,201354053,'CD-00020','2017-05-10 09:26:53','2017-05-10 09:26:53'),(179,201354053,'CD-00019','2017-05-10 09:28:01','2017-05-10 09:28:01'),(180,201354053,'CD-00019','2017-05-10 09:28:31','2017-05-10 09:28:31'),(181,201354053,'CD-00019','2017-05-10 09:28:32','2017-05-10 09:28:32'),(182,201354053,'AR-MI-001','2017-05-10 09:43:14','2017-05-10 09:43:14'),(183,201354053,'AR-MI-002','2017-05-10 09:59:51','2017-05-10 09:59:51'),(184,201354053,'AR-MI-002','2017-05-10 10:09:30','2017-05-10 10:09:30'),(185,201354053,'AR-MI-001','2017-05-10 10:09:48','2017-05-10 10:09:48'),(186,201354053,'AR-MI-003','2017-05-10 10:18:25','2017-05-10 10:18:25'),(187,201354053,'AR-MI-002','2017-05-10 10:20:07','2017-05-10 10:20:07'),(188,201354053,'AR-MI-003','2017-05-10 10:20:28','2017-05-10 10:20:28'),(189,201354053,'AR-MI-003','2017-05-10 10:21:30','2017-05-10 10:21:30'),(190,201354053,'AR-MI-004','2017-05-10 10:35:07','2017-05-10 10:35:07'),(191,201354053,'AR-MI-005','2017-05-10 10:39:14','2017-05-10 10:39:14'),(192,201354053,'1','2017-05-17 14:55:30','2017-05-17 14:55:30'),(193,201354053,'AR-FI-001','2017-05-18 15:22:04','2017-05-18 15:22:04'),(194,201354053,'AR-FI-001','2017-05-18 15:22:18','2017-05-18 15:22:18'),(195,201354053,'AR-FI-002','2017-05-18 15:25:37','2017-05-18 15:25:37'),(196,201354053,'AR-FI-001','2017-05-18 15:26:39','2017-05-18 15:26:39'),(197,201354053,'AR-FI-003','2017-05-18 15:37:56','2017-05-18 15:37:56'),(198,201354053,'1','2017-05-18 15:56:37','2017-05-18 15:56:37'),(199,201354053,'1','2017-05-18 15:57:02','2017-05-18 15:57:02'),(200,201354053,'AR-FI-001','2017-05-18 16:00:03','2017-05-18 16:00:03'),(201,201354053,'AR-FI-001','2017-05-18 16:00:20','2017-05-18 16:00:20'),(202,201354053,'AR-FI-001','2017-05-18 16:01:35','2017-05-18 16:01:35'),(203,201354053,'AR-FI-001','2017-05-18 16:02:45','2017-05-18 16:02:45'),(204,201354053,'AR-FI-001','2017-05-18 16:04:06','2017-05-18 16:04:06'),(205,201354053,'AR-FI-001','2017-05-18 16:04:38','2017-05-18 16:04:38'),(206,201354053,'AR-FI-001','2017-05-18 16:05:14','2017-05-18 16:05:14'),(207,201354053,'1','2017-05-18 16:14:26','2017-05-18 16:14:26'),(208,201354053,'AR-FI-001','2017-05-18 16:49:21','2017-05-18 16:49:21'),(209,201354053,'AR-FI-001','2017-05-18 16:50:41','2017-05-18 16:50:41'),(210,201354053,'AR-FI-001','2017-05-18 16:52:00','2017-05-18 16:52:00'),(211,201354053,'AR-FI-001','2017-05-18 16:57:16','2017-05-18 16:57:16'),(212,201354053,'AR-FI-001','2017-05-18 16:57:44','2017-05-18 16:57:44'),(213,201354053,'AR-FI-001','2017-05-18 16:58:06','2017-05-18 16:58:06'),(214,201354053,'AR-FI-001','2017-05-18 17:00:08','2017-05-18 17:00:08'),(215,201354053,'AR-FI-001','2017-05-18 17:00:31','2017-05-18 17:00:31'),(216,201354053,'AR-FI-001','2017-05-18 17:00:45','2017-05-18 17:00:45'),(217,201354053,'P-01','2017-05-18 17:03:44','2017-05-18 17:03:44'),(218,201354053,'P-01','2017-05-18 17:04:25','2017-05-18 17:04:25'),(219,201354053,'P-01','2017-05-18 17:04:25','2017-05-18 17:04:25'),(220,201354053,'P-01','2017-05-19 04:53:39','2017-05-19 04:53:39'),(221,201354053,'A-1','2017-05-19 04:54:54','2017-05-19 04:54:54'),(222,201354053,'A-1','2017-05-19 04:59:01','2017-05-19 04:59:01'),(223,201354053,'A-1','2017-05-19 05:00:51','2017-05-19 05:00:51'),(224,201354053,'A-1','2017-05-19 05:01:34','2017-05-19 05:01:34'),(225,201354053,'A-1','2017-05-19 05:01:35','2017-05-19 05:01:35'),(226,201354053,'A-1','2017-05-19 05:04:03','2017-05-19 05:04:03'),(227,201354053,'A-1','2017-05-19 05:04:03','2017-05-19 05:04:03'),(228,201354053,'A-1','2017-05-19 05:13:23','2017-05-19 05:13:23'),(229,201354053,'A-1','2017-05-19 05:13:23','2017-05-19 05:13:23'),(230,201354053,'A-1','2017-05-19 05:13:48','2017-05-19 05:13:48'),(231,201354053,'A-1','2017-05-19 05:13:49','2017-05-19 05:13:49'),(232,201354053,'A-1','2017-05-19 05:14:21','2017-05-19 05:14:21'),(233,201354053,'A-1','2017-05-19 05:14:22','2017-05-19 05:14:22'),(234,201354053,'A-1','2017-05-19 05:14:36','2017-05-19 05:14:36'),(235,201354053,'BK-01','2017-05-20 10:34:15','2017-05-20 10:34:15'),(236,201354053,'BK-01','2017-05-20 10:34:39','2017-05-20 10:34:39'),(237,201354053,'BK-01','2017-05-20 10:34:39','2017-05-20 10:34:39'),(238,201354053,'BK-01','2017-05-20 10:36:41','2017-05-20 10:36:41'),(239,201354053,'BK-02','2017-05-20 10:36:42','2017-05-20 10:36:42'),(240,201354053,'PHOTO-01','2017-05-20 11:17:43','2017-05-20 11:17:43'),(241,201354053,'PHOTO-01','2017-05-20 11:18:09','2017-05-20 11:18:09'),(242,201354053,'PHOTO-01','2017-05-20 11:18:10','2017-05-20 11:18:10'),(243,201354053,'CD-01','2017-05-20 11:21:44','2017-05-20 11:21:44'),(244,201354053,'CD-01','2017-05-20 11:22:09','2017-05-20 11:22:09'),(245,201354053,'CD-01','2017-05-20 11:22:09','2017-05-20 11:22:09'),(246,201354053,'CD-01','2017-05-20 11:22:33','2017-05-20 11:22:33'),(247,201354053,'CD-01','2017-05-20 11:22:34','2017-05-20 11:22:34'),(248,201354053,'CD-01','2017-05-20 11:32:10','2017-05-20 11:32:10'),(249,201354053,'AR-MI-012','2017-05-20 14:51:18','2017-05-20 14:51:18'),(250,201354053,'AR-MI-011','2017-05-20 14:51:36','2017-05-20 14:51:36'),(251,201354053,'AR-MI-003','2017-05-20 14:51:53','2017-05-20 14:51:53'),(252,201354053,'AR-MI-004','2017-05-20 14:52:05','2017-05-20 14:52:05'),(253,201354053,'Z-1','2017-05-20 15:06:03','2017-05-20 15:06:03'),(254,201354053,'Z-1','2017-05-20 15:06:12','2017-05-20 15:06:12'),(255,201354053,'PHOTO-02','2017-05-21 06:16:06','2017-05-21 06:16:06'),(256,201354053,'PHOTO-02','2017-05-21 06:18:05','2017-05-21 06:18:05'),(257,201354053,'PHOTO-02','2017-05-21 06:18:06','2017-05-21 06:18:06'),(258,201354053,'TH-01','2017-05-21 06:28:56','2017-05-21 06:28:56'),(259,201354053,'PHOTO-03','2017-05-21 06:30:28','2017-05-21 06:30:28'),(260,201354053,'PHOTO-03','2017-05-21 06:30:53','2017-05-21 06:30:53'),(261,201354053,'PHOTO-03','2017-05-21 06:30:54','2017-05-21 06:30:54'),(262,201354053,'CD-02','2017-05-21 06:32:08','2017-05-21 06:32:08'),(263,201533333,'BK-01120','2017-05-21 09:12:40','2017-05-21 09:12:40'),(264,201533333,'BK-01120','2017-05-21 09:12:40','2017-05-21 09:12:40'),(265,201533333,'BK-01120','2017-05-21 09:16:10','2017-05-21 09:16:10'),(266,201533333,'BK-01120','2017-05-21 09:16:10','2017-05-21 09:16:10'),(267,201533333,'BK-01120','2017-05-21 09:16:23','2017-05-21 09:16:23'),(268,201533333,'BK-01121','2017-05-21 09:16:24','2017-05-21 09:16:24'),(269,201533333,'BK-01121','2017-05-21 09:16:40','2017-05-21 09:16:40'),(270,201533333,'BK-01120','2017-05-21 09:16:40','2017-05-21 09:16:40'),(271,201533333,'BK-01120','2017-05-21 09:16:50','2017-05-21 09:16:50'),(272,201533333,'BK-01120','2017-05-21 09:16:51','2017-05-21 09:16:51'),(273,201354053,'PP-1','2017-05-21 13:06:55','2017-05-21 13:06:55'),(274,201354053,'PP-1','2017-05-21 13:08:47','2017-05-21 13:08:47'),(275,201354053,'PP-1','2017-05-21 13:08:47','2017-05-21 13:08:47'),(276,201354053,'TH-02','2017-05-21 13:10:42','2017-05-21 13:10:42'),(277,201354053,'TH-02','2017-05-21 13:11:24','2017-05-21 13:11:24'),(278,201354053,'TH-02','2017-05-21 13:11:25','2017-05-21 13:11:25'),(279,201354053,'TH-01','2017-05-21 13:13:20','2017-05-21 13:13:20'),(280,201354053,'TH-01','2017-05-21 13:13:21','2017-05-21 13:13:21'),(281,201354053,'IHRA-001','2017-05-21 13:17:01','2017-05-21 13:17:01'),(282,201354053,'IHRA-001','2017-05-21 13:17:26','2017-05-21 13:17:26'),(283,201354053,'IHRA-001','2017-05-21 13:17:27','2017-05-21 13:17:27'),(284,201354053,'DVD-01','2017-05-21 13:18:38','2017-05-21 13:18:38'),(285,201354053,'fh-01','2017-05-21 13:21:51','2017-05-21 13:21:51'),(286,201354053,'R-01','2017-05-22 01:10:07','2017-05-22 01:10:07'),(287,201354053,'R-01','2017-05-22 01:10:44','2017-05-22 01:10:44'),(288,201354053,'R-01','2017-05-22 01:10:44','2017-05-22 01:10:44'),(289,201354053,'PHOTO-05','2017-05-22 01:12:26','2017-05-22 01:12:26'),(290,201354053,'DVD-05','2017-05-22 01:13:48','2017-05-22 01:13:48'),(291,201354053,'FISH-01','2017-05-22 01:15:51','2017-05-22 01:15:51');
/*!40000 ALTER TABLE `modified` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multimedia`
--

DROP TABLE IF EXISTS `multimedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `multimedia` (
  `multimedia_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `duration` time NOT NULL,
  PRIMARY KEY (`multimedia_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multimedia`
--

LOCK TABLES `multimedia` WRITE;
/*!40000 ALTER TABLE `multimedia` DISABLE KEYS */;
INSERT INTO `multimedia` VALUES (1,'TP-00007','01:00:00'),(2,'CD-00006','00:00:00'),(3,'CD-00039','01:00:00'),(4,'CD-00037','01:00:00'),(5,'CD-00033','01:00:00'),(6,'CD-00020','01:00:00'),(8,'CD-00019','01:00:00'),(9,'CD-02','01:10:00'),(10,'DVD-01','01:01:01'),(11,'DVD-05','01:01:01');
/*!40000 ALTER TABLE `multimedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owners` (
  `owner_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_id` int(11) NOT NULL,
  PRIMARY KEY (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES (13,'Simplicio','','Gedalangga','Pisyong',20),(15,'Ino','','Fulge','',22),(34,'Joaquin','','Baldore','',41),(35,'n/a','n/a','n/a','n/a',22),(36,'Calisto','','Pinuela','n/a',42),(37,'n/a','n/a','n/a','n/a',43),(38,'n/a','n/a','n/a','n/a',44),(39,'ihra','','jagunap','',55),(40,'1','1','1','1',54);
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
INSERT INTO `password_resets` VALUES ('charlesaposaga@gmail.com','2380f13d6c3e4b25b8890ef93b468d8a43034eef72ad555aca6c975b7cb89902','2017-05-06 03:50:42');
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `photographer_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `size` varchar(99) COLLATE utf8_unicode_ci NOT NULL,
  `size_type` enum('cm','mm','m') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`photo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (4,'3','P-00054',1988,'252 x 202','cm'),(5,'3','P-00001',1912,'256 x 203','cm'),(6,'3','P-00061',1900,'254 x 202','cm'),(8,'5','PHOTO-01',2017,'10','cm'),(10,'7','PHOTO-03',2017,'5x5','cm'),(12,'7','IHRA-001',2017,'20x20','cm'),(13,'8','PHOTO-05',2017,'5x5','cm');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photographer`
--

DROP TABLE IF EXISTS `photographer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photographer` (
  `photographer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`photographer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photographer`
--

LOCK TABLES `photographer` WRITE;
/*!40000 ALTER TABLE `photographer` DISABLE KEYS */;
INSERT INTO `photographer` VALUES (3,'n/a','n/a','n/a'),(5,'Janine','D.','de la Paz'),(7,'charles','','aposaga'),(8,'1','1','1');
/*!40000 ALTER TABLE `photographer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produced`
--

DROP TABLE IF EXISTS `produced`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `produced` (
  `produced_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `producer_id` int(11) NOT NULL,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`produced_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produced`
--

LOCK TABLES `produced` WRITE;
/*!40000 ALTER TABLE `produced` DISABLE KEYS */;
INSERT INTO `produced` VALUES (1,1,'DVD-01'),(2,2,'DVD-05');
/*!40000 ALTER TABLE `produced` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producer`
--

DROP TABLE IF EXISTS `producer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `producer` (
  `producer_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`producer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producer`
--

LOCK TABLES `producer` WRITE;
/*!40000 ALTER TABLE `producer` DISABLE KEYS */;
INSERT INTO `producer` VALUES (1,'2','2','2'),(2,'1','1','1');
/*!40000 ALTER TABLE `producer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publisher` (
  `publisher_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `publisher_name_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  PRIMARY KEY (`publisher_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES (2,2,2,2014),(4,2,2,2014),(5,3,2,2014),(6,4,3,1990),(11,9,3,1994),(12,10,3,2005),(13,11,3,2007),(14,9,3,1994),(15,12,2,2002),(16,13,7,1966),(19,16,2,2010),(21,18,46,2017),(26,23,53,1994),(28,18,46,2017),(30,25,46,2017),(32,18,46,2017);
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher_name`
--

DROP TABLE IF EXISTS `publisher_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publisher_name` (
  `publisher_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `publisher_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`publisher_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher_name`
--

LOCK TABLES `publisher_name` WRITE;
/*!40000 ALTER TABLE `publisher_name` DISABLE KEYS */;
INSERT INTO `publisher_name` VALUES (2,'Save the Children'),(3,'Christian Aid'),(4,'Ouch publisher'),(9,'Tahanan Books for Young Readers'),(10,'National Commission for Culture & the Arts'),(11,'University of Santo Tomas Publishing House'),(12,'University of the Philippines Press'),(13,'Alberto S. Florentino'),(16,'Oracle'),(18,'University of the Philippines Visayas'),(23,'Giraffe Books'),(25,'DPSM');
/*!40000 ALTER TABLE `publisher_name` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchased_details`
--

DROP TABLE IF EXISTS `purchased_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchased_details` (
  `purchased_details_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `copy` int(11) NOT NULL,
  PRIMARY KEY (`purchased_details_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchased_details`
--

LOCK TABLES `purchased_details` WRITE;
/*!40000 ALTER TABLE `purchased_details` DISABLE KEYS */;
INSERT INTO `purchased_details` VALUES (4,'TH-00001','0',3,'2000-01-01',0),(5,'BK-01210','0',3,'1994-01-01',0),(6,'BK-01584','0',3,'2005-01-01',0),(7,'BK-01745','0',3,'2007-01-01',0),(8,'BK-01214','0',3,'1994-01-01',0),(10,'PHOTO-03','100',48,'2017-01-01',0),(12,'TH-02','0',48,'2017-01-01',0),(13,'DVD-01','0',54,'2000-01-01',0);
/*!40000 ALTER TABLE `purchased_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school` (
  `school_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'University of the Philippines Visayas');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_number`
--

DROP TABLE IF EXISTS `student_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_number` (
  `student_number` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`student_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_number`
--

LOCK TABLES `student_number` WRITE;
/*!40000 ALTER TABLE `student_number` DISABLE KEYS */;
INSERT INTO `student_number` VALUES (199012345,NULL,NULL),(201354053,NULL,NULL),(201522222,NULL,NULL),(201577777,NULL,NULL);
/*!40000 ALTER TABLE `student_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `tags_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Thesis'),(4,'Books'),(5,'America'),(6,'picture'),(7,'photograph'),(12,'Fiction'),(13,'Literature'),(15,'animals'),(19,'Movies'),(22,'Math'),(23,'Academics'),(24,'Computer Science'),(26,'Food Engineering'),(28,'research'),(29,'1');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thesis`
--

DROP TABLE IF EXISTS `thesis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thesis` (
  `thesis_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `course_id` int(11) NOT NULL,
  `school_id` int(11) NOT NULL,
  PRIMARY KEY (`thesis_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thesis`
--

LOCK TABLES `thesis` WRITE;
/*!40000 ALTER TABLE `thesis` DISABLE KEYS */;
INSERT INTO `thesis` VALUES (12,'TH-00001',2,1),(13,'TH-00002',2,1),(14,'TH-00003',2,1),(15,'TH-00004',6,1),(16,'TH-00005',7,1),(17,'TH-00010',2,1),(18,'TH-00009',2,1),(19,'TH-00006',2,1),(20,'TH-00008',2,1),(23,'TH-02',10,1),(24,'TH-01',11,1);
/*!40000 ALTER TABLE `thesis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `institution` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` enum('confirmed','unconfirmed') COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `type` enum('user','staff','admin') COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('200900023','syra@gmail.com','$2y$10$J820L8DqXxhDGikdHfdxNuwm8RcbvNk0UQ5Ts5rmKw9bsECYBKulW','Syra Francene','Jinon','Jagunap','University of the Philippines Visayas','confirmed','opaQDkQ5KvqSxSGmgBMbGMXVYcSxyKz366OcR01z16h2gw48tIWYOgE1W6SH','2017-05-21 13:04:23','2017-05-21 13:22:52','staff'),('200912345','maikael@gmail.com','$2y$10$8DV5JITsGsCawiWsuzd4WuFCZ/tVyx.wQ/hMrn3ROomxJ8ZQ1qQqi','maikael jan','s.','sarozza','isatu','unconfirmed',NULL,'2017-05-21 13:05:06','2017-05-21 13:05:06','user'),('201311111','mikko@gmail.com','$2y$10$SR.0cYNyQMcdtxttqk95kunRNkdECUXKUzUOO6OAgSu5SgXMIpcFm','Jose Mikko','F.','Garin','University of San Augustin','unconfirmed',NULL,'2017-05-20 08:03:34','2017-05-20 08:51:03','user'),('201322222','christian@gmail.com','$2y$10$81oUpG4KmGRfDbZhI645MOMkHC6BwMzX770hKV1bBexBEvrLnMJdS','Christian Angelo','G.','Cabangbang','University of San Augustin','unconfirmed',NULL,'2017-05-20 08:11:12','2017-05-20 08:51:10','user'),('201354053','csaposaga@up.edu.ph','$2y$10$Q8aqgJqmPfjSr6CrcNh/AOYuRmXHvyrLCrsU3jqu7irohx4wqnzAC','Charles Francis','Sarroza','Aposaga','University of the Philippines Visayas','confirmed','GNLaghYuvwPXHGTrNmlvs5qdIDt6i40w7RRqGktFPxEuo3Oj3WBVh0Wj9Xot','2017-03-02 01:22:33','2017-05-22 01:05:24','admin'),('201504519','nicolejayesolano@yahoo.com','$2y$10$gVTOYczyrxf7Od6OBts5o.5UjivKiV9UiW2uyDdqNyLSTDZvR3eGK','Nicole','J.','Solano','University of the Philippines Visayas','confirmed','6FGLbYPXjxjJPY3euKoU7WENmF71VmwYRHIF3bGfXSvnOeIKTFCFVIxFGIbb','2017-05-08 05:02:50','2017-05-23 03:43:09','user'),('201511111','franciene@gmail.com','$2y$10$AdJgVh6egzunhxnXGqUKaOtYrXOqp16YcCqrduUEwNNoyRjKB0fJW','Franciene Jeen','Sarroza','Aposaga','West Visayas State University','confirmed',NULL,'2017-05-20 08:00:21','2017-05-20 10:36:04','user'),('201522222','newt@hogwarts.com','$2y$10$6eLqoRdtiG1CItBK32uh3OiAcPej2Bl2JLBeM6IUwmN6Rh1z6Pbcm','Newt','S.','Scamander','University of the Philippines Visayas','confirmed','ISlMBHuSgVJ1jAbqhcNFFDcU776kCoNVZHk8F3yFbmG89Ox73vp3gIx8ss8c','2017-05-21 08:44:11','2017-05-21 09:12:58','user'),('201533333','jason@gmail.com','$2y$10$zlCHVa.mI7HRe0/NW/k2D.N2bW4s8hJteC5zEcdw4FJRf5fC6df82','Jason','Deloy','Bajade','University of the Philippines Visayas','confirmed',NULL,'2017-05-21 06:12:44','2017-05-21 06:12:44','staff'),('201544444','melje@gmail.com','$2y$10$v1omDykRC4HOA3yTUd7UH.LxxMn7HN1NPVnnbCEoOi9PlpgfkMGta','Melje','Sarroza','Belvis','far eastern university','confirmed','ubYYNeUwP90dMdMmURjiXvZlb81RL29PsW7fpHU2zPLRxIBGZrcan8k86Hdt','2017-05-21 06:13:22','2017-05-21 09:17:00','user'),('201712345','jess@gmail.com','$2y$10$G6tHYI/XuRQRknDhKKdIY.oYHoWGk71poT47aWK2NZD9SfG3gvb7y','jess','v.','valderrrama','isatu','confirmed',NULL,'2017-05-22 01:06:53','2017-05-22 01:17:10','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venacular_names`
--

DROP TABLE IF EXISTS `venacular_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `venacular_names` (
  `venacular_name_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `venacular_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`venacular_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venacular_names`
--

LOCK TABLES `venacular_names` WRITE;
/*!40000 ALTER TABLE `venacular_names` DISABLE KEYS */;
INSERT INTO `venacular_names` VALUES (12,'Arado'),(13,'Karas'),(14,'Budiong 2'),(15,'Budiong 1'),(16,'Kulintang'),(17,'Gabbang'),(18,'net'),(19,'asdf');
/*!40000 ALTER TABLE `venacular_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `view_transactions`
--

DROP TABLE IF EXISTS `view_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `view_transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `view_transactions`
--

LOCK TABLES `view_transactions` WRITE;
/*!40000 ALTER TABLE `view_transactions` DISABLE KEYS */;
INSERT INTO `view_transactions` VALUES (7,'BK-01120','201504519','2017-05-22'),(8,'BK-01120','201504519','2017-05-22'),(9,'BK-01120','201504519','2017-05-22'),(10,'BK-01120','201504519','2017-05-23'),(11,'BK-01120','201712345','2017-05-23'),(12,'BK-01214','201712345','2017-05-23'),(13,'CD-00006','201712345','2017-05-23'),(14,'CD-00020','201712345','2017-05-23'),(15,'CD-00006','201712345','2017-05-23'),(16,'BK-01584','201712345','2017-05-23'),(17,'TH-00005','201712345','2017-05-23'),(18,'R-01','201712345','2017-05-23'),(19,'TH-00001','201712345','2017-05-23'),(20,'R-01','201712345','2017-05-23'),(21,'PHOTO-05','201712345','2017-05-23'),(22,'PHOTO-05','201712345','2017-05-23'),(23,'PHOTO-05','201712345','2017-05-23');
/*!40000 ALTER TABLE `view_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `written`
--

DROP TABLE IF EXISTS `written`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `written` (
  `written_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `acqNumber` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `author_id` int(11) NOT NULL,
  PRIMARY KEY (`written_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `written`
--

LOCK TABLES `written` WRITE;
/*!40000 ALTER TABLE `written` DISABLE KEYS */;
INSERT INTO `written` VALUES (12,'WF-SR-0001',12),(15,'WF-SR-0003',12),(21,'WF-SR-0005',17),(22,'WF-SR-0009',17),(23,'WF-SR-0009',18),(24,'BK-01226',19),(30,'TH-00001',25),(31,'BK-01210',26),(32,'BK-01584',27),(33,'BK-01745',28),(34,'TH-00002',29),(35,'TH-00003',30),(36,'TH-00004',31),(37,'TH-00005',32),(38,'TH-00010',33),(39,'TH-00009',34),(40,'TH-00006',35),(41,'TH-00008',36),(42,'BK-01214',26),(43,'MCN-BK-0001',37),(44,'MCN-BK-0014',38),(49,'BK-02',43),(50,'BK-02',44),(53,'PHOTO-02',47),(54,'PHOTO-02',48),(60,'BK-01120',54),(63,'PP-1',57),(64,'PP-1',58),(66,'TH-02',60),(67,'TH-01',61),(70,'R-01',64),(71,'R-01',65);
/*!40000 ALTER TABLE `written` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-23 21:31:15
