import type React from "react";

interface Props extends Omit<React.ComponentProps<"a">, "className"> {}

export default function DescLink({ ...props }: Props) {
  return (
    <a
      className="font-mono text-cyan-600 hover:bg-cyan-200 hover:text-black transition"
      {...props}
    />
  );
}
