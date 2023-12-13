import React, { useEffect, useState } from "react";
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
  });
  
 
  
  
  const [children, setChildren] = useState([]);
  const [searchedChildren, setSearchedChildren] = useState([
    { id: "", firstName: "", lastName: "" },
  ]);


  useEffect(() => {
    parent.childrenId.map((childIndex) => {
      getStudentById(childIndex).then((student) =>
        setChildren((prevChildren) => {
          return [...prevChildren, student];
        })
      );
    });
  }, [parent.id]);
  
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    getParentById(id).then((parent) => {
      setParent(parent);
    });
  }, []);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdateParentInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setParent({ ...parent, [name]: value });
  };

  const handleSearchChildrenInputChange = (event) => {
    const value = event.target.value;
    setValue(event.target.value);

    searchStudents(value).then((searchedChildren) => {
      setSearchedChildren((prevValues) => {
        return [...searchedChildren];
      });
    });
  };

  const handleStudentDetailsClick = (event) => {
    let text = event.target.text;
    const studentId = text.replace(/\D/g, "")
    const textArr = text.split(" ");
    textArr.shift()
    text = textArr.join(" ")
  
    setValue(text);

    setParent({
      ...parent,
      childrenId: [...parent.childrenId, studentId],
    });
    getStudentById(studentId).then((student) =>
        setChildren((prevChildren) => {
          return [...prevChildren, student];
        })
      );
    setShowSuggestions(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await updateParentById(id, {
      firstName: parent.firstName,
      lastName: parent.lastName,
      email: parent.email,
      childrenId: parent.childrenId,
    });

    //window.location.reload(false);

    if (response.status === 200) {
      setSuccessMessage("The Parent updated successfully!");
    } else {
      setErrorMessage(response);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
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
      <div className="row"  style={{float:"right"}}>
        <div className="col-lg-8">
          <div className="student-personals-grp">
            <div className="card mb-0">
              <div className="card-body">
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                  }}
                >
                  <thead className="student-thread">
                    <tr>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="DataTables_Table_0"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Subject: activate to sort column ascending"
                        style={{ width: "90.2031px" }}
                      >
                        Children:
                      </th>
                    </tr>
                    <tr>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="DataTables_Table_0"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Name: activate to sort column ascending"
                        style={{ width: "190.547px" }}
                      >
                        Name
                      </th>
                      <th
                        className="sorting"
                        tabIndex={0}
                        aria-controls="DataTables_Table_0"
                        rowSpan={1}
                        colSpan={1}
                        aria-label="Name: activate to sort column ascending"
                        style={{ width: "190.547px" }}
                      >
                        Last Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {children.map((ch, index) => (
                      <tr>
                        <td>
                          <div key={index}>{ch.firstName}</div>
                        </td>
                        <td>
                          <div key={index}>{ch.lastName}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="col-10">
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
                  <div className="col-12 col-sm-4">
                    <div className="form-group local-forms">
                      <label>Search Children</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        placeholder="Enter Your child details"
                        id="search"
                        name="search"
                        value={value}
                        onChange={handleSearchChildrenInputChange}
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
                          {searchedChildren.map((ch, index) => (
                            <a
                              key={index}
                              className="dropdown-item"
                              name="student-details"
                              onClick={handleStudentDetailsClick}
                            >
                              <span style={{ display: "none" }}>{ch.id}</span>{" "}
                              {ch.firstName} {ch.lastName}
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
  );
};

export default UpdateParentById;
