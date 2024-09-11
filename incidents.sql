-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2024 at 12:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `incident_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `status` enum('Submitted','Open','Closed') DEFAULT 'Submitted',
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `title`, `description`, `images`, `status`, `user_id`, `created_at`) VALUES
(1, 'Fuga de agua', 'Hay una fuga de agua en el baño del apartamento 5B.', '[\"image1.jpg\",\"image2.jpg\"]', 'Closed', 5, '2024-09-06 22:12:05'),
(3, 'Falla en el ascensor', 'El ascensor se ha detenido entre el piso 3 y 4, las luces están parpadeando.', '[\"image3.jpg\",\"image5.jpg\"]', 'Open', 5, '2024-09-06 22:12:05'),
(5, 'Puerta de acceso principal dañada', 'La puerta de acceso principal no cierra correctamente, la cerradura está visiblemente dañada.', '[\"puerta_danada.jpg\"]', 'Open', 5, '2024-09-06 22:12:05'),
(6, 'Basura acumulada en el área común', 'Los contenedores de basura en el área común están desbordados y hay basura dispersa por el suelo.', '[\"basura_acumulada.jpg\"]', 'Submitted', 11, '2024-09-06 22:12:05'),
(7, 'Ruido excesivo proveniente del apartamento superior', 'Se escuchan ruidos fuertes y constantes desde el apartamento 7A, dificultando el descanso.', '[\"ruido.jpg\"]', 'Open', 11, '2024-09-06 22:12:05'),
(9, 'Lámpara fundida en el pasillo', 'La lámpara del pasillo principal, cerca del ascensor, está fundida.', '[\"lampara.jpg\"]', 'Open', 10, '2024-09-06 22:12:05'),
(10, 'Graffiti en la pared del estacionamiento', 'Hay un graffiti en la pared del estacionamiento subterráneo, cerca de la rampa de acceso.', '[\"graffiti.jpg\"]', 'Submitted', 10, '2024-09-06 22:12:05'),
(11, 'Olor a gas en el sótano', 'Se percibe un fuerte olor a gas en el sótano, cerca de las calderas.', '[\"gas.jpg\"]', 'Open', 10, '2024-09-06 22:12:05'),
(19, 'prueba19', 'prueba19', '\"[\\\"prueba19.jpg\\\"]\"', 'Submitted', 11, '2024-09-09 12:18:02'),
(20, 'pruebamulter', 'pruebamulter', '[\"uploads\\\\1726092203328-934685986.jpg\"]', 'Submitted', 8, '2024-09-11 18:03:23'),
(21, 'pruebamulter2', 'pruebamulter2', '[\"uploads\\\\1726092332373-173823229.jpg\"]', 'Submitted', 8, '2024-09-11 18:05:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
