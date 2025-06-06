CREATE TABLE `curriculum_subjects` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`curriculum_id` bigint unsigned NOT NULL,
	`subject_id` bigint unsigned NOT NULL,
	`semester` tinyint NOT NULL,
	`year_level` tinyint NOT NULL,
	CONSTRAINT `curriculum_subjects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `prerequisites` ADD `for_standing` char(20);--> statement-breakpoint
ALTER TABLE `subjects` DROP COLUMN `curriculum_id`;--> statement-breakpoint
ALTER TABLE `subjects` DROP COLUMN `semester`;