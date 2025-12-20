# QApp
**Course:** Electronic Business Development (BINF 503)  
**Semester:** Winter 2025  
**Instructor:** Dr. Nourhan Hamdi  

| Name              | Student ID | Tutorial Group | GitHub Username | Feature Contribution |
|-------------------|------------|----------------|-----------------|----------------------|
| Ali Mohamed Ali   | 13003013   | T8             | @username       | Smart Queue System |
| John Hany         | 130042     | T8             | @username       | Pre-Service Digital Verification (basic upload) |
| Pierre Ashraf     | 13005443   | T8             | @username       | Corporate & VIP Queue Management (priority logic) |
| Malak El Hamzawy  | 13006450   | T8             | @username       | In-App Microservices (service requests + scheduling) |

---

## 2. Project Description

QApp is a smart queuing and appointment management app designed to modernize how customers interact with banks in Egypt. It tackles the widespread problem of long wait times, overcrowded branches, and inefficient service delivery by offering a seamless digital experience that begins before the customer even arrives. Through features like document pre-verification, AI-powered branch load prediction, virtual teller access, and intelligent routing, QApp helps users choose the best time and location for their visit, complete low-risk services remotely, and reduce unnecessary trips. For banks, it provides real-time analytics, corporate and VIP queue management, and open banking integration, making it a scalable solution that improves operational efficiency, enhances customer satisfaction, and supports Egypt’s broader digital transformation goals.

---

## 3. Milestones

### 3.1 Full Scope (Beyond Course)
1.Smart Queue System – Digital ticketing, real-time updates, queue status tracking  
2.Pre-Service Digital Verification** – Upload ID/documents before arrival, staff pre-checks  
3.Smart Branch Load Prediction(AI)– Predict peak hours, recommend best visit times  
4.Virtual Teller (Video Banking) – Remote low-risk services via video/voice calls  
5.Corporate & VIP Queue Management – Priority handling, group scheduling, staff coordination  
6.Branch Footfall Analytics Dashboard – Real-time customer flow + predictive analytics  
7.Multi-Bank Integration (Open Banking Ready) – Unified booking across institutions  
8.In-App Microservices– Service requests (e.g., new card) + pickup scheduling  
9.Intelligent Routing– Recommend least crowded branch, optimize travel/service time  

---

### 3.2 Selected MVP Use Cases (Course Scope)
- **User Authentication** (mandatory, secure with bcrypt + JWT)  
- **Smart Queue + Pre-Service Verification**  
- **Branch Load Prediction (AI)**  
- **Virtual Teller (Video Banking)**  
- **In-App Microservices (card request + scheduling)**  

---

## 4. How to Run Locally

### Backend
```bash
cd backend
npm install
node app.js
```
Runs on `http://localhost:3000`

Requires `.env` file with:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/qapp
JWT_SECRET=yourStrongSecretKey
```

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3002` (or another port if 3000 is in use)

---

## 5. API Endpoints

- **Authentication**
  - `POST /api/register` → Register new user (password hashed with bcrypt)
  - `POST /api/login` → Login, returns JWT token

- **Branches**
  - `GET /api/branches` → List all branches
  - `POST /api/branches` → Create new branch
  - `GET /api/branches/:id/prediction` → Get branch load prediction

- **Tickets**
  - `GET /api/tickets` → List all tickets
  - `POST /api/tickets` → Create new ticket

- **Service Requests**
  - `GET /api/service-requests` → List all service requests
  - `POST /api/service-requests` → Create new service request

---

## 6. Data Model (Initial Schemas)

### User Schema
```javascript
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'bank_staff', 'admin'], default: 'customer' },
  phoneNumber: { type: String },
  preferredBank: { type: String },
  preferredBranch: { type: String },
  documents: [
    { type: { type: String, required: true }, url: { type: String, required: true }, verified: { type: Boolean, default: false } }
  ],
  queueStatus: {
    ticketId: { type: String },
    branchId: { type: String },
    serviceType: { type: String },
    timeSlot: { type: Date },
    status: { type: String, enum: ['waiting', 'served', 'cancelled'], default: 'waiting' }
  },
  serviceRequests: [
    { requestType: { type: String }, formData: { type: Object }, status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, pickupTime: { type: Date } }
  ],
  createdAt: { type: Date, default: Date.now }
});
```

### QueueTicket Schema
```javascript
const QueueTicketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  serviceType: { type: String, required: true },
  timeSlot: { type: Date, required: true },
  status: { type: String, enum: ['waiting', 'in_progress', 'served', 'cancelled'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now }
});
```

### Branch Schema
```javascript
const BranchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { address: { type: String }, coordinates: { lat: Number, lng: Number } },
  servicesAvailable: [String],
  currentLoad: { type: Number, default: 0 },
  predictedLoad: { type: Map, of: Number },
  createdAt: { type: Date, default: Date.now }
});
```

ServiceRequest Schema
```javascript
const ServiceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requestType: { type: String, required: true },
  formData: { type: Object },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  pickupTime: { type: Date },
  createdAt: { type: Date, default: Date.now }
});
```

7. Testing
- Postman collection used for API testing.  
- Screenshots of successful register/login, branch fetch, ticket creation, and service request creation.  
- Frontend tested with live backend data.  
