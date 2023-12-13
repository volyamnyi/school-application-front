import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLessonById } from "../../utils/ApiFunctions";
import { getModuleById } from "../../utils/ApiFunctions";
import { getSubjectById } from "../../utils/ApiFunctions";
import { getClassGroupById } from "../../utils/ApiFunctions";
import { getTeacherById } from "../../utils/ApiFunctions";

import { Link } from "react-router-dom";

const LessonDetails = () => {
  const { id } = useParams();
  
  const [lesson, setLesson] = useState({
    id: "",
    name: "",
    date: "",
    period: "",
    homework: "",
    moduleId: "",
  });
  
  const [module, setModule] = useState({
    id: "",
    subjectId: "",
    classRoomId: "",
    teacherId: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    getLessonById(id).then((lesson) => {
      setLesson(lesson);
    });
  }, []);
  
  useEffect(() => {
    getModuleById(lesson.moduleId).then((module) => {
      setModule(module);
    });
  }, [lesson.moduleId]);

  const [teacher, setTeacher] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    getTeacherById(module.teacherId).then((teacher) => {
      setTeacher(teacher);
    });
  }, [module.teacherId]);

  const [classGroup, setClassGroup] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    getClassGroupById(module.classRoomId).then((classGroup) => {
      setClassGroup(classGroup);
    });
  }, [module.classRoomId]);

  const [subject, setSubject] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    getSubjectById(module.subjectId).then((subject) => {
      setSubject(subject);
    });
  }, [module.subjectId]);

  return (
    <>
      <>
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Lesson Details</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/lessons">Lessons</Link>
                  </li>
                  <li className="breadcrumb-item active">Lesson Details</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <div
                      id="DataTables_Table_0_wrapper"
                      className="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
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
                                <th style={{ width: "186.203px" }}>Name</th>
                                <th style={{ width: "186.203px" }}>Date</th>
                                <th style={{ width: "186.203px" }}>Period</th>
                                <th style={{ width: "186.203px" }}>Homework</th>
                                <th style={{ width: "186.203px" }}>Module</th>
                                <th style={{ width: "186.203px" }}>Subject</th>
                                <th style={{ width: "186.203px" }}>Class</th>
                                <th style={{ width: "186.203px" }}>Teacher</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr role="row" className="odd">
                                <td>
                                  <h2>
                                    <a>{lesson.name}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{lesson.date}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{lesson.period} hour(s)</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{lesson.homework}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{module.name}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{subject.name}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{classGroup.name}</a>
                                  </h2>
                                </td>
                                <td>
                                  <h2>
                                    <a>{teacher.firstName} {teacher.lastName}</a>
                                  </h2>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default LessonDetails;
