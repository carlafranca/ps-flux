import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    //tell dispatcher, to tell the stores that a course was just created.
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}
