import { InternalIcons } from "../Icon";
import { Colors } from "../../constants/colors";

export enum CardStatusIconSize {
  LARGE = "LARGE",
  MEDIUM = "MEDIUM",
  SMALL = "SMALL",
}

export interface CardStatusInterface {
  icon: InternalIcons;
  color: Colors;
  size?: CardStatusIconSize;
  hint?: string;
}

export type CardActionInterface = {
  name: string;
  icon?: InternalIcons;
  iconColor?: Colors;
  loading?: boolean;
  handler: () => Promise<void>;
};

export interface CardInterface {
  id: string | number;
  heading?: string;
  statuses?: CardStatusInterface[];
  actions?: CardActionInterface[];
  title?: string;
  image?: string;
  redirectReference?: string;
}

export interface CardImageConfig {
  aspectRatio: number;
}
