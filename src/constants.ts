export const isProd = process.env.NODE_ENV === "production";
export const baseUrl = "https://arnavgosain.com";

export const tagColors = {
  "Framer Motion": "bg-gradient-to-tr from-pink-400 to-purple-600",
  TailwindCSS: "bg-gradient-to-tr from-sky-600 to-teal-400",
  "Next.js": "bg-gradient-to-tr from-gray-500 dark:from-gray-600 to-slate-900",
  NodeJS: "bg-gradient-to-tr from-green-700 to-emerald-500",
  TypeScript: "bg-gradient-to-tr from-blue-900 bg-sky-600",
  GraphQL: "bg-gradient-to-tr from-pink-900 to-pink-700",
  React: "bg-gradient-to-tr from-blue-700 to-sky-500",
  Python: "bg-gradient-to-tr from-orange-600 to-yellow-600",
  Bash: "bg-gradient-to-tr from-blue-600 to-sky-700",
  Redis: "bg-gradient-to-tr from-radix-red-red10 to-radix-red-red9",
  Go: "bg-gradient-to-tr from-radix-teal-teal10 to-radix-teal-teal7",
} as const;
