import React, { useEffect, useState } from "react";
import { getModuleById } from "../../utils/ApiFunctions";
import { updateModuleById } from "../../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { getAllSubjects } from "../../utils/ApiFunctions";
import { getAllTeachers } from "../../utils/ApiFunctions";
import { getAllClassGroups } from "../../utils/ApiFunctions";

import { Link } from "react-router-dom";

const UpdateModuleById = () => {
  
  const { id } = useParams();
  
  const [module, setModule] = useState({
    id:"",
    subjectId: "",
    classRoomId: "",
    teacherId: "",
    name: "",
    startDate: "",
    endDate: "",
    schedule: [new Map()],
  });
  const today = new Date().toISOString().split("T")[0];
  const [submitDisabled,setSubmitDisabled] = useState(true)

  const [schedule, setSchedule] = useState(new Map());
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [order, setOrder] = useState("");

  const objectToMap = (obj)=> {
    const map = new Map();
  
    Object.keys(obj).forEach(key => {
      map.set(key, obj[key]);
    });
  
    return map;
  }

  useEffect(() => {
    getModuleById(id).then((module) => {
      
      const scheduleMap = objectToMap(module.schedule)
      const defaultDay = Object.getOwnPropertyNames(module.schedule)[0]
      const defaulOrder = module.schedule[dayOfWeek]
      module.schedule = scheduleMap;
      setDayOfWeek(defaultDay)
      setOrder(defaulOrder)
     
      module.startDate = module.startDate.split("T")[0];
      module.endDate = module.endDate.split("T")[0];
    
      
      scheduleMap.size > 0 && setSubmitDisabled(false)
      
      setSchedule(scheduleMap)
      setModule(module);
    });
  }, [module.id]);

  const [subject, setSubject] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  useEffect(() => {
    getAllSubjects().then((data) => {
      setSubject(data);
    });
  }, []);

  const [classGroup, setClassGroup] = useState({
    content: [
      {
        id: "",
        name: "",
      },
    ],
  });

  useEffect(() => {
    getAllClassGroups().then((data) => {
      setClassGroup(data);
    });
  }, []);

  const [teacher, setTeacher] = useState({
    content: [
      {
        id: "",
        firstName: "",
        lastName: "",
      },
    ],
  });

  useEffect(() => {
    getAllTeachers().then((data) => {
      setTeacher(data);
    });
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddModuleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setModule({ ...module, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await updateModuleById(id,module);

    setModule({
      subjectId: "",
      classRoomId: "",
      teacherId: "",
      name: "",
      startDate: "",
      endDate: "",
    });

    setDayOfWeek("");
    setOrder("");
    clearSchedule();

    if (response.status === 200) {
      setSuccessMessage("The Module updated successfully!");
    } else {
      setErrorMessage(response);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const updateSchedule = () => {
    if (!dayOfWeek || !order) {
      setErrorMessage("Please enter both day of the week and order.");
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000);
      return;
    }

    const newSchedule = new Map(schedule);

    const orderArray = order.split(",").map(Number);
    newSchedule.set(dayOfWeek, new Set(orderArray));

    setSchedule(newSchedule);

    setModule({ ...module, schedule: newSchedule });

    setSubmitDisabled(false)
  };

  const clearSchedule =() => {
    setSchedule("");
    setSubmitDisabled(true)
  }
  return (
    <>
      <div className="content container-fluid">
        {successMessage && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>Holy guacamole!</strong> {successMessage}
          </div>
        )}
        {errorMessage && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Holy guacamole!</strong> {errorMessage}
          </div>
        )}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Update Module</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/modules">Modules</Link>
                </li>
                <li className="breadcrumb-item active">Update Module</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <h5 className="form-title">
                        <span>Module Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Choose the subject
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="subjectId"
                          name="subjectId"
                          value={module.subjectId}
                          onChange={handleAddModuleInputChange}
                        >
                          <option value="">Choose the subject</option>
                          {subject.content.map((sbj) => (
                            <option value={sbj.id} key={sbj.id}>
                              {sbj.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Choose the class room
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="classRoomId"
                          name="classRoomId"
                          value={module.classRoomId}
                          onChange={handleAddModuleInputChange}
                        >
                          <option value="">Choose the class room</option>
                          {classGroup.content.map((cls) => (
                            <option value={cls.id} key={cls.id}>
                              {cls.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Choose the teacher
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="teacherId"
                          name="teacherId"
                          value={module.teacherId}
                          onChange={handleAddModuleInputChange}
                        >
                          <option value="">Choose the teacher</option>
                          {teacher.content.map((tch) => (
                            <option value={tch.id} key={tch.id}>
                              {tch.firstName} {tch.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Module Name <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={module.name}
                          onChange={handleAddModuleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Start Date <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          id="startDate"
                          name="startDate"
                          value={module.startDate}
                          onChange={handleAddModuleInputChange}
                          min={today}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          End Date <span className="login-danger">*</span>
                        </label>
                        <input
                          required
                          type="date"
                          className="form-control"
                          id="endDate"
                          name="endDate"
                          value={module.endDate}
                          onChange={handleAddModuleInputChange}
                          min={today}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Choose the day
                          <span className="login-danger">*</span>
                        </label>
                        <select
                          required
                          className="form-control"
                          id="dayOfWeek"
                          name="dayOfWeek"
                          value={dayOfWeek}
                          onChange={(e) => setDayOfWeek(e.target.value)}
                        >
                          <option value="">Choose the day</option>
                          <option value="MONDAY">MONDAY</option>
                          <option value="TUESDAY">TUESDAY</option>
                          <option value="WEDNESDAY">WEDNESDAY</option>
                          <option value="THURSDAY">THURSDAY</option>
                          <option value="FRIDAY">FRIDAY</option>
                          <option value="SATURDAY">SATURDAY</option>
                          <option value="SUNDAY">SUNDAY</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Order (comma-separated){" "}
                          <span className="login-danger">*</span>
                        </label>
                        <input
                          pattern="^\d+(,\d+)*$"
                          required
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={order}
                          onChange={(e) => setOrder(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={updateSchedule}
                        >
                          Set schedule
                        </button><span>&nbsp;</span>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={clearSchedule}
                        >
                          Clear schedule
                        </button>
                      </div>
                    </div>
                    
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
                                className="sorting"
                                tabIndex={0}
                                aria-controls="DataTables_Table_0"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Name: activate to sort column ascending"
                                style={{ width: "136.984px" }}
                              >
                                Day
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="DataTables_Table_0"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Class: activate to sort column ascending"
                                style={{ width: "47.4844px" }}
                              >
                                Order
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.from(schedule).map(([dayOfWeek, hours]) => (
                              <tr role="row" className="odd" key={dayOfWeek}>
                                {" "}
                                <td>{dayOfWeek}</td>{" "}
                                <td>{Array.from(hours).join(", ")}</td>{" "}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="student-submit">
                        <button id="submit" disabled={submitDisabled} type="submit" className="btn btn-primary" style={{marginLeft:"30%"}}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateModuleById;
