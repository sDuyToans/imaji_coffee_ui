import type { ReactElement } from "react";

type IconName =
  | "spotify"
  | "instagram"
  | "telegram"
  | "tiktok"
  | "twitter"
  | "youtube";

interface IconProps {
  name: IconName;
  alt?: string;
  size?: number;
}

export function Icon({ name, alt, size = 24 }: IconProps): ReactElement {
  return (
    <img
      alt={alt ?? `${name}_icon`}
      height={size}
      src={`/icons/${name}.svg`}
      width={size}
    />
  );
}
