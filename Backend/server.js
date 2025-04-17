const { connectDB } = require('./db/connectDB.js');
const express = require('express');
const app = express()

app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).send("Welcome to Actor Hiring Backend!");
})

app.get('/roles', (req, res) => {
    res.status(200).send("Welcome to Roles Page!");
})
app.use('/professional', require('./Resources/routes/ProfessionalRoutes.js'));
app.use('/film', require('./Resources/routes/FilmRoutes.js'))
app.use('/connections', require('./Resources/routes/ConnectionRoutes.js'));
app.use('/roles', require('./Resources/routes/RolesRoutes.js'));
app.use('/organization', require('./Resources/routes/OrganizationRoutes.js'));
app.use('/location', require('./Resources/routes/LocationRoutes.js'))
app.use('/booking', require('./Resources/routes/BookingRoutes.js'))
app.use('/post', require('./Resources/routes/PostRoutes.js'));
app.use('/comment', require('./Resources/routes/CommentRoutes.js'));

async function start() {
    try {
        await connectDB();
        app.listen(5000, () => {
            console.log("Server running on port 5000");
        })
    } catch (error) {
    console.error('Unable to start the server:', error);
    }
}

start();