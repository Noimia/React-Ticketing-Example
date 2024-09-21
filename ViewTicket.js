import React, { useState } from "react";
import { Card, Row, Col, ListGroup, Form, Button } from "react-bootstrap";

// List of generic admin responses
const adminResponses = [
  "Thank you for the update, we will review it shortly.",
  "I have reviewed your ticket and will provide an answer soon.",
  "We are currently looking into your request.",
  "This issue is being reviewed by the team.",
  "Thank you for your patience, we will get back to you soon.",
  "I've escalated your ticket to the relevant department.",
  "We've received your update and will respond soon.",
  "Your request is in progress. We will update you soon.",
  "Our team is working on your request.",
  "Your ticket is under review. Thank you for waiting.",
];

const ViewTicket = ({ requestID, ticketData }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (newComment.trim() === "") return;

    const commentTimestamp = new Date().toLocaleString(); // Capture current time

    // Add the user's comment to the list with a timestamp
    setComments((prevComments) => [
      {
        type: "user",
        text: newComment,
        timestamp: commentTimestamp,
      },
      ...prevComments, // Newest comments first
    ]);

    // Clear the comment box
    setNewComment("");
    setLoading(true); // Show "..."

    // Simulate delay for admin response
    setTimeout(() => {
      const randomResponse =
        adminResponses[Math.floor(Math.random() * adminResponses.length)];
      setComments((prevComments) => [
        {
          type: "admin",
          text: randomResponse,
          timestamp: new Date().toLocaleString(),
        },
        ...prevComments, // Newest comments first
      ]);
      setLoading(false); // Remove "..."
    }, 2000);
  };

  return (
    <div className="view-ticket">
      <Card className="text-white bg-dark p-3">
        <Row>
          {/* Left Column for Ticket Details */}
          <Col md={6} style={{ borderRight: "5px solid gray" }}>
            <ListGroup variant="flush" className="text-white">
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Request ID:</strong>
                </span>
                <span>{requestID}</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Ticket Type:</strong>
                </span>
                <span>{ticketData.ticketTypeLabel}</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Requestor:</strong>
                </span>
                <span>{ticketData.name}</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Email:</strong>
                </span>
                <span>{ticketData.email}</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Request Title:</strong>
                </span>
                <span>{ticketData.requestTitle}</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white">
                <Form.Group controlId="description" className="w-100">
                  <Form.Label>
                    <strong>Description:</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={ticketData.description}
                    readOnly
                    className="bg-dark text-white w-100"
                  />
                </Form.Group>
              </ListGroup.Item>

              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Status:</strong>
                </span>
                <span>Pending</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Category:</strong>
                </span>
                <span>General</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Priority:</strong>
                </span>
                <span>Normal</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Created:</strong>
                </span>
                <span>{new Date().toLocaleDateString()}</span>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white d-flex justify-content-between">
                <span>
                  <strong>Assigned:</strong>
                </span>
                <span>Unassigned</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Right Column for Comments */}
          <Col md={6}>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group controlId="newComment" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  className="bg-secondary text-white"
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button type="submit" variant="primary">
                  Add Comment
                </Button>
              </div>
            </Form>
            {loading && (
              <div className="comment admin">
                <strong>Helper:</strong> ...
              </div>
            )}
            <div className="comments-section bg-dark p-3 mb-4 rounded">
              {comments.map((comment, index) => (
                <div key={index} className={`comment ${comment.type}`}>
                  <strong>{comment.type === "user" ? "You" : "Helper"}:</strong>{" "}
                  {comment.text}
                  <br />
                  <small>{comment.timestamp}</small> {/* Display timestamp */}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ViewTicket;
