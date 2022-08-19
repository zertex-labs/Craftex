import Link from "next/link";
import { useEffect, useState } from "react";

const ERROR_MESSAGES: string[] = [
  "Uhh... where we goin'?",
  "Where are we?",
  "Page not found",
  "Found not page",
  "???",
  "Uhhh... this is awkward",
  "These are uncharted waters",
  "Something smells fishy here...",
  "Something's wrong here",
  "Something blew up :/",
  "Whoops! That page doesn't exist",
<<<<<<< HEAD
  "In case you haven't noticed, you've fallen right into my trap",
=======
  "In case you haven't noticed, you've falled right into my trap",
>>>>>>> 6df213832e546174e9cce2fde2c9d8b00b58c3ab
  "Wow! Great page idea, unfortunately it doesn't exist",
  "We don't know the crafting recipe for this page",
];

export default function Custom404() {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(
    () =>
      setErrorMessage(
        ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]!
      ),
    []
  );

  return (
    <div className="md:flex-row md:gap-6 justify-center align-middle flex flex-col items-center w-full h-2/3 gap-4 text-text-dark">
      <h1 className="text-4xl font-bold">404</h1>
      <div className="md:border-r md:w-0 md:h-24 border-b w-48 bg-text-dark"></div>
      <div className="flex flex-col items-center md:block">
        <p className="md:w-96 md:text-left text-2xl w-full text-center">{errorMessage}</p>
        <Link href="/">
          <a className="md:pt-0 text-xs pt-2">Go back?</a>
        </Link>
      </div>
    </div>
  );
}
