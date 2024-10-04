"use client";

import React, { useEffect, useState } from "react";
import { UtilContextProvider } from "@/contexts"


const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModal, setIsModal] = useState<boolean>(false)

  const handleReConnect = () => {
    setIsModal(false)
    localStorage.setItem("isIdleProvider", "false")
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const isIdle = localStorage.getItem("isIdle")
      if (isIdle === "true")
        setIsModal(true)
    }, 1000)
    return () => clearInterval(interval)
  }, [])


  return (
    <UtilContextProvider>
      {children}
    </UtilContextProvider>
  );
};

export { Providers };
