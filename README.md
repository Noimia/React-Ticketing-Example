React-Ticketing-Example

This repository contains three React components for handling a simple ticketing system:

TicketModal: A modal component for selecting a ticket type, filling out a ticket form, and viewing the ticket details.

ViewTicket: A component to display the details of a submitted ticket.

TicketForm: A reusable form component for submitting a ticket with fields like name, email, request title, and description.
How to Use These Components in an Existing React App

Prerequisites:
Ensure you have a working React app. If not, you can create one using create-react-app:

```bash
npx create-react-app my-app
cd my-app
```

Installation Steps:
Copy the Component Files:

Create a components folder inside src if it doesn't exist.

Copy the TicketModal.js, ViewTicket.js, and TicketForm.js files into your React app's src/components directory.



Install Required Dependencies: The components rely on React Bootstrap for styling and modal functionality. You need to install react-bootstrap and bootstrap:

```bash
npm install react-bootstrap bootstrap
```

Then, in your src/index.js or src/App.js, import Bootstrap's CSS:

```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```
Import and Use the Components: In the relevant part of your React app (for example, inside App.js or any other component), you can now import and use the TicketModal component.


Here’s an example of how to use TicketModal inside App.js:

```javascript
import React, { useState } from "react";
import TicketModal from "./components/TicketModal";

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="App">
      <h1>React-Ticketing-Example</h1>
      <button onClick={handleModalOpen}>Open Ticket Modal</button>

      {/* TicketModal Component */}
      <TicketModal show={showModal} onHide={handleModalClose} />
    </div>
  );
}

export default App;
```

Run Your React App: Now that you’ve integrated the components, you can start your React app:

```bash
npm start
```

Your app will now open in the browser, and you can interact with the TicketModal by clicking the button to open it. The modal will allow you to select a ticket type, fill out the ticket form, and view the submitted ticket.


Component Overview:

TicketModal.js:


Main component to handle ticket type selection, form submission, and ticket viewing.
Props:
show: Boolean that controls the visibility of the modal.
onHide: Function to handle closing the modal.

ViewTicket.js:


Displays the ticket details once submitted.
Props:
requestID: The ID generated for the ticket.
ticketData: An object containing the ticket details like name, email, request title, and description.

TicketForm.js:


Handles the form for submitting a ticket.
Props:
ticketData: An object containing the form data.
onInputChange: Function to handle input changes.
onSubmit: Function to handle form submission.
Customization:
Feel free to modify the components as per your requirements. You can adjust the form fields, validation rules, and modal styles by editing the corresponding component files.


Optional CSS Styles:

Add this to the top of your top level component or each smaller.

```JavaScript
import './TicketingSystem.css';
```

See a working example here:

https://codesandbox.io/p/sandbox/react-ticket-example-2nfppz





