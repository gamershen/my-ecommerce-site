-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fullstack
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (4,1,'2025-06-21 12:43:03'),(5,12,'2025-06-28 19:56:20'),(6,13,'2025-06-28 20:06:07'),(7,14,'2025-06-28 20:07:45');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `price_at_add` decimal(10,2) NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  UNIQUE KEY `cart_items_cart_id_product_id` (`cart_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_items_ibfk_7` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_items_ibfk_8` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (2,5,1,4,'2025-06-28 19:56:38','2025-06-28 20:05:47',4990.00),(3,5,2,2,'2025-06-28 19:56:41','2025-06-28 19:56:41',2300.00),(10,7,1,2,'2025-06-29 08:58:04','2025-06-29 08:58:04',4990.00),(19,4,1,1,'2025-07-19 09:43:07','2025-07-19 09:43:07',4990.00);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price_at_purchase` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_10` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `order_items_ibfk_9` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,1,1,4990.00),(2,2,2,2,2300.00),(3,2,1,1,4990.00),(4,3,1,2,4990.00),(5,4,2,3,2300.00),(6,5,1,2,4990.00),(7,5,2,1,2300.00),(8,6,3,1,1499.99),(9,6,4,1,2299.00),(10,7,1,1,4990.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `order_date` datetime NOT NULL,
  `status` enum('pending','completed','cancelled','processing') NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,'2025-06-28 19:55:53','pending',4990.00),(2,1,'2025-06-28 20:13:03','pending',9590.00),(3,1,'2025-06-30 09:26:27','pending',9980.00),(4,1,'2025-07-01 09:26:39','pending',6900.00),(5,1,'2025-07-17 11:22:37','pending',12280.00),(6,1,'2025-07-19 08:39:04','pending',3798.99),(7,1,'2025-07-19 09:40:28','pending',4990.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'טלוויזיה LG 75 אינץ\' 4K','\n        <div class=\"product-details\">\n            <p><strong>מותג:</strong> LG</p>\n            <p><strong>דגם:</strong> 75UT80006LA</p>\n            <p><strong>גודל מסך:</strong> 75 אינץ\'</p>\n            <p><strong>רזולוציה:</strong> 4K UHD (3840x2160)</p>\n            <p><strong>מערכת הפעלה:</strong> webOS עם תמיכה באפליקציות מובילות</p>\n            <p><strong>חיבורים:</strong> 3 כניסות HDMI, 2 כניסות USB, Wi-Fi, Bluetooth</p>\n            <p><strong>שמע:</strong> רמקולים מובנים עם סאונד איכותי</p>\n            <p><strong>תכונות נוספות:</strong> שלט חכם, תמיכה ב-HDR10, שליטה קולית</p>\n            <p class=\"note\">* כולל אחריות יבואן רשמי לשנתיים</p>\n        </div>\n    ',4990.00,'tv.png'),(2,'מקרר','\n        <div class=\"product-details\">\n            <p><strong>מותג:</strong> Midea</p>\n            <p><strong>דגם:</strong> HQ-611RWEN</p>\n            <p><strong>נפח כולל:</strong> 611 ליטר</p>\n            <p><strong>נפח תא קירור:</strong> 397 ליטר</p>\n            <p><strong>נפח תא הקפאה:</strong> 214 ליטר</p>\n            <p><strong>טכנולוגיית קירור:</strong> No-Frost</p>\n            <p><strong>דירוג אנרגטי:</strong> A</p>\n            <p><strong>תכונות נוספות:</strong> מערכת הפשרה אוטומטית, תאורת LED פנימית, מדפי זכוכית נשלפים, תא פירות וירקות עם בקרת לחות</p>\n            <p><strong>מידות (גובה X רוחב X עומק):</strong> <span dir=\"ltr\"> <span dir =\"rtl\"> ס\"מ</span> 77 X 82 X 178 </span></p> <span>\n            <p class=\"note\">* כולל אחריות יבואן רשמי לשנתיים</p>\n        </div>\n        ',2300.00,'fridge.png'),(3,'Lenovo Ideapad 1-15IJL','<div class=\"product-details\">\n        <p><strong>דגם:</strong> Lenovo Ideapad 1-15IJL</p>\n        <p><strong>מעבד:</strong> Intel® Celeron® N4500 עד 2.8GHz</p>\n        <p><strong>מאיץ גרפי:</strong> Intel® UHD Graphics משולב</p>\n        <p><strong>זיכרון:</strong> 8GB DDR4</p>\n        <p><strong>אחסון:</strong> SSD 256GB NVMe</p>\n        <p><strong>מסך:</strong> 15.6&quot; FHD, TN, אנטי-רפלקטיבי</p>\n        <p><strong>מערכת הפעלה:</strong> Windows 11</p>\n        <p><strong>שמע ומצלמה:</strong> רמקולים עם Dolby Audio™, מצלמת 720p עם תריס פרטיות</p>\n        <p><strong>קישוריות:</strong> Wi-Fi 6, Bluetooth 5.2</p>\n        <p><strong>חיבורים:</strong> USB, USB-C, HDMI, קורא כרטיסים</p>\n        <p><strong>סוללה:</strong> 42Wh</p>\n        <p><strong>משקל:</strong> 1.55 ק&quot;ג</p>\n        <p><strong>מידות:</strong> 360.2x236x17.9 מ&quot;מ</p>\n        <p class=\"note\">* כולל אחריות יבואן רשמי לשנה</p>\n    </div>',1499.99,'pc.png'),(4,'Sony PlayStation 5 (PS5)','<div class=\"product-details\">\n        <p><strong>דגם:</strong> Sony PlayStation 5 (PS5)</p>\n        <p><strong>מעבד:</strong> 8-core AMD Zen 2</p>\n        <p><strong>גרפיקה:</strong> AMD RDNA 2, Ray Tracing</p>\n        <p><strong>זיכרון:</strong> 16GB GDDR6</p>\n        <p><strong>אחסון:</strong> SSD 825GB אולטרה מהיר</p>\n        <p><strong>רזולוציה:</strong> עד 8K, 4K 120Hz HDR</p>\n        <p><strong>כונן דיסקים:</strong> Ultra HD Blu-ray</p>\n        <p><strong>שלט:</strong> DualSense אלחוטי עם פידבק הפטי וטריגרים אדפטיביים</p>\n        <p><strong>קישוריות:</strong> Wi-Fi, Bluetooth, USB-C</p>\n        <p><strong>שמע:</strong> Tempest 3D AudioTech</p>\n        <p><strong>מערכת הפעלה:</strong> PlayStation OS</p>\n        <p class=\"note\">* כולל אחריות יבואן רשמי לשנה</p>\n    </div>',2299.00,'ps5.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'libar','libar@gmail.com','123'),(4,'libar','libarviz@gmail.com','123'),(12,'gg','gg@gmail.com','gg'),(13,'gg2','gg2@gmail.com','gg2'),(14,'gg3','gg3@gmail.com','gg3');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-22 18:44:53
