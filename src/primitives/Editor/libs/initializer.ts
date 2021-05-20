import { CK5UploadAdapter } from "./CK5UploadAdapter";

export function registerSystemPlugins(
  editor: any,
  { uploader, onInputChange }: { uploader: (file: File) => Promise<any>; onInputChange: (text: string) => void },
) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => new CK5UploadAdapter(loader, uploader);
  editor.model.document.on("change:data", () => onInputChange(editor.getData()));
}
