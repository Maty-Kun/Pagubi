# Cloud Product Cards

This project is a cloud-based solution for storing and retrieving product cards, allowing synchronization across devices. It consists of a backend built with TypeScript and Express, and a frontend built with React.

## Project Structure

```
cloud-product-cards
├── backend
│   ├── src
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   └── productController.ts
│   │   ├── models
│   │   │   └── product.ts
│   │   ├── routes
│   │   │   └── productRoutes.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   │   └── ProductCard.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- TypeScript

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Features

- Add, update, and delete product cards.
- Synchronization of product data across devices.
- Responsive design for mobile and desktop views.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

### License

This project is licensed under the MIT License. See the LICENSE file for details.