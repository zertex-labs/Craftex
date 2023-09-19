import { init } from "@paralleldrive/cuid2";

if (!import.meta.env.CUID2_FINGERPRINT) {
  console.error(
    "Please set CUID2_FINGERPRINT in your .env file. This fingerprint will be used to generate CUID2s. All old CUID2s will be invalidated."
  );
  process.exit(1);
}

export const CUID2_LENGTH = 64;

export const createId = init({
  length: CUID2_LENGTH,
  fingerprint: import.meta.env.CUID2_FINGERPRINT,
});

