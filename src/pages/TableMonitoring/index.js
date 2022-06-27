import React from 'react';
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';
import Table from './Table';
class TableMonitoring extends React.Component {
  state = {
    results: [],
  };
  //unsub = null;
  componentDidMount = async () => {
    const q = query(
      collection(firestore, 'results'),
      orderBy('createdAt', 'desc'),
      limit(16)
    );
    onSnapshot(q, (querySnapshot) => {
      const results = querySnapshot.docs.map((doc) => doc.data());
      this.setState({ results });
      // document
      //   .getElementsByClassName('dataTables_empty')[0]
      //   .parentNode.remove();
    });
    // this.unsub = onSnapshot(q, (querySnapshot) => {
    //   const results = querySnapshot.docs.map((doc) => doc.data());
    //   this.setState({ results });
    // });
  };

  convertSecondToDate(seconds) {
    const date = new Date(1970, 0, 0); // epoch
    date.setSeconds(seconds);
    // return date.toISOString();
    // return date.toTimeString();
    // return date.toString();
    const d = date.getDate();
    const M = date.getMonth();
    const y = date.getFullYear();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    return `${this.addZeroInFirst(d)}${d}/${this.addZeroInFirst(
      M
    )}${M}/${y} - ${this.addZeroInFirst(h)}${h}:${this.addZeroInFirst(
      m
    )}${m}:${this.addZeroInFirst(s)}${s}`;
  }

  addZeroInFirst(number) {
    return number.toString().length === 1 ? '0' : '';
  }

  componentWillUnmount = () => {
    // this.unsub();
  };
  render() {
    return (
      <>
        {/* <!-- Begin Page Content --> */}
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <h1 className="h3 mb-4 text-gray-800">Tabel Monitoring</h1>
          {/* <!-- DataTales Example --> */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Tabel Monitoring
              </h6>
            </div>
            <div className="card-body">
              {this.state.results.length !== 0 && (
                <Table results={this.state.results} />
              )}
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </>
    );
  }
}

export default TableMonitoring;
