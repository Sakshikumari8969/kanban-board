import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to={"/"}>Home</Link>
      <Link to={"/board/create"}>Create Board</Link>
      <Link to={"/board/list"}>Boards</Link>
      <Link to={"/accounts/login"}>Login</Link>
      <Link to={"/accounts/register"}>Register</Link>
      <Link to={"/accounts/register"}>Logout</Link>
    </header>
  );
}
