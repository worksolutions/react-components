import React, { Suspense } from "react";
import { useDebouncedInput } from "@worksolutions/react-utils";

import Spinner from "../Spinner";

import { baseConfig } from "./config";
import { CK5UploadAdapter } from "./libs/CK5UploadAdapter";
import { LazyCKEditor5 } from "./libs/LazyCKEditor5";
import { editorStyles } from "./styles/editorStyles";

export enum EditorToolbarItems {
  DIVIDER = "|",
  HEADING = "heading",
  TEXT_BOLD = "bold",
  TEXT_ITALIC = "italic",
  ALIGNMENT_LEFT = "alignment:left",
  ALIGNMENT_RIGHT = "alignment:right",
  ALIGNMENT_CENTER = "alignment:center",
  ALIGNMENT_JUSTIFY = "alignment:justify",
  LIST_NUMBERS = "numberedList",
  LIST_BULLETS = "bulletedList",
  LINK = "link",
  IMAGE = "imageUpload",
  MEDIA = "mediaEmbed",
  CODE = "code",
  HORIZONTAL_LINE = "horizontalLine",
  TABLE = "insertTable",
  UNDO = "undo",
  REDO = "redo",
}

export interface EditorInterface {
  wrapperStyles?: any;
  initialText: string;
  debounce?: number;
  toolbarItems: EditorToolbarItems[];
  onChange: (text: string) => void;
  uploader: (file: File) => Promise<any>;
  onInit?: (ref: EditorRefInterface) => void;
}

export interface EditorRefInterface {
  insertContent: (text: string, appendNewLines?: boolean) => void;
}

function Editor({
  wrapperStyles,
  initialText,
  toolbarItems,
  uploader,
  debounce = 400,
  onChange,
  onInit,
}: EditorInterface) {
  const { onInputChange, inputValue } = useDebouncedInput(initialText, debounce, onChange);

  const config = React.useMemo(() => ({ ...baseConfig, toolbar: toolbarItems }), [toolbarItems]);

  const init = React.useCallback(
    function (editor: any) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) =>
        new CK5UploadAdapter(loader, uploader);
      editor.model.document.on("change:data", () => onInputChange(editor.getData()));

      if (!onInit) return;

      onInit({
        insertContent: (text, appendNewLines = false) => {
          editor.model.change((writer: any) => {
            const insertPosition = editor.model.document.selection.getFirstPosition();
            if (!appendNewLines) {
              writer.insertText(text, insertPosition);
              return;
            }

            const content = `<p></p>${text}<p></p>`;
            const viewFragment = editor.data.processor.toView(content);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(modelFragment, insertPosition);
          });
        },
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
