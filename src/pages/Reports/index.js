import React from 'react';

export const Reports = () => {
  return (
    <>
      {/* <!-- Begin Page Content --> */}
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <h1 className="h3 mb-4 text-gray-800">Reports</h1>
        <div className="row">
          <div className="col-12 col-sm-6">
            <button className="btn btn-block card">
              <div className="card-body">Export PDF</div>
            </button>
          </div>
          <div className="col-12 col-sm-6">
            <button className="btn btn-block card">
              <div className="card-body">Export Excel</div>
            </button>
          </div>
        </div>
      </div>
      {/* <!-- /.container-fluid --> */}
    </>
  );
};

export default Reports;
