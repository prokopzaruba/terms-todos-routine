import { Link } from "react-router-dom";

interface Props {
  activeLink: number;
  setActiveLink: React.Dispatch<React.SetStateAction<number>>;
}

const Nav = (props: Props) => {
  return (
    <div className="nav">
      <Link
        className={
          props.activeLink === 0 ? "nav-link nav-link-active" : "nav-link"
        }
        to="/"
        onClick={() => props.setActiveLink(0)}
      >
        Terms & To-Dos
      </Link>
      <Link
        className={
          props.activeLink === 1 ? "nav-link nav-link-active" : "nav-link"
        }
        to="/routine"
        onClick={() => props.setActiveLink(1)}
      >
        Daily Routine
      </Link>
    </div>
  );
};

export default Nav;
