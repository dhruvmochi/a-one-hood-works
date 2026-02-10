import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import Slider from 'react-slick';
import axios from 'axios';

// Category ke hisab se images aur details
const categoryData = {
  bags: Array.from({ length: 12 }, (_, i) => ({
    img: `/images/bag${i+1}.jpg`,
    details: { variety: 'Travel', type: 'Leather', size: 'Medium', pockets: 5, price: 1500 + i*100 },
  })),
  sofas: Array.from({ length: 12 }, (_, i) => ({
    img: `/images/sofa${i+1}.jpg`,
    details: { variety: 'Living Room', type: 'Fabric', size: '3 Seater', pockets: 'N/A', price: 20000 + i*1000 },
  })),
  cars: Array.from({ length: 12 }, (_, i) => ({
    img: `/images/car${i+1}.jpg`,
    details: { variety: 'Sedan', type: 'Petrol', size: 'Compact', pockets: 'N/A', price: 1000000 + i*50000 },
  })),
  bikes: Array.from({ length: 12 }, (_, i) => ({
    img: `/images/bike${i+1}.jpg`,
    details: { variety: 'Sports', type: 'Electric', size: 'Standard', pockets: 'N/A', price: 150000 + i*10000 },
  })),
  auto: Array.from({ length: 12 }, (_, i) => ({
    img: `/images/auto${i+1}.jpg`,
    details: { variety: 'Commercial', type: 'Diesel', size: 'Small', pockets: 'N/A', price: 300000 + i*20000 },
  })),
};

const Category = ({ category }) => {
  const items = categoryData[category] || [];
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: '', mobile: '', email: '', address: '', enquiry: '' });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          centerPadding: '0px',
        }
      }
    ]
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleEnquiryChange = (e) => {
    setEnquiry({ ...enquiry, [e.target.name]: e.target.value });
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/enquiry', enquiry);
      alert('Enquiry submitted!');
      setEnquiry({ name: '', mobile: '', email: '', address: '', enquiry: '' });
    } catch (err) {
      alert('Error submitting enquiry');
    }
  };

  return (
    <div>
      {/* Logo */}
      <div className="text-center my-3">
        <img src="/images/logo.png" alt="Logo" style={{ width: '220px', maxWidth: '100%' }} />
      </div>

      {/* Slideshow */}
      <Slider {...sliderSettings}>
        {items.slice(0, 7).map((item, idx) => (
          <div key={idx}>
            <img src={item.img} alt="slideshow" style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        ))}
      </Slider>

      {/* Category Title */}
      <Container className="my-4">
        <h2 className="text-center" style={{ color: '#ffd700' }}>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
      </Container>

      {/* All Images with View Details Button */}
      <Container className="my-5">
        <Row>
          {items.map((item, idx) => (
            <Col md={3} key={idx} className="mb-5">
              <Card className="image-card h-100 text-center">
                <Card.Img variant="top" src={item.img} style={{ height: '220px', objectFit: 'contain' }} />
                <Card.Body>
                  <Button variant="primary" onClick={() => handleShowDetails(item)}>
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Row>
              <Col md={6}>
                <img src={selectedItem.img} alt="item" style={{ width: '100%' }} />
              </Col>
              <Col md={6}>
                <ul>
                  <li><strong>Variety:</strong> {selectedItem.details.variety}</li>
                  <li><strong>Type:</strong> {selectedItem.details.type}</li>
                  <li><strong>Size:</strong> {selectedItem.details.size}</li>
                  <li><strong>Pockets:</strong> {selectedItem.details.pockets}</li>
                  <li><strong>Price:</strong> ₹{selectedItem.details.price}</li>
                </ul>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      {/* Enquiry Section */}
      <Container className="my-5 py-5" style={{ background: 'rgba(30, 30, 46, 0.6)', borderRadius: '15px' }}>
        <h2 className="text-center mb-4" style={{ color: '#ffd700' }}>Enquiry Form</h2>
        <Form onSubmit={submitEnquiry}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" value={enquiry.name} onChange={handleEnquiryChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control name="mobile" value={enquiry.mobile} onChange={handleEnquiryChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" value={enquiry.email} onChange={handleEnquiryChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" value={enquiry.address} onChange={handleEnquiryChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enquiry</Form.Label>
            <Form.Control as="textarea" rows={3} name="enquiry" value={enquiry.enquiry} onChange={handleEnquiryChange} required />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" size="lg">Submit</Button>
          </div>
        </Form>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>A ONE HOOD & WORKS</p>
        <p>Mobile: 8949286404 (Mr. Jayanti Lal Mochi) | 8955375664 (Sagar Mochi)</p>
      </footer>
    </div>
  );
};

export default Category;