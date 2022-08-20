import { DirectionContext } from "@components/layout/DirectionContext";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { getCookie, setCookies } from "cookies-next";
import { useEffect, useState } from "react";
import { rtlCache } from "rtl-cache";
import { CustomColors as colors } from "../config/mantine";

const MantineLayer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    setColorScheme((getCookie("color-scheme") as ColorScheme) ?? "dark");
  }, []);

  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  };

  const toggleDirection = () =>
    setDir((current) => (current === "rtl" ? "ltr" : "rtl"));

  useHotkeys([
    ["mod+J", () => toggleColorScheme()],
    ["mod + shift + L", () => toggleDirection()],
  ]);

  return (
    <DirectionContext.Provider value={{ dir, toggleDirection }}>
      <div dir={dir}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              dir,
              colorScheme,
              colors: {
                ...colors,
              },
              primaryColor: "brand",
            }}
            emotionCache={dir === "rtl" ? rtlCache : undefined}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>{children}</NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
    </DirectionContext.Provider>
  );
};

export default MantineLayer;
