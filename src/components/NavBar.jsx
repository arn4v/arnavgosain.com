import ThemeButton from "./ThemeButton";
import commonPropTypes from "~/lib/commonPropTypes";

export default function NavBar() {
  return (
    <>
      <nav className="flex flex-row justify-between h-16 items-center my-3 box-border">
        <div className="flex flex-row space-x-6 box-border h-full items-center justify-start">
          <ThemeButton className="" />
          <h1 className="font-bold font-mono text-3xl">Arnav Gosain</h1>
        </div>
        <div className=""></div>
      </nav>
    </>
  );
}

NavBar.propTypes = {
  ...commonPropTypes,
};
