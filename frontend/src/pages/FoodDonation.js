import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Truck, Calendar, Basket, CheckCircle } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Modal, Button } from 'react-bootstrap'; // Correct import for Modal and Button

const FoodDonationForm = () => {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expirationDate: '',
    pickupOrDelivery: 'pickup',
    additionalNotes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to control the popup
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setSubmitted(true);
    setShowPopup(true); // Show the popup on successful submission
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      foodType: '',
      quantity: '',
      expirationDate: '',
      pickupOrDelivery: 'pickup',
      additionalNotes: '',
    });
    setSubmitted(false);
  };

  // Handle popup close and redirect to profile page
  const handlePopupClose = () => {
    setShowPopup(false); // Hide the popup
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white text-center">
              <h3 className="card-title mb-0">
                <Basket className="me-2" />
                Food Donation Form
              </h3>
            </div>
            <div className="card-body">
              {submitted ? (
                <div className="text-center">
                  <CheckCircle size={48} className="text-success mb-3" />
                  <h4>Thank you for your donation!</h4>
                  <p>Your contribution will help those in need.</p>
                  <button className="btn btn-success" onClick={resetForm}>
                    Submit Another Donation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Food Type */}
                  <div className="mb-3">
                    <label htmlFor="foodType" className="form-label">
                      <Basket className="me-2" />
                      Type of Food
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="foodType"
                      name="foodType"
                      value={formData.foodType}
                      onChange={handleInputChange}
                      placeholder="e.g., Rice, Pasta, Canned Goods"
                      required
                    />
                  </div>

                  {/* Quantity */}
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      <Basket className="me-2" />
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 5 kg or 10 cans"
                      required
                    />
                  </div>

                  {/* Expiration Date */}
                  <div className="mb-3">
                    <label htmlFor="expirationDate" className="form-label">
                      <Calendar className="me-2" />
                      Expiration Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="expirationDate"
                      name="expirationDate"
                      value={formData.expirationDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Pickup or Delivery */}
                  <div className="mb-3">
                    <label htmlFor="pickupOrDelivery" className="form-label">
                      <Truck className="me-2" />
                      Pickup or Delivery
                    </label>
                    <select
                      className="form-select"
                      id="pickupOrDelivery"
                      name="pickupOrDelivery"
                      value={formData.pickupOrDelivery}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="pickup">Pickup</option>
                      <option value="delivery">Delivery</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="mb-4">
                    <label htmlFor="additionalNotes" className="form-label">
                      Additional Notes
                    </label>
                    <textarea
                      className="form-control"
                      id="additionalNotes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions or details"
                      rows="3"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                      Submit Donation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <Modal show={showPopup} onHide={handlePopupClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your donation has been submitted successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handlePopupClose}>
            Go to Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FoodDonationForm;