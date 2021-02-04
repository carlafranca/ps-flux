import React from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

function AuthorList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Author Name</th>
        </tr>
      </thead>
      <tbody>
        {props.authors.map((author) => (
          <tr key={author.id}>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  props
                    .deleteAuthor(author.id)
                    .then(() => toast.success("Author deleted."));
                }}
              >
                Delete
              </button>
            </td>
            <td>{author.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

AuthorList.propTypes = {
  deleteAuthor: PropTypes.func.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AuthorList;
