import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Room from './routes/Room';
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
import "./App.css"
import Information from './components/AppInfo/Information';
import FeedbackForms from './components/Groups/FeedbackForms';
import FillForm from './components/Groups/FillForm';
import FeedbackResults from './components/Groups/FeedbackResults';
import FeedbackResponses from './components/Groups/FeedbackResponses';
import RoomWithChat from "./routes/RoomWithChat";

function App() {
  return (
      <div>
        <BrowserRouter>
          <AuthProvider>  
            <Switch>
              <Route path="/call/:groupId/:roomID" exact component={RoomWithChat} />
              <Route path="/Notes" exact component={NoteCreateDelete} />
              <Route path="/room/:roomID" component={Room} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/users" component={Users} />
              <PrivateRoute path="/requests" component={Requests} />
              <PrivateRoute path="/connections" component={Connections} />
              <PrivateRoute path="/groups" component={ShowGroups} />
              <PrivateRoute path="/chat/groups/:groupId/" component={Chat} />
              <PrivateRoute path="/chat/feedback/:groupId/" component={FeedbackForms} />
              <PrivateRoute path="/chat/feedbackResults/:groupId/:formId" component={FeedbackResponses} />
              <PrivateRoute path="/chat/feedbackResults/:groupId/" component={FeedbackResults} />
              <PrivateRoute path="/chat/:groupId/:formId/" component={FillForm} />
              <PrivateRoute path="/" component={Information} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>
        </div>
  );
}

export default App;
