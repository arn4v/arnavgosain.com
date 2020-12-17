import Image from "next/image";
import Link from "next/link";

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.href]
 */
const MDXLink = (props) => {
  const { href } = props;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const CustomImage = ({ src }) => (
  <img
    src={src.startsWith("images/") ? src.replace("images/", "/images/") : src}
    className="block max-w-lg max-h-40 object-scale-down"
  />
);

const MDXComponents = {
  a: MDXLink,
  img: CustomImage,
  Image,
};

export default MDXComponents;
