import React, { Suspense } from "react";
import { useDebouncedInput } from "@worksolutions/react-utils";

import Spinner from "../Spinner";

import { AvailableHeadingOptions, getBaseConfig } from "./config";
import { LazyCKEditor5 } from "./libs/LazyCKEditor5";
import { editorStyles } from "./styles/editorStyles";
import { insertContentFabric, registerKeyboardShortcutFabric } from "./libs/apiBuilders";
import { registerSystemPlugins } from "./libs/initializer";

export enum EditorToolbarItems {
  DIVIDER = "|",
  HEADING = "heading",
  TEXT_BOLD = "bold",
  TEXT_ITALIC = "italic",
  TEXT_UNDERLINE = "underline",
  TEXT_STRIKETHROUGH = "strikethrough",
  TEXT_SUBSCRIPT = "subscript",
  TEXT_SUPERSCRIPT = "superscript",
  ALIGNMENT_LEFT = "alignment:left",
  ALIGNMENT_RIGHT = "alignment:right",
  ALIGNMENT_CENTER = "alignment:center",
  ALIGNMENT_JUSTIFY = "alignment:justify",
  LIST_NUMBERS = "numberedList",
  LIST_BULLETS = "bulletedList",
  LINK = "link",
  IMAGE_INSERT = "imageinsert",
  IMAGE_STYLE_FULL = "imagestyle:full",
  IMAGE_STYLE_ALIGN_LEFT = "imagestyle:alignleft",
  IMAGE_STYLE_ALIGN_RIGHT = "imagestyle:alignright",
  MEDIA = "mediaEmbed",
  CODE = "code",
  CODE_BLOCK = "codeblock",
  HORIZONTAL_LINE = "horizontalLine",
  TABLE = "insertTable",
  BLOCKQUOTE = "blockquote",
  INDENT = "indent",
  OUTDENT = "outdent",
  REMOVE_FORMAT = "removeformat",
  UNDO = "undo",
  REDO = "redo",
}

export interface EditorInterface {
  wrapperStyles?: any;
  initialText: string;
  debounce?: number;
  toolbarItems: EditorToolbarItems[];
  headingOptions?: AvailableHeadingOptions[];
  onChange: (text: string) => void;
  uploader: (file: File) => Promise<any>;
  onInit?: (ref: EditorRefInterface) => void;
}

export interface EditorRefInterface {
  insertContent: (text: string, appendNewLines?: boolean) => void;
  registerKeyboardShortcut: (shortcut: string, callback: (stopHandling: () => void) => void) => void;
}

function Editor({
  wrapperStyles,
  initialText,
  toolbarItems,
  headingOptions,
  uploader,
  debounce = 400,
  onChange,
  onInit,
}: EditorInterface) {
  const { onInputChange, inputValue } = useDebouncedInput(initialText, debounce, onChange);

  const config = React.useMemo(
    () => getBaseConfig({ toolbar: toolbarItems, headingOptions: headingOptions || ["paragraph", "h3", "h2"] }),
    [toolbarItems, headingOptions],
  );

  const init = React.useCallback(
    function (editor: any) {
      registerSystemPlugins(editor, { onInputChange, uploader });
      if (!onInit) return;

      onInit({
        insertContent: insertContentFabric(editor),
        registerKeyboardShortcut: registerKeyboardShortcutFabric(editor),
      });
    },
    [onInit, onInputChange, uploader],
  );

  return (
    <Suspense fallback={<Spinner />}>
      <LazyCKEditor5 data={inputValue} config={config} onReady={init} styles={[editorStyles, wrapperStyles]} />
    </Suspense>
  );
}

export default React.memo(Editor);
