import * as React from "react";
import parseOnetabExport, { jsonToCsv } from "~/lib/onetabcsv";
import { v4 } from "uuid";

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
    <div className="min-h-screen w-screen flex flex-col items-center justify-start py-6">
      <div className="flex flex-col w-4/5 lg:w-2/5 gap-12">
        <h1 className="text-xl font-bold mx-auto">
          OneTab Export To CSV Converter
        </h1>
        <div className="flex flex-col flex-1 bg-white shadow-md items-center w-full rounded p-8 border border-gray-100 gap-4">
          <h1 className="font-bold">Paste OneTab Export</h1>
          <textarea
            onChange={(e) => setOnetabExport(e.target.value)}
            value={onetabExport}
            className="w-full border border-gray-200 rounded shadow min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 py-2"
          />
        </div>
        <div className="justify-center flex w-full">
          <button
            className="bg-white focus:ring focus:ring-green-400 rounded shadow-md border border-gray-200 focus:border-transparent focus:outline-none font-medium px-4 py-2"
            onClick={convert}
          >
            Convert to CSV
          </button>
        </div>
        {csvText.length > 0 && exportId && (
          <div className="flex flex-col flex-1 bg-white shadow-md items-center w-full rounded p-8 border border-gray-100 gap-4">
            <h1 className="font-bold">Copy/Save CSV</h1>
            <textarea
              className="w-full border border-gray-200 rounded shadow min-h-[120px] focus:outline-none focus:ring-2 focus:ring-gray-500 px-2 py-2"
              ref={csvTextareaRef}
              onClick={() => csvTextareaRef.current.select()}
              value={csvText}
            />
            <div className="flex items-center justify-center gap-6 w-full">
              <button
                className="bg-white border-gray-300 border px-2 rounded shadow py-2 flex items-center justify-center gap-2 focus:outline-none focus:ring focus:ring-green-500"
                onClick={() => {
                  csvTextareaRef.current.select();
                  document.execCommand("copy");
                  setCopyText("Copied to clipboard.");
                  setTimeout(() => setCopyText("Copy to clipboard"), 2500);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                className="bg-white border-gray-300 border px-2 rounded shadow py-2 flex items-center justify-center gap-2 focus:outline-none focus:ring focus:ring-green-500"
                download={`onetab-export-${exportId}.csv`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
  );
}
