CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plugin` (
	`id` varchar(64) NOT NULL,
	`name` varchar(64) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`phase` varchar(16) NOT NULL,
	`versions` json NOT NULL,
	`socials` json NOT NULL DEFAULT ('{}'),
	`publisher_id` varchar(15) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `plugin_id` PRIMARY KEY(`id`),
	CONSTRAINT `plugin_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` varchar(128) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`active_expires` bigint NOT NULL,
	`idle_expires` bigint NOT NULL,
	CONSTRAINT `user_session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `auth_user` (
	`id` varchar(15) NOT NULL,
	`username` varchar(64) NOT NULL,
	CONSTRAINT `auth_user_id` PRIMARY KEY(`id`)
);
