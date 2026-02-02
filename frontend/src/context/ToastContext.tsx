import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";

export type ToastMessage = {
  id: string;
  text: string;
};

type ToastContextValue = {
  showToast: (text: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback((text: string) => {
    const id = crypto.randomUUID();
    setMessages((prev) => [...prev, { id, text }]);
    window.setTimeout(() => {
      setMessages((prev) => prev.filter((message) => message.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-md border border-border-color bg-bg-secondary/90 px-4 py-2 text-sm text-text-primary shadow-lg"
          >
            {message.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
