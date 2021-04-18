import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import NotesList from "./components/notes-list.component";
import EditNote from "./components/edit-note.component";
import CreateNote from "./components/create-note.component";
import CreateLabel from "./components/create-label.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/label" component={CreateLabel} />
      </div>
    </Router>
  );
}

export default App;
