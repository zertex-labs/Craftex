import type { LuciaError } from "lucia";

export type LuciaErrorMessage = LuciaError["message"];

export type ValueOf<T extends Record<PropertyKey, unknown>> = T[keyof T];

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = Nullable<Optional<T>>;

export type Arrayable<T> = T | T[];