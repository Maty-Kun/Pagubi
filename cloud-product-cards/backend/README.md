# Cloud Product Cards Backend

This is the backend part of the Cloud Product Cards project, which provides a RESTful API for managing product data. The backend is built using TypeScript and Express, and it connects to a cloud-based database for storing and retrieving product information.

## Features

- Create, read, update, and delete product cards.
- Synchronization of product data across devices.
- RESTful API endpoints for product management.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cloud-product-cards.git
   ```

2. Navigate to the backend directory:
   ```
   cd cloud-product-cards/backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the backend server, run the following command:
```
npm start
```

The server will run on `http://localhost:3000` by default.

### API Endpoints

- `POST /products` - Create a new product
- `GET /products` - Retrieve all products
- `PUT /products/:id` - Update a product by ID
- `DELETE /products/:id` - Delete a product by ID

### Database Configuration

Make sure to configure your database connection in the `src/app.ts` file before running the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.