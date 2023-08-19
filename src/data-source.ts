import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User.js"
import { Passenger } from "./entity/Passenger.js"
import 'dotenv/config';

export const AppDataSource: DataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Passenger],
    migrations: [],
    subscribers: [],
    ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CA,
    },
})
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))