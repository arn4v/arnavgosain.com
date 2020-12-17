import Link from "next/link";
import clsx from "clsx";

/**
 * CustomLink Component - Returns a tag with _blank if link is not internally
 * @param {Object} props
 * @param {string} props.href
 * @param {string} props.className
 * @param {React.ReactNode} props.children
 */
export default function CustomLink(props) {
  const { href = "", children, className } = props;

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
