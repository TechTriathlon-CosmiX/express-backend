import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv/config';

import { User } from "./entity/User.js"
import {Planet} from "./entity/Planet.js";
import {Spaceline} from "./entity/Spaceline.js";
import {Spaceship} from "./entity/Spaceship.js";
import {Spaceport} from "./entity/Spaceport.js";
import {Flight} from "./entity/Flight.js";
import {FlightClass} from "./entity/FlightClass.js";
import {Cabin} from "./entity/Cabin.js";
import {Payment} from "./entity/Payment.js";
import {Booking} from "./entity/Booking.js";

export const AppDataSource: DataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    migrationsRun: false,
    entities: [User, Planet, Spaceline, Spaceship, Spaceport, Flight, FlightClass, Cabin, Payment, Booking],
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
