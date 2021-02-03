import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    authorApi.getAuthors().then((authors) => {
      //add authors name to course object
      savedCourse.name = authors.find(
        (author) => author.id === savedCourse.authorId
      ).name;

      //tell dispatcher, to tell the stores that a course was just created.
      dispatcher.dispatch({
        actionType: course.id
          ? actionTypes.UPDATE_COURSE
          : actionTypes.CREATE_COURSE,
        course: savedCourse,
      });
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((courses) => {
    // //get Authors name and add to courses
    authorApi.getAuthors().then((authors) => {
      //add authors name to course object
      courses.map(
        (course) =>
          (course.name = authors.find(
            (author) => author.id === course.authorId
          ).name)
      );
      dispatcher.dispatch({
        actionType: actionTypes.LOAD_COURSES,
        courses: courses,
      });
    });
  });
}

export function deleteCourse(id) {
  return courseApi.deleteCourse(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      id: id,
    });
  });
}
