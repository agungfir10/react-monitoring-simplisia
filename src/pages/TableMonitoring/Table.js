import React from 'react';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  addZeroInFirst(number) {
    return number.toString().length === 1 ? '0' : '';
  }

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
  render() {
    return (
      <div className="table-responsive">
        <table
          className="display table nowrap dataTable table-bordered"
          id="dataTable"
          width="100%"
        >
          <thead>
            <tr>
              <th width="60" align="center">
                No
              </th>
              <th>Jenis</th>
              <th>Suhu (⁰C)</th>
              <th>Kekeruhan (%)</th>
              <th>Tanggal & Waktu</th>
            </tr>
          </thead>
          <tbody>
            {this.props.results.map(
              ({ type, temp, turbidity, createdAt }, index) => (
                <tr key={index}>
                  <td className={`sorting_${index}`}>{(index += 1)}</td>
                  <td>{type}</td>
                  <td>{temp}</td>
                  <td>{turbidity}</td>
                  <td>{this.convertSecondToDate(createdAt.seconds)}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
