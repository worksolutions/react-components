import { intl } from "../../intl";

export const getBaseConfig = () => ({
  image: {
    styles: ["full", "alignLeft", "alignRight"],
    toolbar: ["imageTextAlternative"],
  },
  link: {
    decorators: {
      addTargetToExternalLinks: {
        mode: "automatic",
        callback: (url: string) => /^(https?:)?\/\//.test(url),
        attributes: {
          target: "_blank",
          rel: "nofollow noopener noreferrer",
        },
      },
    },
  },
  language: "ru",
  table: {
    contentToolbar: ["tableRow", "tableColumn"],
  },
  heading: {
    options: [
      {
        model: "paragraph",
        title: "Paragraph",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading3",
        view: "h3",
        title: intl.text("components.editor.heading") + " h3",
        class: "ck-heading_heading3",
      },
      {
        model: "heading2",
        view: "h2",
        title: intl.text("components.editor.heading") + " h2",
        class: "ck-heading_heading2",
      },
    ],
  },
});
