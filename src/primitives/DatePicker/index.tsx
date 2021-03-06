import React from "react";
import { animated } from "react-spring";
import { provideRef, useEffectSkipFirst } from "@worksolutions/react-utils";

import { width } from "../../styles";

import MaskedInput from "../Input/MaskedInput";
import { InputInterface } from "../Input/Input";
import { usePopper } from "../Popper/usePopper";
import Wrapper from "../Wrapper";

import HandleClickOutside from "../HandleClickOutside";
import { useVisibilityAnimation } from "../Popper/useVisibilityAnimation";

import { useInnerValueChange } from "./useInnerValueChange";
import Calendar from "./Calendar";
import { zIndex_popup } from "../../constants/zIndexes";
import { configByMode, DatePickerMode } from "./config";

export interface DatePickerInterface extends Omit<InputInterface, "value" | "onChange"> {
  initialValue?: string | null;
  allowEmpty?: boolean;
  mode?: DatePickerMode;
  min?: string;
  max?: string;
  hasCurrentDayButton?: boolean;
  onChange: (value: string | null) => void;
}

const maskCharacter = "_";

function DatePicker({
  initialValue,
  mode = DatePickerMode.DATE,
  allowEmpty = true,
  min: minProp,
  max: maxProp,
  onChange,
  tip,
  error: errorProp,
  size,
  placeholder,
  outerStyles,
  hasCurrentDayButton,
}: DatePickerInterface) {
  const { placement, opened, open, close, initPopper } = usePopper({ placement: "bottom-start" });
  const { style } = useVisibilityAnimation(opened);

  const config = configByMode[mode];

  const [inputValue, setInputValue] = React.useState(() => initialValue || "");

  useEffectSkipFirst(() => {
    setInputValue(initialValue || "");
  }, [initialValue]);

  const [lastValidValue, setLastValidValue] = React.useState(() => inputValue || null);

  const [error, setError] = React.useState(false);

  const { min, max } = useInnerValueChange(inputValue, allowEmpty, {
    maskCharacter,
    config,
    min: minProp,
    max: maxProp,
    onChange: (value) => {
      setLastValidValue(value);
      onChange(value);
    },
    setError,
  });

  function inputRef(input: HTMLInputElement | null) {
    if (!input) return;
    initPopper("parent")(input);
    input.addEventListener("focus", open);
  }

  function inputOuterRef(element: HTMLElement | null) {
    if (!element) return;
    element.addEventListener("click", open);
  }

  return (
    <HandleClickOutside enabled={opened} onClickOutside={close}>
      {(ref) => (
        <MaskedInput
          size={size}
          outerRef={provideRef(ref, inputOuterRef)}
          ref={inputRef}
          error={error || errorProp}
          tip={tip}
          value={inputValue}
          mask={config.mask}
          guide
          maskCharacter={maskCharacter}
          placeholder={placeholder || config.placeholder}
          outerStyles={[width(config.width), outerStyles]}
          iconRight="calendar"
          onChange={setInputValue}
        >
          <>
            {opened && (
              <Wrapper as={animated.div} style={style} styles={zIndex_popup} ref={initPopper("child")}>
                <Calendar
                  min={min}
                  max={max}
                  value={lastValidValue}
                  placement={placement}
                  momentFormat={config.momentFormat}
                  hasCurrentDayButton={hasCurrentDayButton}
                  onChange={setInputValue}
                />
              </Wrapper>
            )}
          </>
        </MaskedInput>
      )}
    </HandleClickOutside>
  );
}

export default React.memo(DatePicker);

export { DatePickerMode } from "./config";
