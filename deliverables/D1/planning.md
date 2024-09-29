# 19-Machine Learning Group: Null Pointers

 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What is the product?
The product is a web application that will enable users to three-dimensionally visualize, thoroughly explore, and interact with complex causal diagrams by means of a set of features including interactive information display, zoom, rotation, and highlighting. The application will feature a user management system for seamless login/logout and diagram saving.

<p align="center">
  <img width="384" alt="Screenshot 2024-09-26 at 7 58 29 PM" src="https://github.com/user-attachments/assets/284b9ba4-23c3-4fc3-99a7-ea267315f952">
</p>

This application aims to tackle a prominent issue in the world of machine learning and data science research: the challenging task of visualizing complex causal relationships, particularly those involving several hundred nodes and edges. The goal is to neatly visualize the relationships between several variables or factors in a system, showing how they influence one another. The application should be particularly useful for understanding intricate systems where variables are interdependent and can have non-linear relationships with multiple layers of causality.

This project has applications across several domains including economics, environment studies, political sciences, etc. Possible use cases include exploring how political policy changes can influence the broader economy, or how variables like carbon emissions, temperature rise, and deforestation can impact climate change models.
We are working with the Machine Learning Group, a research group within the University of Toronto’s Department of Computer Science. We are collaborating directly with research lead and PhD student Sheldon Huang.

Here is a link to a mock-up UI design done in Figma: https://www.figma.com/design/tgERL2Ge8QBxLZTVK8g57m/Untitled?node-id=1-1702&t=o5M6y1jZ8kojT867-1



#### Q2: Who are your target users?

There are several different types of users for our project. The main target users are decision-makers that frequently need to make high stake decisions. These people can vary in different domains such as business, technology, or the government. With this visualization tool, it can help them make more informed decisions as they can have more insight into the cause/reason for things that happen. 

Another subset of the target users are researchers. By using our tool, they could gain more insights into the topic they are researching, helping them to approach problems with more insight. 


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

With our product’s 3D data visualization, it is going to allow our users to quickly and easily identify patterns and causal relationships within the causal data uploaded by the user and gain deeper insights into human cognition and the AI systems they are developing. 

For instance, users will be able to use these patterns and relationships to make accurate predictions for future events that they wouldn’t be able to without having access to such informative data and relationships, such as the outcome of the US election this year. Additionally, our users will save a lot of time by using our product because researchers in this field frequently need to visualize vast amounts of text data, so they will be able to save a lot of time compared to looking at all the data points on a piece of paper and manually identifying the causal relationships and patterns. 

This sort of application exists already, but these tools can only visualize a few nodes at a time, while this product will be able to visualize hundreds or more nodes at the same time with sophisticated visualization tools to aid the user. Since our partner is part of a research team for the Machine Learning Group at UofT, more specifically for AI forecasting, this product would allow them to gain more insights in their current research, as they currently have a need for a tool like this, aligning with their goals to improve and push the boundaries of AI forecasting technology.


#### Q4: What are the user stories that make up the Minumum Viable Product (MVP)?


- As a user, I want to upload a JSON file consisting of nodes and edges that form causal relationships between events, so that I can - generate a 3D graph that visualizes my data.
- As a user, I want to interact with my graph by zooming, panning, and rotating it, so that I can view parts of the graph in more detail.
- As a user, I want to manipulate the graph I’ve created by filtering for particular subsets of events and relationships, so I can better understand my underlying data.
- As a user, I want to search for specific keywords, to view pertinent nodes and observe strong relationships to those nodes. 
- As a user, I want to identify pronounced causal paths in my data, so I can gain insight into what events are most causally affiliated with others.
- As a user, I want to share my graph, including my manipulations, so that others can view my visualization.
- As a user, I want to login to the website and save my graphs and files to my account, so that I can easily access them again later. 
- As a user, I want to search for other user's public graphs based on titles and keywords. This should yield a page of relevant results so that I can choose what graph(s) to view.

#### Q5: Have you decided on how you will build it? Share what you know now or tell us the options you are considering.

<p align="center">
  <img width="720" alt="Architecture Diagram" src="https://github.com/user-attachments/assets/c6382114-26d3-40ad-8245-19332bf31e72">
</p>
<p align="center">
  Architecture Diagram of the Application
</p>

**Front-End**
- Technology: Three.js, WebGL, React, TypeScript
- Role: 
  - Render 3D causal diagrams.
  - Manage user interactions such as zooming, rotating, and filtering.
  - Display additional information for nodes and edges.

