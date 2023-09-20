CREATE TABLE `user_key` (
	`id` varchar(255) NOT NULL,
	`user_id` varchar(15) NOT NULL,
	`hashed_password` varchar(255),
	CONSTRAINT `user_key_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plugin` (
	`id` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`latest_version` varchar(32) NOT NULL,
	`publisher_id` varchar(15) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `plugin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `plugin_versions` (
	`id` varchar(64) NOT NULL,
	`plugin_id` varchar(64) NOT NULL,
	`versions` json NOT NULL,
	CONSTRAINT `plugin_versions_id` PRIMARY KEY(`id`)
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
