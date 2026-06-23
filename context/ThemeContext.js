import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_THEME_ID,
  getTheme,
  THEMES,
} from "../styles/theme";

const THEME_STORAGE_KEY = "@docuwallet/theme-id";

let currentThemeId = DEFAULT_THEME_ID;
let hasLoadedStoredTheme = false;
let loadPromise = null;
const subscribers = new Set();

const notifySubscribers = () => {
  subscribers.forEach((refresh) => refresh());
};

const loadStoredTheme = async () => {
  if (hasLoadedStoredTheme) {
    return currentThemeId;
  }

  if (!loadPromise) {
    loadPromise = AsyncStorage.getItem(THEME_STORAGE_KEY)
      .then((storedThemeId) => {
        if (storedThemeId && THEMES[storedThemeId]) {
          currentThemeId = storedThemeId;
        }

        return currentThemeId;
      })
      .catch((error) => {
        console.warn("Could not load saved theme:", error);
        return currentThemeId;
      })
      .finally(() => {
        hasLoadedStoredTheme = true;
        notifySubscribers();
      });
  }

  return loadPromise;
};

export function useTheme() {
  const [themeId, setThemeIdState] = useState(currentThemeId);
  const [isThemeReady, setIsThemeReady] = useState(hasLoadedStoredTheme);

  useEffect(() => {
    const refresh = () => {
      setThemeIdState(currentThemeId);
      setIsThemeReady(hasLoadedStoredTheme);
    };

    subscribers.add(refresh);
    refresh();
    loadStoredTheme();

    return () => {
      subscribers.delete(refresh);
    };
  }, []);

  const setThemeId = useCallback(async (nextThemeId) => {
    if (!THEMES[nextThemeId]) {
      return;
    }

    currentThemeId = nextThemeId;
    notifySubscribers();

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextThemeId);
    } catch (error) {
      console.warn("Could not save theme:", error);
    }
  }, []);

  return useMemo(
    () => ({
      themeId,
      theme: getTheme(themeId),
      setThemeId,
      isThemeReady,
    }),
    [isThemeReady, setThemeId, themeId]
  );
}

export function ThemeProvider({ children }) {
  return children;
}
