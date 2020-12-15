import CustomLink from "~/components/CustomLink";
import { HiOutlineMail } from "react-icons/hi";
import ThemeButton from "~/components/ThemeButton";
import { VscTwitter } from "react-icons/vsc";

export default function IntroSection() {
  const linkClass =
    "bg-cyan-200 hover:bg-cyan-300 duration-50 dark:text-black ease-in transition-colors underline cursor-pointer";

  return (
    <>
      <section className="w-full antialiased mt-8  bg-white dark:bg-black dark:text-white rounded-md dark:border-transparent relative">
        <ThemeButton
          noDarkMode={false}
          className="absolute left-auto right-0 top-0"
        />
        <div className="flex flex-col justify-center items-start space-y-4">
          <h1 className="text-3xl font-bold">Hey, I'm Arnav Gosain 👋</h1>
          <p className="text-xl text-gray-800 dark:text-white font-medium leading-relaxed">
            I'm a photographer & developer based in Delhi, India. I write my
            thoughts and learnings on my{" "}
            <CustomLink href="/blog" className={linkClass}>
              blog
            </CustomLink>{" "}
            and create a playlist every month. I'm interested in startups (I
            track startups I find{" "}
            <CustomLink
              href="https://www.notion.so/25f93c764a074fd188d14103075d9a2e?v=57023d44b3814101be8fd61faba3a813"
              className={linkClass}
            >
              here
            </CustomLink>
            ), <CustomLink className={linkClass}>newsletters</CustomLink> and{" "}
            <CustomLink className={linkClass}>books</CustomLink>.
          </p>
          <div className="flex flex-row space-x-3 items-center justify-center">
            <p className="font-semibold text-gray-800 text-2xl bg-cyan-200">
              Get in touch with me:
            </p>
            <div className="flex flex-row space-x-3 items-center justify-center">
              <HiOutlineMail className="h-8 w-8" />
              <VscTwitter className="h-8 w-8" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
