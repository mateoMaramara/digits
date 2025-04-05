import { Col, Container, Row } from 'react-bootstrap';
import { getServerSession } from 'next-auth';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
import { Note } from '@prisma/client';

/** Render a list of contacts for the logged-in user. */
const ListPage = async () => {
  // Protect the page, only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session);

  // Get the logged-in user's email
  const ownerEmail = session?.user?.email || '';

  // Fetch the user's contacts
  const contacts = await prisma.contact.findMany({
    where: { owner: ownerEmail },
  });

  // 🔄 Fetch all notes belonging to the current user
  const notes: Note[] = await prisma.note.findMany({
    where: { owner: ownerEmail },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        {/* Page Heading */}
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            <h2>Contacts</h2>
          </Col>
        </Row>

        {/* Contacts Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <Col key={`Contact-${contact.id}`}>
                <ContactCard
                  contact={contact}
                  notes={notes.filter((note) => note.contactId === contact.id)}
                />
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>No contacts available for this user.</p>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
