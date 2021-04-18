import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  constructor(props) {
    super(props);

    this.onChangeLabelname = this.onChangeLabelname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      labelname: '',
      description: '',
      date: new Date(),
      labels: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/labels/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            labels: response.data.map(label => label.labelname),
            labelname: response.data[0].labelname
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeLabelname(e) {
    this.setState({
      labelname: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const note = {
      labelname: this.state.labelname,
      description: this.state.description,
      date: this.state.date
    }

    console.log(note);

    axios.post('http://localhost:5000/notes/add', note)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Note Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Label: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.labelname}
              onChange={this.onChangeLabelname}>
              {
                this.state.labels.map(function (label) {
                  return <option
                    key={label}
                    value={label}>{label}
                  </option>;
                })
              }

            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Note" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}