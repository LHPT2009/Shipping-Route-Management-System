import { useState, useEffect } from "react";

const useLoading = (loadingStatus: boolean) => {
  const [showLoading, setShowLoading] = useState(loadingStatus);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (loadingStatus) {
      setShowLoading(true);

      // Xóa timeout nếu có
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    } else {
      // Đặt timeout để tắt loading sau 1 giây
      const timeout = setTimeout(() => {
        setShowLoading(false);
      }, 1000);

      setLoadingTimeout(timeout);
    }

    // Dọn dẹp timeout khi component bị unmount hoặc khi loadingStatus thay đổi
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingStatus]);

  return showLoading;
};

export default useLoading;