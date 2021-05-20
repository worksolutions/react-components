import React from "react";
import { Story } from "@storybook/react/types-6-0";

import { EditorInterface, EditorToolbarItems } from "../index";
import Editor from "../../Editor";
import { border, fullWidth } from "../../../styles";

export default {
  title: "Editor",
  component: Editor.type,
};

const Template: Story<EditorInterface> = (props) => {
  return <Editor {...props} wrapperStyles={[border(1, "gray-blue/02"), fullWidth]} />;
};

export const Default = Template.bind({});

Default.args = {
  toolbarItems: [
    EditorToolbarItems.HEADING,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.TEXT_BOLD,
    EditorToolbarItems.TEXT_ITALIC,
    EditorToolbarItems.TEXT_UNDERLINE,
    EditorToolbarItems.TEXT_STRIKETHROUGH,
    EditorToolbarItems.TEXT_SUBSCRIPT,
    EditorToolbarItems.TEXT_SUPERSCRIPT,
    EditorToolbarItems.BLOCKQUOTE,
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
    EditorToolbarItems.MEDIA,
    EditorToolbarItems.HORIZONTAL_LINE,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.IMAGE_INSERT,
    EditorToolbarItems.IMAGE_STYLE_ALIGN_LEFT,
    EditorToolbarItems.IMAGE_STYLE_ALIGN_RIGHT,
    EditorToolbarItems.IMAGE_STYLE_FULL,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.CODE,
    EditorToolbarItems.CODE_BLOCK,
    EditorToolbarItems.TABLE,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.INDENT,
    EditorToolbarItems.OUTDENT,
    EditorToolbarItems.DIVIDER,
    EditorToolbarItems.REMOVE_FORMAT,
    EditorToolbarItems.UNDO,
    EditorToolbarItems.REDO,
  ],
};
