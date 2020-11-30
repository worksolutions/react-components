import { IconInterface } from "../index";
import { Colors } from "../../../constants/colors";

export type IconVariantProps<ICON> = Omit<IconInterface, "icon" | "color"> & { icon: ICON; color?: Colors };
