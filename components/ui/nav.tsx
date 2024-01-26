import Link from "next/link";

/* This component is responsible for showing navigation to the entire application
 *
 * We use icons from font awesome and we also add our custom css class called icon  defined in the global.css file
 */
const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4 bg-cyan-800 text-cyan-200">
      <div className="flex items-center space-x-4">
        <Link href={"/"}>Home</Link>
        <Link href={"/parking"}>Park new car</Link>
        <Link href={"/parked"}>All Parked Cars</Link>
      </div>
    </nav>
  );
};
export default Nav;
