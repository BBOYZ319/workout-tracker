const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/router');
const actRoute = require('./route/act-router');
const profileRoute = require('./route/profile-router');
const communityRoute=require('./route/community-router')
const friendRoute=require('./route/friend-router')
const leaderboardRoute=require('./route/leaderboards-router')
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/',route);
app.use('/', actRoute);
app.use('/',profileRoute);
app.use('/',communityRoute);
app.use('/',friendRoute);
app.use('/',leaderboardRoute);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

