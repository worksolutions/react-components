import React, { useState } from "react";
import { Story } from "@storybook/react/types-6-0";

import {
  backgroundColor,
  DatePickerInterface,
  Editor,
  EditorRefInterface,
  flex,
  fullWidth,
  jc,
  minHeight,
  Wrapper,
} from "index";
import { editorStyles } from "../editorStyles";

export default {
  title: "Editor",
  component: Editor,
};

export function insertDivElementBeforeEditorToolbarSeparator() {
  const elements = document.getElementsByClassName("ck-toolbar__separator");
  const lastElement = elements[elements.length - 1] as HTMLElement;
  const div = document.createElement("div");
  lastElement.parentNode!.insertBefore(div, lastElement);
  return div;
}

const Template: Story<DatePickerInterface> = (props) => {
  const [value, setValue] = useState("");
  const editorRef = React.useRef<EditorRefInterface>(null!);
  const [lastToolbarSeparator, setLastToolbarSeparator] = React.useState<HTMLElement>();

  function onInit(ref: EditorRefInterface) {
    setLastToolbarSeparator(insertDivElementBeforeEditorToolbarSeparator());
    editorRef.current = ref;
  }

  return (
    <Wrapper
      styles={[fullWidth, minHeight("100%"), backgroundColor("gray-blue/01"), flex, jc("align-center"), editorStyles]}
    >
      <Editor
        initialText={value}
        onChange={setValue}
        uploader={async (file) => {
          console.log(file);
          return "Что-то";
        }}
        onInit={onInit}
      />
    </Wrapper>
  );
};

export const Default = Template.bind({});

Default.args = {};