**Back-End**
- Technology: Node.js, Express, Firebase, DynamoDB
- Role: 
  - Handle user sessions, permissions, and data storage.
  - Manage server-side processing.
  - Handle user accounts, permissions, and access controls.

**Database**
- Technology: Firebase (or an equivalent NoSQL database)
- Role: 
  - Store user accounts, permissions, 3D diagrams, and metadata.
  - Enable search functionality for diagrams based on attributes and content.

**3D Graphics Engine**
- Technology: Three.js, WebGL
- Role: 
  - Render 3D diagrams.
  - Enable user interactions with smooth transitions, lighting, and animations.

**Data Processing**
- Technology: Python
- Role: 
  - Process user-uploaded data and convert large datasets into node-edge formats.
  - Enable advanced filtering functionalities such as parent-child chains and time-based filtering.

**Deployment**
- Technology: AWS
- Role: 
  - Host and manage the application.

**Containerization**
- Technology: Docker
- Role: 
  - Containerize the front-end and back-end independently for encapsulation of dependencies and runtime environments.
  - Containers will be used for development, with potential usage in production deployment based on environmental requirements.

**Software Design Patterns**
- Patterns: 
  - Object-Oriented Programming (OOP)
  - Data Abstraction Layer

----
## Intellectual Property Confidentiality Agreement 

Partner has agreed to open-source software. We will be choosing option 2 here.

“You can upload the code to GitHub or other similar publicly available domains.”


## Teamwork Details

#### Q6: Have you met with your team?

After the partner meeting, the team gathered for some casual conversation. We discussed topics ranging from hobbies to current courses to weekend plans. 


Fun Fact 1: One of our team members is an exchange student from Ukraine.

Fun Fact 2: Our team can speak a combined total of 8 different languages.

Fun Fact 3: One of our team members is 6’5.

#### Q7: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. One person may have multiple roles.  
 * Add role(s) to your Team-[Team_Number]-[Team_Name].csv file on the main folder.
 * At least one person must be identified as the dedicated partner liaison. They need to have great organization and communication skills.
 * Everyone must contribute to code. Students who don't contribute to code enough will receive a lower mark at the end of the term.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * Why did you choose them to take that role? Specify if they are interested in learning that part, experienced in it, or any other reasons. Do no make things up. This part is not graded but may be reviewed later.

**Terry: Software Engineer, Frontend, Infra, Team Leader**
- Since Terry has worked at 3 different internships for the past 12 months prior to this academic term, he has a lot of experience working in different professional environments. Thus, we believed that he would be best suited to be the team leader to help direct this project.

**Jaeyong: Software Engineer, Backend, Partner Liaison + Project Manager**
- Jaeyong’s interests and skills lie in backend development from previous internships and research lab experiences. He’s also got experience working with databases having taken CSC343, and will help out on the frontend side of things whenever necessary.
- Specific aspects he’ll work on: overseeing meeting minutes, all communications with partner, server/API set-up and programming, database schema design, JWT auth, etc.
- He is also organized and has good communication skills, which is why he is interested in project management and partner liaison duties.

**Sam: Software Engineer, Backend, Project Manager**
- Sam will be Project Manager, focused coordinating the team’s collective work through Trello and using the team’s input to steer the project in the right direction. In addition, he will be working on the backend of the visualization software, working on API requests related to searches, accounts, and saving and loading graphs. 
- Sam is interested in learning about effective project management, so this course offered him a good opportunity to manage a group to successfully deliver the project. He hopes to leverage existing leadership skills and learn from his team-members to optimize his abilities. Sam also chose backend development to engage in technical work focused on system architecture and data handling. This is suitable as he has experience developing backend APIs and data-oriented programs. 

**Danny: Software Engineer, Full-stack + DevOps**
- Danny will be working on the UI for the causal graph and data management and search
- Danny will also handle DevOps such as containerizing the project with Docker
- As Danny has professional experience from internships for working on both frontend and backend, he would be useful as a Full-stack developer. 
- Since he has not done much work with DevOps, he wants to take this opportunity to get more experience with it and learn more about how to incorporate it in a project. 

**Kevin: Software Engineer, Full-stack**
- Kevin will be working on the UI for the causal graph


**Morris: Software Engineer, Full-stack**
- Morris will be working on the UI for the casual graph
- Morris’ interests in backend development coupled with his experience in database management, along with his willingness to learn and contribute to the frontend will help him as a full stack engineer


**Daria: Software Engineer, Full-stack**
- Daria will be working on implementing the UI of the application itself
- Will be helping with the UI for the causal graph
- Will be helping with the mockups and designs of various components of the product


