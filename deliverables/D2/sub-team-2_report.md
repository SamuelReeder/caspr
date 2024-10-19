# Deliverable 2 - Sub-team 2 Report

## 1. Summary of Decisions and Considerations
### Technology Decisions:
- **React with Next.js**: We chose React with Next.js because it supports both server-side and client-side rendering, improving performance and providing fast load times. Next.js also offers easy routing, automatic code splitting, and flexibility, which is essential for dynamically rendering complex 3D graphs.
- **Three.js**: allows smooth zooming, panning, and rotating in 3D space, making the graph interactive and visually engaging. Its ability to manage material properties and lighting enhances the overall visual quality.
- **D3.js**: simplifies the node placement on the graph for us. It calculates the layout and positions of the nodes based on the force-directed graph algorithm, allowing for collision detection and optimized node placement.
- **Chakra UI**: We chose Chakra UI for building a clean and responsive user interface. Its pre-built components made it easy to implement features like filters, search bars, and navigation.
### Considerations:
We considered other visualization libraries, such as Cytoscape.js, but opted for Three.js and D3.js due to the flexibility required for 3D rendering and force-based node positioning.
### Key Features:
- **3D Graph Displaying**: The 3D graph visualization is dynamically generated from a JSON file, which provides the structure and data for nodes and edges.
- **Graph Interaction**: We implemented basic interaction features such as zoom, pan, and rotation to allow users to freely navigate the graph in a 3D space.
- **Node and Edge Information**: Users can hover over nodes and edges to view their detailed information, including node labels, values, and categories, as well as edge relationships and strengths.
- **Filtering and Searching**: We added functionality for filtering connections based on their strength and searching nodes by name, category, or ID to make the graph exploration more efficient.
- **Connection Type and Direction**: Each edge can display whether it represents a causal or inhibitory relationship, with visual indicators showing the direction of the connection by using the arrows.
### Implemented Components
- **CameraController**: Manages camera movement and interaction in the 3D space, allowing users to zoom, pan, and rotate the graph dynamically, ensuring optimal graph viewing.
- **CausalDiagram**: Core component that renders nodes and edges based on JSON data, using D3.js for force-directed layout calculations. It also handles filtering by edge strength and user interactions like hover effects.
- **Edge**: Represents connections between nodes, displaying relationship types (causal, inhibitory) with visual indicators such as line style and directional arrows. It includes hover functionality to show edge details.
- **Node**: Renders individual nodes with category-based color coding. On hover, it displays node details (label, value, category) using a tooltip.
- **NavBar**: Provides navigation for multiple diagrams, allowing users to switch between diagrams or different configurations of data visualization, and share the current diagram.
- **GraphSideBar**: Offers a search feature to filter nodes by label, ID, or category, displaying a list of nodes for easier navigation within the graph.
## 2. Individual Contributions
- **Daria**: Daria was responsible for implementing the core graph visualization components, including the edge, node, and causal diagram components. She also developed the hover functionality that displays node data, as well as the filtering mechanism to adjust the displayed connections based on their strength.
- **Morris**: Morris focused on implementing the navigation and sidebars, allowing users to search the graph for specific nodes by name, category, or ID. He also added the functionality to display the types and directions of connections, the share button, and the detailed edge information when selected. Additionally, he also set up testing and configure the branch for production builds.  


Both Morris and Daria made pull requests, reviewed each other's code, provided feedback, and made improvements after the meeting with the partner. Also, we collaborated on the project and subteam reports. 


## 3. Details and Instructions
### Interacting with the Graph:
- **Zoom**: Use the mouse scroll wheel to zoom in and out of the graph.
- **Pan**: Click and hold the left mouse button, then move the mouse to pan across the graph.
- **Rotate**: Click and hold the right mouse button, then move the mouse to rotate the graph view.
### Features and Functionalities:
- **Hover Information**:
  - Hover over any node or edge to see detailed information such as labels, values, categories, and connection strengths.
- **Filtering Edges by Strength**:
 - Enter values between 0 and 1 in the 'Min Strength' and 'Max Strength' fields to filter edges based on their connection strength.
- **Node Search and Highlighting**:
 - Use the search bar to find nodes by ID, name, or category. Clicking on a search result will highlight the node in cyan on the graph.
- **Connection Types and Directions**:
 - Red edges indicate inhibitory connections, black edges indicate causal connections, and arrows show the direction of the connection. Edge thickness represents the strength of the connection.
- **Node Categories**:
 - Nodes are color-coded by category, providing quick identification of different groups within the graph.
### Testing: 
- **Graph Page test**:
The graph page tests mocks the different components required on the page, then it verifies that the page renders correctly and different diagrams can be added and removed from the NavBar area.
- **Notes**:
In order to run the tests, users need to create the following .babelrc file in the /frontend folder. Then in the terminal run “npm test”. 
This is due to some next js configuration. The project cannot be run when the following file is in the repository. This project will adopt a different testing method in future deliverables. 


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

- **Other notes**:
The team is using dummy data provided by the partner for the node visualization. This data is located in the `/frontend/src/data directory`.
Our work can be verified by the commit history: [https://github.com/csc301-2024-f/project-19-Machine-Learning-Group/compare/main...D2-2](https://github.com/csc301-2024-f/project-19-Machine-Learning-Group/compare/main...D2-2)

## 4. Application
### Deployment
<PUT LINK HERE>
