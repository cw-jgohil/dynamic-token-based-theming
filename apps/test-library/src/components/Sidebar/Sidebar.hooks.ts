import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const isActivePath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  return { navigateTo, isActivePath, currentPath: location.pathname };
};
