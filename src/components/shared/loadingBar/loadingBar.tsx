// components/LoadingBar.tsx
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./loadingBar.css"; // Si quieres personalizar

NProgress.configure({ showSpinner: false });

interface Props {
  isLoading: boolean;
}

const LoadingBar: React.FC<Props> = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null;
};

export default LoadingBar;
