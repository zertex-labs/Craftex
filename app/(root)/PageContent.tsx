"use client";

import { useAuthModal } from "@/hooks/modals";

interface PageContentProps {}

const PageContent: React.FC<PageContentProps> = () => {
  const authModal = useAuthModal();
  
  return (
    <button onClick={authModal.isOpen ? authModal.onClose : authModal.onOpen}>
      Toggle auth modal
    </button>
  );
};

export default PageContent;
