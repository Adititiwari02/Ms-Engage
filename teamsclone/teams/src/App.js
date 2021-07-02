import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import CreateRoom from './routes/CreateRoom';
import Room from './routes/Room';
import { Container } from "react-bootstrap"
import Dashboard from "./components/Connection/Dashboard"
import Login from "./components/Authentication/Login"
import PrivateRoute from "./components/Authentication/PrivateRoute"
import ForgotPassword from "./components/Authentication/ForgotPassword"
import UpdateProfile from "./components/Authentication/UpdateProfile"
import NoteCreateDelete from "./components/Notes/NoteCreateDelete"
import Signup from "./components/Authentication/Signup"
import { AuthProvider } from "./contexts/AuthContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './components/Connection/Users';
import Requests from './components/Connection/Requests';
import Connections from './components/Connection/Connections';
import ShowGroups from './components/Groups/ShowGroups';
import Chat from './components/Groups/Chat';

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <Route path="/call" exact component={CreateRoom} />
              <Route path="/Notes" exact component={NoteCreateDelete} />
              <Route path="/room/:roomID" component={Room} />
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/users" component={Users} />
              <PrivateRoute path="/requests" component={Requests} />
              <PrivateRoute path="/connections" component={Connections} />
              <PrivateRoute path="/groups" component={ShowGroups} />
              <PrivateRoute path="/chat/groups/:groupId/" component={Chat} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
