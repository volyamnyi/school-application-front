import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  //baseURL: "https://d2e6-95-46-32-4.ngrok-free.app",
});

export const getHeader = () => {
  const token = localStorage.getItem("accessToken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "123",
  };
};

/* Begin User Area */

export async function userLogin(login) {
  try {
    const response = await api.post("/api/public/auth/login", login, {
      "ngrok-skip-browser-warning": "123",
    });
    /*if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }*/
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function userRegister(registration) {
  try {
    const response = await api.post(
      "/api/public/registration/register",
      registration,
      { "ngrok-skip-browser-warning": "123" }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}
/* End User area */

/* Begin Teacher area */
export async function getAllTeachers() {
  try {
    const response = await api.get("/api/teachers", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching teachers");
  }
}

export async function getTeacherById(teacherId) {
  try {
    const response = await api.get(`/api/teachers/${teacherId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching teacher ${error.message}`);
  }
}

export async function addTeacher(firstName, lastName, email, phone) {
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("phone", phone);

  try {
    const response = await api.post("/api/teachers", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateTeacherById(teacherId, studentData) {
  const formData = new FormData();
  formData.append("firstName", studentData.firstName);
  formData.append("lastName", studentData.lastName);
  formData.append("email", studentData.email);
  formData.append("phone", studentData.phone);

  try {
    const response = await api.put(`/api/teachers/${teacherId}`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteTeacherById(teacherId) {
  try {
    const response = await api.delete(`/api/teachers/${teacherId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
/* End Teacher area */

/* Begin Subject area */
export async function getAllSubjects() {
  try {
    const response = await api.get("/api/subjects", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching subjects");
  }
}

export async function getSubjectById(subjectId) {
  try {
    const response = await api.get(`/api/subjects/${subjectId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching subject ${error.message}`);
  }
}

export async function addSubject(name) {
  const formData = new FormData();
  formData.append("name", name);

  try {
    const response = await api.post("/api/subjects", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateSubjectById(subjectId, subjectData) {
  const formData = new FormData();
  formData.append("name", subjectData.name);

  try {
    const response = await api.put(`/api/subjects/${subjectId}`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function uploadSubjectsFromFile(file) {
  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await api.post(`/api/subjects/import`, formData, {
      headers: { ...getHeader(), "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function deleteSubjectById(subjectId) {
  try {
    const response = await api.delete(`/api/subjects/${subjectId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* End Subject area */

/* Begin Lesson area */
export async function getAllLessonsBySubjectId(subjectId) {
  try {
    const response = await api.get(`/api/lessons/subjects/${subjectId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching lessons");
  }
}

export async function getAllLessonsByModuleId(moduleId) {
  try {
    const response = await api.get(`/api/lessons/modules/${moduleId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching lessons");
  }
}

export async function getLessonById(lessonId) {
  try {
    const response = await api.get(`/api/lessons/${lessonId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching lesson ${error.message}`);
  }
}

export async function addLesson(lessonData) {
  const formData = new FormData();
  formData.append("name", lessonData.name);
  formData.append("date", lessonData.date);
  formData.append("period", lessonData.period);
  formData.append("homework", lessonData.homework);
  formData.append("moduleId", lessonData.moduleId);

  try {
    const response = await api.post("/api/lessons", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateLessonById(lessonData) {
  const formData = new FormData();
  formData.append("id", lessonData.id);
  formData.append("name", lessonData.name);
  formData.append("date", lessonData.date);
  formData.append("period", lessonData.period);
  formData.append("homework", lessonData.homework);
  formData.append("moduleId", lessonData.moduleId);

  try {
    const response = await api.put(`/api/lessons`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteLessonById(lessonId) {
  try {
    const response = await api.delete(`/api/lessons/${lessonId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* End Lesson area */
/* Begin Attendance Area */
export async function getAllAttendance() {
  
  try {
    const response = await api.get("/api/attendances", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching attendance");
  }
}

export async function addAttendance(attendanceData) {
  const formData = new FormData();
  
  formData.append("lessonId", attendanceData.lessonId);
  formData.append("studentId", attendanceData.studentId);
  formData.append("attendanceType", attendanceData.attendanceType);
  

  try {
    const response = await api.post("/api/attendances", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateAttendanceById(attendanceId,attendanceData) {
  const formData = new FormData();
  
  formData.append("lessonId", attendanceData.lessonId);
  formData.append("studentId", attendanceData.studentId);
  formData.append("attendanceType", attendanceData.attendanceType);
  

  try {
    const response = await api.put(`/api/attendances/${attendanceId}`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteAttendanceById(attendanceId) {
  try {
    const response = await api.delete(`/api/attendances/${attendanceId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
/* End Attendance Area */

/* Begin ClassGroups area */
export async function getAllClassGroups() {
  try {
    const response = await api.get("/api/classes", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching classes");
  }
}

export async function getClassGroupById(classGroupId) {
  try {
    const response = await api.get(`/api/classes/${classGroupId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching class ${error.message}`);
  }
}

export async function addClassGroup(name) {
  const formData = new FormData();
  formData.append("name", name);

  try {
    const response = await api.post("/api/classes", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateClassGroupById(classGroupData) {
  const formData = new FormData();
  formData.append("id", classGroupData.id);
  formData.append("name", classGroupData.name);

  try {
    const response = await api.put(`/api/classes`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function addStudentToClassGroup(classGroupId, studentId) {
  console.log(
    "classGroupId: " + classGroupId + " " + "studentId: " + studentId
  );
  try {
    const response = await api.put(
      `/api/classes/${classGroupId}/${studentId}`,
      {},
      { headers: getHeader() }
    );
    console.log(response);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteClassGroupById(classGroupId) {
  try {
    const response = await api.delete(`/api/classes/${classGroupId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* End Classes area */

/* Begin Module area */
export async function getAllModulesBySubjectId(subjectId) {
  try {
    const response = await api.get(
      `/api/modules/subjects/${subjectId}/modules`,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching modules");
  }
}

export async function getModuleById(moduleId) {
  try {
    const response = await api.get(`/api/modules/${moduleId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching module");
  }
}
const convertDateToZonedDateTime = (data) => {
  const startDate = new Date(data.startDate);

  // Get the time zone offset in minutes and convert it to the format +hh:mm or -hh:mm

  const timeZoneOffsetInMinutes = startDate.getTimezoneOffset();
  const hoursOffset = Math.floor(timeZoneOffsetInMinutes / 60);
  const minutesOffset = timeZoneOffsetInMinutes % 60;
  const timeZoneOffset = `${hoursOffset >= 0 ? "+" : "-"}${Math.abs(hoursOffset)
    .toString()
    .padStart(2, "0")}:${minutesOffset.toString().padStart(2, "0")}`;

  const moduleStartDate =
    data.startDate + "T" + "00:00:00.0000000" + timeZoneOffset;
  const moduleEndDate =
    data.endDate + "T" + "00:00:00.0000000" + timeZoneOffset;

  data.startDate = moduleStartDate;
  data.endDate = moduleEndDate;
};
export async function addModule(moduleData) {
  convertDateToZonedDateTime(moduleData);
  //formData.append("startDate", "2023-11-06T18:37:32.0338691+02:00");
  //formData.append("endDate", "2023-12-06T18:37:32.0338691+02:00");
  moduleData.schedule = Array.from(moduleData.schedule.entries()).reduce(
    (obj, [key, value]) => {
      obj[key] = Array.from(value);
      return obj;
    },
    {}
  );

  try {
    const response = await api.post("/api/modules", moduleData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateModuleById(moduleId, moduleData) {
  convertDateToZonedDateTime(moduleData);

  moduleData.schedule = Array.from(moduleData.schedule.entries()).reduce(
    (obj, [key, value]) => {
      obj[key] = Array.from(value);
      return obj;
    },
    {}
  );

  try {
    const response = await api.put(`/api/modules/${moduleId}`, moduleData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteModuleById(moduleId) {
  try {
    const response = await api.delete(`/api/modules/${moduleId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* End Module area */

/* Begin Student area */
export async function getAllStudents() {
  try {
    const response = await api.get("/api/students", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching students");
  }
}

export async function searchStudents(keyword) {
  try {
    const response = await api.get(`/api/students/search?keyword=${keyword}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching students");
  }
}

export async function getStudentById(studentId) {
  try {
    const response = await api.get(`/api/students/${studentId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching students ${error.message}`);
  }
}

export async function addStudent(firstName, lastName, email, phone) {
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("phone", phone);

  try {
    const response = await api.post("/api/students", formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateStudentById(studentId, studentData) {
  const formData = new FormData();
  formData.append("firstName", studentData.firstName);
  formData.append("lastName", studentData.lastName);
  formData.append("email", studentData.email);
  formData.append("phone", studentData.phone);

  try {
    const response = await api.put(`/api/students/${studentId}`, formData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function uploadStudentsFromFile(file) {
  const formData = new FormData();

  formData.append("file", file);

  try {
    const response = await api.post(`/api/students/import`, formData, {
      headers: { ...getHeader(), "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function deleteStudentById(studentId) {
  try {
    const response = await api.delete(`/api/students/${studentId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
/* End Student area */

/* Begin Parent area */
export async function getAllParents() {
  try {
    const response = await api.get("/api/parents", { headers: getHeader() });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching parents");
  }
}

export async function getParentById(parentId) {
  try {
    const response = await api.get(`/api/parents/${parentId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching parents ${error.message}`);
  }
}

export async function addParent(parentData) {
  try {
    const response = await api.post("/api/parents", parentData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateParentById(parentId, parentData) {
  /*const formData = new FormData();
  formData.append("firstName", parentData.firstName);
  formData.append("lastName", parentData.lastName);
  formData.append("email", parentData.email);
  formData.append("childrenId", parentData.childrenId);*/

  try {
    const response = await api.put(`/api/parents/${parentId}`, parentData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteParentById(parentId) {
  try {
    const response = await api.delete(`/api/parents/${parentId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
}
/* End Parent area */

/* Begin Medical Records area */
export async function getAllMedicalRecords() {
  try {
    const response = await api.get("/api/medical-records", {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching medical records");
  }
}

export async function getMedicalRecordsById(recordsId) {
  try {
    const response = await api.get(`/api/medical-records/${recordsId}`, {
      headers: getHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching records ${error.message}`);
  }
}
/** */
export async function addMedicalRecords(medicalRecordsData) {
  const formData = new FormData();
  formData.append("healthGroup", medicalRecordsData.healthGroup);
  formData.append("allergies", medicalRecordsData.allergies);
  formData.append("info", medicalRecordsData.info);
  try {
    const response = await api.post(
      `/api/medical-records/${medicalRecordsData.studentId}`,
      formData,
      {
        headers: getHeader(),
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateMedicalRecordsById(
  medicalRecordsId,
  medicalRecordsData
) {
  const formData = new FormData();
  formData.append("healthGroup", medicalRecordsData.healthGroup);
  formData.append("allergies", medicalRecordsData.allergies);
  formData.append("info", medicalRecordsData.allergies);

  try {
    const response = await api.put(
      `/api/medical-records/${medicalRecordsId}`,
      formData,
      {
        headers: getHeader(),
      }
    );
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteMedicalRecordsById(medicalRecordsId) {
  try {
    const response = await api.delete(
      `/api/medical-records/${medicalRecordsId}`,
      {
        headers: getHeader(),
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* End Medical Records area */
