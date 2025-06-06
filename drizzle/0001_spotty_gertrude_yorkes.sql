CREATE TABLE `prerequisites` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`subject_id` bigint unsigned NOT NULL,
	`prerequisite_subject_id` bigint unsigned NOT NULL,
	CONSTRAINT `prerequisites_id` PRIMARY KEY(`id`)
);
