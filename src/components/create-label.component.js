import React, { Component } from 'react';
import axios from 'axios';

export default class CreateLabel extends Component {
  constructor(props) {
    super(props);

    this.onChangeLabelname = this.onChangeLabelname.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      labelname: ''
    }
  }

  onChangeLabelname(e) {
    this.setState({
      labelname: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const label = {
      labelname: this.state.labelname
    }

    console.log(label);

    axios.post('http://localhost:5000/labels/add', label)
      .then(res => console.log(res.data));

    this.setState({
      labelname: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Add new Label</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Label: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.labelname}
              onChange={this.onChangeLabelname}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Label" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}