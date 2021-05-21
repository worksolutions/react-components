import React from "react";

import Wrapper from "../../Wrapper";

export const LazyCKEditor5 = React.lazy(() => {
  return Promise.all([
    import("!!raw-loader!@worksolutions/ckeditor5/build/ckeditor"),
    // @ts-ignore
    import("@ckeditor/ckeditor5-react"),
    // @ts-ignore
    import("@worksolutions/ckeditor5/build/translations/ru.js"),
  ]).then(([editor, ReactEditor]) => {
    eval(editor.default);
    const { CKSource } = window as any;
    const StyledCKEditor = ReactEditor.CKEditor;
    return {
      default: ({ styles, ...props }: any) => {
        return (
          <Wrapper styles={styles}>
            <StyledCKEditor {...props} editor={CKSource.Editor} />
          </Wrapper>
        );
      },
    };
  });
});
