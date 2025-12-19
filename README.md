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

- - - 
 
 # #   6 .   A P I   D o c u m e n t a t i o n 
 
 T h e   Q A p p   b a c k e n d   p r o v i d e s   R E S T f u l   A P I s   f o r   u s e r   a u t h e n t i c a t i o n ,   b r a n c h   m a n a g e m e n t ,   a n d   t i c k e t   o p e r a t i o n s .   A l l   e n d p o i n t s   a r e   p r e f i x e d   w i t h   ` / a p i ` . 
 
 # # #   A u t h e n t i c a t i o n   E n d p o i n t s 
 
 # # # #   P O S T   / a p i / l o g i n 
 L o g s   i n   a   u s e r   a n d   r e t u r n s   a   J W T   t o k e n . 
 
 * * R e q u e s t   B o d y : * * 
 ` ` ` j s o n 
 { 
     " e m a i l " :   " u s e r @ e x a m p l e . c o m " , 
     " p a s s w o r d " :   " p a s s w o r d " 
 } 
 ` ` ` 
 
 * * R e s p o n s e   ( 2 0 0   O K ) : * * 
 ` ` ` j s o n 
 { 
     " t o k e n " :   " j w t _ t o k e n _ s t r i n g " , 
     " u s e r I d " :   " u s e r _ i d " , 
     " r o l e " :   " c u s t o m e r " 
 } 
 ` ` ` 
 
 * * E r r o r   R e s p o n s e s : * * 
 -   4 0 1   U n a u t h o r i z e d :   I n v a l i d   c r e d e n t i a l s 
 
 # # #   B r a n c h   E n d p o i n t s 
 
 # # # #   G E T   / a p i / b r a n c h e s 
 R e t r i e v e s   a   l i s t   o f   a l l   b r a n c h e s . 
 
 * * R e s p o n s e   ( 2 0 0   O K ) : * * 
 ` ` ` j s o n 
 [ 
     { 
         " _ i d " :   " b r a n c h _ i d " , 
         " n a m e " :   " B r a n c h   N a m e " , 
         " l o c a t i o n " :   " B r a n c h   L o c a t i o n " , 
         " s e r v i c e s " :   [ " d e p o s i t " ,   " w i t h d r a w a l " ] , 
         " c u r r e n t L o a d " :   1 0 , 
         " p r e d i c t e d L o a d " :   { } 
     } 
 ] 
 ` ` ` 
 
 # # # #   G E T   / a p i / b r a n c h e s / : i d / p r e d i c t i o n 
 G e t s   p r e d i c t i o n   d a t a   f o r   a   s p e c i f i c   b r a n c h . 
 
 * * R e s p o n s e   ( 2 0 0   O K ) : * * 
 ` ` ` j s o n 
 { 
     " p r e d i c t e d L o a d " :   { 
         " h o u r l y " :   [ 5 ,   1 0 ,   1 5 ] , 
         " p e a k T i m e " :   " 1 4 : 0 0 " 
     } 
 } 
 ` ` ` 
 
 * * E r r o r   R e s p o n s e s : * * 
 -   4 0 4   N o t   F o u n d :   B r a n c h   n o t   f o u n d 
 
 # # #   T i c k e t   E n d p o i n t s   ( C R U D ) 
 
 # # # #   P O S T   / a p i / t i c k e t s 
 C r e a t e s   a   n e w   t i c k e t . 
 
 * * R e q u e s t   B o d y : * * 
 ` ` ` j s o n 
 { 
     " u s e r I d " :   " u s e r _ i d " , 
     " b r a n c h I d " :   " b r a n c h _ i d " , 
     " s e r v i c e T y p e " :   " d e p o s i t " 
 } 
 ` ` ` 
 
 * * R e s p o n s e   ( 2 0 1   C r e a t e d ) : * * 
 ` ` ` j s o n 
 { 
     " _ i d " :   " t i c k e t _ i d " , 
     " u s e r I d " :   " u s e r _ i d " , 
     " b r a n c h I d " :   " b r a n c h _ i d " , 
     " s e r v i c e T y p e " :   " d e p o s i t " , 
     " s t a t u s " :   " w a i t i n g " , 
     " c r e a t e d A t " :   " 2 0 2 3 - 1 2 - 2 0 T 1 0 : 0 0 : 0 0 Z " 
 } 
 ` ` ` 
 
 # # # #   G E T   / a p i / t i c k e t s 
 R e t r i e v e s   a l l   t i c k e t s . 
 
 * * R e s p o n s e   ( 2 0 0   O K ) : * * 
 ` ` ` j s o n 
 [ 
     { 
         " _ i d " :   " t i c k e t _ i d " , 
         " u s e r I d " :   " u s e r _ i d " , 
         " s e r v i c e T y p e " :   " d e p o s i t " , 
         " s t a t u s " :   " w a i t i n g " 
     } 
 ] 
 ` ` ` 
 
 # # # #   P U T   / a p i / t i c k e t s / : i d 
 U p d a t e s   a   t i c k e t . 
 
 * * R e q u e s t   B o d y : * * 
 ` ` ` j s o n 
 { 
     " s t a t u s " :   " s e r v e d " 
 } 
 ` ` ` 
 
 * * R e s p o n s e   ( 2 0 0   O K ) : * * 
 U p d a t e d   t i c k e t   o b j e c t . 
 
 * * E r r o r   R e s p o n s e s : * * 
 -   4 0 4   N o t   F o u n d :   T i c k e t   n o t   f o u n d 
 
 # # # #   D E L E T E   / a p i / t i c k e t s / : i d 
 D e l e t e s   a   t i c k e t . 
 
 * * R e s p o n s e   ( 2 0 0   O K ) : * * 
 ` ` ` j s o n 
 { 
     " m e s s a g e " :   " T i c k e t   d e l e t e d " 
 } 
 ` ` ` 
 
 * * E r r o r   R e s p o n s e s : * * 
 -   4 0 4   N o t   F o u n d :   T i c k e t   n o t   f o u n d 
 
 # # #   P o s t m a n   C o l l e c t i o n 
 I m p o r t   t h e   ` A P I   P O S T M A N   T E S T S / Q A p p _ A P I . p o s t m a n _ c o l l e c t i o n . j s o n `   f i l e   i n t o   P o s t m a n   t o   t e s t   t h e   e n d p o i n t s .   S c r e e n s h o t s   o f   s u c c e s s f u l   r e s p o n s e s   a r e   a v a i l a b l e   i n   t h e   ` A P I   P O S T M A N   T E S T S / `   f o l d e r .  
 