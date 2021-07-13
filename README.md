# Ms-Engage Teams Clone
The project was built as a part of the Microsoft Engage '21 Program. Contributors were required to build a clone of the Teams app with the mandatory feature of connecting via video call and incorporate Agile Methodology into our work. Within a span of 4 weeks the participants were also given a adopt phase of incorporating a chat feature. <br />
Link to the project: [Ms-Engage Teams Clone](http://ms-engage-teams-clone.herokuapp.com/)

# Features Implemented
1. Group video call
2. Audio/video toggle option and screen share feature
3. group chatting facility before, during and after call
4. Authentication and login
5. Updating Profile
6. View all the users of app
7. Send and accept connection requests
8. View your connections
9. Ability to create groups
10. Make notes inside group
11. Create survey forms
12. Fill survey forms
13. View the results of the form created by you
14. 6 different themes to choose from
15. The site is completely responsive
16. Tooltips were added to help with the user experience

# Tech Stack
<p align ="center">
  <code><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO95JO0pysN9eTwWi8yvtSX1RgbIY4zFShMREqGTfPTcrTmD4O8AmQwwdHLWJ0hFe_D_I&usqp=CAU" width="10%" />             </code>
  <code><img src="https://img.icons8.com/color/48/000000/react-native.png" width="5%" /></code>
  <code><img src="https://img.icons8.com/color/48/000000/firebase.png" width="5%" /></code>
  <code><img src="https://cdn.worldvectorlogo.com/logos/socket-io.svg" width="5%" /></code>
  <code><img src="https://img.icons8.com/windows/64/26e07f/node-js.png" width="5%"/></code>
  <code><img src="https://img.icons8.com/color/64/000000/git.png" width="5%"/></code>
  <code><img src="https://img.icons8.com/color/64/000000/github.png" width="5%"/></code>
</p>

# Implementation
1. ### Group Video Call Feature
   In the app there are two ways one can have a video call: 
     * Instant meeting
     * Inside the groups<br />
     
   When having a call via the instant meeting, options like chat, notes and surveys is not available. This feature is for those who want to connect but dont want to create a        group or store conversations for later. For making this real time communication possible, **webRTC** with **socket.io** was used to make simple peer connections withing a mesh network. Whenever a new peer joins ze makes a simple peer connection with each of the existing peers. For the audio/video controls and the screen share feature we replace the audio/video track with the desired input. The **simple-peer** library was also used. 
3. ### Database Models for group chat, surveys, connections etc
   For the entire application the database service used was firestore database. On sign up each user gets added into the **users** collection and each document inside the collection(i.e each user) has certain fields like ze's email theme choice etc. Further each user also has a **connections** and **connection requests** collecton inside them. This is helpful in sending and accepting requests. Users that are connected are shown on the connections page and we have the option of creating groups with them. When a group is created the all the selected users get added in that group and the group gets added inside the **groups** collection with each group having a unique ID. Every group then has three more collections namely **messages**, **feedback forms**, **feedback results** and **notes**. The messages are rendered by the ascending order of timestamp. Feedback forms and feedback results further have the creator of the form stored inside them. This is done to avoid creator of the form from filling the form and non creators from seeing the results. When a user creates a notes it gets added inside the notes collection and similarly on deleting a note we delete the document from the notes collection. 
<br />
Since all the messages are getting stored in the database conversations that happen inside the video call are also getting stored and will be available post call.

# Snapshots of the project
<h4>Video Call feature</h4>
<img src="/teamsclone/teams/src/Images/videoCall.jpeg" width=600 height=400>
<br />
<h4>Groups and Chat</h4>
<p float="left">
  <img src="/teamsclone/teams/src/Images/createGroup.png" width=400 height=300 />
  <img src="/teamsclone/teams/src/Images/chat.png" width=400 height=300/>
</p>
<br />
<h4>Numerous themes to choose from</h4>
<p float="left">
  <img src="/teamsclone/teams/src/Images/theme1.png" width=280 height=300 />
  <img src="/teamsclone/teams/src/Images/theme2.png" width=280 height=300/>
  <img src="/teamsclone/teams/src/Images/theme3.png" width=280 height=300/>
</p>
<br />
<h4>Survey forms</h4>
<p float="left">
  <img src="/teamsclone/teams/src/Images/feedbackCreate.png" width=280 height=300 />
  <img src="/teamsclone/teams/src/Images/feedbackFill.png" width=280 height=300/>
  <img src="/teamsclone/teams/src/Images/feedbackResult.png" width=280 height=300/>
</p>
<br />
<h4>Notes Section</h4>
<img src="/teamsclone/teams/src/Images/notes.png" width=600 height=400 />
<br />
<h4>Profiles, users and connections</h4>
<p float="left">
  <img src="/teamsclone/teams/src/Images/profile.png" width=280 height=300 />
  <img src="/teamsclone/teams/src/Images/users.png" width=280 height=300/>
  <img src="/teamsclone/teams/src/Images/connectionRequests.png" width=280 height=300/>
</p>

# Major Learnings
1. **Agile Methodology**: Through the 4 week span of the project, I undertook weekly sprints and made sure that small features get implemented in an efficient and time bound manner. Having a usable version of the product from the very beginning and seeing it evolve through the days and weeks was a joyful experience.
2. **Perseverance and debugging skills**: Having faced numerous bugs that seemed *impossible* to solve at first to actually overcoming them felt like victory. It improved my problem solving skills and faith in hardwork.
3. **New Technologies**: The project was a fun introduction to webRTC, sockets and databases for me and I thoroughly enjoyed learning the new technologies. With the help of my friends and mentors as well as self study I was able to grow my knowledge.
4. **Growth mindset**: The sessions as well as the project taught me that our skills can be improved and having a growth mindset helps one and their organization in the long run.
