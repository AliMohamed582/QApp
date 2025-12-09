# QApp
Smart Queue System: Digital ticketing, real-time updates, and queue tracking. Pre-Service Verification: Upload documents in advance, staff pre-checks to cut branch time. AI Branch Prediction &amp; Virtual Teller: Forecast peak hours, recommend visit times. VIP &amp; Analytics: Priority queues, corporate scheduling for real-time branch flow insights. 


<!-- Delete all of the above for your submission -->

QApp
**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  

| Name             | Student ID | Tutorial Group | GitHub Username | features 

| [Ali Mohamed Ali] | [13003013]       | [T8]           | [@username]     |Smart Queue System
| [John Hany]      | [130042]       | [T8]           | [@username]     | Pre-Service Digital Verification (basic upload)
| [Pierre Ashraf] | [13005443]       | [T8]           | [@username]     | 	Corporate & VIP Queue Management (basic priority logic)
| [Malak El Hamzawy] | [13006450]       | [T8]           | [@username]     |In-App Microservices (simple service requests + scheduling)

---

## 2. Project Description

_Provide a detailed description of your project concept here. What is the app? What problem does it solve?_

QApp is a smart queuing and appointment management app designed to modernize how customers interact with banks in Egypt. It tackles the widespread problem of long wait times, overcrowded branches, and inefficient service delivery by offering a seamless digital experience that begins before the customer even arrives. Through features like document pre-verification, AI-powered branch load prediction, virtual teller access, and intelligent routing, QApp helps users choose the best time and location for their visit, complete low-risk services remotely, and reduce unnecessary trips. For banks, it provides real-time analytics, corporate and VIP queue management, and open banking integration, making it a scalable solution that improves operational efficiency, enhances customer satisfaction, and supports Egypt’s broader digital transformation goals

@@ -43,23 +41,62 @@ _Provide a detailed description of your project concept here. What is the app? W

### 3.1 Full Scope

_List ALL potential features/user stories envisioned for the complete product (beyond just this course)._
 list of **QApp’s features**
1. **Smart Queue System**  
   - Digital ticketing with real-time updates  
   - Queue status tracking

2. **Pre-Service Digital Verification**  
   - Upload ID, forms, and documents before arrival  
   - Pre-check by bank staff to reduce branch time

3. **Smart Branch Load Prediction (AI)**  
   - Predicts peak hours and queue duration  
   - Recommends best time to visit  
   - Uses historical + real-time data

4. **Virtual Teller (Video Banking)**  
   - Video or voice call with bank agent  
   - Handles low-risk services remotely  
   - Reduces physical visits

5. **Corporate & VIP Queue Management**  
   - Priority handling for VIPs  
   - Group scheduling for companies  
   - Staff queue coordination

6. **Branch Footfall Analytics Dashboard**  
   - Real-time customer flow tracking  
   - Predictive load analytics for bank managers

7. **Multi-Bank Integration (Open Banking Ready)**  
   - One app for multiple banks  
   - Unified appointment booking across institutions

8. **In-App Microservices**  
   - Request services (e.g., new card) directly in app  
   - Schedule pickup without full branch visit

9. **Intelligent Routing to Best Branch**  
   - Recommends least crowded branch  
   - Matches branch to preferred service availability  
   - Optimizes travel and service time



- ...

### 3.2 Selected MVP Use Cases (Course Scope)


1.  **User Authentication** (Registration/Login)

 - User Authentication (Registration/Login) User Authentication (mandatory) – Registration and login with secure password handling
- Smart Queue + Pre-Service Digital Verification
- Smart Branch Load Prediction (AI)
- Virtual Teller (Video Banking)
- In-App Microservices (e.g., card request + pickup scheduling)
- Branch Footfall Analytics Dashboard for Banks


---


## 5. Data Model (Initial Schemas)

_Define the initial Mongoose Schemas for your application’s main data models (User, Transaction, Account, etc.). You may use code blocks or pseudo-code._
- User: name, email, password, role (customer/bank staff), preferred bank(s)
- QueueTicket: user ID, branch ID, service type, time slot, status
- Document: user ID, document type, file URL, verification status
- Branch: name, location, services, current load, predicted load
- ServiceRequest: user ID, request type, form data, status, pickup time
- Analytics: branch ID, timestamp, footfall count, average wait time

### User Schema
const mongoose = require('mongoose');

```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields...

  role: { type: String, enum: ['customer', 'bank_staff', 'admin'], default: 'customer' },
  phoneNumber: { type: String },
  preferredBank: { type: String },
  preferredBranch: { type: String },

  documents: [
    {
      type: { type: String, required: true },
      url: { type: String, required: true },
      verified: { type: Boolean, default: false }
    }
  ],

  queueStatus: {
    ticketId: { type: String },
    branchId: { type: String },
    serviceType: { type: String },
    timeSlot: { type: Date },
    status: { type: String, enum: ['waiting', 'served', 'cancelled'], default: 'waiting' }
  },

  serviceRequests: [
    {
      requestType: { type: String },
      formData: { type: Object },
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
      pickupTime: { type: Date }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);


### [Model 2 QueueTicket ] Schema
const mongoose = require('mongoose');

const QueueTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  serviceType: { type: String, required: true },
  timeSlot: { type: Date, required: true },
  status: {
    type: String,
    enum: ['waiting', 'in_progress', 'served', 'cancelled'],
    default: 'waiting'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QueueTicket', QueueTicketSchema);

### [Model 3 Branch ] Schema
const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  servicesAvailable: [String],
  currentLoad: { type: Number, default: 0 },
  predictedLoad: {
    type: Map,
    of: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Branch', BranchSchema);


### [Model 3 ### [Model 3 Branch ] Schema
const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestType: { type: String, required: true },
  formData: { type: Object },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  pickupTime: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);

### [Model 3 Analytics  ] Schema
const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  timestamp: { type: Date, default: Date.now },
  footfallCount: { type: Number },
  averageWaitTime: { type: Number } // in minutes
});

