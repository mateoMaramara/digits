'use client';

import { Card } from 'react-bootstrap';
import { Contact } from '../lib/validationSchemas';

/** Renders a contact card with name, image, address, and description */
const ContactCard = ({ contact }: { contact: Contact }) => (
  <Card className="h-100 shadow-sm">
    <Card.Header className="text-center">
      <Card.Img
        variant="tozp"
        src={contact.image}
        alt={`${contact.firstName} ${contact.lastName}`}
        style={{ width: '75px', borderRadius: '50%' }}
      />
    </Card.Header>
    <Card.Body>
      <Card.Title>
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
    </Card.Body>
  </Card>
);

export default ContactCard;
