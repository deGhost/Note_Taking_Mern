import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditNote extends Component {
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
    axios.get('http://localhost:5000/notes/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          labelname: response.data.labelname,
          description: response.data.description,
          date: new Date(response.data.date)
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/labels/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            labels: response.data.map(label => label.labelname),
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

    axios.post('http://localhost:5000/notes/update/' + this.props.match.params.id, note)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Note Log</h3>
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
            <input type="submit" value="Edit Note Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}