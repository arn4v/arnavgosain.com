import CustomLink from "~/components/CustomLink";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ThemeButton from "~/components/ThemeButton";
import { VscTwitter } from "react-icons/vsc";
import { useState } from "react";

const IntroLink = ({ children, href }) => (
  <CustomLink
    href={href}
    className="underline cursor-pointer bg-cyan-200 hover:bg-cyan-300 duration-50 dark:text-black ease-in transition-colors"
  >
    {children}
  </CustomLink>
);

export default function IntroSection() {
  const [emailPopupState, setEmailPopupState] = useState(false);
  return (
    <>
      <section className="relative w-full antialiased bg-white dark:bg-black dark:text-white rounded-md dark:border-transparent mt -8 sm:px-5">
        <ThemeButton className="absolute top-0 right-0 left-auto" />
        <div className="flex flex-col items-start justify-center space-y-5">
          <h1 className="text-3xl font-bold">Hey, I'm Arnav Gosain 👋</h1>
          <p className="text-xl font-medium leading-relaxed text-justify text-gray-800 dark:text-white">
            I'm a photographer & developer based in Delhi, India. I write my
            thoughts and learnings on my{" "}
            <IntroLink href="/blog">blog</IntroLink> and create a{" "}
            <IntroLink href="/playlists">playlist</IntroLink> every month. I'm
            interested in startups (I track startups I find{" "}
            <IntroLink href="https://www.notion.so/25f93c764a074fd188d14103075d9a2e?v=57023d44b3814101be8fd61faba3a813">
              here
            </IntroLink>
            ), <IntroLink>newsletters</IntroLink> and{" "}
            <IntroLink>books</IntroLink>.
          </p>
          <div className="w-full grid grid-cols-2 gap-x-8">
            <div className="flex flex-col items-start justify-center space-y-2 md:flex-row md:space-x-3 md:items-center justify-self-start">
              <p className="text-xl font-semibold text-gray-800 lg:text-2xl bg-cyan-200">
                Get in touch with me:
              </p>
              <div className="relative flex flex-row items-center justify-center space-x-3">
                <CustomLink href={"mailto:arnav@arnavgosain.com"}>
                  <HiOutlineMail
                    className="w-8 h-8"
                    onMouseEnter={() => setEmailPopupState(true)}
                    onMouseLeave={() => setEmailPopupState(false)}
                  />
                </CustomLink>
                <CustomLink href="https://twitter.com/arn4v">
                  <VscTwitter className="w-8 h-8" />
                </CustomLink>
              </div>
            </div>
            <div className="flex flex-col items-start justify-center space-y-2 md:flex-row md:space-x-3 md:items-center justify-self-start">
              <p className="text-xl font-semibold text-gray-800 lg:text-2xl bg-cyan-200">
                Keep in touch with me:
              </p>
              <div className="flex flex-row items-center justify-center space-x-3">
                <CustomLink href="https://instagram.com/arn4v">
                  <FaInstagram className="w-8 h-8" />
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
