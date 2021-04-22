import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { useToggle } from "@worksolutions/react-utils";

import LoadingProvider, { LoadingProviderInterface } from "../LoadingProvider";
import LoadingComponent from "../Loading";
import { booleanControl, colorControl, numbersControl, selectControl } from "../../../storybook/storyHelpers";
import Wrapper from "../../../primitives/Wrapper";
import Typography from "../../../primitives/Typography";
import Button from "../../../primitives/Button";
import { SpinnerSize } from "../../../primitives/Spinner";
import { border, flex, flexColumn, height, marginTop, width } from "../../../styles";

export default {
  title: "Loading",
  argTypes: {
    centered: booleanControl(),
    spinnerSize: selectControl(Object.keys(SpinnerSize)),
    spinnerWidth: numbersControl(1, 50, 1),
    spinnerColor: colorControl(),
    spinnerBackplateColor: colorControl(),
    spinnerWithBackplate: booleanControl(),
  },
};

const LoadingTemplate: Story<LoadingProviderInterface> = (props) => {
  const [enabled, toggle] = useToggle(false);

  return (
    <Wrapper>
      <LoadingProvider {...props}>
        {(ref) => (
          <Wrapper ref={ref} styles={[width(400), height(400), border(1, "gray-blue/06"), flex, flexColumn]}>
            <Typography>This is loading provider</Typography>
            <Wrapper
              styles={marginTop(40)}
              as="img"
              src="https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_videoposter_006.jpg"
              width={398}
            />
            {enabled && <LoadingComponent />}
          </Wrapper>
        )}
      </LoadingProvider>
      <Button onClick={toggle} styles={marginTop(8)}>
        Toggle loading
      </Button>
    </Wrapper>
  );
};

export const Loading = LoadingTemplate.bind({});

Loading.args = {
  centered: true,
};
