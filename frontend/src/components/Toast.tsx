import { createContext, useContext, useState } from "react";

export type ToastMessage = {
  id: number;
  message: string;
  type: "success" | "error" | "info";
};

type ToastContextType = {
  showToast: (message: string, type?: "success" | "error" | "info") => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg px-4 py-3 text-sm text-white shadow-lg animate-slide-in ${
              toast.type === "success"
                ? "bg-success"
                : toast.type === "error"
                  ? "bg-error"
                  : "bg-accent-primary"
            }`}
          >
            {toast.type === "success" && "✓ "}
            {toast.type === "error" && "✗ "}
            {toast.type === "info" && "ℹ "}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
