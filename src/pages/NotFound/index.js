import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="display-1">404</h1>
        <p className="display-4">Not Found</p>
        <Link className="btn btn-primary" to="/admin">
          Back To Home
        </Link>
      </div>
    </>
  );
}
