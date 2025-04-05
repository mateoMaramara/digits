'use client';

import { Card, ListGroup } from 'react-bootstrap';
import { Contact, Note } from '@prisma/client';
import NoteItem from './NoteItem';

/** Renders an admin contact card with notes and the owner's email */
const ContactCardAdmin = ({ contact, notes }: { contact: Contact; notes: Note[] }) => (
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

      {/* 📌 Owner Info */}
      <p className="blockquote-footer">{contact.owner}</p>

      {/* 🔽 Display Notes */}
      <ListGroup variant="flush" className="mt-3">
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;
