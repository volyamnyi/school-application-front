import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = (props) => {
  const isLoggedIn = localStorage.getItem("accessToken");

  const [showSubjectsSubMenu, setShowSubjectsSubMenu] = useState(false);
  const [showStudentsSubMenu, setShowStudentsSubMenu] = useState(false);

  const [activeMenuItems, setActiveMenuItems] = useState(
    new Array(9).fill(false)
  );
  const [activeSubMenuItems, setActiveSubMenuItems] = useState(
    new Array(4).fill(false)
  );

  const handleToggleMenuActive = (index) => {
    setActiveMenuItems((items) => {
      return items.map((i, indx) => (index !== indx ? false : true));
    });
  };

  const hadleToggleSubjectsSubMenuShow = () => {
    setShowSubjectsSubMenu(!showSubjectsSubMenu);
  };

  const hadleToggleStudentsSubMenuShow = () => {
    setShowStudentsSubMenu(!showStudentsSubMenu);
  };

  const handleToggleSubMenuActive = (index) => {
    setActiveSubMenuItems((items) => {
      return items.map((i, indx) => (index !== indx ? false : true));
    });
  };
  return (
    <>
      {isLoggedIn && (
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main Menu</span>
                </li>
                <li
                  className={`submenu ${activeMenuItems[0] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(0);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/teachers">
                    <i className="fas fa-chalkboard-teacher" />{" "}
                    <span>Teachers</span> <span className="menu-arrow" />
                  </Link>
                </li>
                <li
                  className={`submenu ${activeMenuItems[5] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(5);
                    setShowSubjectsSubMenu(false);
                  }}
                >
                  <a href="#" onClick={hadleToggleStudentsSubMenuShow}>
                    <i className="fas fa-graduation-cap" />
                    <span> Students</span> <span className="menu-arrow" />
                  </a>
                  <ul
                    style={{
                      opacity: showStudentsSubMenu && props.showSidebar ? 1 : 0,
                      transition: "opacity 10s",
                      display:
                        showStudentsSubMenu && props.showSidebar
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        className={`submenu ${
                          activeSubMenuItems[2] ? "active" : ""
                        }`}
                        to="/students"
                        onClick={() => handleToggleSubMenuActive(2)}
                      >
                        Students List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`submenu ${
                          activeSubMenuItems[3] ? "active" : ""
                        }`}
                        to="/upload-students-from-file"
                        onClick={() => handleToggleSubMenuActive(3)}
                      >
                        Students Upload
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${activeMenuItems[6] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(6);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/parents">
                    <i className="fas fa-users" /> <span>Parents</span>
                    <span className="menu-arrow" />
                  </Link>
                </li>
                <li
                  className={`submenu ${activeMenuItems[1] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(1);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <a href="#" onClick={hadleToggleSubjectsSubMenuShow}>
                    <i className="fas fa-book-open" /> <span>Subjects</span>{" "}
                    <span className="menu-arrow" />
                  </a>
                  <ul
                    style={{
                      opacity: showSubjectsSubMenu && props.showSidebar ? 1 : 0,
                      transition: "opacity 10s",
                      display:
                        showSubjectsSubMenu && props.showSidebar
                          ? "block"
                          : "none",
                    }}
                  >
                    <li>
                      <Link
                        className={`submenu ${
                          activeSubMenuItems[0] ? "active" : ""
                        }`}
                        to="/subjects"
                        onClick={() => handleToggleSubMenuActive(0)}
                      >
                        Subject List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className={`submenu ${
                          activeSubMenuItems[1] ? "active" : ""
                        }`}
                        to="/upload-subjects-from-file"
                        onClick={() => handleToggleSubMenuActive(1)}
                      >
                        Subjects Upload
                      </Link>
                    </li>
                  </ul>
                </li>
                <li
                  className={`submenu ${activeMenuItems[3] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(3);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/classes">
                    <i className="fa fa-book" /> <span>Classes</span>
                    <span className="menu-arrow" />
                  </Link>
                </li>
                <li
                  className={`submenu ${activeMenuItems[4] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(4);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/modules">
                    <i className="fa fa-th" /> <span>Modules</span>
                    <span className="menu-arrow" />
                  </Link>
                </li>

                <li
                  className={`submenu ${activeMenuItems[2] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(2);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/lessons">
                    <i className="fa fa-book-reader" /> <span>Lessons</span>
                    <span className="menu-arrow" />
                  </Link>
                </li>
                <li
                  className={`submenu ${activeMenuItems[8] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(8);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/attendance">
                    <i className="fa fa-tasks" />
                    <span>Attendance</span>
                    <span className="menu-arrow" />
                  </Link>
                </li>
                <li
                  className={`submenu ${activeMenuItems[7] ? "active" : ""}`}
                  onClick={() => {
                    handleToggleMenuActive(7);
                    setShowSubjectsSubMenu(false);
                    setShowStudentsSubMenu(false);
                  }}
                >
                  <Link to="/medical-records">
                    <i className="fas fa-user-md" />
                    <span>Medical Records</span>
                    <span className="menu-arrow" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default Layout;
