
# Room Design Platform

This is a **Room Design Platform** that allows users to design rooms in both **2D** and **3D**. It utilizes **React.js**, **TypeScript**, **Three.js**, and various other dependencies to provide a powerful and interactive user interface for room visualization and design.

## Features
- **2D and 3D Virtualization**: Design your room in 2D or 3D and see it come to life.
- **Real-Time Customization**: Easily modify furniture, colors, and layout as you wish.
- **Interactive Interface**: Drag and drop items into your room design.
- **React & Three.js**: Modern technologies used for rendering and interactivity.

## Technologies Used
- **React.js** for building the user interface.
- **TypeScript** for type safety.
- **Three.js** for 3D rendering.
- **Vite** as the build tool.
- **TailwindCSS** for styling.
- **Firebase** for cloud storage and user authentication.

## Installation

### Prerequisites

Make sure you have **Node.js** and **npm** installed. If not, you can download it from [here](https://nodejs.org/).

### Clone the Repository
```bash
git clone https://github.com/prashankulathunga/ROOM-DESIGN-PLTFRM.git
cd ROOM-DESIGN-PLTFRM
```

### Install Dependencies
```bash
npm install
```

### Running the Development Server
To start the development server, run:
```bash
npm run dev
```
This will open the app in your default browser. The server will automatically reload if you make any changes to the code.

### Build the Project for Production
To build the project for production, run:
```bash
npm run build
```
This will create a `dist/` directory with the production-ready files.

### Preview the Production Build
To preview the production build, run:
```bash
npm run preview
```

## Scripts

- `dev`: Starts the development server using **Vite**.
- `build`: Builds the project for production.
- `lint`: Lints the project using **ESLint**.
- `preview`: Previews the production build.

## Dependencies
Here are the key dependencies used in this project:

- **@react-three/drei**: Useful helpers and components for **React Three Fiber**.
- **@react-three/fiber**: The React renderer for **Three.js**.
- **firebase**: For Firebase services like authentication and storage.
- **lucide-react**: A library of React icons.
- **react**: The core React library.
- **react-colorful**: Color picker component for React.
- **react-router-dom**: React library for routing and navigation.
- **three**: The core Three.js library for 3D graphics.
- **zustand**: A small, fast, and scalable state management library.

## Development

### Linting
The project uses **ESLint** for code linting. You can run the following command to lint the project:
```bash
npm run lint
```

### TypeScript Support
The project is written in **TypeScript** for type safety. Ensure that your development environment supports TypeScript.
