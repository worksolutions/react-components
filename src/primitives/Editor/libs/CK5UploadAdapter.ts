import { EditorInterface } from "../index";

export class CK5UploadAdapter {
  constructor(private loader: any, private uploader: EditorInterface["uploader"]) {}

  upload() {
    return this.loader.file.then(this.uploader).then(({ path }: any) => ({ default: path }));
  }

  abort() {
    if (!this.loader.file) return;
  }
}
