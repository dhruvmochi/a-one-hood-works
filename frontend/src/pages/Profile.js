import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [purchases, setPurchases] = useState([]); // Mock purchases
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    // Mock purchases (real mein backend se fetch karo)
    setPurchases([
      { id: 1, product: 'Bag - Leather', date: '2024-01-15', price: 1500 },
      { id: 2, product: 'Sofa - Fabric', date: '2024-02-10', price: 20000 },
    ]);
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/profile', user, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      alert('Profile updated!');
    } catch (err) {
      alert('Error updating profile');
    }
  };

  return (
    <Container className="my-5">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <h3>Purchased Products</h3>
      <ListGroup>
        {purchases.map((purchase) => (
          <ListGroup.Item key={purchase.id}>
            {purchase.product} - Date: {purchase.date} - Price: ₹{purchase.price}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={user.name || ''} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mobile No.</Form.Label>
          <Form.Control name="mobile" value={user.mobile || ''} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control name="email" value={user.email || ''} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control name="address" value={user.address || ''} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;