## Intro

This README will detail the components and elements for subteam 2's submissions. The deployed version of the application can be found at: 

Note that due to limitations on projects on a free-tier of Vercel, we kindly as the TA to sign into vercel using the team credentials provided in Quercus. As a result, they will be able to view each of the subteam's deployments separately without incurring additional cost to the team.

Some prerequisities include
1. Git
2. npm

## Getting Started

Pull the git repository via command

```bash
git clone https://github.com/csc301-2024-f/project-19-Machine-Learning-Group.git
```

Next checout the D2-3 branch
```
git checkout D2-3
```

We can now run the developmental version of the application by running the following commands

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000/searchPage) with your browser to see the result.

To verify the integrity of our components we included a series of tests in `frontend/__tests__`
```
npm test
```
will run tests in your terminal.

## Detailed Description

Our subteam covered the following main components
1. Created 3 different views of graph meatadata (Own Graphs, Shared with Me and Explore)
2. Create a search-bar which allows users to filter for specific keywords in title and description
3. Fetech graph metadata from Firebase
4. Allow users to share graphs with others

![Alt text](frontend/static/Explore.png)
![Alt text](frontend/static/Filter.png)
![Alt text](frontend/static/MyGraphs.png)
![Alt text](frontend/static/Shared.png)
<!-- PROJECT LOGO HERE IN THE FUTURE -->
<br />
<div">
  <h1>Caspr - Causal Analysis of Structure Paths and Relationships</h1>
</div>

[Try the project here!](https://project-19-machine-learning-group-bedngb99d.vercel.app/)
<!-- PARTNER INTRO -->
## Project Partner Introduction
This is an open source project built for the Machine Learning Group in the Department of Computer Science at the University of Toronto. The Department of Computer Science at the University of Toronto has several faculty members working in the area of machine learning, neural networks, statistical pattern recognition, probabilistic planning, and adaptive systems.
- **Sheldon Huang, Research Lead, Primary Contact**: huang@cs.toronto.edu
- **Yuchen Wang, Software Lead, Secondary Contact**: https://www.yuchenwyc.com/

<!-- ABOUT THE PROJECT -->
## Introduction
This project is a web application designed to allow users to explore and interact with complex causal diagrams in a 3D environment. It helps visualize relationships between variables in systems with many interdependent factors. This tool can be leveraged across many domains of research including machine learning, economics, enviornmental, politics, and more. To summarize, key features include: 

### Key Features
- **Dynamic 3D Graph Visualization**: Our app brings causal diagrams to life! The 3D graph is generated dynamically from JSON data, where each node and edge represents crucial connections between elements. You can explore complex systems with ease.

- **Smooth Graph Interaction**: Navigate the graph in a fully immersive 3D space. Zoom, pan, and rotate the graph freely to explore relationships from every angle. It's simple and intuitive, letting you focus on discovering insights.

- **Node and Edge Information on Hover**: Curious about a specific node or edge? Just hover over it to see all the details, including node labels, categories, and edge relationships and strengths.
<div style="display: flex; justify-content: space-between;">
 <img src="/images/connection_description.jpg" alt="Connection Description" width="40%" height="40%">
   <img src="/images/node_description.jpg" alt="Node Description" width="40%" height="40%">
 </div>

- **Powerful Filtering and Searching**: Customize your view with filtering based on connection strength, or search for nodes by name, category, or ID. The graph instantly adjusts to show exactly what you need.
 <img src="/images/search.gif" alt="Node Description" width="60%" height="60%">

- **Connection Type and Direction Indicators**: Easily differentiate between causal and inhibitory connections using color-coded edges (black for causal, red for inhibitory), and follow the arrows to see the direction of influence between nodes.
 <img src="/images/filtering_edges.gif" alt="Node Description" width="60%" height="50%">

## Instructions
- TBD

<!-- RUNNING THE APPLICATION SECTION -->
## Running the Application

There are two options to run try the application. The first one is to use the [live deployment here](https://project-19-machine-learning-group-bedngb99d.vercel.app/), and the second one is to run it locally. The instruction below details how to run it locally.

To get started with the 3D Causal Diagram Explorer, please follow the step-by-step instructions below to ensure a smooth setup and start-up process.

### Requirements
- Node.js: The runtime environment required to run the application. Download and install it from [Node.js official website](https://nodejs.org/en).
- npm: Comes with [Node.js](https://nodejs.org/en) and is necessary for managing the application's dependencies

### Installation
- Clone the repository using `git clone -b D2-2 https://github.com/csc301-2024-f/project-19-Machine-Learning-Group.git`
- Navigate to the project directory: `cd frontend`
- Install dependencies: Run `npm install` 
- Start the development server: `npm run dev`
- Access the app: Open your browser and go to [http://localhost:3000/graph](http://localhost:3000/graph)

### Testing
- Create `.bablerc` file with the following code in the `frontend` directory
- Run the test: `npm test` 
```bash
// .babelrc
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ]
}
```

### External Dependencies and 3rd Party Software
Our project relies on several external dependencies and third-party libraries to enhance functionality and simplify development. Below is a summary of the key dependencies:
- **Next.js**: The React framework for building server-rendered and static web applications. It provides features like routing, server-side rendering, and static site generation.
  - [Next.js Documentation](https://nextjs.org/docs)
- **React**: A JavaScript library for building user interfaces, used as the core UI framework of the project.
  - [React Documentation](https://react.dev/learn)
- **Three.js**: A powerful JavaScript library for 3D graphics, used to render the 3D causal diagram.
  - [Three.js Documentation](https://threejs.org/docs/)
- **D3.js**: A library for manipulating documents based on data, used to handle graph layouts and positioning nodes in the visualization.
  - [D3.js Documentation](https://d3js.org/getting-started)
- **Chakra UI**: A simple, modular, and accessible component library that provides reusable UI components and styling for our frontend.
  - [Chakra UI Documentation](https://v2.chakra-ui.com/docs/components)
- **npm**: The Node package manager is used to manage the project’s dependencies and run scripts.
  - [npm Documentation](https://docs.npmjs.com/)

## Development Requirements
- TBD

## Deployment and Github Workflow
- TBD

## Coding Standards and Guidelines
- TBD

## Licences
- TBD
