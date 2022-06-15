import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import React from 'react';
import { firestore } from '../Firebase/firebase';

class Engines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      engines: [],
    };

    this.changeStatus = this.changeStatus.bind(this);
  }

  unsub = null;

  componentDidMount() {
    const q = query(collection(firestore, 'engines'));
    this.unsub = onSnapshot(q, (querySnapshot) => {
      const engines = querySnapshot.docs.map((doc) => {
        const data = { ...doc.data(), id: doc.id };
        return data;
      });
      this.setState({ engines });
    });
  }

  componentWillUnmount() {
    this.unsub();
  }

  async changeStatus(id, status) {
    const ref = doc(firestore, 'engines', id);
    await updateDoc(ref, {
      status: !status,
    });
  }
  render() {
    return (
      <>
        {/* <!-- Begin Page Content --> */}
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <h1 className="h3 mb-4 text-gray-800">Mesin</h1>
          {/* <!-- DataTales Example --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Data Mesin</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="data" width="100%">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Jenis</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.engines.map((engine, index) => (
                      <tr key={engine.id}>
                        <td>{(index += 1)}</td>
                        <td>{engine.type}</td>
                        <td>
                          {engine.status ? (
                            <span className="alert py-0 px-2 rounded alert-success">
                              On
                            </span>
                          ) : (
                            <span className="alert py-0 px-2 rounded alert-danger">
                              Off
                            </span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary py-0 px-1"
                            onClick={() =>
                              this.changeStatus(engine.id, engine.status)
                            }
                          >
                            <i className="fa fa-power-off"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </>
    );
  }
}

export default Engines;
