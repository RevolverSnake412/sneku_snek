# Sneku Snek

Sneku Snek is a social media platform built with the MERN stack (MongoDB, Express.js, React, Node.js). It is designed to facilitate the sharing and viewing of content related to snakes, aiming to create a positive community for snake enthusiasts. Users can create profiles, post text, images, and videos, and interact with other users through likes and comments.

## Before Deploying

Before deploying the project, it's essential to configure your environment variables. 

- If you're using Linux, you can export your MongoDB connection string by running:

  ```bash
  export MONGO_URI=yourclusterlink
  ```

- Alternatively, you can create a `.env` file in the root of your project (both client and server directories if necessary) with the following content:

  ```bash
  MONGO_URI=yourclusterlink
  ```

Make sure to replace `yourclusterlink` with your actual MongoDB connection string.

## Deployment

To deploy the project, you need to ensure that both the client and server sides are running simultaneously on ports 3000 and 5000, respectively.

- Start the server:

  ```bash
  npm run dev
  ```

- Start the client:

  ```bash
  npm start
  ```

After running these commands, your application should be accessible on `http://localhost:3000` (client) and `http://localhost:5000` (server).

## Contributing

Please note that while this project is functional, there may be errors or changes needed. If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

Thank you for checking out Sneku Snek!