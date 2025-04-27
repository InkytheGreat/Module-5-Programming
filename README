# 3D Sprite Interaction with Three.js

## Project Overview
This project is a 3D interactive visualization built using Three.js. It features a collection of sprites that can be interacted with using mouse clicks and keyboard inputs. The project demonstrates the use of Three.js for rendering 3D graphics, Stats.js for performance monitoring, and basic user interaction handling.

## How to Run the Project
1. **Install Dependencies**:
   Ensure you have Node.js installed. Run the following command in the project directory to install the required dependencies:
   ```bash
   npm install
   ```

2. **Run the Development Server**:
   Start the development server using Vite:
   ```bash
   npx vite
   ```

5. **Open the Application**:
   Open the application in your browser. If running locally, it will be available at `http://localhost:3000` (or the port specified by Vite).

## Implemented Features
- **3D Scene Setup**:
  - A 3D scene with a camera, renderer, and lighting.
  - A floor plane for visual reference.

- **Sprite Generation**:
  - Randomly generated sprites with textures and colors.
  - Randomized positions and scales within a defined bounding box.

- **User Interaction**:
  - Click to select and highlight sprites.
  - Use `W`, `A`, `S`, `D` to move the selected sprite.

- **Animation**:
  - Continuous rotation and slight movement of sprites.

- **Performance Monitoring**:
  - Integrated Stats.js to monitor frames per second (FPS).

## Challenges and Solutions
1. **Handling sprite interaction**:
   - Initially, I had no idea how to handle interacting with sprites in a 3d space with the cursor, but after looking at the docs and doing some searching I found that you can use the raycasting feature to determine if the vector created by a mouse click intersects with a sprite. This allows you to determine which sprite the mouse click intersected and "select" that sprite

2. **Deploying to GitHub Pages**:
   - Deploying to github pages is always kinda finnicky when the project isn't initially set up with that use case in mind. Specifically, whenever I use vite to run a project I need to go into the branch created by the gh-pages npm add-on and change the html to accurately point to the correct .js file location.
