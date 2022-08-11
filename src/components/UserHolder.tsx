import { SessionUser } from "next-auth";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { OutlineStyled } from "./buttons/outline";

const UsernameHolderStyled = tw(OutlineStyled)`
  rounded-lg
`;

const UserHolderContainer = tw.div`
  relative
  flex
  flex-row
  items-center
  space-x-2
`;

const Separator = tw.span`
  text-gray-medium
  text-lg
  pointer-events-none
  select-none
`;

const UserHolder: React.FC<{ user: SessionUser }> = ({
  user: { image, name, email, id },
}) => {
  return (
    <UserHolderContainer>
      {typeof image === "string" && (
        <Image
          key={id}
          alt={`${name}'s profile picture`}
          src={image}
          width={32}
          height={32}
          className="rounded-full select-none"
        />
      )}
      <Separator>/</Separator>
      <UsernameHolderStyled>{name ?? "who?"}</UsernameHolderStyled>
    </UserHolderContainer>
  );
};

export default UserHolder;
