import CustomLink from "~/components/CustomLink";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ThemeButton from "~/components/ThemeButton";
import { VscTwitter } from "react-icons/vsc";
import { useState } from "react";

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
      className="underline cursor-pointer bg-cyan-200 hover:bg-cyan-300 duration-50 dark:text-black ease-in transition-colors"
      title={title}
    >
      {children}
    </CustomLink>
  );
};

export default function IntroSection() {
  const [emailPopupState, setEmailPopupState] = useState(false);
  const { blogs, playlists, startup, newsletters } = {
    blogs: <IntroLink href="/blog">blog</IntroLink>,
    playlists: <IntroLink href="/playlists">playlist</IntroLink>,
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
      <section className="relative w-full antialiased dark:text-white rounded-md dark:border-transparent">
        <ThemeButton className="absolute top-0 right-0 left-auto mt-2 lg:mt-0" />
        <div className="flex flex-col items-start justify-center space-y-5">
          <h1 className="w-2/3 text-3xl font-bold lg:w-full">
            Hey, I'm Arnav Gosain 👋
          </h1>
          <p className="text-xl font-medium leading-relaxed text-justify text-gray-800 dark:text-white">
            I'm a photographer & developer based in Delhi, India. I write my
            thoughts and learnings on my {blogs} and create {playlists} a every
            month. I'm interested in startups (which I track {startup}),{" "}
            {newsletters} and <IntroLink href="/bookshelf">books</IntroLink>.
          </p>
          <div className="flex flex-row items-center justify-start w-full space-x-3">
            <p className="text-xl font-semibold text-gray-800 lg:text-2xl bg-cyan-200">
              Get in touch with me:
            </p>
            <div className="relative flex flex-row items-center justify-center space-x-3">
              <CustomLink
                href="mailto:arnav@arnavgosain.com"
                title="Link to my email address"
              >
                <HiOutlineMail
                  className="w-8 h-8"
                  onMouseEnter={() => setEmailPopupState(true)}
                  onMouseLeave={() => setEmailPopupState(false)}
                />
              </CustomLink>
              <CustomLink
                href="https://twitter.com/arn4v"
                title="Link to my Twitter"
              >
                <VscTwitter className="w-8 h-8" />
              </CustomLink>
              <CustomLink
                href="https://instagram.com/arn4v"
                title="Link to my Instagram"
              >
                <FaInstagram className="w-8 h-8" />
              </CustomLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
