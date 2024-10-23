# Deliverable 2 - Sub-team 1 Report

### 1. Summary of our decisions and the options we considered:
In summary, we built both the frontend and backend components of the account system, incorporating file upload functionality as well. This included key features such as user sign-up, login, forgot password, and a partial home page, alongside their respective backend logic.

The primary decision pertaining to these components was our selection of Firebase. We chose Firebase because of its helpful authentication-handling, Firestore for a NoSQL database, and cloud storage for file uploads. It allowed us to avoid developing certain generic features, such as an email system for resetting passwords or a unique ID generator for users, as these functionalities are built into Firebase authentication. Firebase also enabled us to easily integrate Google authentication into our project, with the possibility of adding authentication from other services, such as Apple or GitHub. Moreover, Firestore database and cloud storage are both very fast and highly scalable, while offering a generous free tier. Thus, our web app will be well-equipped to handle variable amounts of requests without the need for manual scaling.

We used Firestore specifically to store user objects and graph metadata. Firebase authentication is limited to preset fields for each user and can only service the current user. Therefore, we created a unique document in Firestore associated with their UID that holds supplemental information, such as roles and references to their saved graphs. In addition, storing the graph metadata in Firestore was convenient for fast querying and for holding an accessible and secure reference to the raw graph data in cloud storage.

The remaining tech stack decisions were made collectively by the whole team, and they were well-suited to the needs of our subteam. Next.js allowed us to easily integrate our server-side logic directly into the web app, and it facilitated the implementation of modern frontend components by using highly compatible UI libraries such as Tailwind and ChakraUI. TypeScript provided a robust abstraction layer by allowing us to cast Firestore documents to interfaces and ensuring type safety for Firebase-related functions.

We considered other options for several components. One such option was DynamoDB for our NoSQL database, but given Firebase’s wide versatility and authentication handling, we decided it was the best choice for our purposes. Additionally, we assessed the prospect of using alternative programming languages for our backend logic, but it would have required significant additional setup, and we didn’t need the libraries or features that other languages would offer.

This effectively summarizes our development choices. We prioritized using modern, fast, and secure frameworks to ensure our web app is reliable and provides an excellent user experience.

### 2. Individual contributions:

**Danny:**
As a full-stack engineer, I worked on both the frontend and backend for deliverable 2 with my main contributions being to the user authentication system. In the backend, I developed the functionality for creating accounts with email and password. Using firebase authentication service, I caught any account creation errors as if the email entered has already been signed up with, it would throw an error. In addition to creating an account with email and password, I also implemented the functionality for Google sign-in, allowing a convenient alternative sign-in method. Upon clicking on the google sign-in button, the user would be taken to a pop-up screen prompting them to sign into their Gmail account. The system would then create an account in the database using their Gmail credentials. For frontend, I created the create account page that is hooked onto the backend that handles creating accounts and setting them up in the database. Additionally, I created a forgot password page which is on the main login page to help users reset their password in case they forgot it.

**Jaeyong:**
My primary backend responsibilities were the features that allow the users to change their password and upload JSON files for their graphs to save to their accounts. For password changes, I took advantage of the firebase authentication service to send an email with a link to update password to the user's inbox. Within the Firebase development console, I wrote out the email that facilitates this. For JSON file upload, I utilized a combination of Firebase Cloud Storage (to store the raw JSON file content) and Firestore (to store graph metadata). I wrote functions to upload graphs and to fetch all graphs belonging to the user. On the frontend, I built the very first page, the login page, which was used as the template to build the create account and forgot password pages. I also built the upload JSON page and the graph list component used on the home page to display a list of the users graphs fetched from the db. Lastly, I hooked up my backend functions for executing a password change to the forgot password page Danny built.

**Samuel:**
My primary responsibilities in this deliverable were in my role as a backend engineer. I wrote the logic for email and password login, Google login, logout, Firestore document fetching, and user types, as well as writing and integrating the full authentication context to ensure that authentication state is preserved and accessible throughout the web app. Additionally, I developed a preliminary home page to display Firestore data and implemented a logout button. I also set up the testing framework using Jest and troubleshooted its compatibility with Next.js. Following this, I wrote the login page tests, which comprehensively cover all actions a user can perform on that page, including logging in with an eligible account. In my capacity as project manager, I created our team Firebase account and integrated its configuration into our project, including setting up environment variables for sensitive keys. I also created the skeleton code for our subteam to build on during development. Beyond this subteam, I managed our tasks on Trello and provided consultation on design choices to other subteams, particularly concerning the database, as I have the most familiarity with Firebase. Lastly, I wrote the summary for this subteam’s report.

### 3. Steps for Verification:

1. **Access the Deployment**:  
   Head over to our deployment at the link below, where you'll first find yourself on a login page.

2. **Create an Account**:  
   Create an account, ideally **do not use Google account creation** (for now) so you can create a password and later test the login page. Google login and account creation has been implemented so you can come back to it later to try it out.

3. **Home Page & File Upload**:  
   After creating your account, you will be redirected to the home page. On this page, upload the following JSON file, which contains dummy data for nodes and edges of a graph, by clicking on the upload file button in the top right:  
   [Dummy JSON Data for Testing](https://drive.google.com/drive/folders/1Bgcx9l224UFH2GCEW-DQcYPc2k1sJJfJ?usp=sharing)

4. **Verify Graph Upload**:  
   Check that your uploaded graph(s) appear on the home page by making sure you see the graph name and description for the graph you just uploaded. You should see a green "graph saved" message indicating a successful upload to the database.  

   **Note (10/18)**: ~~Due to a Firebase daily database read quota limitation, the graph data has been temporarily filled with dummy data. The code that pulls the user’s uploaded graphs from Firebase has been commented out. I (Jaeyong) will attempt to fix this over the weekend of 10/19/2024, but for now, the green “graph saved” message indicates a successful upload.~~

   **Note (10/22)**: The code causing the firebase query limit has been fixed. Please see the deployment link section at the bottom where we've provided a link to the new deployment.

6. **Test Logout and Password Reset**:  
   Log out by clicking the "Log Out" button. Then, test the "Forgot Password" functionality on the main login page by sending an email to reset your password. Verify that you can log in with the newly created password.

### Deployment Link:  
[~~Deployment~~](https://project-19-machine-learning-group-5u0ilpwc5.vercel.app/) <- this is the old deployment link which has the potential for "query limit reached" error if left running for too long.

To access sub-team 1's deployment, please use:
- [This one](https://project-19-machine-learning-git-42d99a-terrys-projects-2a9e0002.vercel.app/)
- [Or this back up one if the above gives you any trouble](project-19-machine-learning-group-2a1aq6q84.vercel.app)