#### Q8: How will you work as a team?

Once we have concluded project expectations with the partner and started coding, we will send standup messages to our discord channel every Monday, Wednesday, Friday, updating each other on what we’ve done and will do. Other miscellaneous tasks will be communicated through our instagram chat. Additionally, a discord server has been set up between our team and our partner for easy communication.

Events such as coding sessions and code reviews will be done in ad hoc fashion if needed and agreed upon team members. Additionally, weekly meetings will take place once a week online.

First meeting with partner: Brief meeting where we first introduced ourselves, then we went through the design documents, further consolidating requirements with the partner. Further details can be found in the meeting minutes folder.

Second meeting with partner: Friday Sept 27 to finalize some details and establish a regular meeting schedule.

#### Q9: How will you organize your team?

We will primarily use a Trello workspace with a Kanban board setup for organizing the team. This workspace will consist of three columns: “To Do”, “Doing”, and “Done”, that collectively demonstrate the progress on our project tasks. In addition, these tasks will be labeled with participating members, priorities, expected completion dates, and link to the coinciding branch of pull request on GitHub. We will resolve this board as a group, by mutually assigning tasks and discussing appropriate completion dates as per the weekly expectations in the project overview document.

We will use Git for repository management and version control for our software. Likewise, we will use GitHub as our remote. We will create branches for each disjoint in-progress task, use pull-requests to merge branches to main where each pull request will be reviewed and tested by two independent team-members before approval for merging. Moreover, pull requests will have Git hooks enabled for automatic pre-commit checking. We will maintain a stable main branch for serving our application. For our project repository, we will enforce [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure we preserve a readable and organized commit history.

#### Q10: What are the rules regarding how your team works?

We will meet with our partner at least once a week to either report our progress or discuss any difficulties we are encountering throughout the projects. The primary communication channel between the team and partner will be through discord. Weekly check ups will be done through virtual platforms like discord or google meets. Otherwise, we will be able to meet in person. 

We have a dedicated team lead and project manager to make sure everyone is doing their work and meeting deadlines. Everyone is expected to be at meetings unless communicated beforehand. If anyone misses a meeting or a deadline, the team lead or project manager be in touch with the member to check in. If a member continues to not contribute to the project, the entire team will have a meeting to discuss the next steps, whether it is giving a hard deadline to the member or escalating the issue to the teaching team. 


#### Q11. How does your team fit within the overall team organisation of the partner?

Our team is mostly focused on creating the 3D visualization of a causal diagram. The actual nodes and edges that we have to graph in the diagram are provided by the partner team. As implementing forecasting is too complicated for the scope of this course, our team will use the forecasts from the partner team to create our graph. Thus, our team will present an interactive visual representation of the partner team’s work in forecasting. 



#### Q12. How does your project fit within the overall product from the partner?
The partner mentioned that this visualization is an important part of the big picture since a lot of other researchers struggled to visualize and correlate the causes and effects of a certain topic. What we are creating will be the first prototype of the project. We are building a full stack web application, with a focus on frontend causal diagram visualizations. Our partner also has another CSC301 team working on a software platform that gathers global data to enhance an AI agent's ability to forecast significant future events. The partner has mentioned that at the end of the project, ideally we can integrate these two parts of the projects, as one team enables the software platform to gather global data, and our team will be visualizing the causal relationships. Below is a picture of the visualization our team would like to achieve, given the collected data provided from the software platform the other team is working on.  

<p align="center">
  <img width="504" alt="Screenshot 2024-09-26 at 8 03 10 PM" src="https://github.com/user-attachments/assets/c9a1f779-cc27-4086-8480-375ff7ebfb6c">
</p>

## Potential Risks

#### Q13. What are some potential risks to your project?
- Risk of Misunderstanding by End Users

 End users often misunderstand and there is a huge risk in delivering a wrong message to them or confusing them more than helping them understand the data. This can have negative impacts on decision-making.

- Scalability and performance issues.

Using many libraries instead of creating algorithms from scratch could lead to performance problems, particularly with larger datasets. This reliance might result in less focus on optimizing performance.


#### Q14. What are some potential mitigation strategies for the risks you identified?
First, the tool should allow people to visualize the same data in different ways, to explore it from different perspectives. This would at least mitigate the problems of one sided perspective.
Second, we will carefully evaluate the underlying implementation of library functions and their time complexities. Additionally, we will conduct performance testing on large datasets to ensure scalability and efficiency.
