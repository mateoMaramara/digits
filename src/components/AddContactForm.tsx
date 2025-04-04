'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addContact } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddContactSchema } from '@/lib/validationSchemas';

const AddContactForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddContactSchema),
  });

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') redirect('/auth/signin');

  const onSubmit = async (data: any) => {
    const contact = {
      ...data,
      owner: currentUser,
    };
    await addContact(contact);
    swal('Success', 'Contact added!', 'success', { timer: 2000 });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* First Name & Last Name */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('firstName')}
                        className={errors.firstName ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('lastName')}
                        className={errors.lastName ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Address & Image URL */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('address')}
                        className={errors.address ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">{errors.address?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="text"
                        {...register('image')}
                        className={errors.image ? 'is-invalid' : ''}
                      />
                      <div className="invalid-feedback">{errors.image?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Description (Full Width) */}
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    {...register('description')}
                    className={errors.description ? 'is-invalid' : ''}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />

                {/* Buttons */}
                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                  <Col>
                    <Button type="button" onClick={() => reset()} variant="warning" className="float-end">
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddContactForm;
