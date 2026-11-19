import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(() => {});

// Toast Notification Helper
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, leaving: false }]);
    setTimeout(() => {
      setToasts((current) => current.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast)));
      setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 300);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none no-print">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-invert px-4 py-3 text-xs font-medium text-invert-fg shadow-lg transition-opacity duration-300"
            style={{ opacity: toast.leaving ? 0 : 1 }}
            role="status"
          >
            <i className="ph-fill ph-check-circle text-base" aria-hidden="true"></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
