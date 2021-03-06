import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { VscTwitter } from "react-icons/vsc";
import CustomLink from "~/components/CustomLink";

/**
 * @param {Object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} props.href
 * @param {string} [props.title]
 * @param {number} [props.tabindex]
 * @param {string} [props.description]
 */
const IntroLink = (props) => {
  const { children, href, title } = props;

  return (
    <CustomLink
      href={href}
      className="underline transition-colors ease-in cursor-pointer bg-cyan-200 hover:bg-cyan-300 duration-50 dark:text-black"
      title={title}
    >
      {children}
    </CustomLink>
  );
};

export default function IntroSection() {
  const { writing, playlist, startup, newsletters } = {
    writing: <IntroLink href="/blog">blog</IntroLink>,
    playlist: <IntroLink href="/playlists">playlist</IntroLink>,
    startup: (
      <IntroLink
        href="https://www.notion.so/25f93c764a074fd188d14103075d9a2e?v=57023d44b3814101be8fd61faba3a813"
        title="Startup Tracker on Notion"
      >
        here
      </IntroLink>
    ),
    newsletters: (
      <IntroLink href="https://www.notion.so/NewsletterDB-e89894e368ee4f838d83e619edcbbc25">
        newsletters
      </IntroLink>
    ),
  };

  return (
    <>
      <section className="w-full antialiased rounded-md dark:text-white dark:border-transparent">
        <div className="flex flex-col items-start justify-center space-y-6">
          <h1 className="w-2/3 text-lg font-mono font-bold lg:text-xl whitespace-nowrap lg:w-full">
            Hey, I'm Arnav Gosain 👋
          </h1>
          <p className="text-xl font-medium leading-relaxed text-gray-800 dark:text-white">
            I'm a frontend developer who{" "}
            <span className="text-pink-600">loves </span> working with{" "}
            <span className="text-blue-600">React & Typescript</span>. I'm
            currently looking for full-time roles, feel free to reach out!
          </p>
          <div className="flex flex-row items-center justify-start w-full space-x-6">
            <p className="font-semibold text-gray-800 whitespace-nowrap text-xl lg:text-xl bg-cyan-200">
              Get in touch:
            </p>
            <div className="relative flex flex-row items-center justify-center space-x-3">
              <CustomLink
                href="mailto:arnav@arnavgosain.com"
                title="Link to my email address"
                className="hover:text-amber-400 z-0"
              >
                <HiOutlineMail className="w-8 h-8" />
              </CustomLink>
              <CustomLink
                href="https://twitter.com/arn4v"
                title="Link to my Twitter"
                className="hover:text-blue-400"
              >
                <VscTwitter className="w-8 h-8 z-0" />
              </CustomLink>
              <CustomLink
                href="https://instagram.com/arn4v"
                title="Link to my Instagram"
                className="hover:text-red-400"
              >
                <FaInstagram className="w-8 h-8 z-0" />
              </CustomLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
