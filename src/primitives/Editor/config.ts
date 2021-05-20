import { intl } from "../../intl";

export type EditorAvailableHeadingOptions = "paragraph" | "h3" | "h2" | "h1";

const makeHeadingHOption = (num: number) => ({
  model: `heading${num}`,
  view: `h${num}`,
  title: intl.text("components.editor.heading") + ` h${num}`,
  class: `ck-heading_heading${num}`,
});

function makeHeadingOption(option: EditorAvailableHeadingOptions) {
  if (option === "paragraph") return { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" };
  return makeHeadingHOption(parseFloat(option.slice(1, 2)));
}

export const getBaseConfig = ({
  headingOptions,
  toolbar,
}: {
  toolbar: string[];
  headingOptions: EditorAvailableHeadingOptions[];
}) => ({
  image: {
    styles: ["full", "alignLeft", "alignRight"],
    toolbar: ["imageTextAlternative"],
  },
  link: {
    decorators: {
      addTargetToExternalLinks: {
        mode: "automatic",
        callback: (url: string) => /^(https?:)?\/\//.test(url),
        attributes: { target: "_blank", rel: "nofollow noopener noreferrer" },
      },
    },
  },
  language: "ru",
  table: { contentToolbar: ["tableRow", "tableColumn"] },
  heading: { options: headingOptions.map(makeHeadingOption) },
  toolbar,
});
