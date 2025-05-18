<h1>Notification Service Backend</h1>

<hr>

<h2>Objective</h2>

This project implements a <code>Notification Service</code> that allows sending notifications to users via multiple channels including <code>Email</code>, <code>SMS</code>, and <code>in-app</code> notifications. Notifications are processed asynchronously using a message queue (<code>RabbitMQ</code>), with retries for failed deliveries.

<hr>

<h2>Features</h2>

<ul>
  <li><code>POST /notifications</code> — Send a new notification</li>
  <li><code>GET /users/{id}/notifications</code> — Retrieve notifications for a user</li>
  <li>Notification Types: <code>Email</code>, <code>SMS</code>, and <code>in-app</code></li>
  <li>Queue-based processing using RabbitMQ to handle notification delivery asynchronously</li>
  <li>Automatic retries for failed notifications via message re-queuing</li>
</ul>

<hr>

<h2>Prerequisites</h2>

<ul>
  <li>Node.js (v14+ recommended)</li>
  <li>npm</li>
  <li>Docker (to run RabbitMQ easily)</li>
  <li>RabbitMQ server (can be run via Docker or installed natively)</li>
</ul>

<hr>

<h2>Setup Instructions</h2>

<code>
git clone https://github.com/vardhanzz/Notification_Service_backend.git<br>
cd Notification_Service_backend
</code>

<br>

<h3>1. Start RabbitMQ with Docker</h3>

<code>
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
</code>

<br>

This will start RabbitMQ and expose:  
<ul>
  <li>Port <code>5672</code> for AMQP connections</li>
  <li>Port <code>15672</code> for RabbitMQ management UI (<a href="http://localhost:15672" target="_blank">http://localhost:15672</a>, default user/pass: <code>guest</code> / <code>guest</code>)</li>
</ul>

<br>

<h3>2. Install dependencies</h3>

<code>npm install</code>

<br>

<h3>3. Configure Environment Variables</h3>

Create a <code>.env</code> file (or set environment variables) with:

<code>
RABBITMQ_URL=amqp://guest:guest@localhost:5672/<br>
PORT=3000
</code>

<br>

<h3>4. Run the Notification Worker</h3>

<code>
cd consumer<br>
node consumerNotification.js
</code>

<br>

<h3>5. Start the Express API Server</h3>

<code>
cd ..<br>
node index.js
</code>

<br>

<hr>

<h2>API Usage</h2>

<h3>Send a Notification</h3>

<code>POST /notifications</code>  
Content-Type: <code>application/json</code>

<br>

Example body:
<cod>
{
  "user": "user-id-123",
  "type": "Email",        // Allowed types: "Email" | "SMS" | "in-app"
  "message": "Your notification message here"
}
</code>
<br>
<h3>Get User Notifications</h3>
<code>GET /users/{id}/notifications</code>

<table> <thead> <tr> <th>Parameter</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td><code>id</code></td> <td>Integer</td> <td>User ID (in path)</td> </tr> </tbody> </table> <br>
<strong>Responses:</strong>

<ul> <li><code>200 OK</code> – Returns array of messages.</li> <li><code>404 Not Found</code> – If user not found.</li> </ul> <br> <hr> <h2>Retry Mechanism</h2>
Failed notifications will be automatically retried. When a failure occurs, the message is re-queued up to a maximum retry count (defined in the worker). This ensures reliable delivery even if transient errors happen.

<hr> <h2>Assumptions</h2> <ul> <li>RabbitMQ is accessible at <code>amqp://guest:guest@localhost:5672/</code></li> <li>Notification sending (Email, SMS) logic can be implemented or mocked inside the worker.</li> </ul> <hr> <h2>Dependencies</h2> <ul> <li><code>express</code></li> <li><code>amqplib</code></li> </ul> <br> <h2>Notes</h2> <ul> <li>Run the <code>consumerNotification.js</code> file separately inside the <code>consumer</code> directory to start the notification worker.</li> <li>The Express server runs on port <code>3000</code> by default.</li> </ul> <hr> <h2>API Documentation</h2>
Detailed API documentation is available on Postman:
<a href="https://documenter.getpostman.com/view/43688471/2sB2qXji4L" target="_blank">Notification Service API Docs</a>
<hr>


