import localFont from "next/font/local";

export const obviouslyFont = localFont({
  src: "./ObviouslyVariable.ttf",
  display: "swap",
  variable: "--font-obviously",
});

export const suisseIntlFont = localFont({
  src: [
    {
      path: "./SuisseIntl-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./SuisseIntl-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./SuisseIntl-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./SuisseIntl-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-suisse-intl",
});
