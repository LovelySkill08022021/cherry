CREATE TABLE `enrollments` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`semester` tinyint NOT NULL,
	`year_level` tinyint NOT NULL,
	CONSTRAINT `enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `grades` ADD `enrollment_id` bigint unsigned NOT NULL;