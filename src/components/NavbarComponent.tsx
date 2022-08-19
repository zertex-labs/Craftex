import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiChevronDown } from "react-icons/bi";
import OutlineButton from "./buttons/OutlineButton";
import ResourceCreateDropdown from "./ResourceCreateDropdown";

function NavbarComponent() {
  const { data: session, status } = useSession();

  return <React.Fragment></React.Fragment>;
}

export default React.memo(NavbarComponent);
