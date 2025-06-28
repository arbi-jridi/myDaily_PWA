process.env.NODE_NO_WARNINGS = '1';
const express =require('express');
const nedb =require('nedb');
const rest =require('express-nedb-rest');
const cors =require('cors');
const bodyParser =require('body-parser');

const app = express();
const port = 3000;
app.use(cors());

const datastore = new nedb({ filename: 'data.db', autoload: true });
const restApi = rest();

restApi.addDatastore('daily',datastore)


app.use("/",restApi)

app.use(bodyParser.json());

app.listen(port,()=>{
    console.log('listening on port 3000')
})