CREATE TABLE `enrollment_subjects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`enrollment_id` bigint unsigned NOT NULL,
	`subject_id` bigint unsigned NOT NULL,
	CONSTRAINT `enrollment_subjects_id` PRIMARY KEY(`id`)
);
