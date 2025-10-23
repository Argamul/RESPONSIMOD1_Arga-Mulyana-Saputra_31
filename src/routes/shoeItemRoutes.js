import express from 'express';
import {
  getAllShoeItems,
  getShoeItemById,
  createShoeItem,
  updateShoeItem,
  deleteShoeItem
} from '../controllers/shoeItemController.js';

const router = express.Router();

// GET /items - Get all items with optional status filtering
router.get('/', getAllShoeItems);

// GET /items/:id - Get a single item by ID
router.get('/:id', getShoeItemById);

// POST /items - Create a new shoe item
router.post('/', createShoeItem);

// PUT /items/:id - Update an item
router.put('/:id', updateShoeItem);

// DELETE /items/:id - Delete an item
router.delete('/:id', deleteShoeItem);

export default router;
