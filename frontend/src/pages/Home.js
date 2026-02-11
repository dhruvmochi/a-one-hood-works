import React, { useState } from 'react';
import Slider from 'react-slick';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const featuredItems = [
  {
    id: 'featured-1',
    img: '/images/bag1.jpg',
    details: {
      variety: 'Travel',           
      type: 'Leather',             
      size: 'Medium',              
      pockets: 5,                  
      price: 1500                  
    }
  },
  {
    id: 'featured-2',
    img: '/images/sofa1.jpg',
    details: {
      variety: 'Living Room',
      type: 'Fabric',
      size: '6 Seater',
      price: 20000
    }
  },
  {
    id: 'featured-3',
    img: '/images/car1.jpg',
    details: {
      type: 'Leather',
      size: 'Compact',
      price: 18000
    }
  },
  {
    id: 'featured-4',
    img: '/images/bike1.jpg',
    details: {
      type: 'Leather',
      size: 'Standard',
      price: 1500
    }
  }
];

const slideshowImages = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
];

const Home = () => {
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
      { breakpoint: 768, settings: { slidesToShow: 3, centerPadding: '0px' } }
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

      {/* Featured Images with View Details Button */}
      <Container className="my-5">
        <Row>
          {featuredItems.map((item) => (
            <Col md={3} key={item.id} className="mb-4">
              <Card className="image-card h-100 text-center" style={{ overflow: 'hidden' }}>
                <Card.Img 
                  variant="top" 
                  src={item.img} 
                  style={{ 
                    height: '240px', 
                    objectFit: 'cover', 
                    padding: 0, 
                    margin: 0 
                  }} 
                />
                <Card.Body style={{ padding: '12px' }}>
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
                  {Object.entries(selectedItem.details).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>

      {/* Enquiry Section - bilkul pehle jaisa add kiya */}
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
        <p>Mobile: 012345679 (ABC) | 9876543210 (XYZ)</p>
      </footer>
    </div>
  );
};

export default Home;