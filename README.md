# AngularAnalytics
This project is the solution to the Natlex group frontend developer assignment

&nbsp;

## Table of contents
- [Assignment Resources](#assignment-resources)
- [Dependencies](#dependencies)
- [Project Documentation](#project-documentation)
  * [Project Structure](#project-structure)
  * [API and Data](#api-and-data)
  * [Mock Data](#mock-data)
  * [Project Management](#project-management)
  * [Tests](#tests)


&nbsp;
## Assignment Resources
- [Question: Frontend Developer Test Angular.pdf](https://github.com/bolub/angular-analytics/files/12830486/Frontend.Developer.Test.Angular.pdf)
- [App URL](https://bolu-natlex-group-assignment-solution.vercel.app/view-mode)
- [Demo Video URL](https://www.loom.com/share/444cf0158367407d94f74aac4328cef6?sid=6c2ea1a1-a691-43ad-a9ca-733869983bc0)

&nbsp;
## Dependencies
- Angular
- ngRx
- Rx.js
- Angular Material
- Tailwind CSS

&nbsp;
## Project Documentation
The project follows a common structure with three main folders: core, features, and shared.

&nbsp;
### Project Structure
1. **Core**: 
The core folder contains essential components and services that are crucial for the functioning of the application.

2. **Features**:
The features folder is where we organize our application's main functionality or feature modules which in this case are Settings and ViewMode

3. **Shared**:
The shared folder is for components, state, and other resources that can be shared across different parts of the application. It typically includes:

&nbsp;
### API and Data
For API communication, we have integrated a quick backend using Appwrite. Appwrite is used to save chart information and interact with the server.

&nbsp;
### Mock Data
To facilitate development and testing, we have created a custom mock service located at [src/app/core/mock](https://github.com/bolub/angular-analytics/tree/main/src/app/core/services/mock). This mock service generates mock data for the charts.

&nbsp;
### Project Management
The project was managed using GitHub [issues](https://github.com/bolub/angular-analytics/issues).

&nbsp;
### Tests
Unit tests have been written with jasmine and e2e tests with cypress
