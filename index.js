const express = require('express');
const path = require('path');
const app = express();
const members = require('./routers/members');
const logger = require('./middleware/logger');

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")))
app.use('/api/members', members);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server listing at port ${PORT}`);
})

