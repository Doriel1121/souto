# Souto
## On boarding application

### Introduction
Souto application comes to solve the problem of on boarding process when you work from home.

Few examples: 
* A new employee at Microsoft starts to work at the R&D of ExcellOnline team from home
* Multiple students start their first year at Ben-gurion university from home due to the COVID-19 pandemic

The application gives the employee / each of the students, the ability to understand at any moment exacly what he suppose to do.
His supervisor might not being able to communicate with him 24/7, but with the help of Souto App he, the supervisor, can define the exact process of accepting a new employee / student.
The later knows exacly what is waiting for him in the on-boarding, and can manage his process with the help of the application by saying exacly what he had done, what he is doing, and what he didnt do yet.

### How it works
The application is divided to 2 parts:
1. Employer/ Manager/ etc - Called a Captain
2. Employee/ Student/ Client/ etc - Called a Sailor

#### Captain
The captain creates a board in which he says exacly what the on boarding process includes:
* He create a ticket of each step that should be taken

The captain also have the ability to follow his sailors progress and see if any of them is having a problem with doing a specific ticket

#### Sailor
The sailor, on the other hand - is the one that log in to a board and start the on-boarding process. He sees all the the tickets that he needs to do - and can mark them as 'In progress' when he works on them, or as 'Done' when he is finished.
The on boarding process is finished once the sailor had done all of the tickets.
The sailor have the ability to indicate that he has a problem with doing a specific ticket - and the captain will immediatly know about it.


## Important information
This repository contains the Server code(souto-server) + Client(App) code(souto-app) + Application binary (apk in bin directory).
You should only install the apk to run the application. The server is already running on AWS, So there is no need to run it.
You can run the application code in google chrome dev-tools. For more information read the README in the souto-app directory.

### Prerequisites
* An android device or emulator (Android Nougat or newer + API version 24 or above)
* Clone the repo / Download the APK from the bin directory

### Install the app
It is highly recommended to install the application on an actual device!

1. Download the APK from your device (Or drop in to your emulator)
2. Install the APK

## Read me please!
You can create your own board of course, but for convenience reasons, we already opened a few example boards, you can connect them as a Captain (using the board secret) or as a Sailor (using the board key):
* A new employee at Microsoft company, R&D department, WindowsDefender team 
  ** Board key: 1234
  ** Board secret: 4321

Please notice that you are not the only tester that may check these board. So please do not delete / add garbage tickets.
