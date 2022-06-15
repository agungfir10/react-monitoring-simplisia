import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 0,
      humidity: 0,
      length: 0,
      data: {
        labels: [],
        datasets: [
          {
            label: 'Temperature',
            lineTension: 0.3,
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: 'rgba(78, 115, 223, 1)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointBorderColor: 'rgba(78, 115, 223, 1)',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
            pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [],
          },
          {
            label: 'Humidity',
            lineTension: 0.3,
            backgroundColor: 'rgba(78, 115, 223, 0.05)',
            borderColor: '#f6c23e',
            pointRadius: 3,
            pointBackgroundColor: '#f6c23e',
            pointBorderColor: '#f6c23e',
            pointHoverRadius: 3,
            pointHoverBackgroundColor: '#f6c23e',
            pointHoverBorderColor: '#f6c23e',
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [],
          },
        ],
      },
    };
  }

  optionsLineChart = {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0,
      },
    },
    scales: {
      xAxes: [
        {
          time: {
            unit: 'date',
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            maxTicksLimit: 7,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
          },
          gridLines: {
            color: 'rgb(234, 236, 244)',
            zeroLineColor: 'rgb(234, 236, 244)',
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2],
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      backgroundColor: 'rgb(255,255,255)',
      bodyFontColor: '#858796',
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
    },
  };

  unsubResults = null;

  componentDidMount() {
    const q = query(
      collection(firestore, 'results'),
      orderBy('createdAt', 'desc'),
      limit(30)
    );
    this.unsubResults = onSnapshot(q, (querySnapshot) => {
      const results = querySnapshot.docs.map((doc) => doc.data());
      const yAxisDataTemp = results.map((result) => result.temp);
      const yAxisDataHumidity = results.map((result) => result.humidity);
      const xAxisData = results.map((result) =>
        this.dateToStringSecond(result.createdAt.seconds)
      );

      this.setState({
        data: {
          labels: xAxisData,
          datasets: [
            { ...this.state.data.datasets[0], data: yAxisDataTemp },
            { ...this.state.data.datasets[1], data: yAxisDataHumidity },
          ],
        },
      });
      this.setState({
        temp: yAxisDataTemp[0],
        humidity: results[0].humidity,
        length: results.length,
      });
      //this.setState({ results });
    });
  }

  componentWillUnmount() {
    this.unsubResults();
  }

  dateToStringSecond(seconds) {
    const date = new Date(1970, 0, 0); // epoch
    date.setSeconds(seconds + 25200);

    return `${date.getHours()}:${date.getSeconds()}`;
  }

  handleOnClickOnOffMachine() {}
  render() {
    return (
      <>
        {/* <!-- Begin Page Content --> */}
        <div className="container-fluid">
          {/* <!-- Page Heading --> */}
          <h1 className="h3 mb-4 text-gray-800">Dashboard</h1>
          {/* <!-- Content Row --> */}
          <div className="row">
            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Suhu
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.temp + '⁰C'}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Kelembapan
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {this.state.humidity}
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Jumlah Data
                      </div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                            {this.state.length}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Water Level --> */}
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Water Level
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        20
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-comments fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Area Chart --> */}
            <div className="col-xl-12">
              <div className="card shadow mb-4">
                {/* <!-- Card Header - Dropdown --> */}
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Grafik Data Simplisia
                  </h6>
                  <div className="dropdown no-arrow">
                    <Link
                      className="dropdown-toggle"
                      to="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </Link>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <div className="dropdown-header">Tipe Simplisia</div>
                      <Link className="dropdown-item" to="#">
                        Akar
                      </Link>
                      <Link className="dropdown-item" to="#">
                        Another action
                      </Link>
                    </div>
                  </div>
                </div>
                {/* <!-- Card Body --> */}
                <div className="card-body">
                  <div className="chart-area">
                    <Chart
                      type="line"
                      data={this.state.data}
                      options={this.optionsLineChart}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /.container-fluid --> */}
      </>
    );
  }
}

export default Dashboard;
