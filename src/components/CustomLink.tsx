import clsx from "clsx";
import NextLink from "next/link";

interface Props {
  href: string;
  className?: string;
  title?: string;
  tabIndex?: number;
  children: React.ReactNode;
}

export default function Link({
  children,
  href,
  className,
  tabIndex,
  title,
}: Props) {
  const linkProps: JSX.IntrinsicElements["a"] = {
    href: href ?? "",
    target: "_blank",
    rel: "noopener noreferrer",
    className: clsx([className]),
    tabIndex,
    ...(title
      ? {
          title: title,
          "aria-label": title,
        }
      : {}),
  };

  const isInternal =
    typeof href === "string" && (href.startsWith("/") || href.startsWith("#"));

  if (isInternal) {
    delete linkProps.href;
    delete linkProps.target;
    delete linkProps.rel;
    return (
      <NextLink href={href} passHref legacyBehavior>
        <a {...linkProps}>{children}</a>
      </NextLink>
    );
  }

  return <a {...linkProps}>{children}</a>;
}

export { Link };
export type { Props as LinkProps };
