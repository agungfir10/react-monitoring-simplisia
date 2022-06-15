import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import AuthUserContext from '../Session/context';
import Navbar from './Navbar';
import { Sidebar } from './Sidebar';
import { signOut, getAuth } from 'firebase/auth';
import WithAuthentication from '../Session';
const Admin = () => {
  return (
    <WithAuthentication>
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser !== null ? <AdminPage /> : <Navigate to="/admin/login" />
        }
      </AuthUserContext.Consumer>
    </WithAuthentication>
  );
};

const AdminPage = () => {
  const navigate = useNavigate();
  const doSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        document.getElementsByClassName('modal-backdrop')[0].remove();
        localStorage.removeItem('authUser');
        navigate('/admin/login', { replace: true });
      })
      .catch((err) => alert('sign out error'));
  };
  return (
    <>
      {/*<!-- Page Wrapper -->*/}
      <div id="wrapper">
        {/*<!-- Page Wrapper -->*/}

        <Sidebar />
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          <Navbar />
          {/* <!-- Main Content --> */}
          <div id="content">
            <Outlet />
          </div>
          {/* <!-- End of Main Content --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <!-- End of Page Wrapper --> */}

      {/* <!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      {/* <!-- Logout Modal--> */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Kamu yakin ingin keluar?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Pilih "Keluar" dibawah ini jika kamu ingin keluar dan menghapus
              sesi.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Batal
              </button>
              <button className="btn btn-primary" onClick={doSignOut}>
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
