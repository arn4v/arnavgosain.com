import Link from "next/link";
import clsx from "clsx";

export default function CustomLink({ href, children, className }) {
  const linkProps = {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: clsx([className]),
  };
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternal) {
    delete linkProps.href;
    delete linkProps.target;
    delete linkProps.rel;
    return (
      <Link href={href} passHref>
        <a {...linkProps}>{children}</a>
      </Link>
    );
  }

  return <a {...linkProps}>{children}</a>;
}
