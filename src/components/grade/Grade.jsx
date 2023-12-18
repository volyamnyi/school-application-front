import React, { useEffect, useState } from "react";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllLessonsBySubjectId } from "../../utils/ApiFunctions";
import { getAllModulesBySubjectId } from "../../utils/ApiFunctions";
import { getAllGradesByStudentId } from "../../utils/ApiFunctions";
import { getAllGradesByModuleId } from "../../utils/ApiFunctions";
import { getAllStudents } from "../../utils/ApiFunctions";
import { getStudentById } from "../../utils/ApiFunctions";
import { getLessonById } from "../../utils/ApiFunctions";
import { getAllGradesByLessonId } from "../../utils/ApiFunctions";
import { deleteGradeById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import ShowEntries from "../pagination/ShowEntries";
import PagePaginator from "../pagination/PagePaginator";
import SelectPaginator from "../pagination/SelectPaginator";

const Grade = () => {
  const ROLE = localStorage.getItem("role");

  //const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const [selectByLesson, setSelectByLesson] = useState(false);
  const [selectByStudent, setSelectByStudent] = useState(false);
  const [selectByModule, setSelectByModule] = useState(false);

  const [grades, setGrades] = useState({
    content: [
      {
        id: "",
        studentId: "",
        lessonId: "",
        gradeValue: "",
        gradeType: "",
      },
    ],
  });

  const [subject, setSubject] = useState({
    id: "",
    name: "",
  });

  const [subjects, setSubjects] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [lesson, setLesson] = useState({
    id: "",
    name: "",
  });

  const [lessons, setLessons] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });

  const [students, setStudents] = useState({
    content: [
      {
        id: "",
        firstName: "",
        lastName: "",
      },
    ],
  });
  const [module, setModule] = useState({
    id: "",
    name: "",
  });

  const [modules, setModules] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  const [studentsList, setStudentsList] = useState([]);
  const [lessonsList, setLessonsList] = useState([]);

  const totalPages = grades.totalPages;
  const totalElements = grades.totalElements;
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * elementsPerPage + 1;
  const endIndex = Math.min(currentPage * elementsPerPage, totalElements);

  const totalSubjectSelectListPages = subjects.totalPages;
  const totalSubjectSelectListElements = subjects.totalElements;
  const [currentSubjectSelectListPage, setCurrentSubjectSelectListPage] =
    useState(1);
  const [
    selectSubjectListElementsPerPage,
    setSelectSubjectElementsPerListPage,
  ] = useState(10);

  const totalModuleSelectListPages = modules.totalPages;
  const totalModuleSelectListElements = modules.totalElements;
  const [currentModuleSelectListPage, setCurrentModuleSelectListPage] =
    useState(1);
  const [selectModuleListElementsPerPage, setSelectModuleElementsPerListPage] =
    useState(10);

  const totalLessonSelectListPages = lessons.totalPages;
  const totalLessonSelectListElements = lessons.totalElements;
  const [currentLessonSelectListPage, setCurrentLessonSelectListPage] =
    useState(1);
  const [selectLessonListElementsPerPage, setSelectLessonElementsPerListPage] =
    useState(10);

  const totalStudentSelectListPages = students.totalPages;
  const totalStudentSelectListElements = students.totalElements;
  const [currentStudentSelectListPage, setCurrentStudentSelectListPage] =
    useState(1);
  const [
    selectStudentListElementsPerPage,
    setStudentSelectElementsPerListPage,
  ] = useState(10);

  useEffect(() => {
    getAllSubjects(
      currentSubjectSelectListPage,
      selectSubjectListElementsPerPage
    ).then((data) => {
      setSubjects(data);
    });
  }, [currentSubjectSelectListPage, selectSubjectListElementsPerPage]);

  useEffect(() => {
    subject.id !== "" &&
      getAllModulesBySubjectId(
        subject.id,
        currentModuleSelectListPage,
        selectModuleListElementsPerPage
      ).then((data) => {
        setModules(data);
      });
  }, [
    subject.id,
    currentModuleSelectListPage,
    selectModuleListElementsPerPage,
  ]);

  useEffect(() => {
    if (subject.id !== "") {
      getAllLessonsBySubjectId(
        subject.id,
        currentLessonSelectListPage,
        selectLessonListElementsPerPage
      ).then((data) => {
        setLessons(data);
      });
    }
  }, [
    subject.id,
    currentLessonSelectListPage,
    selectLessonListElementsPerPage,
  ]);

  useEffect(() => {
    getAllStudents(
      currentStudentSelectListPage,
      selectStudentListElementsPerPage
    ).then((data) => {
      setStudents(data);
    });
  }, [currentStudentSelectListPage, selectStudentListElementsPerPage]);

  const handleSubjectSelectListPageChange = (pageNumber) => {
    setCurrentSubjectSelectListPage(pageNumber);
  };

  const handleLessonSelectListPageChange = (pageNumber) => {
    setCurrentLessonSelectListPage(pageNumber);
  };

  const handleModuleSelectListPageChange = (pageNumber) => {
    setCurrentModuleSelectListPage(pageNumber);
  };

  const handleStudentSelectListPageChange = (pageNumber) => {
    setCurrentStudentSelectListPage(pageNumber);
  };

  useEffect(() => {
    grades.content.forEach((grade) => {
      grade.studentId !== "" &&
        getStudentById(grade.studentId).then((student) => {
          setStudentsList((prevStudent) => ({
            ...prevStudent,
            [grade.studentId]: student,
          }));
        });
    });
  }, [grades.content[0]]);

  useEffect(() => {
    grades.content.forEach((grade) => {
      grade.lessonId !== "" &&
        getLessonById(grade.lessonId).then((lesson) => {
          setLessonsList((prevLesson) => ({
            ...prevLesson,
            [grade.lessonId]: lesson,
          }));
        });
    });
  }, [grades.content[0]]);

  const handleSelectSubjectChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubject({ ...subject, [name]: value });
    //setSelectedSubjectId(value);

    /*if (value !== "") {
      getAllLessonsBySubjectId(value).then((data) => {
        setLessons(data);
      });
      getAllModulesBySubjectId(value).then((data) => {
        setModules(data);
      });
    } else {
      setLessons({
        content: [
          {
            id: "",
            name: "",
          },
        ],
      });
      setModules({
        content: [
          {
            id: "",
            name: "",
          },
        ],
      });
    }*/
  };
  const handleSelectLessonChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setLesson({ ...lesson, [name]: value });

    /*value !== ""
      ? getAllGradesByLessonId(value).then((data) => {
          setGrades(data);
        })
      : setGrades({
          content: [
            {
              id: "",
              studentId: "",
              lessonId: "",
              gradeValue: "",
              gradeType: "",
            },
          ],
        });*/
    setStudent((prevStudent) => ({ ...prevStudent, id: "" }));
    setModule((prevModule) => ({ ...prevModule, id: "" }));

    setSelectByLesson(true);
    setSelectByStudent(false);
    setSelectByModule(false);
    setCurrentPage(1);
  };
  useEffect(() => {
    lesson.id !== "" &&
      getAllGradesByLessonId(lesson.id, currentPage, elementsPerPage).then(
        (data) => {
          setGrades(data);
        }
      );
  }, [lesson.id, currentPage, elementsPerPage]);

  const handleSelectStudentChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setStudent({ ...student, [name]: value });

    /*value !== ""
      ? getAllGradesByStudentId(value).then((data) => {
          setGrades(data);
        })
      : setGrades({
          content: [
            {
              id: "",
              studentId: "",
              lessonId: "",
              gradeValue: "",
              gradeType: "",
            },
          ],
        });*/
    setLesson((prevLesson) => ({ ...prevLesson, id: "" }));
    setModule((prevModule) => ({ ...prevModule, id: "" }));

    setSelectByLesson(false);
    setSelectByStudent(true);
    setSelectByModule(false);
    setCurrentPage(1);
  };

  useEffect(() => {
    student.id !== "" &&
      getAllGradesByStudentId(student.id, currentPage, elementsPerPage).then(
        (data) => {
          setGrades(data);
        }
      );
  }, [student.id, currentPage, elementsPerPage]);

  const handleSelectModuleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setModule({ ...module, [name]: value });

    /*value !== ""
      ? getAllGradesByModuleId(value).then((data) => {
          setGrades(data);
        })
      : setGrades({
          content: [
            {
              id: "",
              studentId: "",
              lessonId: "",
              gradeValue: "",
              gradeType: "",
            },
          ],
        });*/
    setStudent((prevStudent) => ({ ...prevStudent, id: "" }));
    setLesson((prevLesson) => ({ ...prevLesson, id: "" }));

    setSelectByLesson(false);
    setSelectByStudent(false);
    setSelectByModule(true);
    setCurrentPage(1);
  };

  useEffect(() => {
    module.id !== "" &&
      getAllGradesByModuleId(module.id, currentPage, elementsPerPage).then(
        (data) => {
          setGrades(data);
        }
      );
  }, [module.id, currentPage, elementsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectElementsPerPageChange = (event) => {
    const value = event.target.value;
    setElementsPerPage(value);
  };

  const deleteGradeHandler = async (event, id) => {
    await deleteGradeById(id);

    if (selectByLesson) {
      getAllGradesByLessonId(lesson.id).then((data) => {
        setGrades(data);
      });
    } else if (selectByStudent) {
      getAllGradesByStudentId(student.id).then((data) => {
        setGrades(data);
      });
    } else if (selectByModule) {
      getAllGradesByModuleId(module.id).then((data) => {
        setGrades(data);
      });
    }
  };

  return (
    <>
      <div className="content container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="card card-table">
              <div className="card-body">
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h3 className="page-title">Grades</h3>
                    </div>
                    {(ROLE === "SUPER_ADMIN" ||
                      ROLE === "SCHOOL_ADMIN" ||
                      ROLE === "TEACHER") && (
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <Link to="/add-grade" className="btn btn-primary">
                          <i className="fas fa-plus" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="table-responsive">
                  <div
                    id="DataTables_Table_0_wrapper"
                    className="dataTables_wrapper dt-bootstrap4 no-footer"
                  >
                    <ShowEntries
                      elementsPerPage={elementsPerPage}
                      handleSelectElementsPerPageChange={
                        handleSelectElementsPerPageChange
                      }
                    />
                    <br />
                    <div className="col-12 col-sm-10">
                      <SelectPaginator
                        currentPage={currentSubjectSelectListPage}
                        totalPages={totalSubjectSelectListPages}
                        onPageChange={handleSubjectSelectListPageChange}
                      />
                      <br />
                      <div className="form-group local-forms">
                        <label>
                          Choose the subject
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="id"
                          name="id"
                          value={subject.id}
                          onChange={handleSelectSubjectChange}
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
                          {subjects.content.map((sb) => (
                            <option value={sb.id} key={sb.id}>
                              {sb.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      className="col-12 col-sm-2"
                      style={{ float: "right", marginRight: "17%" }}
                    >
                      <SelectPaginator
                        currentPage={currentStudentSelectListPage}
                        totalPages={totalStudentSelectListPages}
                        onPageChange={handleStudentSelectListPageChange}
                      />
                      <br />
                      <div className="form-group local-forms">
                        <label>
                          Choose the student
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="id"
                          name="id"
                          value={student.id}
                          onChange={handleSelectStudentChange}
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
                          {students.content.map((st) => (
                            <option value={st.id} key={st.id}>
                              {st.firstName} {st.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div
                      className="col-12 col-sm-2"
                      style={{ float: "right", marginRight: "17%" }}
                    >
                      <SelectPaginator
                        currentPage={currentLessonSelectListPage}
                        totalPages={totalLessonSelectListPages}
                        onPageChange={handleLessonSelectListPageChange}
                      />
                      <br />
                      <div className="form-group local-forms">
                        <label>
                          Choose the lesson
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="id"
                          name="id"
                          value={lesson.id}
                          onChange={handleSelectLessonChange}
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
                          {lessons.content.map((less) => (
                            <option value={less.id} key={less.id}>
                              {less.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-2">
                      <SelectPaginator
                        currentPage={currentModuleSelectListPage}
                        totalPages={totalModuleSelectListPages}
                        onPageChange={handleModuleSelectListPageChange}
                      />
                      <br />
                      <div className="form-group local-forms">
                        <label>
                          Choose the module
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="id"
                          name="id"
                          value={module.id}
                          onChange={handleSelectModuleChange}
                          style={{
                            height: "13rem",
                          }}
                          size={2}
                        >
                          <option></option>
                          {modules.content.map((md) => (
                            <option value={md.id} key={md.id}>
                              {md.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {grades.content.length > 0 &&
                      grades.content[0].id !== "" && (
                        <div className="row">
                          <div className="col-sm-12">
                            <table
                              className="table border-0 star-student table-hover table-center mb-0 datatable table-striped dataTable no-footer"
                              id="DataTables_Table_0"
                              role="grid"
                              aria-describedby="DataTables_Table_0_info"
                            >
                              <thead className="student-thread">
                                <tr role="row">
                                  <th
                                    className="sorting_asc"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-sort="ascending"
                                    aria-label=": activate to sort column descending"
                                    style={{ width: "109.141px" }}
                                  >
                                    <div className="form-check check-tables">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        defaultValue="something"
                                      />
                                    </div>
                                  </th>

                                  {selectByLesson && (
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_0"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Name: activate to sort column ascending"
                                      style={{ width: "186.203px" }}
                                    >
                                      Student
                                    </th>
                                  )}
                                  {selectByStudent && (
                                    <th
                                      className="sorting"
                                      tabIndex={0}
                                      aria-controls="DataTables_Table_0"
                                      rowSpan={1}
                                      colSpan={1}
                                      aria-label="Name: activate to sort column ascending"
                                      style={{ width: "186.203px" }}
                                    >
                                      Lesson
                                    </th>
                                  )}
                                  {selectByModule && (
                                    <>
                                      <th
                                        className="sorting"
                                        tabIndex={0}
                                        aria-controls="DataTables_Table_0"
                                        rowSpan={1}
                                        colSpan={1}
                                        aria-label="Name: activate to sort column ascending"
                                        style={{ width: "186.203px" }}
                                      >
                                        Student
                                      </th>
                                      <th
                                        className="sorting"
                                        tabIndex={0}
                                        aria-controls="DataTables_Table_0"
                                        rowSpan={1}
                                        colSpan={1}
                                        aria-label="Name: activate to sort column ascending"
                                        style={{ width: "186.203px" }}
                                      >
                                        Lesson
                                      </th>
                                    </>
                                  )}
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Name: activate to sort column ascending"
                                    style={{ width: "186.203px" }}
                                  >
                                    Grade Value
                                  </th>
                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Name: activate to sort column ascending"
                                    style={{ width: "186.203px" }}
                                  >
                                    Grade Type
                                  </th>
                                  <th
                                    className="text-end sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Action: activate to sort column ascending"
                                    style={{ width: "194.359px" }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {grades.content.map((grade, index) => (
                                  <tr role="row" key={index} className="odd">
                                    <td className="sorting_1">
                                      <div className="form-check check-tables">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue="something"
                                        />
                                      </div>
                                    </td>
                                    {!selectByModule && (
                                      <td>
                                        <h2>
                                          <a>
                                            {selectByStudent &&
                                              lessonsList[grade.lessonId]?.name}
                                            {selectByLesson &&
                                              studentsList[grade.studentId]
                                                ?.firstName +
                                                " " +
                                                studentsList[grade.studentId]
                                                  ?.lastName}
                                          </a>
                                        </h2>
                                      </td>
                                    )}
                                    {selectByModule && (
                                      <>
                                        <td>
                                          <h2>
                                            <a>
                                              {studentsList[grade.studentId]
                                                ?.firstName +
                                                " " +
                                                studentsList[grade.studentId]
                                                  ?.lastName}
                                            </a>
                                          </h2>
                                        </td>
                                        <td>
                                          <h2>
                                            <a>
                                              {
                                                lessonsList[grade.lessonId]
                                                  ?.name
                                              }
                                            </a>
                                          </h2>
                                        </td>
                                      </>
                                    )}
                                    <td>
                                      <h2>
                                        <a>{grade.gradeValue}</a>
                                      </h2>
                                    </td>
                                    <td>
                                      <h2>
                                        <a>{grade.gradeType}</a>
                                      </h2>
                                    </td>
                                    {(ROLE === "SUPER_ADMIN" ||
                                      ROLE === "SCHOOL_ADMIN" ||
                                      ROLE === "TEACHER" ||
                                      ROLE === "PARENT" ||
                                      ROLE === "STUDENT") && (
                                      <td className="text-end">
                                        <div className="actions">
                                          <Link
                                            to={`/grade-details/${grade.id}`}
                                            className="btn btn-sm bg-success-light me-2"
                                          >
                                            <i className="feather-eye" />
                                          </Link>

                                          {(ROLE === "SUPER_ADMIN" ||
                                            ROLE === "SCHOOL_ADMIN" ||
                                            ROLE === "TEACHER") && (
                                            <>
                                              <Link
                                                to={`/update-grade-by-id/${grade.id}`}
                                                className="btn btn-sm bg-danger-light"
                                              >
                                                <i className="feather-edit" />
                                              </Link>
                                              <a className="btn btn-sm bg-danger-light">
                                                <i
                                                  className="feather-delete"
                                                  onClick={(event) =>
                                                    deleteGradeHandler(
                                                      event,
                                                      grade.id
                                                    )
                                                  }
                                                />
                                              </a>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                    {grades.content.length > 0 &&
                      grades.content[0].id !== "" && (
                        <PagePaginator
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          startIndex={startIndex}
                          endIndex={endIndex}
                          elementsPerPage={elementsPerPage}
                          totalElements={totalElements}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Grade;
