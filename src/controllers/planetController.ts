import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Planet } from "../entity/Planet.js";

// Get all planets
export const getAllPlanets = async (req: Request, res: Response) => {
  try {
    const planetRepository = AppDataSource.getRepository(Planet);
    const planets = await planetRepository.find();
    res.json(planets);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching planets" });
  }
};


// Get a planet by id
export const getPlanetById = async (req: Request, res: Response) => {
  try {
    const planetRepository = AppDataSource.getRepository(Planet);
    const { planetId } = req.params;

    const planetIdAsNumber = Number(planetId);

    if (isNaN(planetIdAsNumber)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const planet = await planetRepository.findOne({ where: { planetId: planetIdAsNumber } });

    if (!planet) {
      return res.status(404).json({ error: "Planet not found" });
    }

    res.json(planet);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the planet" });
  }
};

// Update a planet by ID
export const updatePlanet = async (req: Request, res: Response) => {
  try {
    const planetRepository = AppDataSource.getRepository(Planet);

    const { planetId } = req.params;
    const { image,description } = req.body;


    const planetIdAsNumber = Number(planetId);

    if (isNaN(planetIdAsNumber)) {
      return res.status(400).json({ error: "Invalid planet ID format" });
    }

    const planet = await planetRepository.findOne({ where: { planetId: planetIdAsNumber } });

    if (!planet) {
      return res.status(404).json({ error: "Planet not found to be updated" });
    }

    planet.image = image;
    planet.description = description;

    const updatedPlanet = await planetRepository.save(planet);

    res.json(updatedPlanet);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the planet" });
  }
};

// Create a new planet
export const createPlanet = async (req: Request, res: Response) => {
    try {
      const planetRepository = AppDataSource.getRepository(Planet);

      const { planetName, image, description} = req.body;
  
      if (!planetName || !image || !description ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newPlanet = new Planet(planetName, image, description);
      const savedPlanet = await planetRepository.save(newPlanet);
      res.status(201).json(savedPlanet);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating a planet" });
    }
  };