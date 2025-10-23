/**
 * Shoe Item Model
 * Represents a shoe cleaning service item
 */
export class ShoeItem {
  constructor(data) {
    this.id = data.id;
    this.customer_name = data.customer_name;
    this.shoe_type = data.shoe_type;
    this.status = data.status || 'Pending';
    this.received_date = data.received_date;
    this.completed_date = data.completed_date;
  }

  /**
   * Validate the shoe item data
   */
  static validate(data) {
    const errors = [];

    if (!data.customer_name || typeof data.customer_name !== 'string' || data.customer_name.trim().length === 0) {
      errors.push('Customer name is required and must be a non-empty string');
    }

    if (!data.shoe_type || typeof data.shoe_type !== 'string' || data.shoe_type.trim().length === 0) {
      errors.push('Shoe type/brand is required and must be a non-empty string');
    }

    if (data.status && !['Pending', 'In Progress', 'Finished'].includes(data.status)) {
      errors.push('Status must be one of: Pending, In Progress, Finished');
    }

    if (data.received_date && !this.isValidDate(data.received_date)) {
      errors.push('Received date must be a valid date');
    }

    if (data.completed_date && !this.isValidDate(data.completed_date)) {
      errors.push('Completed date must be a valid date');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check if a date string is valid
   */
  static isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  }

  /**
   * Convert to JSON object
   */
  toJSON() {
    return {
      id: this.id,
      customer_name: this.customer_name,
      shoe_type: this.shoe_type,
      status: this.status,
      received_date: this.received_date,
      completed_date: this.completed_date
    };
  }
}
