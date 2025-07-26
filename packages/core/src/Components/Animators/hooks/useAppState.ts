import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";

const useAppState = () => {
  const [isActive, setIsActive] = useState(AppState.currentState === "active");

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      setIsActive(nextAppState === "active");
    };

    let subscription: any;

    if (Platform.OS === "android") {
      // For Android, use the change event which covers both blur and focus
      subscription = AppState.addEventListener("change", handleAppStateChange);
    } else {
      // For iOS, use the change event as well
      subscription = AppState.addEventListener("change", handleAppStateChange);
    }

    return () => {
      subscription?.remove();
    };
  }, []);

  return { isActive };
};

export default useAppState;
