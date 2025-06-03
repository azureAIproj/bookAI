import { createContext, useContext, useState } from "react";

type UserSelection = {
  readingLevel: string | null;
  emotion: string | null;
  intent: string | null;
  setSelection: (
    key: keyof Omit<UserSelection, "setSelection">,
    value: string
  ) => void;
};

const UserSelectionContext = createContext<UserSelection | undefined>(
  undefined
);

export const UserSelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [readingLevel, setReadingLevel] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  const setSelection = (
    key: keyof Omit<UserSelection, "setSelection">,
    value: string
  ) => {
    if (key === "readingLevel") setReadingLevel(value);
    if (key === "emotion") setEmotion(value);
    if (key === "intent") setIntent(value);
  };

  return (
    <UserSelectionContext.Provider
      value={{ readingLevel, emotion, intent, setSelection }}
    >
      {children}
    </UserSelectionContext.Provider>
  );
};

export const useUserSelection = () => {
  const context = useContext(UserSelectionContext);
  if (!context)
    throw new Error(
      "useUserSelection must be used within UserSelectionProvider"
    );
  return context;
};
