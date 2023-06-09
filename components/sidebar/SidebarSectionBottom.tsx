import { AiOutlinePlus } from "react-icons/ai";

import { UserContextType } from "@/hooks/useUser";
import Container from "../Container";
import { useAuthModal } from "@/hooks/modals";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export interface SidebarSectionBottomProps {
  userContext: UserContextType;
}

const SidebarSectionBottom: React.FC<SidebarSectionBottomProps> = ({
  userContext: { isLoading: userLoading, user, userDetails },
}) => {
  const authModal = useAuthModal();
  async function handleCreateBtn(): Promise<void> {
    if (!user) {
      return authModal.onOpen();
    }
  }

  return (
    <Container className="h-full  overflow-y-auto">
      <div className="flex justify-between w-full text-gray-400">
        <p className="text-sm">Your Plugins</p>
        <button
          disabled={userLoading}
          onClick={handleCreateBtn}
          className="hover:text-sky-500"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </Container>
  );
};

export default SidebarSectionBottom;
