import React, { useState, useEffect } from "react";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import courseStore from "../stores/courseStore";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    //subscribe to the flux store
    //and call the function everytime the courseStore change
    courseStore.addChangeListener(onChange);

    //the flux courseStore is initialized to an empty array
    //we need to request the list of courses if this page has been loaded for the first time
    //so call the getCourses from the courseActions
    //check if there are courses
    if (courseStore.getCourses().length === 0) loadCourses();
    //cleanup on unmount
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
