import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Flight } from "../entity/Flight.js";

// Get all flights
export const getAllFlights = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);
    const flights = await flightRepository.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching flights" });
  }
};


// Get a flight by id
export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);
    const { flightId } = req.params;

    const flightIdAsNumber = Number(flightId);

    if (isNaN(flightIdAsNumber)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const flight = await flightRepository.findOne({ where: { flightId: flightIdAsNumber } });

    if (!flight) {
      return res.status(404).json({ error: "Flight not found" });
    }

    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the flight" });
  }
};

// Update a flight by ID
export const updateFlight = async (req: Request, res: Response) => {
  try {
    const flightRepository = AppDataSource.getRepository(Flight);

    const { flightId } = req.params;
    const { arrivalTime,departureTime,flightStatus,freeCabinCount,spaceportId } = req.body;


    const flightIdAsNumber = Number(flightId);

    if (isNaN(flightIdAsNumber)) {
      return res.status(400).json({ error: "Invalid flight ID format" });
    }

    const flight = await flightRepository.findOne({ where: { flightId: flightIdAsNumber } });

    if (!flight) {
      return res.status(404).json({ error: "Flight not found to be updated" });
    }

    flight.arrivalTime = arrivalTime;
    flight.departureTime = departureTime;
    flight.flightStatus = flightStatus;
    flight.freeCabinCount = freeCabinCount;
    flight.spaceportId = spaceportId;
    

    const updatedFlight = await flightRepository.save(flight);

    res.json(updatedFlight);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the flight" });
  }
};

// Create a new planet
export const createFlight = async (req: Request, res: Response) => {
    try {
      const flightRepository = AppDataSource.getRepository(Flight);

      const { arrivalTime,departureTime,flightStatus,freeCabinCount,spaceportId} = req.body;
  
      if (!arrivalTime || !departureTime || !flightStatus || !freeCabinCount || !spaceportId ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newFliight = new Flight( arrivalTime,departureTime,flightStatus,freeCabinCount,spaceportId );
      const savedFlight = await flightRepository.save(newFliight);
      res.status(201).json(savedFlight);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating a flight" });
    }
  };