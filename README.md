<div align="center">
  <img alt="Logo" src="https://github.com/user-attachments/assets/93577115-6182-452d-8f28-8e5d0a618fcb">

  <h1>Caspr</h1>
  
  <p>
    Causal Analysis of Structure Paths and Relationships
  </p>
</div>

## Application Preview

<p align="center">
  <img width="49%" alt="image" src="https://github.com/user-attachments/assets/00164608-852c-4eec-a541-c8545e65e418">
  <img width="49%" alt="image" src="https://github.com/user-attachments/assets/751138b8-bfae-464f-96b6-976353a611e8">
</p>

<p align="center">
  <img width="49%" alt="image" src="https://github.com/user-attachments/assets/10b8e4b6-5514-4f58-8fd7-f2d270f042c9">
  <img width="49%" alt="image" src="https://github.com/user-attachments/assets/8edcb52b-1f8b-4568-941d-b0a90ff60002">
</p>

<!-- ABOUT THE PROJECT -->
## Introduction
[Try the project here!](https://caspr.vercel.app/)

This project is a web application designed to allow users to explore and interact with complex causal diagrams in a 3D environment. This tool can be leveraged across many domains of research including machine learning, economics, enviornmental, politics, and more. It helps visualize relationships between variables in systems with many interdependent factors.

For example, in an ML research application, our app is useful as it visualizes and compares the reasoning processes of AI agents and humans, enabling researchers to enhance the accuracy and reliability of AI forecasting systems and advance forecasting science. To summarize, key features include:

### Key Features
- **Dynamic 3D Graph Visualization**: Our app brings causal diagrams to life! The 3D graph is generated dynamically from JSON data, where each node and edge represents crucial connections between elements. You can explore complex systems with ease.

- **Smooth Graph Interaction**: Navigate the graph in a fully immersive 3D space. Zoom, pan, and rotate the graph freely to explore relationships from every angle. It's simple and intuitive, letting you focus on discovering insights.

- **Node and Edge Information on Hover**: Curious about a specific node or edge? Just hover over it to see all the details, including node labels, categories, and edge relationships and strengths.
<div align="center">
 <img src="/images/connection_description.jpg" alt="Connection Description" width="40%" height="40%">
   <img src="/images/node_description.jpg" alt="Node Description" width="40%" height="40%">
 </div>

- **Powerful Filtering and Searching**: Customize your view with filtering based on connection strength, or search for nodes by name, category, or ID. The graph instantly adjusts to show exactly what you need.
<div align="center">
  <img src="/images/search.gif" alt="Node Description" width="60%" height="60%">
</div>

- **Connection Type and Direction Indicators**: Easily differentiate between causal and inhibitory connections using color-coded edges (black for causal, red for inhibitory), and follow the arrows to see the direction of influence between nodes.
<div align="center">
  <img src="/images/filtering_edges.gif" alt="Node Description" width="60%" height="50%">
</div>

- **Authentication and Permissions**: Securely log in to save and manage graphs.

- **Graph Uploading and Sharing**: Upload JSON files to create custom causal graphs and choose to share them publicly, keep them private, or share to specific emails.

- **Explore Page**: Browse and explore public graphs created by other users.

<!-- PARTNER INTRO -->
## Project Partner Introduction
This is an open source project built for the Machine Learning Group in the Department of Computer Science at the University of Toronto. The Department of Computer Science at the University of Toronto has several faculty members working in the area of machine learning, neural networks, statistical pattern recognition, probabilistic planning, and adaptive systems.
- **Sheldon Huang, Research Lead, Primary Contact**: huang@cs.toronto.edu
- **Yuchen Wang, Software Lead, Secondary Contact**: https://www.yuchenwyc.com/

<!-- RUNNING THE APPLICATION SECTION -->
## Running the Application

The application can be accessed in two ways:
1. **Live Deployment**: Use the [live deployment here](https://caspr.vercel.app/).
2. **Local Setup**: Follow these steps to run the application locally.

### Requirements
- **Node.js**: Install Node.js from the [official website](https://nodejs.org/en).
- **npm**: Comes with Node.js and is necessary for managing dependencies.

### Installation
- Clone the repository from the main branch:
  ```bash
  git clone https://github.com/csc301-2024-f/project-19-Machine-Learning-Group.git
  ```
- Navigate to the project directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```
- Access the app at [http://localhost:3000/](http://localhost:3000/).

### Building for Production
To prepare the app for production:
```bash
npm run build
```

### Testing
- Run the test: `npm test`

### Linting/formatting
- Lint the app: `npm run lint`
- Format with Prettier: `npx prettier --write .`

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
1. **Code Formatting**: Use Prettier for code formatting.
2. **Commit Standards**: Follow conventional commit standards to ensure clarity and consistency.
3. **Documentation**: Maintain detailed docstrings for all functions and files. Include `@param`, `@returns` entries alongside a description of the component.
4. **Branching Strategy**: Use a branching strategy with a prefix for the category and a name for the exact purpose of the branch. Such as `feature/<name>` or `fix/<name>` or `test/<name>`. Submit pull requests for 2-3 reviews before merging to main.

## Deployment and Github Workflow

Every update to the **main** branch goes through a series of verification and validation steps before mergeing. The Github workflow proceeds as follows
1. Identify new features and bug fixes
2. Create Jira ticket and determine designee and reviewers
3. Crate Feature or Bug Fix Branch
4. Initiate pull request and get at least 2 approvals
5. Merge into main

Due to permission conflicts, deployment is done on a identical forked, private repository. For every milestone a new deployment is created via Vercel. Vercel, automatically detects commits into desired branches and creates a separate deployment. Note, separate `.env` file are used to seggregate production and development environements and privacy policies were adjusted to account for the production domain.

## Licences
- This project is distributed under the MIT License. See LICENSE.txt for more information. 
- This license was chosen as it is a very permissive open-source license.  Anyone can use, modify, and distribute this project's code for any purpose, as long as they include the original license and copyright notice. This gives users and potential open-source developers a lot of freedom while providing minimal restrictions, encouraging wider adoption and collaboration.
