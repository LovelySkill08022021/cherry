CREATE TABLE `curricula` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `curricula_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `grades` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`student_id` bigint unsigned NOT NULL,
	`subjecct_id` bigint unsigned NOT NULL,
	`value` char(20),
	`no_of_takes` tinyint unsigned NOT NULL DEFAULT 1,
	CONSTRAINT `grades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `students` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`last_name` char(50) NOT NULL,
	`first_name` char(50) NOT NULL,
	`middle_name` char(50),
	`year_level` tinyint NOT NULL DEFAULT 1,
	`section` char(2),
	CONSTRAINT `students_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`curriculum_id` bigint unsigned NOT NULL,
	`code` char(20) NOT NULL,
	`title` varchar(200) NOT NULL,
	CONSTRAINT `subjects_id` PRIMARY KEY(`id`)
);
