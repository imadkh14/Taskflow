import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          gutter={12}
          containerStyle={{
            top: 24,
            right: 24,
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: "white",
              color: "#0f172a",
              padding: "16px 20px",
              borderRadius: "16px",
              boxShadow:
                "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              fontSize: "14px",
              fontWeight: "500",
              maxWidth: "380px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
              style: {
                background: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
                border: "1px solid #a7f3d0",
                color: "#065f46",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
              style: {
                background: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
                border: "1px solid #fecaca",
                color: "#991b1b",
              },
            },
            loading: {
              style: {
                background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                border: "1px solid #e2e8f0",
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
