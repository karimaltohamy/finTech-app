import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

export const UserInactivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const appSate = useRef(AppState.currentState);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppSateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppSateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appSate.current.match(/background/)
    ) {
      const startTime = await getData();

      const elapsedTime = Date.now() - startTime;

      if (elapsedTime > 1000 && isSignedIn) {
        router.replace("/(authenticated)/(modals)/lock");
      }
    }

    appSate.current = nextAppState;
  };

  const recordStartTime = async () => {
    const startTime = Date.now();

    try {
      await AsyncStorage.setItem("startTime", startTime.toString());
    } catch (e) {
      // saving error
    }
  };

  const getData: () => any = async () => {
    try {
      const value = (await AsyncStorage.getItem("startTime")) || 0;
      return +value;
    } catch (e) {
      // error reading value
    }
  };

  return <>{children}</>;
};
