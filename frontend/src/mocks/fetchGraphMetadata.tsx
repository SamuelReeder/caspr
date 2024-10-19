export interface GraphMetadata {
    id: string;
    title: string;
    description: string;
    author: string;
  }
  
  const fetchGraphMetadata = async (): Promise<GraphMetadata[]> => {
    return [
      { id: '1', title: 'Graph 1', description: 'Description for Graph 1', author: 'author1@example.com' },
      { id: '2', title: 'Graph 2', description: 'Description for Graph 2', author: 'author2@example.com' },
      { id: '3', title: 'Graph 3', description: 'Description for Graph 3', author: 'author3@example.com' },
      { id: '4', title: 'Graph 4', description: 'Description for Graph 4', author: 'author4@example.com' },
      { id: '5', title: 'Graph 5', description: 'Description for Graph 5', author: 'author5@example.com' },
      { id: '6', title: 'Graph 6', description: 'Description for Graph 6', author: 'author6@example.com' },
      { id: '7', title: 'Graph 7', description: 'Description for Graph 7', author: 'author7@example.com' },
      { id: '8', title: 'Graph 8', description: 'Description for Graph 8', author: 'author8@example.com' },
    ];
  };
  
  export default fetchGraphMetadata;