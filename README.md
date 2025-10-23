# Shoe Laundry API

A RESTful API for managing shoe cleaning services built with Node.js, Express.js, and Supabase. This API allows you to track shoe cleaning orders from receipt to completion.

## 🎯 Project Description

The Shoe Laundry API is a comprehensive backend service designed to manage shoe cleaning operations. It provides endpoints to create, read, update, and delete shoe cleaning orders, with support for status tracking and filtering.

## 🚀 Objectives and Main Features

### Core Features
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for shoe items
- **Status Tracking**: Track orders through "Pending", "In Progress", and "Finished" states
- **Date Management**: Automatic date handling for received and completed dates
- **Filtering**: Filter items by status (e.g., get all finished items)
- **Data Validation**: Comprehensive input validation and error handling
- **RESTful Design**: Clean, intuitive API endpoints following REST conventions

### Technical Features
- **Modern JavaScript**: ES6+ modules and async/await
- **Database Integration**: Supabase for scalable data storage
- **Security**: Helmet.js for security headers, CORS configuration
- **Error Handling**: Comprehensive error handling and logging
- **Modular Architecture**: Separated concerns with controllers, routes, and models
- **Environment Configuration**: Secure environment variable management

## 📊 Data Structure

Each shoe cleaning item contains the following fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | UUID | Auto | Unique identifier (auto-generated) |
| `customer_name` | String | Yes | Name of the customer |
| `shoe_type` | String | Yes | Type or brand of the shoe |
| `status` | String | No | Order status: "Pending", "In Progress", "Finished" (default: "Pending") |
| `received_date` | Date | No | Date when the shoe was received (default: current date) |
| `completed_date` | Date | No | Date when cleaning was completed (auto-set when status = "Finished") |

## 🔗 API Endpoints

### Base URL
```
Production: https://your-app-name.vercel.app
Development: http://localhost:3000
```

### Endpoints

#### 1. Health Check
```http
GET /health
```
Returns API status and environment information.

#### 2. Get All Items
```http
GET /api/items
GET /api/items?status=Finished
```
- **Description**: Retrieve all shoe items
- **Query Parameters**: 
  - `status` (optional): Filter by status ("Pending", "In Progress", "Finished")
- **Response**: Array of shoe items

#### 3. Get Single Item
```http
GET /api/items/:id
```
- **Description**: Retrieve a specific shoe item by ID
- **Parameters**: `id` (UUID)
- **Response**: Single shoe item object

#### 4. Create New Item
```http
POST /api/items
```
- **Description**: Create a new shoe cleaning order
- **Body**: JSON object with customer_name, shoe_type, and optional fields
- **Response**: Created shoe item with generated ID

#### 5. Update Item
```http
PUT /api/items/:id
```
- **Description**: Update an existing shoe item
- **Parameters**: `id` (UUID)
- **Body**: JSON object with fields to update
- **Response**: Updated shoe item

#### 6. Delete Item
```http
DELETE /api/items/:id
```
- **Description**: Remove a shoe item from the system
- **Parameters**: `id` (UUID)
- **Response**: Confirmation of deletion

## 📝 Example Requests and Responses

### Create a New Shoe Item
```http
POST /api/items
Content-Type: application/json

{
  "customer_name": "John Doe",
  "shoe_type": "Nike Air Max",
  "status": "Pending"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Shoe item created successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "customer_name": "John Doe",
    "shoe_type": "Nike Air Max",
    "status": "Pending",
    "received_date": "2024-01-15",
    "completed_date": null
  }
}
```

### Get All Items with Status Filter
```http
GET /api/items?status=Finished
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "customer_name": "John Doe",
      "shoe_type": "Nike Air Max",
      "status": "Finished",
      "received_date": "2024-01-15",
      "completed_date": "2024-01-17"
    }
  ],
  "count": 1
}
```

### Update Item Status
```http
PUT /api/items/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "status": "Finished"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Shoe item updated successfully",
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "customer_name": "John Doe",
    "shoe_type": "Nike Air Max",
    "status": "Finished",
    "received_date": "2024-01-15",
    "completed_date": "2024-01-17"
  }
}
```

### Error Response Example
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Customer name is required and must be a non-empty string",
    "Shoe type/brand is required and must be a non-empty string"
  ]
}
```

## 🛠 Installation and Running Steps

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm or yarn
- Supabase account and project

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/shoe-laundry-api.git
cd shoe-laundry-api
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
1. Copy the environment example file:
```bash
cp env.example .env
```

2. Update `.env` with your Supabase credentials:
```env
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
PORT=3000
NODE_ENV=development
```

### 4. Database Setup
1. Create a new table in your Supabase project:
```sql
CREATE TABLE shoe_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  shoe_type TEXT NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Progress', 'Finished')),
  received_date DATE DEFAULT CURRENT_DATE,
  completed_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for better performance
CREATE INDEX idx_shoe_items_status ON shoe_items(status);
CREATE INDEX idx_shoe_items_received_date ON shoe_items(received_date);
```

### 5. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:3000`

### 6. Test the API
```bash
# Health check
curl http://localhost:3000/health

# Get all items
curl http://localhost:3000/api/items

# Create a new item
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "Test Customer", "shoe_type": "Adidas Stan Smith"}'
```

## 🚀 Deployment on Vercel

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy to Vercel
```bash
vercel
```

### 3. Set Environment Variables
In your Vercel dashboard, add the following environment variables:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NODE_ENV`: production

### 4. Deploy
```bash
vercel --prod
```

Your API will be available at: `https://your-app-name.vercel.app`

## 🔧 API Testing

### Using curl
```bash
# Health check
curl https://your-app-name.vercel.app/health

# Get all items
curl https://your-app-name.vercel.app/api/items

# Create item
curl -X POST https://your-app-name.vercel.app/api/items \
  -H "Content-Type: application/json" \
  -d '{"customer_name": "Jane Smith", "shoe_type": "Converse Chuck Taylor"}'
```

### Using Postman
Import the following collection or create requests manually:

1. **GET** `/health` - Health check
2. **GET** `/api/items` - Get all items
3. **GET** `/api/items?status=Finished` - Get finished items
4. **POST** `/api/items` - Create new item
5. **PUT** `/api/items/:id` - Update item
6. **DELETE** `/api/items/:id` - Delete item

## 📚 API Documentation

### Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

### Response Format
All responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "error": string (only in error responses)
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/shoe-laundry-api/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔗 Links

- **Live API**: https://your-app-name.vercel.app
- **GitHub Repository**: https://github.com/your-username/shoe-laundry-api
- **API Documentation**: https://your-app-name.vercel.app/health

---

Built with ❤️ using Node.js, Express.js, and Supabase
#   R E S P O N S I M O D 1 _ A r g a - M u l y a n a - S a p u t r a _ 3 1  
 #   R E S P O N S I M O D 1 _ A r g a - M u l y a n a - S a p u t r a _ 3 1  
 #   R E S P O N S I M O D 1 _ A r g a - M u l y a n a - S a p u t r a _ 3 1  
 #   R e s p o n s i M o d 1 _ A r g a - M u l y a n a - S a p u t r a _ K E L 3 1  
 