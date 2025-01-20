const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { router } = require('./routes/userRoute');
const morgan = require('morgan');
const { issueRouter } = require('./routes/issueRoute');
const { projectRouter } = require('./routes/projectRoute');
dotenv.config();

const app = express();


app.use(cors())
app.use(express.json()); 
app.use(morgan('dev'))

app.use('/', router)
app.use('/', issueRouter)
app.use('/', projectRouter)


console.log("PORT IS ",process.env.PORT)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});