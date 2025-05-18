const express = require('express');
const notificationRoutes = require('./routes/notification');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', notificationRoutes); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
