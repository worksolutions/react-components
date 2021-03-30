import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { EditorInterface, EditorToolbarItems } from "../index";
import Editor from "../../Editor";
import { border } from "../../../styles";

export default {
  title: "Editor",
  component: Editor.type,
};

const Template: Story<EditorInterface> = (props) => {
  return <Editor {...props} wrapperStyles={[border(1, "gray-blue/02")]} />;
};

export const Default = Template.bind({});

Default.args = {
  toolbarItems: [
    EditorToolbarItems.HEADING,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.TEXT_BOLD,
    EditorToolbarItems.TEXT_ITALIC,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.ALIGNMENT_LEFT,
    EditorToolbarItems.ALIGNMENT_CENTER,
    EditorToolbarItems.ALIGNMENT_RIGHT,
    EditorToolbarItems.ALIGNMENT_JUSTIFY,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.LIST_NUMBERS,
    EditorToolbarItems.LIST_BULLETS,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.LINK,
    EditorToolbarItems.IMAGE,
    EditorToolbarItems.MEDIA,
    EditorToolbarItems.CODE,
    EditorToolbarItems.HORIZONTAL_LINE,
    EditorToolbarItems.TABLE,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.UNDO,
    EditorToolbarItems.REDO,
  ],
};
