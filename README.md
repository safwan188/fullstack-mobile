# fullstack-mobile
for live demo for react + node visit: https://shark-front-c6381df85aaa.herokuapp.com/
username:admin  
password:shark123

note: there is a new front-end using MUI-React but its not published yet you can check it at the following repository:https://github.com/safwan188/MUI-React 

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

Clone the repository and follow the setup instructions for each component:

#### Backend:
- Run `npm install`
- Create a new file `.env` and configure the following environment variables:
  - `MONGODB_URI=`
  - `PORT=`
  - `JWT_SECRET=`
  - `ADMIN_PASSWORD=`

#### Frontend:
- Run `npm install`
- Create `.env` and configure the following:
  - `REACT_APP_API_URL=`

#### App:
- Run `npm start`
- For iOS, run `i`
- For Android, run `a`
- Make sure your emulator is running

### Project Flow:

#### Manager Login:
![Screenshot 1](/screenshots/1.png)

#### Reports Table:
![Screenshot 2](/screenshots/2.png)

#### New Reports:
![Screenshot 3](/screenshots/2.5.png)
![Screenshot 4](/screenshots/2.7.png)

#### App Login:
![Screenshot 5](/screenshots/3.jpg)
![Screenshot 6](/screenshots/4.jpg)

#### Choosing a Date and Making a Request:
![Screenshot 7](/screenshots/5.jpg)
![Screenshot 8](/screenshots/6.jpg)

#### Accepting the Request:
![Screenshot 9](/screenshots/7.png)

#### Report Appear in 'My Reports' Screen for the Assigned Expert:
![Screenshot 10](/screenshots/8.jpg)

#### Expert Upload Findings and Photos:
![Screenshot 11](/screenshots/9.jpg)

#### Completed Report Screen:
![Screenshot 12](/screenshots/10.png)

#### Downloading the Generated PDF for the Report:
![Screenshot 13](/screenshots/11.png)
![Screenshot 14](/screenshots/12.png)
![Screenshot 15](/screenshots/13.png)



