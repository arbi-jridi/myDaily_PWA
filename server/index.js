const express =require('express');
const nedb =require('nedb');
const rest =require('express-nedb-rest');

const app = express();
const port = 3000;

const datastore = new nedb({ filename: 'data.db', autoload: true });
const restApi = new rest();

restApi.addDatastore('daily',datastore)

app.use("/api/daily",restApi)

app.listen(port,()=>{
    console.log('listening on port 3000')
})