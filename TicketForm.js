// TicketForm.js
import React from "react";
import { Form, Button } from "react-bootstrap";

const TicketForm = ({
  ticketData,
  handleInputChange,
  handleFormSubmit,
  ticketType,
}) => {
  return (
    <div className="ticket-form">
      <h2>{ticketType}</h2>
      <Form
        onSubmit={handleFormSubmit}
        className="text-white bg-dark p-4 rounded"
      >
        <Form.Group className="mb-3" controlId="requestTitle">
          <Form.Label>Request Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your request title"
            name="requestTitle"
            value={ticketData.requestTitle}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe your issue or question"
            name="description"
            value={ticketData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default TicketForm;
