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
            className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-medium shadow-lg border border-slate-700 transition-all duration-300"
            style={{ opacity: toast.leaving ? 0 : 1 }}
          >
            <i className="ph-fill ph-check-circle text-emerald-400 text-base"></i>
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
