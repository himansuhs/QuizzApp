Quiz App
Check out the live version of the project here: https://quizzapp-1-g8gw.onrender.com/
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
  
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=4000
   TOKEN_SECRET_KEY=your_secret_key
   ```
   - `MONGO_URI`: Your MongoDB connection string. Example: `mongodb://localhost:27017/your_database_name`
   - `PORT`: The port on which the backend server will run. Default is `4000`.
   - `TOKEN_SECRET_KEY`: A secret key used for JWT authentication..

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend server will run on port `4000` by default.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   cd vite-project
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend development server will run on port `3000` by default.

### API Endpoints

- **POST /api/register**: Register a new user.
- **POST /api/login**: Log in an existing user.
- **POST /api/questions**: Fetch quiz questions based on selected topics.
- **POST /api/submit-quiz**: Submit quiz answers and get results.
- **GET /api/leaderboard**: Get the leaderboard data.

### Frontend Components

- **LandingPage**: The landing page of the application.
- **Register**: User registration page.
- **Login**: User login page.
- **TopicSelection**: Page where users select quiz topics.
- **QuizPage**: Page where users take the quiz.
- **ResultsPage**: Page displaying quiz results.
- **Leaderboard**: Page displaying the leaderboard.



