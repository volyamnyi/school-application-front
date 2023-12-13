import React, { useEffect, useState} from "react";
import { updateParentById } from "../../utils/ApiFunctions";
import { getParentById } from "../../utils/ApiFunctions";
import { searchStudents } from "../../utils/ApiFunctions";
import { getStudentById } from "../../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateParentById = () => {
  const { id } = useParams();
  const [parent, setParent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    childrenId: [],
    children: [],
  });

  const [students, setStudent] = useState([]);
  const [children, setChildren] = useState([]);


  useEffect(() => {
    getParentById(id).then((parent) => {
      parent.children = [];
      parent.childrenId.map((childIndex) => {
        getStudentById(childIndex).then((student) =>
          parent.children.push(" " + student.firstName + " " + student.lastName)
        );
      });
      setParent(parent);
    });
  }, []);

  useEffect(() => {
    parent.childrenId.map((childIndex) => {
      getStudentById(childIndex).then((student) =>
        setChildren((prevChildren) => {
          return [...prevChildren, student];
        })
      );
    });
  }, [parent.id]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateParentInputChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setParent({ ...parent, [name]: value });
  };

  const handleSearchChildrenInputChange = (event) => {
   
    let value = event.target.value;
   
    searchStudents(value).then((students) => {
      setStudent(students);
      
      setParent({ ...parent, children: value.split(",") });
    });
  };

  const handleStudentDetailsClick = (event) => {
    
    let text = event.target.text;
    
    setParent({
      ...parent,
      childrenId: [...parent.childrenId, text.split("")[0]],
      children: [...parent.children, text.split(" ")[1]+" "+text.split(" ")[2]],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateParentById(id, {
      firstName: parent.firstName,
      lastName: parent.lastName,
      email: parent.email,
      childrenId: parent.childrenId,
    });

    if (response) {
      setSuccessMessage("Parent updated successfully!");
    } else {
      setErrorMessage("Parent updating error!");
    }
  };
  return (
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
            <h3 className="page-title">Update Parent</h3>
            <ul className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/parents">Parents</Link>
              </li>
              <li className="breadcrumb-item active">Update Parent</li>
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
                      <span>Basic Details</span>
                    </h5>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        First Name <span className="login-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter First Name"
                        id="firstName"
                        name="firstName"
                        value={parent.firstName}
                        onChange={handleUpdateParentInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>
                        Last Name <span className="login-danger">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Enter Last Name"
                        id="lastName"
                        name="lastName"
                        value={parent.lastName}
                        onChange={handleUpdateParentInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        id="email"
                        name="email"
                        value={parent.email}
                        onChange={handleUpdateParentInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4"></div>
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>Search Children</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your child details"
                        id="search"
                        name="search"
                        value={parent.children}
                        onChange={handleSearchChildrenInputChange}
                      />
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
                        {students.map((st, index) => (
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
  );
};

export default UpdateParentById;
