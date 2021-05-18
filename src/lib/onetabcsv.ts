import { Parser } from "json2csv";

interface URLObject {
  [key: string]: string;
}

export default function parseOnetabExport(
  data: string,
  textColumnTitle: string = "Title",
  urlColumnTitle: string = "URL"
): Array<URLObject> {
  return data
    .split("\n")
    .map((i) =>
      i
        .replace(/\|/, "&&&")
        .split("&&&")
        .map((i) => i.trim())
    )
    .filter((i) => {
      return (
        i[0] &&
        i[1] &&
        !i[0].includes("chrome-extension://") &&
        !i[0].includes("google.")
      );
    })
    .map((i) => {
      if (!i[1]) i[1] = i[0];
      return { [textColumnTitle]: i[1], [urlColumnTitle]: i[0] };
    });
}

export function jsonToCsv(data: Array<URLObject>) {
  const parser = new Parser();
  return parser.parse(data);
}
