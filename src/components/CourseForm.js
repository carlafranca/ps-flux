import React from "react";
import TextInput from "./common/TextInput";
import Select from "./common/Select";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        name="title"
        label="Title"
        value={props.course.title}
        onChange={props.onChange}
        error={props.errors.title}
      />

      <Select
        id="author"
        name="authorId"
        label="Author"
        value={props.course.authorId || ""}
        onChange={props.onChange}
        list={props.authors}
        error={props.errors.authorId}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        value={props.course.category}
        onChange={props.onChange}
        error={props.errors.category}
      />

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

//Document component's expectations
CourseForm.protoTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
