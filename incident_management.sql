-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2024 at 09:05 PM
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
  `created_at` datetime DEFAULT current_timestamp(),
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `title`, `description`, `images`, `status`, `user_id`, `created_at`, `location`) VALUES
(1, 'Fuga de agua', 'Hay una fuga de agua en el baño del apartamento 5B.', '[\"image1.jpg\",\"image2.jpg\"]', 'Closed', 5, '2024-09-06 22:12:05', NULL),
(3, 'Falla en el ascensor', 'El ascensor se ha detenido entre el piso 3 y 4, las luces están parpadeando.', '[\"image3.jpg\",\"image5.jpg\"]', 'Open', 5, '2024-09-06 22:12:05', NULL),
(5, 'Puerta de acceso principal dañada', 'La puerta de acceso principal no cierra correctamente, la cerradura está visiblemente dañada.', '[\"puerta_danada.jpg\"]', 'Open', 5, '2024-09-06 22:12:05', NULL),
(6, 'Basura acumulada en el área común', 'Los contenedores de basura en el área común están desbordados y hay basura dispersa por el suelo.', '[\"basura_acumulada.jpg\"]', 'Submitted', 11, '2024-09-06 22:12:05', NULL),
(7, 'Ruido excesivo proveniente del apartamento superior', 'Se escuchan ruidos fuertes y constantes desde el apartamento 7A, dificultando el descanso.', '[\"ruido.jpg\"]', 'Open', 11, '2024-09-06 22:12:05', NULL),
(9, 'Lámpara fundida en el pasillo', 'La lámpara del pasillo principal, cerca del ascensor, está fundida.', '[\"lampara.jpg\"]', 'Open', 10, '2024-09-06 22:12:05', NULL),
(10, 'Graffiti en la pared del estacionamiento', 'Hay un graffiti en la pared del estacionamiento subterráneo, cerca de la rampa de acceso.', '[\"graffiti.jpg\"]', 'Submitted', 10, '2024-09-06 22:12:05', NULL),
(11, 'Olor a gas en el sótano', 'Se percibe un fuerte olor a gas en el sótano, cerca de las calderas.', '[\"gas.jpg\"]', 'Open', 10, '2024-09-06 22:12:05', NULL),
(19, 'prueba19', 'prueba19', '\"[\\\"prueba19.jpg\\\"]\"', 'Submitted', 11, '2024-09-09 12:18:02', NULL),
(20, 'pruebamulter', 'pruebamulter', '[\"uploads\\\\1726092203328-934685986.jpg\"]', 'Submitted', 8, '2024-09-11 18:03:23', NULL),
(21, 'pruebamulter2', 'pruebamulter2', '[\"uploads\\\\1726092332373-173823229.jpg\"]', 'Submitted', 8, '2024-09-11 18:05:32', NULL),
(22, 'testing', 'testing', '[\"uploads\\\\1726164396951-205940679.jpeg\"]', 'Submitted', 1, '2024-09-12 14:06:36', 'testing'),
(23, 'testing3', 'testing3', '[\"uploads\\\\1726165062592-118358520.jpg\"]', 'Submitted', 10, '2024-09-12 14:17:42', 'testing3'),
(24, 'testing 4', 'testing 4', '[\"uploads\\\\1726165133658-830284359.jpg\"]', 'Submitted', 10, '2024-09-12 14:18:53', 'testing 4'),
(25, 'testing 5', 'testing 5', '[\"uploads\\\\1726166183333-321524741.jpg\"]', 'Submitted', 10, '2024-09-12 14:36:23', 'testing 5');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('resident','admin') DEFAULT 'resident'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Marvin Lopez', 'marvinlopez@example.com', '$2b$10$kSVaKixkHoWQT3EV7mJMKupuXR1jLGUSKXj/giJlg/8hp4sJIwScK', 'admin'),
(5, 'Mauricio Cardozo', 'mauriciocardozo@example.com', '$2b$10$zol1j0iN4OpbmnQw9tizxOrKCtPwj2tKOkFdLDCJu5R5unvAMF3k.', 'resident'),
(8, 'Harold Carazas', 'haroldcarazas@example.com', '$2b$10$iDXiLR65rYqDCj7SO4fif.l6OKPXsJFFY6fCoOPCvAfP5axAmcWwm', 'admin'),
(9, 'Jorge Sosa', 'jorgesosa@example.com', '$2b$10$/adC1mD5oTc5xYAUZC/FeOl43PXmddPHKQB/6iSjdu.1wd.bCTjoe', 'admin'),
(10, 'Hans Llanos', 'hansllanos@example.com', '$2b$10$aOHv/wAqmH1CpXHM9/dkiuQfsVvKW0RjGa0Tl8RFilW3RfI3IJnDm', 'resident'),
(11, 'Diego Huarsaya', 'diegohuarsaya@example.com', '$2b$10$T/7FkYms6JRfXfSlXwO10u5ZSgqMJ2hV9Bnnn3gTRARd8MYRwSH8u', 'resident');

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
