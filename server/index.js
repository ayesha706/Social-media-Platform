const express = require( 'express');
require('dotenv').config();
const { connectDB } = require('./configDB/db.js');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const postRoutes = require('./routes/postRoutes.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const path = require('path')
app.use('/api', express.static(path.join(__dirname, 'files')))

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 8000

connectDB().then((res) => {
    app.listen(port , () => { console.log(`Server started in port ${port}`) })
}).catch((err) => console.log('err', err))

