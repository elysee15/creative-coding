import { FastAverageColor } from "fast-average-color";
import { useCallback, useEffect, useState } from "react";

const fac = new FastAverageColor();

export default function useDominantColor({ src }: { src?: string }) {
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      getColorAsync(src).then((color) => {
        setDominantColor(color.hex);
      });
    }

    return () => {
      fac.destroy();
    };
  }, [src]);

  const getColorAsync = useCallback(async (src: string) => {
    const color = await fac.getColorAsync(src);
    return color;
  }, []);

  return {
    getDominantColor: getColorAsync,
    dominantColor,
  };
}
