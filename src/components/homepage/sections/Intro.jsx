import CustomLink from "~/components/CustomLink";
import { FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ThemeButton from "~/components/ThemeButton";
import { VscTwitter } from "react-icons/vsc";
import { useState } from "react";

const IntroLink = ({ children, href }) => (
  <CustomLink
    href={href}
    className="bg-cyan-200 hover:bg-cyan-300 duration-50 dark:text-black ease-in transition-colors underline cursor-pointer"
  >
    {children}
  </CustomLink>
);

export default function IntroSection() {
  const [emailPopupState, setEmailPopupState] = useState(false);
  return (
    <>
      <section className="w-full antialiased bg-white dark:bg-black dark:text-white rounded-md dark:border-transparent relative mt -8 sm:px-5">
        <ThemeButton className="absolute left-auto right-0 top-0" />
        <div className="flex flex-col justify-center items-start space-y-5">
          <h1 className="text-3xl font-bold">Hey, I'm Arnav Gosain 👋</h1>
          <p className="text-xl text-gray-800 dark:text-white font-medium leading-relaxed text-justify">
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
          <div className="grid grid-cols-2 w-full gap-x-8">
            <div className="flex flex-row space-x-3 items-center justify-center justify-self-start">
              <p className="font-semibold text-gray-800 text-2xl bg-cyan-200">
                Get in touch with me:
              </p>
              <div className="flex flex-row space-x-3 items-center justify-center relative">
                {/* {emailPopupState && (
                  <div className="absolute origin-top top-0 rounded-md bg-white text-black">
                    arnav@arnavgosain.com
                  </div>
                )} */}
                <CustomLink href={"mailto:arnav@arnavgosain.com"}>
                  <HiOutlineMail
                    className="h-8 w-8"
                    onMouseEnter={() => setEmailPopupState(true)}
                    onMouseLeave={() => setEmailPopupState(false)}
                  />
                </CustomLink>
                <CustomLink href="https://twitter.com/arn4v">
                  <VscTwitter className="h-8 w-8" />
                </CustomLink>
              </div>
            </div>
            <div className="flex flex-row space-x-3 items-center justify-center justify-self-start">
              <p className="font-semibold text-gray-800 text-2xl bg-cyan-200">
                Keep in touch with me:
              </p>
              <div className="flex flex-row space-x-3 items-center justify-center">
                <CustomLink href="https://instagram.com/arn4v">
                  <FaInstagram className="h-8 w-8" />
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
