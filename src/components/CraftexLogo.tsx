import Link from "next/link";
import Image from "next/image";
import { Text } from "@mantine/core";

export default function CraftexLogo() {
  return (
    <Link href="/" shallow={true}>
      <a className="flex items-center">
        <Image
          alt="logo"
          src="https://cdn.craftex.dev/brand/logo"
          height={32}
          width={22}
          className="mr-3 h-6 sm:h-9 select-none pointer-events-none"
        />
      </a>
    </Link>
  );
}
