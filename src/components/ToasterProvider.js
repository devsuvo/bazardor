"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3500,
        style: { fontFamily: "inherit", fontSize: "14px" },
        success: { iconTheme: { primary: "#05893e", secondary: "#fff" } },
        error: { iconTheme: { primary: "#d03739", secondary: "#fff" } },
      }}
    />
  );
}