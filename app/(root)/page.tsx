export const revalidate = 0;

import { Teko } from "next/font/google";
import { twMerge } from "tailwind-merge";
import PageContent from "./PageContent";

const titleFont = Teko({ subsets: ["latin"], weight: "700" });

export default async function Home() {
  return (
    <main>
      <h1 className={twMerge(`text-[4rem] text-sky-400`, titleFont.className)}>
        Craftex
      </h1>
      <PageContent />
    </main>
  );
}
