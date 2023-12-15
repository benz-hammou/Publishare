import MyLogo from "../assets/logo/Logo-Publishare.png";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import OutsideClickHandler from "react-outside-click-handler";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleDownIcon,
  StopIcon,
} from "@heroicons/react/24/solid";
import {
  IconButton,
  Collapse,
  Navbar,
  List,
  ListItem,
  Typography,
} from "@material-tailwind/react";

const accordionData = [
  {
    key: 1,
    cat: "Startups",
  },
  {
    key: 2,
    cat: "Economy",
  },
  {
    key: 3,
    cat: "Technology",
  },
  {
    key: 4,
    cat: "Travel",
  },
  {
    key: 5,
    cat: "Design",
  },
  {
    key: 6,
    cat: "Food",
  },
];

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [openNav, setOpenNav] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsActive(false);
    }, "1000");
    setTimeout(() => {
      setOpenNav(false);
    }, "400");
  }, [pathname]);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  const navList = (
    <List className="navList mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4 xl:gap-6">
      <button type="button">
        <Typography
          className=" lg:hidden flex items-center font-bold hover:text-deep-orange-400"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <ChevronDoubleDownIcon className="text-deep-orange-400 h-5 mr-2" />
          ) : (
            <ChevronDoubleRightIcon className=" h-5 mr-2" />
          )}
          <span className="hover:text-deep-orange-400">Categories</span>
        </Typography>
      </button>

      {accordionData.map((title) => {
        return (
          <ListItem
            id={title.key}
            variant="small"
            color="blue-gray"
            className={`  p-2 font-normal hover:text-orange-600 hover:font-bold xl:flex xl:justify-center xl:items-center xl:hover:bg-orange-600 xl:hover:text-blue-gray-900  ${
              isActive ? "block" : "hidden"
            } lg:block`}
          >
            <a href className="flex items-center xl:font-bold xl:uppercase">
              {title.cat}
            </a>
          </ListItem>
        );
      })}

      {username ? (
        <>
          <ListItem
            variant="small"
            color="blue-gray"
            className="p-2 font-normal lg:min-w-6rem lg:bg-gray-300 lg:hover:bg-gray-300 lg:drop-shadow-2xl lg:hover:scale-125 lg:hover:animate-spin"
          >
            <Link
              to={"/create"}
              className=" pl-2 flex items-center font-bold text-deep-orange-400 lg:pl-0 "
            >
              <StopIcon className="nav_title_mobile mr-1  text-deep-orange-400 h-4 lg:hidden" />
              <div className="lg:flex lg:justify-center lg:items-center lg:flex-col">
                <span className="lg:flex lg:justify-center lg:items-center">
                  Publish{" "}
                </span>
                <span>New Post</span>
              </div>
            </Link>
          </ListItem>

          <ListItem
            variant="small"
            color="blue-gray"
            className="p-2 font-normal lg:flex lg:justify-center lg:min-w-6rem hover:text-deep-orange-400"
          >
            <a
              href
              onClick={logout}
              className="pl-2 flex items-center font-bold  lg:pl-0"
            >
              <StopIcon className="nav_title_mobile mr-1 text-deep-orange-400 h-4 lg:hidden" />
              Logout
            </a>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem
            variant="small"
            color="blue-gray"
            className="p-2 font-normal lg:flex lg:justify-center lg:min-w-6rem lg:hover:scale-110"
          >
            <Link
              to={"/login"}
              className="pl-2 flex items-center font-bold hover:text-deep-orange-400 lg:text-deep-orange-400 lg:pl-0"
            >
              <StopIcon className="nav_title_mobile mr-1 text-deep-orange-400 h-4 lg:hidden" />
              Login
            </Link>
          </ListItem>

          <ListItem
            variant="small"
            color="blue-gray"
            className="p-2 font-normal lg:flex lg:justify-center lg:min-w-6rem lg:hover:scale-110"
          >
            <Link
              to={"/register"}
              className="pl-2 flex items-center font-bold hover:text-deep-orange-400 lg:text-deep-orange-400  lg:pl-0"
            >
              <StopIcon className="nav_title_mobile mr-1 text-deep-orange-400 h-4 lg:hidden" />
              Register
            </Link>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <header className=" mb-12">
      <OutsideClickHandler
        onOutsideClick={() => {
          setTimeout(() => {
            setIsActive(false);
          }, "1000");
          setTimeout(() => {
            setOpenNav(false);
          }, "400");
        }}
      >
        <Navbar className="navbar bg-opacity-50 fixed top-0 z-10 h-max rounded-none p-4 lg:px-8 lg:py-4 lg:max-w-5xl xl:max-w-7xl lg:shadow-none">
          <div className="flex items-center justify-between lg:justify-center text-blue-gray-900">
            <Link to="/">
              <img
                className="h-12 lg:mr-8"
                src={MyLogo}
                alt="Publishare Logo"
              />
            </Link>

            <div className="flex items-center gap-4">
              <div className="hidden lg:block">{navList}</div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => {
                  if (!openNav) {
                    setIsActive(false);
                  }
                  setOpenNav(!openNav);
                }}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <Collapse className="lg:hidden" open={openNav}>
            {navList}
          </Collapse>
        </Navbar>
      </OutsideClickHandler>
    </header>
  );
};

export default Header;
