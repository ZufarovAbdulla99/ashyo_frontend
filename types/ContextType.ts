export interface ContextType {
    showCategory: boolean;
    setShowCategory: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    setToken: (newToken: string | null) => void;  // Oddiy funksiya tipiga o'zgartirish
  }