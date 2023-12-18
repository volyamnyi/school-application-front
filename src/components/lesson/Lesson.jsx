import React, { useEffect, useState } from "react";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllLessonsBySubjectId } from "../../utils/ApiFunctions";
import { deleteLessonById } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

import ShowEntries from "../pagination/ShowEntries";
import PagePaginator from "../pagination/PagePaginator";
import SelectPaginator from "../pagination/SelectPaginator";

const Lesson = () => {
  const ROLE = localStorage.getItem("role");

  const [lessonId, setLessonId] = useState();
  const [lessons, setLessons] = useState({
    content: [
      {
        id: "",
        name: "",
        date: "",
        period: "",
        homework: "",
        moduleId: "",
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

  const totalPages = lessons.totalPages;
  const totalElements = lessons.totalElements;
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage, setElementsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * elementsPerPage + 1;
  const endIndex = Math.min(currentPage * elementsPerPage, totalElements);

  const totalSelectListPages = subjects.totalPages;
  const totalSelectListElements = subjects.totalElements;
  const [currentSelectListPage, setCurrentSelectListPage] = useState(1);
  const [selectListElementsPerPage, setSelectElementsPerListPage] =
    useState(10);

  useEffect(() => {
    getAllSubjects(currentSelectListPage, selectListElementsPerPage).then(
      (data) => {
        setSubjects(data);
      }
    );
  }, [currentSelectListPage, selectListElementsPerPage]);

  const handleSelectListPageChange = (pageNumber) => {
    setCurrentSelectListPage(pageNumber);
  };

  const handleSelectSubjectChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setSubject({ ...subject, [name]: value });

    /*value !== ""
      ? getAllLessonsBySubjectId(value).then((data) => {
          setLessons(data);
        })
      : setLessons({
          content: [
            {
              id: "",
              name: "",
              date: "",
              period: "",
              homework: "",
              moduleId: "",
            },
          ],
        });*/
  };

  useEffect(() => {
    subject.id !== "" &&
      getAllLessonsBySubjectId(subject.id, currentPage, elementsPerPage).then(
        (data) => {
          setLessons(data);
        }
      );
  }, [lessonId, subject.id, currentPage, elementsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectElementsPerPageChange = (event) => {
    const value = event.target.value;
    setElementsPerPage(value);
  };

  const deleteLessonHandler = async (event, id) => {
    await deleteLessonById(id);
    getAllLessonsBySubjectId(subject.id, currentPage, elementsPerPage).then(
      (data) => {
        setLessons(data);
      }
    );
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
                      <h3 className="page-title">Lessons</h3>
                    </div>
                    {(ROLE === "SUPER_ADMIN" ||
                      ROLE === "SCHOOL_ADMIN" ||
                      ROLE === "TEACHER") && (
                      <div className="col-auto text-end float-end ms-auto download-grp">
                        <Link to="/add-lesson" className="btn btn-primary">
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
                    <div className="col-12 col-sm-4">
                      <SelectPaginator
                        currentPage={currentSelectListPage}
                        totalPages={totalSelectListPages}
                        onPageChange={handleSelectListPageChange}
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
                        ><option></option>
                          {subjects.content.map((sb) => (
                            <option value={sb.id} key={sb.id}>
                              {sb.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {lessons.content.length > 0 &&
                      lessons.content[0].id !== "" && (
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

                                  <th
                                    className="sorting"
                                    tabIndex={0}
                                    aria-controls="DataTables_Table_0"
                                    rowSpan={1}
                                    colSpan={1}
                                    aria-label="Name: activate to sort column ascending"
                                    style={{ width: "186.203px" }}
                                  >
                                    Name
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
                                {lessons.content.map((lesson, index) => (
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

                                    <td>
                                      <h2>
                                        <a>{lesson.name}</a>
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
                                            to={`/lesson-details/${lesson.id}`}
                                            className="btn btn-sm bg-success-light me-2"
                                          >
                                            <i className="feather-eye" />
                                          </Link>

                                          {(ROLE === "SUPER_ADMIN" ||
                                            ROLE === "SCHOOL_ADMIN" ||
                                            ROLE === "TEACHER") && (
                                            <>
                                              <Link
                                                to={`/update-lesson-by-id/${lesson.id}/${subject.id}`}
                                                className="btn btn-sm bg-danger-light"
                                              >
                                                <i className="feather-edit" />
                                              </Link>
                                              <a
                                                href="#"
                                                className="btn btn-sm bg-danger-light"
                                              >
                                                <i
                                                  className="feather-delete"
                                                  onClick={(event) =>
                                                    deleteLessonHandler(
                                                      event,
                                                      lesson.id
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

                    {lessons.content.length > 0 &&
                      lessons.content[0].id !== "" && (
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

export default Lesson;
