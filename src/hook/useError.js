"use client";

import { useState, useEffect } from "react";

const useError = () => {
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (error && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, isVisible]);

  const showError = (errorMessage) => {
    setError(errorMessage);
    setIsVisible(true);
  };

  const hideError = () => {
    setIsVisible(false);
  };

  return { error, isVisible, showError, hideError };
};

export default useError;
