import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ViewTicket from "./ViewTicket"; // Updated ViewTicket component

const TicketModal = ({ show, onHide }) => {
  const [ticketType, setTicketType] = useState("");
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    requestor: "Jeremiah Mountain",
    requestTitle: "",
    description: "",
  });
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false); // State to track submission
  const [requestID, setRequestID] = useState(""); // To store the generated request ID
  const [viewTicket, setViewTicket] = useState(false); // To view ticket after submission

  // Reset ticket type and submitted state when the modal is closed
  const handleModalClose = () => {
    setTicketType("");
    setSubmitted(false);
    setViewTicket(false); // Reset viewTicket to return to ticket type selection
    setValidated(false); // Reset form validation
    setRequestID(""); // Clear the request ID
    setTicketData({
      name: "",
      email: "",
      requestor: "",
      requestTitle: "",
      description: "",
    }); // Reset the form fields
    onHide(); // Trigger the parent onHide handler
  };

  // Handle ticket type selection
  const handleTicketTypeSelect = (type) => {
    const label = type === "issue" ? "I Have an Issue" : "I Have a Question";
    setTicketType(label);
    setTicketData((prev) => ({
      ...prev,
      ticketTypeLabel: label, // Update ticket type in the ticketData state
    }));
    setSubmitted(false); // Reset on ticket type change
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission with validation
  const handleFormSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      setValidated(true);
      setSubmitted(true); // Show confirmation message
      setRequestID(`${Math.floor(Math.random() * 10000) + 1000}`); // Generate Request ID without prefix
    }
    setValidated(true);
  };

  // Reset for new ticket
  const handleNewTicket = () => {
    setTicketType("");
    setSubmitted(false);
    setValidated(false);
    setRequestID("");
    setTicketData({
      name: "",
      email: "",
      requestor: "First & Last",
      requestTitle: "",
      description: "",
    });
  };

  // View ticket
  const handleViewTicket = () => {
    setViewTicket(true); // Set state to view the ticket details
  };

  return (
    <Modal show={show} onHide={handleModalClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {viewTicket ? "View Ticket" : ticketType || "Select Ticket Type"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Show ViewTicket Component */}
        {viewTicket ? (
          <ViewTicket requestID={requestID} ticketData={ticketData} />
        ) : (
          <>
            {/* Show Ticket Type Buttons if no ticket type is selected */}
            {!ticketType && !submitted ? (
              <div className="text-center">
                <Button
                  variant="primary"
                  className="ticket-type-btn m-3"
                  onClick={() => handleTicketTypeSelect("issue")}
                >
                  I Have an Issue
                </Button>
                <Button
                  variant="secondary"
                  className="ticket-type-btn m-3"
                  onClick={() => handleTicketTypeSelect("question")}
                >
                  I Have a Question
                </Button>
              </div>
            ) : null}

            {/* Show form if ticket type is selected and not yet submitted */}
            {ticketType && !submitted ? (
              <Form
                noValidate
                validated={validated}
                onSubmit={handleFormSubmit}
                className="text-white bg-dark p-4 rounded"
              >
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={ticketData.name}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={ticketData.email}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="requestTitle">
                  <Form.Label>Request Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your request title"
                    name="requestTitle"
                    value={ticketData.requestTitle}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a request title.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    placeholder="Describe your issue or question"
                    name="description"
                    value={ticketData.description}
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a description.
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => setTicketType("")}>
                    Back
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            ) : null}

            {/* Show confirmation after submission */}
            {submitted && (
              <div className="confirmation text-center">
                <h3>Thank you, we will review your request shortly.</h3>
                <p>
                  Your Request ID is: <strong>{requestID}</strong>
                </p>
                <div className="d-flex justify-content-evenly">
                  <Button variant="secondary" onClick={handleNewTicket}>
                    Submit New Ticket
                  </Button>
                  <Button variant="primary" onClick={handleViewTicket}>
                    View Ticket
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketModal;
