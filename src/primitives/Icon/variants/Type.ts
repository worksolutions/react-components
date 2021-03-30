import { IconInterface } from "../index";

export type IconVariantProps<ICON> = Omit<IconInterface, "icon"> & {
  icon: ICON;
};
