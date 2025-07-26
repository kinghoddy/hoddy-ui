import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";

const useAppState = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      setIsActive(nextAppState === "active");
    };

    let subscription: any;
    let blurSub: any;
    let focusSub: any;

    if (Platform.OS === "android") {
      blurSub = AppState.addEventListener("blur", () =>
        handleAppStateChange("inactive")
      );
      focusSub = AppState.addEventListener("focus", () =>
        handleAppStateChange("active")
      );
    } else {
      subscription = AppState.addEventListener("change", handleAppStateChange);
    }

    return () => {
      subscription?.remove();
      blurSub?.remove();
      focusSub?.remove();
    };
  }, []);

  return { isActive };
};

export default useAppState;
