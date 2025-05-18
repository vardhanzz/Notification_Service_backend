# Notification_Service_Backend

## Objective

This project implements a **Notification Service** that allows sending notifications to users via multiple channels, including **Email**, **SMS**, and **in-app** notifications. Notifications are processed asynchronously using a message queue (**RabbitMQ**), with retries for failed deliveries.

## Features

**API Endpoints:**
  - `POST /notifications` — Submit a new notification
  - `GET /users/{id}/notifications` — Fetch notifications for a specific user
- **Supported Notification Types:** Email, SMS, and In-app notifications
- **Asynchronous Processing:** Utilises RabbitMQ to queue and process notifications efficiently
- **Retry Logic:** Failed notification attempts are retried automatically through message re-queuing

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/get-started) (to run RabbitMQ easily)
- RabbitMQ server (can be run via Docker or installed natively)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/vardhanzz/Notification_Service_backend.git
cd Notification_Service_backend
```
### 2. Start RabbitMQ server using Docker
```bash
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```
This will start RabbitMQ and expose:<br>
1. Port 5672 for AMQP connections<br>
2. Port 15672 for RabbitMQ management UI (http://localhost:15672, default user/pass: guest / guest)<br>

### 3. Install dependencies
```bash
npm install express amqplib
```
### 4. Configure Environment Variables
```bash
RABBITMQ_URL=amqp://guest:guest@localhost:5672/
PORT=3000
```
### 5.Run the Notification Consumer
```bash
cd consumer
node notificationConsumer.js
```
### 6.Start the Express API Server
```bash
node index.js
```
## API Usage
  ### Send a Notification 
 ``` bash
  POST /notifications
Content-Type: application/json

{
  "user": "john",
  "type": "Email",        // "Email" | "SMS" | "in-app"
  "message": "Your message here"
}
```
### Get User Notifications
```bash
  GET /users/{id}/notifications
```
## Retry Mechanism
Failed notifications will be automatically retried. When a failure occurs, the message is re-queued up to a maximum retry count (defined in the consumer). This ensures reliable delivery even if transient errors happen.

## Assumptions
1. The project uses RabbitMQ for queueing notifications.<br>
2. RabbitMQ is accessible at amqp://guest:guest@localhost:5672/.<br>

3. Notification sending (Email, SMS) logic can be implemented or mocked inside the worker.<br><br>
## Here is the link to the detailed API documentation  that is available on Postman:
https://documenter.getpostman.com/view/43688471/2sB2qXji4L
  <br><br><br><br>

##Sending a Notification (POST Request)
<img width="1024" alt="postREQ" src="https://github.com/user-attachments/assets/243b48c3-01d7-4976-bea5-f6db43c4e72b" />
<br><br>

##Get User Notifications (GET Request)
<img width="1019" alt="getREQ" src="https://github.com/user-attachments/assets/c1927ba8-9ea3-495e-b3dc-39c544f43406" />
<br><br>

##RabbitMQ Queue Usage
<img width="700" alt="sendingtorabbitmq" src="https://github.com/user-attachments/assets/d93ad7c4-50bd-4e81-aab7-9df498abd611" />
<br><br>

##Retry Mechanism
<img width="708" alt="Screenshot 2025-05-19 at 4 51 54 AM" src="https://github.com/user-attachments/assets/39bc7d24-f6b8-4f1f-ad7e-94d115793c34" />
<br><br>

##Handling Invalid Request Types
<img width="1025" alt="invalidpost" src="https://github.com/user-attachments/assets/d84c214c-184d-411e-863d-bf21f08fe7d4" />



