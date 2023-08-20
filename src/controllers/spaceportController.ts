import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Spaceport } from "../entity/Spaceport.js";

// Get all spaceports
export const getAllSpaceports = async (req: Request, res: Response) => {
  try {
    const spaceportRepository = AppDataSource.getRepository(Spaceport);
    const spaceports = await spaceportRepository.find();
    res.json(spaceports);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching spaceports" });
  }
};


// Get a spaceport by id
export const getSpaceportById = async (req: Request, res: Response) => {
  try {
    const spaceportRepository = AppDataSource.getRepository(Spaceport);
    const { spaceportId } = req.params;

    const spaceportIdAsNumber = Number(spaceportId);

    if (isNaN(spaceportIdAsNumber)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const spaceport = await spaceportRepository.findOne({ where: { spaceportId: spaceportIdAsNumber } });

    if (!spaceport) {
      return res.status(404).json({ error: "Spaceport not found" });
    }

    res.json(spaceport);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the spaceport" });
  }
};

// Update a spaceport by ID
export const updateSpaceport = async (req: Request, res: Response) => {
  try {
    const spaceportRepository = AppDataSource.getRepository(Spaceport);
    const { spaceportId } = req.params;
    const { spaceportName,location } = req.body;


    const spaceportIdAsNumber = Number(spaceportId);

    if (isNaN(spaceportIdAsNumber)) {
      return res.status(400).json({ error: "Invalid spaceport ID format" });
    }

    const spaceport = await spaceportRepository.findOne({ where: { spaceportId: spaceportIdAsNumber } });

    if (!spaceport) {
      return res.status(404).json({ error: "Spaceport not found to be updated" });
    }

    spaceport.spaceportName = spaceportName;
    spaceport.location = location;

    const updatedSpaceport = await spaceportRepository.save(spaceport);

    res.json(updatedSpaceport);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the spaceport" });
  }
};

// Create a new spaceport
export const createSpaceport = async (req: Request, res: Response) => {
    try {
      const spaceportRepository = AppDataSource.getRepository(Spaceport);
      const { spaceportName, location } = req.body;
  
      if (!spaceportName || !location ) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const newSpaceport = new Spaceport(spaceportName, location);
      const savedSpaceport = await spaceportRepository.save(newSpaceport);
      res.status(201).json(savedSpaceport);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while creating a spaceport" });
    }
  };