CREATE TABLE IF NOT EXISTS `jobs` (
  `name` varchar(15) NOT NULL,
  `wage_from` float DEFAULT NULL,
  `wage_to` float DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `jobs` (`name`, `wage_from`, `wage_to`) VALUES
	('ADIUNKT', 2510, 3000),
	('ASYSTENT', 1500, 2100),
	('DOKTORANT', 800, 1000),
	('DYREKTOR', 4280, 5100),
	('PROFESOR', 3000, 4000),
	('SEKRETARKA', 1470, 1650);
	
CREATE TABLE IF NOT EXISTS `teams` (
  `id` int(11) PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `teams` (`id`, `name`, `address`) VALUES
	(10, 'ADMINISTRACJA', 'PIOTROWO 2'),
	(20, 'SYSTEMY ROZPROSZONE', 'PIOTROWO 3A'),
	(30, 'SYSTEMY EKSPERCKIE', 'STRZELECKA 14'),
	(40, 'ALGORYTMY', 'WIENIAWSKIEGO 16'),
	(50, 'BADANIA OPERACYJNE', 'MIELZYNSKIEGO 30');

CREATE TABLE IF NOT EXISTS `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(15) DEFAULT NULL,
  `first_name` varchar(20) DEFAULT NULL,
  `job` varchar(20) DEFAULT NULL,
  `boss_id` int(11) DEFAULT NULL,
  `employeed_from` date DEFAULT NULL,
  `basic_wage` float DEFAULT NULL,
  `additional_wage` float DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_employees_employees` FOREIGN KEY (`boss_id`) REFERENCES `employees` (`id`),
  CONSTRAINT `FK_employees_jobs` FOREIGN KEY(`job`) REFERENCES `jobs` (`name`),
  CONSTRAINT `FK_employees_teams` FOREIGN KEY (`team_id`) REFERENCES `teams` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8;

INSERT INTO `employees` (`id`, `last_name`, `first_name`, `job`, `boss_id`, `employeed_from`, `basic_wage`, `additional_wage`, `team_id`) VALUES
	(100, 'Marecki', 'Jan', 'DYREKTOR', NULL, '1968-01-01', 4730, 980.5, 10),
	(110, 'Janicki', 'Karol', 'PROFESOR', 100, '1973-05-01', 3350, 610, 40),
	(120, 'Nowicki', 'Pawel', 'PROFESOR', 100, '1977-01-09', 3070, NULL, 30),
	(130, 'Nowak', 'Piotr', 'PROFESOR', 100, '1968-07-01', 3960, NULL, 20),
	(140, 'Kowalski', 'Krzysztof', 'PROFESOR', 130, '1975-09-15', 3230, 805, 20),
	(150, 'Grzybowska', 'Maria', 'ADIUNKT', 130, '1977-09-01', 2845.5, NULL, 20),
	(160, 'Krakowska', 'Joanna', 'SEKRETARKA', 130, '1985-03-01', 1590, NULL, 20),
	(170, 'Opolski', 'Roman', 'ASYSTENT', 130, '1992-10-01', 1839.7, 480.5, 20),
	(180, 'Makowski', 'Marek', 'ADIUNKT', 100, '1985-02-20', 2610.2, NULL, 10),
	(190, 'Kotarski', 'Konrad', 'ASYSTENT', 140, '1993-09-01', 1971, NULL, 20),
	(200, 'Przywarek', 'Leon', 'DOKTORANT', 140, '1944-07-15', 900, NULL, 30),
	(210, 'Kotlarczyk', 'Stefan', 'DOKTORANT', 130, '1993-10-15', 900, 570.6, 30);
