import { useState, useEffect } from "react";

const useLoading = (loadingStatus: boolean) => {
  const [showLoading, setShowLoading] = useState(loadingStatus);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loadingStatus) {
      setShowLoading(true);

      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    } else {

      const timeout = setTimeout(() => {
        setShowLoading(false);
      }, 1000);

      setLoadingTimeout(timeout);
    }

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingStatus]);

  return showLoading;
};

export default useLoading;