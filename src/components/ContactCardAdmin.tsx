'use client';

import { Card } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

/** Renders an admin contact card with the owner's email */
const ContactCardAdmin = ({ contact }: { contact: Contact }) => (
  <Card className="h-100 shadow-sm">
    <Card.Header className="text-center">
      <Card.Img
        variant="top"
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        style={{ width: '75px', borderRadius: '50%' }}
      />
    </Card.Header>
    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      {/* ✅ Show Owner Email */}
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
