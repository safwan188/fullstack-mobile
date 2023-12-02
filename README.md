# fullstack-mobile
for live demo for react + node visit: https://shark-front-c6381df85aaa.herokuapp.com/
username:admin  
password:shark123

# Plumbing Inspection Workflow System

## Overview

This project, designed specifically for a family-run plumbing business, implements a comprehensive system to manage plumbing inspections. It comprises three primary components: a server, a web frontend, and a mobile application, each tailored to streamline workflow, facilitate communication between managers and experts, and automate the generation of detailed inspection reports.

## Features

- **Manager Dashboard (Web Frontend):** Built with React, enables managers to add and manage experts, customers, properties, and inspection reports.
- **Expert Application (Mobile App):** Allows experts to view and select open reports, and submit their inspection dates for manager approval.
- **Report Management:** Dynamic report creation including scheduling, subject and description input, and photo attachments.
- **Task Assignments:** Managers can assign reports to experts either automatically (based on expert requests) or manually.
- **Inspection Reporting:** Experts can upload their findings and photos to the report and mark it as completed.
- **Automated PDF Generation:** The system generates detailed PDF reports, compiling all relevant information.

## Technology Stack

- **Frontend:** React
- **Backend:** Node.js
- **Database:** MongoDB
- **Image Storage:** Google Cloud Bucket
- **Hosting:** Heroku (Demo)
- **Version Control and CI/CD:** Git with CI/CD integration
- **Mobile App Deployment:** react-native Published unlisted on the App Store

### Installation and Setup

**Clone the repository and follow the setup instructions for each component:
**backend:
**npm install
**create new file .env and configure following env variables
**MONGODB_URI=
**PORT=
**JWT_SECRET=
**ADMIN_PASSWORD=
```
```

**for front end npm install
**create .env and configute following  :
**REACT_APP_API_URL=
**for app:
**npm start  
**i to run ios
**a to run android
**make sure your emulater is running 
project flow:



**manager login:
![Screenshot 1](/screenshots/1.png)
** reports table
![Screenshot 2](/screenshots/2.png)
** new reports
![Screenshot 3](/screenshots/2.5.png)
![Screenshot 3](/screenshots/2.7.png)
** app login
![Screenshot 11](/screenshots/3.jpg)
![Screenshot 10](/screenshots/4.jpg)
** choosing a date and making a request
![Screenshot 4](/screenshots/5.jpg)
![Screenshot 5](/screenshots/6.jpg)
accepting the request
![Screenshot 7](/screenshots/7.png)
report appear in my reports screen for the assigned expert 
![Screenshot 8](/screenshots/8.jpg)
expert upload findings and photos
![Screenshot 11](/screenshots/9.jpg)
completed report screen 
![Screenshot 10](/screenshots/10.png)
downloading the generated pdf for the report:
![Screenshot 4](/screenshots/11.png)
![Screenshot 5](/screenshots/12.png)
![Screenshot 7](/screenshots/13.png)




