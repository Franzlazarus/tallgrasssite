CREATE TABLE `gig_subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` text NOT NULL,
	`consent` text NOT NULL,
	`unsubscribe_token` text NOT NULL,
	`unsubscribed_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `gig_subscribers_email_unique` ON `gig_subscribers` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `gig_subscribers_unsubscribe_token_unique` ON `gig_subscribers` (`unsubscribe_token`);--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`json` text NOT NULL,
	`previous_json` text,
	`revision` integer NOT NULL,
	`updated_at` text NOT NULL,
	`updated_by` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `interests` ADD `answers` text;