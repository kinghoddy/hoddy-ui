import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";

const useAppState = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (Platform.OS === "ios") {
      const handleAppStateChange = (nextAppState: string) => {
        setIsActive(nextAppState === "active");
      };

      const subscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );
      return () => subscription?.remove();
    }
  }, []);

  return { isActive };
};

export default useAppState;
