const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const Producer = require('./producer')
const producer = new Producer()

app.use(bodyParser.json());
app.use(express.json())

app.post('/sendLog' ,async (req , res , nest) =>{
    const { logType , message} = req.body;
    await producer.publishMessage(logType , message);
    res.send();
})

app.listen(PORT ,()=>{
    console.log(`Serever has been started on port ${PORT}`);
})

