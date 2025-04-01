import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ContactCardAdmin from '@/components/ContactCardAdmin';

/** Render a list of all contacts for the admin */
const AdminPage = async () => {
  // Protect the page, only admins can access it.
  const session = await getServerSession(authOptions);
  adminProtectedPage(session);

  // Fetch all contacts from the database
  const contacts = await prisma.contact.findMany();

  return (
    <main>
      <Container id="admin-list" fluid className="py-3">
        {/* Page Heading */}
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            <h2>List Contacts (Admin)</h2>
          </Col>
        </Row>

        {/* Contacts Grid */}
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <Col key={`Admin-Contact-${contact.id}`}>
                <ContactCardAdmin contact={contact} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center">
              <p>No contacts available.</p>
            </Col>
          )}
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
