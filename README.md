# GB Challenge Frontend

This is the frontend application for the GB Challenge project. It is built using React and provides a user-friendly interface for interacting with the backend services.

## Features

- User authentication and authorization.
- Responsive design for various screen sizes.
- Pre-authenticated and authenticated layouts.
- Integration with backend APIs.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ciberstein/GB_challenge_frontend.git
   cd GB_challenge_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

## Running the Application

To start the development server:

```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Environment Variables

The project requires a `.env` file to configure environment-specific variables. This file should be placed in the root directory of the project and should not be committed to version control for security reasons.

### Required Variables

- `VITE_API_URL`: The base URL for the backend API.

### Example `.env` File

```env
VITE_API_URL=http://localhost:3002
```

### Usage

1. Create a `.env` file in the root directory of the project.
2. Add the required variables as shown in the example above.
3. Ensure the values match your environment setup (e.g., API URL for development or production).
4. Restart the development server after making changes to the `.env` file to apply the updates.

## Project Structure

```
src/
├── components/       # Reusable React components
│   ├── layouts/      # Layout components
│   ├── shared/       # Shared components
├── context/          # Context API for state management
├── styles/           # Global styles
├── utils/            # Utility functions
└── App.jsx           # Main application component
```

## Scripts

- `npm start`: Start the development server.
- `npm run build`: Build the application for production.
- `npm test`: Run tests.

## Contact

For any questions or feedback, please contact:

- **Name**: Daniel Rojas
- **Email**: dev.luis.rojas@gmail.com
