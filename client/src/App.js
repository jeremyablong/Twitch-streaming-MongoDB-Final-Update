import React, { Component } from 'react';
import NavbarHome from "./components/navbar/navbar.js";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import { fetchUser, fetchStream } from "./actions/index.js";
import { connect } from "react-redux";
import NavbarSurveys from "./components/navbar/navbar-surveys/navbar-surveys.js";
import NavbarSurveysNew from "./components/navbar/surveys-new/surveys-new.js";
import Jumbotron from "./components/homepage/jumbotron.js";
import StreamCreate from "./components/streams/StreamCreate.js";
import StreamDelete from "./components/streams/StreamDelete.js";
import StreamEdit from "./components/streams/StreamEdit.js";
import StreamList from "./components/streams/StreamList.js";
import StreamShow from "./components/streams/StreamShow.js";
import store from "./store/store.js";
import { matchPath } from 'react-router-dom';

////////////////// EDIT THESE FILES FOR PRODUCTION ///////////////
// 1. express - routes/authRoutes.js

class App extends Component {
constructor (props) {
  super(props);


}
  componentDidMount () {
     this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={NavbarHome}/>
          <Route exact path="/" component={Jumbotron}/>
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path={`/streams/show/*`} exact component={StreamShow}  />
          <Route path="/streams/edit/:id" exact component={StreamEdit} />
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
        {/*  <Route path="/streams/show/:id" exact component={StreamShow} />*/}
        </div>
      </BrowserRouter>
      );
  }
}

export default connect(null, { fetchUser, fetchStream })(App);
