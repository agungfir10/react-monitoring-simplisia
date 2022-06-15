import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { firestore } from '../Firebase/firebase';
import WithAuthentication from '../Session';
import AuthUserContext from '../Session/context';
const Register = (props) => {
  return (
    <WithAuthentication>
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser !== null ? (
            <Navigate to="/admin" />
          ) : (
            <RegisterPage {...props} />
          )
        }
      </AuthUserContext.Consumer>
    </WithAuthentication>
  );
};

const RegisterPage = (props) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const INITIAL_STATE = {
    email: '',
    password: '',
    fullname: '',
    error: false,
    btnDisabled: '',
    alert: 'info',
    errorMessage: '',
  };
  const [state, setState] = React.useState({ ...INITIAL_STATE });
  const onSubmit = async (event) => {
    event.preventDefault();
    const { email, password, fullname, code } = state;
    const q = query(
      collection(firestore, 'codes'),
      limit(1),
      where('code', '==', code)
    );

    const { docs } = await getDocs(q);

    if (docs.length === 1) {
      try {
        const userAuth = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const { uid } = userAuth.user;
        await setDoc(
          doc(firestore, 'users', uid),
          {
            name: fullname,
            uid,
            email,
          },
          { merge: true }
        );

        setTimeout(() => {
          navigate('/');
        }, 4000);
      } catch (error) {
        setState({
          ...state,
          error: true,
          errorMessage: error.message,
          alert: 'danger',
        });
      }
    } else {
      setState({
        ...state,
        error: true,
        errorMessage: 'Kode salah!',
        alert: 'danger',
      });
    }
  };

  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container-fluid bg-gradient-primary">
        <div className="container bg-gradient-primary">
          {/* <!-- Outer Row --> */}
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                  {/* <!-- Nested Row within Card Body --> */}
                  <div className="p-5">
                    {/* <%- include('./partials/message.ejs') %> */}
                    <div className="text-center">
                      <h1 className="h4 text-primary mb-4">
                        Simplisia Monitoring
                      </h1>
                      <h5 className="h5 text-gray-900 mb-4">Register</h5>
                      {state.error && (
                        <div
                          className={`alert alert-${state.alert}`}
                          role="alert"
                        >
                          {state.errorMessage}
                        </div>
                      )}
                    </div>
                    <form className="user">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="fullname"
                          aria-describedby="fullNameHelp"
                          placeholder="Enter FullName"
                          name="fullname"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          name="email"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={onChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="code"
                          placeholder="Code"
                          name="code"
                          onChange={onChange}
                        />
                      </div>
                      <button
                        className="btn btn-primary btn-user btn-block"
                        onClick={onSubmit}
                      >
                        Login
                      </button>
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link to="/admin/login" className="small">
                        Sudah punya akun?
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
