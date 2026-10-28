CREATE TABLE `interests` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`ep_quantity` integer DEFAULT 0 NOT NULL,
	`ep_max_eur_incl_shipping` integer,
	`shirt_quantity` integer DEFAULT 0 NOT NULL,
	`shirt_size` text,
	`shirt_max_eur_incl_shipping` integer,
	`notes` text,
	`country` text DEFAULT 'NL' NOT NULL,
	`notice_version` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `interests_email_unique` ON `interests` (`email`);