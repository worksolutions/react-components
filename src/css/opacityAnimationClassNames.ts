import { slideMatchRTGStatusFabric } from "./slideAnimationClassNames";

export const opacityZeroToFullOnEntering = slideMatchRTGStatusFabric({ entering: "opacity-zero-to-full" });

export const opacityFullToZeroOnExiting = slideMatchRTGStatusFabric({ exiting: "opacity-full-to-zero" });
