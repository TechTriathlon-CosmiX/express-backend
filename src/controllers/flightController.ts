import {Request, Response} from "express";
import {AppDataSource} from "../data-source.js";
import {Flight} from "../entity/Flight.js";
import {Spaceship} from "../entity/Spaceship.js";
import {Spaceport} from "../entity/Spaceport";
import {Between, MoreThanOrEqual} from "typeorm";

// Get flights when the user gives the arrival spaceport id, departure spaceport id, arrival date and the departure date and the passenger count (should be less than the free cabin count)
export const getFlightsForSearch = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);
    const {arrivalSpaceportId, departureSpaceportId, arrivalDate, departureDate, passengerCount} = req.body;

    const arrivalSpaceportIdAsNumber = Number(arrivalSpaceportId);
    const departureSpaceportIdAsNumber = Number(departureSpaceportId);
    const passengerCountAsNumber = Number(passengerCount);

    if (isNaN(arrivalSpaceportIdAsNumber) || isNaN(departureSpaceportIdAsNumber) || isNaN(passengerCountAsNumber)) {
      return res.status(400).json({error: "Invalid ID format"});
    }

    const arrivalSpaceport = await AppDataSource.getRepository(Spaceport).findOne(arrivalSpaceportId);
    const departureSpaceport = await AppDataSource.getRepository(Spaceport).findOne(departureSpaceportId);

    if (!arrivalSpaceport || !departureSpaceport) {
      return res.status(404).json({error: "Spaceport not found"});
    }

    const flights = await flightRepository.find({
      where: {
        arrivalSpaceport: arrivalSpaceport,
        departureSpaceport: departureSpaceport,
        arrivalTime: Between(arrivalDate, new Date(new Date(arrivalDate).getTime() + 24 * 60 * 60 * 1000)), // Arrival time within the selected day
        departureTime: Between(departureDate, new Date(new Date(departureDate).getTime() + 24 * 60 * 60 * 1000)), // Departure time within the selected day
        freeCabinCount: MoreThanOrEqual(passengerCountAsNumber),
      }
    });

    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({error: "An error occurred while fetching flights"});
  }
}

// Get all flights
export const getAllFlights = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);
    const flights = await flightRepository.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({error: "An error occurred while fetching flights"});
  }
};


// Get a flight by id
export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);
    const {flightId} = req.params;

    const flightIdAsNumber = Number(flightId);

    if (isNaN(flightIdAsNumber)) {
      return res.status(400).json({error: "Invalid ID format"});
    }

    const flight = await flightRepository.findOne({where: {id: flightIdAsNumber}});

    if (!flight) {
      return res.status(404).json({error: "Flight not found"});
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({error: "An error occurred while fetching the flight"});
  }
};

// Update a flight by ID
export const updateFlight = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);

    const {flightId} = req.params;
    const {arrivalTime, departureTime, flightStatus, freeCabinCount, arrivalSpaceport, departureSpaceport} = req.body;


    const flightIdAsNumber = Number(flightId);

    if (isNaN(flightIdAsNumber)) {
      return res.status(400).json({error: "Invalid flight ID format"});
    }

    const flight = await flightRepository.findOne({where: {id: flightIdAsNumber}});

    if (!flight) {
      return res.status(404).json({error: "Flight not found to be updated"});
    }

    flight.arrivalTime = arrivalTime;
    flight.departureTime = departureTime;
    flight.flightStatus = flightStatus;
    flight.freeCabinCount = freeCabinCount;
    flight.arrivalSpaceport = arrivalSpaceport;
    flight.departureSpaceport = departureSpaceport;


    const updatedFlight = await flightRepository.save(flight);

    res.json(updatedFlight);
  } catch (error) {
    res.status(500).json({error: "An error occurred while updating the flight"});
  }
};

// Create a new flight
export const createFlight = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);

    const {
      arrivalTime,
      departureTime,
      flightStatus,
      freeCabinCount,
      arrivalSpaceportId,
      departureSpaceportId,
      spaceshipId
    } = req.body;


    // fetch the spaceship and spaceports from the database
    const spaceship = await AppDataSource.getRepository(Spaceship).findOne(spaceshipId);
    const arrivalSpaceport = await AppDataSource.getRepository(Spaceport).findOne(arrivalSpaceportId);
    const departureSpaceport = await AppDataSource.getRepository(Spaceport).findOne(departureSpaceportId);

    if (!spaceship || !arrivalSpaceport || !departureSpaceport) {
      return res.status(404).json({error: "Spaceship or spaceport not found"});
    } else {
      // create a new flight instance
      const flight = new Flight(arrivalTime, departureTime, flightStatus, freeCabinCount, arrivalSpaceport, departureSpaceport, [], [], spaceship);

      // save flight instance to the database
      const savedFlight = await flightRepository.save(flight);
      res.status(201).json(savedFlight);

    }

  } catch (error) {
    res.status(500).json({error: "An error occurred while creating a flight"});
  }
};
