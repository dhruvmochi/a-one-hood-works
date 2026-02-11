import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import Slider from 'react-slick';
import axios from 'axios';

// ---------------------- YAHAN SE SAB DETAILS EDIT KAR SAKTE HO ----------------------
const categoryData = {
  bags: [
    { id: 'bag-1', img: '/images/bag1.jpg', details: { variety: 'Travel', type: 'Leather', size: 'Medium', pockets: 5, price: 1500 } },
    { id: 'bag-2', img: '/images/bag2.jpg', details: { variety: 'School', type: 'Nylon', size: 'Small', pockets: 3, price: 800 } },
    { id: 'bag-3', img: '/images/bag3.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-4', img: '/images/bag4.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-5', img: '/images/bag5.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-6', img: '/images/bag6.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-7', img: '/images/bag7.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-8', img: '/images/bag8.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-9', img: '/images/bag9.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-10', img: '/images/bag10.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-11', img: '/images/bag11.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
    { id: 'bag-12', img: '/images/bag12.jpg', details: { variety: 'Laptop', type: 'Canvas', size: 'Large', pockets: 2, price: 1200 } },
  ],
  sofas: [
    { id: 'sofa-1', img: '/images/sofa1.jpg', details: { variety: 'Living Room', type: 'Fabric', size: '6 Seater', price: 20000 } },
    { id: 'sofa-2', img: '/images/sofa2.jpg', details: { variety: 'Living Room', type: 'Leather', size: '8 Seater', price: 30000 } },
    { id: 'sofa-3', img: '/images/sofa3.jpg', details: { variety: 'Living Room', type: 'Leather', size: '5 Seater', price: 15000 } },
    { id: 'sofa-4', img: '/images/sofa4.jpg', details: { variety: 'Living Room', type: 'Leather', size: '3 Seater', price: 35000 } },
    { id: 'sofa-5', img: '/images/sofa5.jpg', details: { variety: 'Living Room', type: 'Leather', size: '5 Seater', price: 25000 } },
    { id: 'sofa-6', img: '/images/sofa6.jpg', details: { variety: 'Living Room', type: 'Leather', size: '5 Seater', price: 40000 } },
    { id: 'sofa-7', img: '/images/sofa7.jpg', details: { variety: 'Living Room', type: 'Leather', size: '3 Seater', price: 15000 } },
    { id: 'sofa-8', img: '/images/sofa8.jpg', details: { variety: 'Living Room', type: 'Leather', size: '4 Seater', price: 25000 } },
    { id: 'sofa-9', img: '/images/sofa9.jpg', details: { variety: 'Bedroom', type: 'Leather', size: '5 feet', price: 20000 } },
    { id: 'sofa-10', img: '/images/sofa10.jpg', details: { variety: 'Bedroom', type: 'Leather', size: '5 feet', price: 17000 } },
    { id: 'sofa-11', img: '/images/sofa11.jpg', details: { variety: 'Bedroom', type: 'Leather', size: '5 feet', price: 18000 } },
    { id: 'sofa-12', img: '/images/sofa12.jpg', details: { variety: 'Bedroom', type: 'Leather', size: '5 feet', price: 15000 } },
  ],
  cars: [
    { id: 'car-1', img: '/images/car1.jpg', details: { variety: 'Sedan', type: 'Leather', price: 18000 } },
    { id: 'car-2', img: '/images/car2.jpg', details: { variety: 'Sedan', type: 'Leather', price: 20000 } },
    { id: 'car-3', img: '/images/car3.jpg', details: { variety: 'Sedan', type: 'Leather', price: 38000 } },
    { id: 'car-4', img: '/images/car4.jpg', details: { variety: 'Sedan', type: 'Leather', price: 25000 } },
    { id: 'car-5', img: '/images/car5.jpg', details: { variety: 'Sedan', type: 'Leather', price: 15000 } },
    { id: 'car-6', img: '/images/car6.jpg', details: { variety: 'Sedan', type: 'Leather', price: 27000 } },
    { id: 'car-7', img: '/images/car7.jpg', details: { variety: 'Sedan', type: 'Leather', price: 29000 } },
    { id: 'car-8', img: '/images/car8.jpg', details: { variety: 'Sedan', type: 'Leather', price: 15000 } },
    { id: 'car-9', img: '/images/car9.jpg', details: { variety: 'Sedan', type: 'Leather', price: 20000 } },
    { id: 'car-10', img: '/images/car10.jpg', details: { variety: 'Sedan', type: 'Leather', price: 25000 } },
    { id: 'car-11', img: '/images/car11.jpg', details: { variety: 'Sedan', type: 'Leather', price: 28000 } },
    { id: 'car-12', img: '/images/car12.jpg', details: { variety: 'Sedan', type: 'Leather', price: 17000 } },
  ],
  bikes: [
    { id: 'bike-1', img: '/images/bike1.jpg', details: { type: 'Leather', size: 'Standard', price: 1500 } },
    { id: 'bike-2', img: '/images/bike2.jpg', details: { type: 'Leather', size: 'Standard', price: 1300 } },
    { id: 'bike-3', img: '/images/bike3.jpg', details: { type: 'Leather', size: 'Standard', price: 1200 } },
    { id: 'bike-4', img: '/images/bike4.jpg', details: { type: 'Leather', size: 'Standard', price: 1400 } },
    { id: 'bike-5', img: '/images/bike5.jpg', details: { type: 'Leather', size: 'Standard', price: 1800 } },
    { id: 'bike-6', img: '/images/bike6.jpg', details: { type: 'Leather', size: 'Standard', price: 1600 } },
    { id: 'bike-7', img: '/images/bike7.jpg', details: { type: 'Leather', size: 'Standard', price: 1500 } },
    { id: 'bike-8', img: '/images/bike8.jpg', details: { type: 'Leather', size: 'Standard', price: 1700 } },
    { id: 'bike-9', img: '/images/bike9.jpg', details: { type: 'Leather', size: 'Standard', price: 3000 } },
    { id: 'bike-10', img: '/images/bike10.jpg', details: { type: 'Leather', size: 'Standard', price: 2000 } },
    { id: 'bike-11', img: '/images/bike11.jpg', details: { type: 'Leather', size: 'Standard', price: 1300 } },
    { id: 'bike-12', img: '/images/bike12.jpg', details: { type: 'Leather', size: 'Standard', price: 1000 } },
  ],
  auto: [
    { id: 'auto-1', img: '/images/auto1.jpg', details: { type: 'Bajaj', price: 30000 } },
    { id: 'auto-2', img: '/images/auto2.jpg', details: { type: 'Bajaj', price: 15000 } },
    { id: 'auto-3', img: '/images/auto3.jpg', details: { type: 'Bajaj', price: 28000 } },
    { id: 'auto-4', img: '/images/auto4.jpg', details: { type: 'Bajaj', price: 18000 } },
    { id: 'auto-5', img: '/images/auto5.jpg', details: { type: 'Bajaj', price: 25000 } },
    { id: 'auto-6', img: '/images/auto6.jpg', details: { type: 'Bajaj', price: 38000 } },
    { id: 'auto-7', img: '/images/auto7.jpg', details: { type: 'Bajaj', price: 17000 } },
    { id: 'auto-8', img: '/images/auto8.jpg', details: { type: 'Bajaj', price: 25000 } },
    { id: 'auto-9', img: '/images/auto9.jpg', details: { type: 'Bajaj', price: 26000 } },
    { id: 'auto-10', img: '/images/auto10.jpg', details: { type: 'Bajaj', price: 19000 } },
    { id: 'auto-11', img: '/images/auto11.jpg', details: { type: 'Bajaj', price: 20000 } },
    { id: 'auto-12', img: '/images/auto12.jpg', details: { type: 'Bajaj', price: 15000 } },
  ]
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
        {items.slice(0, 7).map((item, idx) => (
          <div key={idx}>
            <img src={item.img} alt="slideshow" style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px' }} />
          </div>
        ))}
      </Slider>

      {/* Title */}
      <Container className="my-4">
        <h2 className="text-center" style={{ color: '#ffd700' }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
      </Container>

      {/* All Images with View Details Button */}
      <Container className="my-5">
        <Row>
          {items.map((item) => (
            <Col md={3} key={item.id} className="mb-5">
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

export default Category;