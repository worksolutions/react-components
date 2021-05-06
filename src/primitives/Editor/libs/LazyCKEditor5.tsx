import React from "react";

import Wrapper from "../../Wrapper";

export const LazyCKEditor5 = React.lazy(() => {
  return Promise.all([
    import("!!raw-loader!edelgarat-ckeditor5-custom-build/build/ckeditor"),
    // @ts-ignore
    import("@ckeditor/ckeditor5-react"),
    // @ts-ignore
    import("edelgarat-ckeditor5-custom-build/build/translations/ru"),
  ]).then(([editor, ReactEditor]) => {
    eval(editor.default);
    const { ClassicEditor } = window as any;
    const StyledCKEditor = ReactEditor.CKEditor;
    return {
      default: ({ styles, ...props }: any) => (
        <Wrapper styles={styles}>
          <StyledCKEditor {...props} editor={ClassicEditor} />
        </Wrapper>
      ),
    };
  });
});
