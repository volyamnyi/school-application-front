import React, { useEffect, useState } from "react";
import { updateClassGroupById } from "../../utils/ApiFunctions";
import { getClassGroupById } from "../../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { searchStudents } from "../../utils/ApiFunctions";
import { addStudentToClassGroup } from "../../utils/ApiFunctions";

const UpdateClassGroupById = () => {
  const { id } = useParams();

  const classGroupId = id;

  const [classGroup, setClassGroup] = useState({
    id: "",
    name: "",
  });
  const [searchedStudents, setSearchedStudents] = useState([
    { id: "", firstName: "", lastName: "" },
  ]);

  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    getClassGroupById(classGroupId).then((classGroup) => {
      setClassGroup(classGroup);
    });
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateClassGroupInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setClassGroup({ ...classGroup, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateClassGroupById({
      id: classGroupId,
      name: classGroup.name,
    });

    console.log(response)
    if (response.status === 200) {
      setSuccessMessage("The Class updated successfully!");
    } else {
      setErrorMessage(response);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const handleSearchStudentsInputChange = (event) => {
    const value = event.target.value;
    setValue(event.target.value);

    searchStudents(value).then((searchedStudents) => {
      setSearchedStudents((prevValues) => {
        return [...searchedStudents];
      });
    });
  };

  const handleStudentDetailsClick = (event) => {
    let text = event.target.text;
    const studentId = text.replace(/\D/g, "");
    const textArr = text.split(" ");
    textArr.shift();
    text = textArr.join(" ");
    setValue(text);

    addStudentToClassGroup(classGroupId, studentId);
    setShowSuggestions(false);
  };
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
              <h3 className="page-title">Update Class Group</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/classes">Classes</Link>
                </li>
                <li className="breadcrumb-item active">Update Class Group</li>
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
                        <span>Class Group Information</span>
                      </h5>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Class Name <span className="login-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={classGroup.name}
                          onChange={handleUpdateClassGroupInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>Search Students</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          placeholder="Enter Your child details"
                          id="search"
                          name="search"
                          value={value}
                          onChange={handleSearchStudentsInputChange}
                          onFocus={() => setShowSuggestions(true)}
                        />
                        {showSuggestions && (
                          <div
                            className="col-lg-4 col-md-6 dropdown-menu show"
                            style={{
                              width: "100%",
                              position: "absolute",
                              inset: "0px auto auto 0px",
                              margin: "0px",
                              transform: "translate(0px, 40px)",
                            }}
                            data-popper-placement="bottom-start"
                          >
                            {searchedStudents.map((st, index) => (
                              <a
                                key={index}
                                className="dropdown-item"
                                name="student-details"
                                onClick={handleStudentDetailsClick}
                              >
                                <span style={{ display: "none" }}>{st.id}</span>{" "}
                                {st.firstName} {st.lastName}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="student-submit">
                        <button type="submit" className="btn btn-primary">
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

export default UpdateClassGroupById;
