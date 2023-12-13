import React, { useContext, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./components/auth/AuthProvider";

import Layout from "./components/Layout";

import Teacher from "./components/teacher/Teacher";
import AddTeacher from "./components/teacher/AddTeacher";
import TeacherDetails from "./components/teacher/TeacherDetails";
import UpdateTeacherById from "./components/teacher/UpdateTeacherById";

import Subject from "./components/subject/Subject";
import AddSubject from "./components/subject/AddSubject";
import SubjectDetails from "./components/subject/SubjectDetails";
import UpdateSubjectById from "./components/subject/UpdateSubjectById";

import Lesson from "./components/lesson/Lesson";
import AddLesson from "./components/lesson/AddLesson";
import LessonDetails from "./components/lesson/LessonDetails";
import UpdateLessonById from "./components/lesson/UpdateLessonById";

import Attendance from "./components/attendance/Attendance";
import AddAttendance from "./components/attendance/AddAttendance";
import UpdateAttendanceById from "./components/attendance/UpdateAttendanceById";

import ClassGroup from "./components/classgroup/ClassGroup";
import AddClassGroup from "./components/classgroup/AddClassGroup";
import ClassGroupDetails from "./components/classgroup/ClassGroupDetails";
import UpdateClassGroupById from "./components/classgroup/UpdateClassGroupById";
import UploadSubjectsFromFile from "./components/subject/UploadSubjectsFromFile";

import Module from "./components/module/Module";
import AddModule from "./components/module/AddModule";
import ModuleDetails from "./components/module/ModuleDetails";
import UpdateModuleById from "./components/module/UpdateModuleById";

import Student from "./components/student/Student";
import AddStudent from "./components/student/AddStudent";
import StudentDetails from "./components/student/StudentDetails";
import UpdateStudentById from "./components/student/UpdateStudentById";
import UploadStudentsFromFile from "./components/student/UploadStudentFromFile";

import Parent from "./components/parent/Parent";
import AddParent from "./components/parent/AddParent";
import ParentDetails from "./components/parent/ParentDetails";
import UpdateParentById from "./components/parent/UpdateParentById";

import MedicalRecords from "./components/medicalrecords/MedicalRecords";
import MedicalRecordsDetails from "./components/medicalrecords/MedicalRecordsDetails";
import AddMedicalRecords from "./components/medicalrecords/AddMedicalRecords";
import UpdateMedicalRecordsById from "./components/medicalrecords/UpdateMedicalRecordsById";

import ParentRegistration from "./components/auth/ParentRegistration";
import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";


const App = () => {
  const [showSideBar, setShowSidebar] = useState(true);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const isLoggedIn = localStorage.getItem("accessToken");

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleToggleShowSidebar = () => {
    setShowSidebar((show) => !show);
  };

  const handleShowUserDropdownClick = () => {
    setShowUserDropdown((show) => !show);
  };
  const handleShowUserDropdownLeave = () => {
    setShowUserDropdown(false);
  };
  const handleLogout = () => {
    auth.handleLogout();

    navigate("/", { state: { message: " You have been logged out!" } });
  };
  return (
    <div className={`main-wrapper ${!showSideBar && "mini-sidebar"}`}>
      {isLoggedIn && (
        <div className="header">
          <div className="header-left">
            <a href="/" className="logo">
              <img src="/assets/img/logo.svg" alt="Logo" />
            </a>
            <a href="/" className="logo logo-small">
              <img
                src="/assets/img/logo_small.png"
                alt="Logo"
                width={30}
                height={30}
              />
            </a>
          </div>
          <div className="menu-toggle">
            <a href="#" id="toggle_btn" onClick={handleToggleShowSidebar}>
              <i className="fas fa-bars" />
            </a>
          </div>
          <a className="mobile_btn" id="mobile_btn">
            <i className="fas fa-bars" />
          </a>
          <ul
            className="nav user-menu"
            onMouseLeave={handleShowUserDropdownLeave}
            onBlur={handleShowUserDropdownLeave}
          >
            <li className="nav-item dropdown noti-dropdown me-2">
              <a
                href="#"
                className="dropdown-toggle nav-link header-nav-list"
                data-bs-toggle="dropdown"
              >
                <img src="assets/img/icons/header-icon-05.svg" alt="" />
              </a>
              <div className="dropdown-menu notifications">
                <div className="topnav-dropdown-header">
                  <span className="notification-title">Notifications</span>
                  <a href="#" className="clear-noti">
                    Clear All
                  </a>
                </div>
                <div className="noti-content">
                  <ul className="notification-list">
                    <li className="notification-message">
                      <a href="#">
                        <div className="media d-flex">
                          <span className="avatar avatar-sm flex-shrink-0">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-02.jpg"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              <span className="noti-title">Carlson Tech</span>
                              has approved
                              <span className="noti-title">your estimate</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                4 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media d-flex">
                          <span className="avatar avatar-sm flex-shrink-0">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-11.jpg"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              <span className="noti-title">
                                International Software Inc
                              </span>
                              has sent you a invoice in the amount of
                              <span className="noti-title">$218</span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                6 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media d-flex">
                          <span className="avatar avatar-sm flex-shrink-0">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="assets/img/profiles/avatar-17.jpg"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              <span className="noti-title">John Hendry</span>
                              sent a cancellation request
                              <span className="noti-title">
                                Apple iPhone XR
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                8 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="notification-message">
                      <a href="#">
                        <div className="media d-flex">
                          <span className="avatar avatar-sm flex-shrink-0">
                            <img
                              className="avatar-img rounded-circle"
                              alt="User Image"
                              src="/assets/img/profiles/avatar-13.jpg"
                            />
                          </span>
                          <div className="media-body flex-grow-1">
                            <p className="noti-details">
                              <span className="noti-title">
                                Mercury Software Inc
                              </span>
                              added a new product
                              <span className="noti-title">
                                Apple MacBook Pro
                              </span>
                            </p>
                            <p className="noti-time">
                              <span className="notification-time">
                                12 mins ago
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="topnav-dropdown-footer">
                  <a href="#">View all Notifications</a>
                </div>
              </div>
            </li>

            <li className="nav-item dropdown has-arrow new-user-menus">
              <a
                href="#"
                className="dropdown-toggle nav-link"
                data-bs-toggle="dropdown"
                onClick={handleShowUserDropdownClick}
              >
                <span className="user-img">
                  <img
                    className="rounded-circle"
                    src="/assets/img/profiles/avatar-01.jpg"
                    width={31}
                    alt="Soeng Souy"
                  />
                  <div className="user-text">
                    <h6>{localStorage.getItem("sub")}</h6>
                    <p className="text-muted mb-0">
                      {localStorage.getItem("role")}
                    </p>
                  </div>
                </span>
              </a>
              <div
                className={`dropdown-menu ${showUserDropdown && `show`}`}
                style={{ marginTop: "-100px" }}
              >
                <div className="user-header">
                  <div className="avatar avatar-sm">
                    <img
                      src="/assets/img/profiles/avatar-01.jpg"
                      alt="User Image"
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <div className="user-text">
                    <h6>{localStorage.getItem("sub")}</h6>
                    <p className="text-muted mb-0">
                      {localStorage.getItem("role")}
                    </p>
                  </div>
                </div>
                {/*<Link className="dropdown-item" to={"/profile"}>
                    My Profile
                </Link>*/}

                <a className="dropdown-item" href="#">
                  Inbox
                </a>

                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Layout showSidebar={showSideBar} />}>
            {/*Begin Auth Area*/}
            <Route index element={!isLoggedIn ? <Login /> : <Teacher />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<ParentRegistration />} />
            {/*End Auth Area*/}

            {/*Begin Teacher Area*/}
            <Route
              path="/teachers"
              element={
                <RequireAuth>
                  <Teacher />
                </RequireAuth>
              }
            />
            <Route
              path="/teacher-details/:id"
              element={
                <RequireAuth>
                  <TeacherDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-teacher"
              element={
                <RequireAuth>
                  <AddTeacher />
                </RequireAuth>
              }
            />
            <Route
              path="/update-teacher-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateTeacherById />
                </RequireAuth>
              }
            />

            {/*End Teacher Area*/}

            {/*Begin Subject Area*/}

            <Route
              path="/subjects"
              element={
                <RequireAuth>
                  <Subject />
                </RequireAuth>
              }
            />
            <Route
              path="/subject-details/:id"
              element={
                <RequireAuth>
                  <SubjectDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-subject"
              element={
                <RequireAuth>
                  <AddSubject />
                </RequireAuth>
              }
            />
            <Route
              path="/update-subject-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateSubjectById />
                </RequireAuth>
              }
            />
            <Route
              path="/upload-subjects-from-file"
              element={
                <RequireAuth>
                  <UploadSubjectsFromFile />
                </RequireAuth>
              }
            />
            {/*End Subject Area*/}

            {/*Begin Lesson Area*/}

            <Route
              path="/lessons"
              element={
                <RequireAuth>
                  <Lesson />
                </RequireAuth>
              }
            />
            <Route
              path="/lesson-details/:id"
              element={
                <RequireAuth>
                  <LessonDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-lesson"
              element={
                <RequireAuth>
                  <AddLesson />
                </RequireAuth>
              }
            />
            <Route
              path="/update-lesson-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateLessonById />
                </RequireAuth>
              }
            />
            {/*End Lesson Area*/}

            {/*Begin Attendance Area*/}

            <Route
              path="/attendance"
              element={
                <RequireAuth>
                  <Attendance />
                </RequireAuth>
              }
            />
            {/*<Route
              path="/lesson-details/:id"
              element={
                <RequireAuth>
                  <LessonDetails />
                </RequireAuth>
              }
            />*/}
            <Route
              path="/add-attendance"
              element={
                <RequireAuth>
                  <AddAttendance />
                </RequireAuth>
              }
            />
            <Route
              path="/update-attendance-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateAttendanceById />
                </RequireAuth>
              }
            />
            {/*End Attendance Area*/}

            {/*Begin ClassGroup Area*/}

            <Route
              path="/classes"
              element={
                <RequireAuth>
                  <ClassGroup />
                </RequireAuth>
              }
            />
            <Route
              path="/class-group-details/:id"
              element={
                <RequireAuth>
                  <ClassGroupDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-class-group"
              element={
                <RequireAuth>
                  <AddClassGroup />
                </RequireAuth>
              }
            />
            <Route
              path="/update-class-group-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateClassGroupById />
                </RequireAuth>
              }
            />
            {/*End ClassGroup Area*/}

            {/*Begin Module Area*/}

            <Route
              path="/modules"
              element={
                <RequireAuth>
                  <Module />
                </RequireAuth>
              }
            />
            <Route
              path="/module-details/:id"
              element={
                <RequireAuth>
                  <ModuleDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-module"
              element={
                <RequireAuth>
                  <AddModule />
                </RequireAuth>
              }
            />
            <Route
              path="/update-module-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateModuleById />
                </RequireAuth>
              }
            />
            {/*End Module Area*/}

            {/*Begin Student Area*/}
            <Route
              path="/students"
              element={
                <RequireAuth>
                  <Student />
                </RequireAuth>
              }
            />
            <Route
              path="/student-details/:id"
              element={
                <RequireAuth>
                  <StudentDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-student"
              element={
                <RequireAuth>
                  <AddStudent />
                </RequireAuth>
              }
            />
            <Route
              path="/update-student-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateStudentById />
                </RequireAuth>
              }
            />
            <Route
              path="/upload-students-from-file"
              element={
                <RequireAuth>
                  <UploadStudentsFromFile />
                </RequireAuth>
              }
            />
            {/*End Student Area*/}

            {/*Begin Parent Area*/}
            <Route
              path="/parents"
              element={
                <RequireAuth>
                  <Parent />
                </RequireAuth>
              }
            />
            <Route
              path="/parent-details/:id"
              element={
                <RequireAuth>
                  <ParentDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-parent"
              element={
                <RequireAuth>
                  <AddParent />
                </RequireAuth>
              }
            />
            <Route
              path="/update-parent-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateParentById />
                </RequireAuth>
              }
            />

            {/*End Parent Area*/}

            {/*Begin Medical Records Area*/}

            <Route
              path="/medical-records"
              element={
                <RequireAuth>
                  <MedicalRecords />
                </RequireAuth>
              }
            />
            <Route
              path="/medical-records-details/:id"
              element={
                <RequireAuth>
                  <MedicalRecordsDetails />
                </RequireAuth>
              }
            />
            <Route
              path="/add-medical-records"
              element={
                <RequireAuth>
                  <AddMedicalRecords />
                </RequireAuth>
              }
            />
            <Route
              path="/update-medical-records-by-id/:id"
              element={
                <RequireAuth>
                  <UpdateMedicalRecordsById />
                </RequireAuth>
              }
            />
            {/*End Medical Records Area*/}
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
