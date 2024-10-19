# **Sub-Team Report**

1. **A summary of your decisions and the options you considered for your component(s) (UI/frontend, logic/backend, database) so your TA knows what you have built and why. (Soft limit of 600 words. This doesn’t mean you have to write 600 words. Quality is more important than quantity).**

## Database

Subteam 3’s user story requires 2 database objects (User and GraphMetaData). The following tables depict the data model.  
<img src="../../frontend/assets/Object.png" alt="Screenshot" width="500"/>
**User (Subset of Fields):**

1. MyGraphs: IDs of graphs a user has uploaded  
2. StarredGraphs: IDs of graphs a user would like to bookmark

**GraphMetaData**

1. ID: Unique Identifier for metadata of each graph  
2. Graph: ID referencing JSON object of graph  
3. Title: Text field for graph title  
4. Description: Text field containing summary of graphical data / findings  
5. Date Uploaded: TIMESTAMP (MM-DD-YYYY:HH:MM)  
6. isPublic: Boolean setting describing if graph is visible to all users  
7. AccessControls: List of mapping between User and Access Level (Owner, Editor, Viewer)

## APIs
<img src="Static/Api.png" alt="Screenshot" width="500"/>
For any user-level API calls, it is implicitly assumed the request body contains the userID and authentication headers are set when making a request to DB.

| // User PathPOST /user/graphs \-\> \[ GraphMetaData.IDs \]POST /user/graphs/bookmark \-\> \[ GraphMetaData.IDs \]// Graphs PathPOST /graphs/metadata \-\> \[ GraphMetaData.IDs \]{    userID: varchar}POST /graphs/metadata/public \-\> \[ GraphMetaData.IDs, totalCount: int \]{    Offset: int}DELETE /graphs/metadata \-\> 200{    graphID: varchar}GET /graphs/{ID} \-\> GraphObject |
| :---- |
|  |

## Client

<img src="Static/Page.png" alt="Screenshot" width="500"/>
**Functionality**

1. Search For Graphs (Default is my graphs)  
   1. Search for graphs based on which “tab” you are currently in  
   2. Filter on keyword match from graph title  
2. Search Results  
   1. Display search results in paginated form (i.e. 10 per page)  
   2. Show title, and description  
   3. Clicking on the search result routes user to Graph Page (similar to google search)  
   4. Additional Feature (time permissive): Add option to share graph, download graph  
3. Toggle Between Tabs  
   1. Load different graphs depending on which ‘tab’ a user is on  
      1. My Graphs  
      2. Shared with Me  
      3. Explore (Public Graphs)  
4. Filter Graphs  
   1. Sort search results by:  
      1. Date  
      2. Alphabetical  
      3. Relevance (Most keyword matches \+ percentage of words matched)  
      4. Semantics (Time Permissive)

## Extensions

1. Offer organizational capabilities (i.e. placing graphs into folders)  
2. Ability to share personal graphs with other users directly from the My Graphs page

For our sub-team’s component, we are responsible for creating a search page with the functionality to search for public graphs from the database and .   
For our frontend/UI, we decided to use Chakra UI’s for its simple to use and customizable component library, and Tailwind CSS for styling, and because most of our team have worked with these frontend technologies before, these were the best choice.   
For our backend logic, we chose Node.js as our backend framework due to strong community support, scalability, and familiarity among our team members.   
For data storage, we decided to use Firebase, as it provides a flexible, NoSQL-based structure that works well with JSON objects and integrates well with our chosen tech stack. Additionally, user authentication and data handling is seamless on Firebase.   
For our web framework we chose to use React with Next.js for its routing features and its support for server and client-side rendering

2. **Individual contributions explaining who did what. You can keep it to at most one paragraph per person to highlight any work that is not captured in any of the repos. As the sub-team grade will be subject to an individual contribution multiplier later in the course, make sure your individual commits have meaningful commit messages and are organised neatly, so that they can be tallied with the contribution presented in this document.**

Kevin: Wrote out ideas and rough draft for the Sub-Team report and Team report. Mainly worked on the frontend part of our application, including the UI for all the pages, the search function logic, and global data context needed for searching and sharing graphs. Also wrote all the basic tests for the frontend components in the application. 

Terry:


