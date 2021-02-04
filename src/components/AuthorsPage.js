import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import authorStore from "../stores/authorStore";
import { loadAuthors, deleteAuthor } from "../actions/authorActions";
import AuthorList from "./AuthorList";

function AuthorsPage() {
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    authorStore.addChangeListener(onChange);

    if (authorStore.getAuthors().length === 0) loadAuthors();

    return () => authorStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  return (
    <>
      <h2>Authors</h2>
      <Link className="btn btn-primary" to="/author">
        Add Authors
      </Link>
      <AuthorList authors={authors} deleteAuthor={deleteAuthor} />
    </>
  );
}

export default AuthorsPage;
