import { supabase } from '../config/database.js';
import { ShoeItem } from '../models/ShoeItem.js';

/**
 * Get all shoe items with optional status filtering
 */
export const getAllShoeItems = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = supabase
      .from('shoe_items')
      .select('*')
      .order('received_date', { ascending: false });

    // Apply status filter if provided
    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch shoe items',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get a single shoe item by ID
 */
export const getShoeItemById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Item ID is required'
      });
    }

    const { data, error } = await supabase
      .from('shoe_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Shoe item not found'
        });
      }
      
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch shoe item',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Create a new shoe item
 */
export const createShoeItem = async (req, res) => {
  try {
    const { customer_name, shoe_type, status, received_date, completed_date } = req.body;

    // Validate required fields
    const validation = ShoeItem.validate(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // Prepare data for insertion
    const itemData = {
      customer_name: customer_name.trim(),
      shoe_type: shoe_type.trim(),
      status: status || 'Pending',
      received_date: received_date || new Date().toISOString().split('T')[0],
      completed_date: completed_date || null
    };

    const { data, error } = await supabase
      .from('shoe_items')
      .insert([itemData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create shoe item',
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: 'Shoe item created successfully',
      data
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Update a shoe item
 */
export const updateShoeItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Item ID is required'
      });
    }

    // Validate update data
    const validation = ShoeItem.validate(updateData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }

    // If status is being updated to 'Finished', set completed_date
    if (updateData.status === 'Finished' && !updateData.completed_date) {
      updateData.completed_date = new Date().toISOString().split('T')[0];
    }

    const { data, error } = await supabase
      .from('shoe_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Shoe item not found'
        });
      }
      
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update shoe item',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shoe item updated successfully',
      data
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Delete a shoe item
 */
export const deleteShoeItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Item ID is required'
      });
    }

    const { data, error } = await supabase
      .from('shoe_items')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Shoe item not found'
        });
      }
      
      console.error('Database error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete shoe item',
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shoe item deleted successfully',
      data
    });
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};
