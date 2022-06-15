import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthUserContext from '../Session/context';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import WithAuthentication from '../Session';
const Login = (props) => {
  return (
    <WithAuthentication>
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser !== null ? (
            <Navigate to="/admin" />
          ) : (
            <LoginPage {...props} />
          )
        }
      </AuthUserContext.Consumer>
    </WithAuthentication>
  );
};

const LoginPage = (props) => {
  const navigate = useNavigate();

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    errorMessage: '',
    alert: 'danger',
  };
  const [state, setState] = React.useState({ ...INITIAL_STATE });

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = state;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        //navigate('/');
      })
      .catch((error) => {
        setState({ ...state, error: true, errorMessage: error.message });
      });
  };
  const onChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  return (
    <div className="container-fluid bg-gradient-primary">
      <div className="container bg-gradient-primary">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-primary mb-4">
                      Simplisia Monitoring
                    </h1>
                    <h5 className="h5 text-gray-900 mb-4">Welcome Back!</h5>
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
                        type="email"
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
                        id="exampleInputPassword"
                        placeholder="Password"
                        name="password"
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
                    <Link to="/admin/register" className="small">
                      Buat Akun
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
