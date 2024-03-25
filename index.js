const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected')
})
    .catch((err) => {
        console.log(err)
    })

// user Router
app.use('/api/user', require('./router/userRouter'))
// service Router 
app.use('/api/services', require('./router/serviceRouter'))
// appointment Router
app.use('/api/appointment', require('./router/appointmentRouter'))


app.get('/proxy', async (req, res) => {
    console.log(req,res)
    const { url } = req.query;
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  });


const PORT = 4000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))