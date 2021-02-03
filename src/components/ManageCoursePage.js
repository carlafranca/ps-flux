import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";

import authorStore from "../stores/authorStore";
import * as authorActions from "../actions/authorActions";

const ManageCoursePage = (props) => {
  const [errors, setErros] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  const [authors, setAuthors] = useState(authorStore.getAuthors);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    //from the path /course/:slug
    const slug = props.match.params.slug;
    if (courses.length === 0) {
      //check if courses exists
      courseActions.loadCourses(); //if not load all courses
      authorActions.loadAuthors();

      //if slug exists
    } else if (slug) {
      const courseBySlug = courseStore.getCourseBySlug(slug);
      courseBySlug ? setCourse(courseBySlug) : props.history.push("/404");
    }
    //clean listner on componentWillUnmount
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug, props.history]); //dependencies to update

  function onChange() {
    setCourses(courseStore.getCourses());
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    //create a copy of th ecourse obj (using spread operator) to avoide multating state
    //using computed property syntax
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";

    setErros(_errors);
    //Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }
  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
