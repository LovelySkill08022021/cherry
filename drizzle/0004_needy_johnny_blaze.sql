ALTER TABLE `prerequisites` RENAME COLUMN `for_standing` TO `type`;--> statement-breakpoint
ALTER TABLE `prerequisites` MODIFY COLUMN `type` char(5);