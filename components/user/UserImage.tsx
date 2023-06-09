"use client";

import { useUser } from "@/hooks/useUser";
import { UserDetails, Nullable } from "@/types";
import Image from "next/image";

interface UserImageProps {
  details: UserDetails | null;
}

const UserImage: React.FC<UserImageProps> = ({ details }) => {
  if (details?.avatar_url) {
    return (
      <Image
        src={details.avatar_url}
        alt={details.id + "'s avatar"}
        width={48}
        height={48}
        className="rounded-full"
      />
    );
  }

  return (
    <div className="w-12 aspect-square rounded-full bg-neutral-800/75"></div>
  );
};

export default UserImage;
