import "reflect-metadata";
import { AppDataSource } from "./data-source"
import * as express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import * as cors from "cors";
import routes from './routes/index'


AppDataSource.initialize().then(async () => {

    // create express app
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use(express.static(__dirname + '/public'));

    //Set all routes from routes folder
    app.use("/", routes);


    // start express server
    app.listen(3000, () => {
        console.log("Server started on port 3000!");
    });


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
