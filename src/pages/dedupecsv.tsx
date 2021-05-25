import * as React from "react";
import { NextSeo } from "next-seo";
import csvtojson from "csvtojson";
import { jsonToCsv } from "~/lib/onetabcsv";
import { v4 as uuid } from "uuid";

const TITLE = "Dedupe CSV";
const DESCRIPTION = "Deduplicate two CSV files";

type Json = Record<string, string>;
interface State {
  first: string;
  isFirstValid: boolean;
  firstParsed: Json[];
  second: string;
  isSecondValid: boolean;
  secondParsed: Json[];
  commonKeys: string[];
  dedupeKey: string;
  dedupedCsv: string;
  exportId: string;
}
export default function DedupeCsvPage(): JSX.Element {
  const [state, setState] = React.useState<State>({
    first: "",
    isFirstValid: undefined,
    firstParsed: undefined,
    second: "",
    isSecondValid: undefined,
    secondParsed: undefined,
    commonKeys: [],
    dedupeKey: undefined,
    dedupedCsv: undefined,
    exportId: undefined,
  });
  const firstRef = React.useRef<HTMLTextAreaElement>();
  const secondRef = React.useRef<HTMLTextAreaElement>();
  const finalRef = React.useRef<HTMLTextAreaElement>();

  React.useEffect(() => {
    (async () => {
      try {
        const firstParsed = await csvtojson().fromString(state.first);
        setState((prev) => ({ ...prev, isFirstValid: true }));
        try {
          const secondParsed = await csvtojson().fromString(state.second);
          const commonKeys = Object.keys(firstParsed[0]).filter(
            {}.hasOwnProperty.bind(secondParsed[0])
          );
          setState((prev) => ({
            ...prev,
            firstParsed: firstParsed,
            isSecondValid: true,
            secondParsed: secondParsed,
            commonKeys: commonKeys,
            dedupeKey: commonKeys[0],
          }));
        } catch (err) {}
      } catch (err) {}
    })();
  }, [state.first, state.second]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const merged = [...state.firstParsed, ...state.secondParsed];
    const deduped = {};
    for (const obj of merged) {
      const dedupeKeyValue = obj[state.dedupeKey];
      if (!deduped[dedupeKeyValue]) deduped[dedupeKeyValue] = obj;
    }
    setState((prev) => ({
      ...prev,
      dedupedCsv: jsonToCsv(Object.values(deduped)),
      exportId: uuid(),
    }));
  };

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
        }}
      />
      <style jsx scoped>
        {`
          .gradient {
            background-image: url("/static/dedupecsv/mesh.png");
          }
        `}
      </style>
      <div className="flex flex-col items-center justify-center w-screen h-screen gap-12 lg:p-12 gradient">
        <h1 className="text-3xl font-bold">Dedupe CSV</h1>
        <div className="flex items-center justify-center w-4/5 gap-6">
          {state.commonKeys.length ? (
            <>
              <label>Select key to use for deduplication</label>
              <select
                className="px-3 py-1 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                onChange={(e) => {
                  setState((prev) => ({ ...prev, dedupeKey: e.target.value }));
                }}
              >
                {state.commonKeys.map((key) => {
                  return (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <span>Paste both CSV files to get options.</span>
          )}
        </div>
        <div className="flex items-center justify-between w-4/5 h-full gap-16">
          <textarea
            className="w-full h-full px-2 py-2 transition border border-gray-400 rounded resize-none focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent"
            placeholder="Place original CSV."
            ref={firstRef}
            value={state.first}
            onChange={(e) =>
              setState((prev) => ({ ...prev, first: e.target.value }))
            }
          />
          <textarea
            className="w-full h-full px-2 py-2 transition border border-gray-400 rounded resize-none focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent"
            placeholder="Place new CSV."
            ref={secondRef}
            value={state.second}
            onChange={(e) =>
              setState((prev) => ({ ...prev, second: e.target.value }))
            }
          />
        </div>
        <button
          type="button"
          className="py-2 font-bold text-white bg-blue-500 rounded-md shadow-md w-36 focus:outline-none"
          onClick={onClick}
        >
          Dedupe CSV
        </button>
        {state.dedupedCsv && (
          <>
            <textarea
              className="w-[40%] h-full px-2 py-2 transition border border-gray-400 rounded resize-none focus:ring-2 focus:ring-black focus:outline-none focus:border-transparent"
              ref={finalRef}
              value={state.dedupedCsv}
              onSelect={() => finalRef.current.select()}
              onChange={() => {}}
            />

            <a
              href={URL.createObjectURL(
                new Blob([state.dedupedCsv], { type: "text/plain" })
              )}
              className="flex items-center gap-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-md shadow-md focus:outline-none"
              download={`deduped-${state.exportId}.csv`}
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
          </>
        )}
      </div>
    </>
  );
}
