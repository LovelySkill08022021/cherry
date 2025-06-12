ALTER TABLE `prerequisites` RENAME COLUMN `prerequisite_subject_id` TO `prerequisite`;--> statement-breakpoint
ALTER TABLE `prerequisites` ADD `curriculum_id` bigint unsigned NOT NULL;