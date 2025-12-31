import { Alert, Snackbar } from "@mui/material";
import { createContext, useCallback, useContext, useState } from "react";

// define the context
const ToastContext = createContext();

// create a custom hok to use the context
export const useToast = ()=>{
  return useContext(ToastContext);
}

// create Toast provider
export const ToastProvider = ({children}) =>{
  const [toast, setToast] = useState({open: false, message:'', severity:'info'});

  // useCallback: whenever "setToast" runs then toastprovider rerenders. "showToast" reference stays the same if useCallback is used.
  // If we don't use usecallback then whenever the provider rerenders then new reference of the function will be created and Context value becomes a new object.
  // Because context value changed: ALL components using useToast() re-render including Login, Signup Even if they didn’t trigger the toast and they don’t care about toast state.

  const showToast = useCallback((message, severity = 'info', duration = 3000)=>{
    setToast({ open: true, message, severity, duration });
  }, []); // empty dependency: it will be recreated only when components mounts first time not on any render

  const handleClose = ()=> setToast({...toast, open: false});

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}