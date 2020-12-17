import Link from "next/link";
import clsx from "clsx";

/**
 * CustomLink Component - Returns a tag with _blank if link is not internally
 * @param {Object} props
 * @param {string} props.href
 * @param {string} [props.className]
 * @param {string} [props.title]
 * @param {number} [props.tabindex]
 * @param {React.ReactNode} props.children
 */
export default function CustomLink(props) {
  const { href = "", children, className, title, tabindex } = props;

  const linkProps = {
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: clsx([className]),
  };
  if (title) linkProps.title = title;
  if (title) linkProps["aria-label"] = title;
  if (tabindex) linkProps.tabindex = tabindex.toString();
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
