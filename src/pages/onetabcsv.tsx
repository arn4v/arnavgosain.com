import { NextSeo } from "next-seo";
import * as React from "react";
import { v4 } from "uuid";
import parseOnetabExport, { jsonToCsv } from "~/lib/onetabcsv";

export default function IndexPage(): JSX.Element {
  const [onetabExport, setOnetabExport] = React.useState<string>("");
  const [csvText, setCsvText] = React.useState<string>("");
  const [exportId, setExportId] = React.useState<string>(null);
  const [copyText, setCopyText] = React.useState<string>("Copy to clipboard.");
  const csvTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  const convert = () => {
    const json = parseOnetabExport(onetabExport);
    const csv = jsonToCsv(json);
    setCsvText(csv);
    setExportId(v4());
  };

  return (
    <>
      <NextSeo
        title="OneTab Export to CSV Converter | Arnav Gosain"
        description="Convert OneTab Export text to CSV for importing into Notion."
        openGraph={{
          title: "OneTab Export to CSV Converter | Arnav Gosain",
          description:
            "Convert OneTab Export text to CSV for importing into Notion.",
        }}
      />
      <div className="flex flex-col items-center justify-start w-screen min-h-screen py-6">
        <div className="flex flex-col w-4/5 gap-12 lg:w-2/5">
          <h1 className="mx-auto text-xl font-bold">
            OneTab Export To CSV Converter
          </h1>
          <div className="flex flex-col items-center flex-1 w-full gap-4 p-8 bg-white border border-gray-100 rounded shadow-md">
            <h1 className="font-bold">Paste OneTab Export</h1>
            <textarea
              onChange={(e) => setOnetabExport(e.target.value)}
              value={onetabExport}
              className="w-full border border-gray-200 rounded shadow min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 py-2"
            />
          </div>
          <div className="flex justify-center w-full">
            <button
              className="px-4 py-2 font-medium bg-white border border-gray-200 rounded shadow-md focus:ring focus:ring-green-400 focus:border-transparent focus:outline-none"
              onClick={convert}
            >
              Convert to CSV
            </button>
          </div>
          {csvText.length > 0 && exportId && (
            <div className="flex flex-col items-center flex-1 w-full gap-4 p-8 bg-white border border-gray-100 rounded shadow-md">
              <h1 className="font-bold">Copy/Save CSV</h1>
              <textarea
                className="w-full border border-gray-200 rounded shadow min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 py-2"
                ref={csvTextareaRef}
                onClick={() => csvTextareaRef.current.select()}
                value={csvText}
              />
              <div className="flex items-center justify-center w-full gap-6">
                <button
                  className="flex items-center justify-center gap-2 px-2 py-2 bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring focus:ring-green-500"
                  onClick={() => {
                    csvTextareaRef.current.select();
                    document.execCommand("copy");
                    setCopyText("Copied to clipboard.");
                    setTimeout(() => setCopyText("Copy to clipboard"), 2500);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>{copyText}</span>
                </button>
                <a
                  href={URL.createObjectURL(
                    new Blob([csvText], { type: "text/plain" })
                  )}
                  className="flex items-center justify-center gap-2 px-2 py-2 bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring focus:ring-green-500"
                  download={`onetab-export-${exportId}.csv`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download CSV File</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
