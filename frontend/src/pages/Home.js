import React, { useState } from 'react';
import Slider from 'react-slick';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

// Slideshow images (multiple overlapping, center big)
const slideshowImages = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  '/images/slide6.jpg',
  '/images/slide7.jpg',
  // aur images chahiye to yahan add kar dena
];

const featuredItems = [
  { img: '/images/bag1.jpg', details: { variety: 'Travel', type: 'Leather', size: 'Medium', pockets: 5, price: 1500 } },
  { img: '/images/sofa1.jpg', details: { variety: 'Living Room', type: 'Fabric', size: '3 Seater', pockets: 'N/A', price: 20000 } },
  { img: '/images/car1.jpg', details: { variety: 'Sedan', type: 'Petrol', size: 'Compact', pockets: 'N/A', price: 1000000 } },
  { img: '/images/bike1.jpg', details: { variety: 'Sports', type: 'Electric', size: 'Standard', pockets: 'N/A', price: 150000 } },
];

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [enquiry, setEnquiry] = useState({ name: '', mobile: '', email: '', address: '', enquiry: '' });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Bhut saari visible
    slidesToScroll: 1,
    centerMode: true, // Center wali big
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
        {slideshowImages.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt={`Slide ${idx + 1}`} style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        ))}
      </Slider>

      {/* 4 Featured Images */}
      <Container className="my-5">
        <Row>
          {featuredItems.map((item, idx) => (
            <Col md={3} key={idx} className="mb-4">
              <Card className="image-card h-100">
                <Card.Img variant="top" src={item.img} style={{ height: '220px', objectFit: 'contain' }} />
                <Card.Body className="text-center">
                  <Button variant="primary" onClick={() => handleShowDetails(item)}>View Details</Button>
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
                  <li>Variety: {selectedItem.details.variety}</li>
                  <li>Type: {selectedItem.details.type}</li>
                  <li>Size: {selectedItem.details.size}</li>
                  <li>Pockets: {selectedItem.details.pockets}</li>
                  <li>Price: ₹{selectedItem.details.price}</li>
                </ul>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      {/* Enquiry Section - wapas add kiya */}
      <Container className="my-5 py-5" style={{ background: 'rgba(30, 30, 46, 0.6)', borderRadius: '15px' }}>
        <h2 className="text-center mb-4">Enquiry Form</h2>
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
            <Button variant="primary" type="submit" size="lg">Submit Enquiry</Button>
          </div>
        </Form>
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p>A ONE HOOD & WORKS</p>
        <p>Mobile: 012345679 (ABC) | 9876543210 (XYZ)</p>
      </footer>
    </div>
  );
};

export default Home;