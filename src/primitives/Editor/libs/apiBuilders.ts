export function insertContentFabric(editor: any) {
  return function (text: string, appendNewLines = false) {
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
  };
}

export function registerKeyboardShortcutFabric(editor: any) {
  return function (shortcut: string, callback: (stopHandling: () => void) => void) {
    editor.keystrokes.set(shortcut, (_: any, stop: () => void) => callback(stop));
  };
}
