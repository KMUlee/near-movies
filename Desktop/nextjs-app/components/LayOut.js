import BottomNavBar from "./BottomNavBar";
import NavBar from "./NavBar";

export default function LayOut({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
      <BottomNavBar />
    </>
  );
}
