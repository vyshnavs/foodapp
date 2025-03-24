import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBullseye, FaUsers, FaLightbulb, FaHandsHelping } from "react-icons/fa";
import vyshnavImg from "./images/aboutimages/vyshnav.png";
import sijinImg from "./images/aboutimages/sijin.png";
import prayagaImg from "./images/aboutimages/prayaga.png";
import abijithImg from "./images/aboutimages/abijith.png";
const AboutUs = () => {
  // Example team members data (replace with your actual team data)
  const teamMembers = [
    {
      name: "Vyshnav S",
      role: "developer",
      image: vyshnavImg,
    },
    {
      name: "Sijin U K",
      role: "developer",
      image: sijinImg,
    },
    {
      name: "Prayaga K S",
      role: "content",
      image: prayagaImg,
    },
    {
      name: "Abijith V P",
      role: "designer",
      image: abijithImg,
    },
  ];

  return (
    <div className="container my-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="display-4">About Us</h1>
        <p className="lead">
        We are Team Padeyam, a group of four passionate innovators on a mission to revolutionize food distribution and eliminate food waste. Combining technology with social impact, our team is committed to creating a seamless, community-driven platform that connects surplus food from donors to those in need.
        </p>
      </div>

      {/* Aim Section */}
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card h-100 shadow">
            <div className="card-body text-center p-4">
              <FaBullseye className="display-4 text-primary mb-3" />
              <h3 className="card-title">Our Aim</h3>
              <p className="card-text">
              Padeyam is designed to bridge the gap between food surplus and hunger, ensuring that excess food reaches those in need instead of going to waste. Our platform connects donors, recipients, and volunteers through a streamlined, AI-powered system that facilitates real-time food donations, safe pickups, and efficient distribution. By leveraging technology, community engagement, and smart logistics, we aim to create a zero-food-waste ecosystem where every meal finds a plate and no one goes hungry. 
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card h-100 shadow">
            <div className="card-body text-center p-4">
              <FaUsers className="display-4 text-success mb-3" />
              <h3 className="card-title">Our Team</h3>
              <p className="card-text">
                Our team is made up of passionate individuals from diverse
                backgrounds, including developers, designers, social workers, and
                food industry experts. Together, we work tirelessly to make our
                vision a reality.
              </p>
              <div className="row mt-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="col-md-3 mb-4">
                    <div className="text-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="img-fluid rounded-circle mb-3"
                        style={{ width: "150px", height: "150px" }}
                      />
                      <h5>{member.name}</h5>
                      <p className="text-muted">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future Planning Section */}
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card h-100 shadow">
            <div className="card-body text-center p-4">
              <FaLightbulb className="display-4 text-warning mb-3" />
              <h3 className="card-title">Future Planning</h3>
              <p className="card-text">
                We are constantly evolving to make a greater impact. Our future
                Padeyam aims to evolve into a smart, scalable, and AI-driven food distribution platform that eliminates food waste while ensuring accessibility for those in need. In the short term, we plan to develop a mobile app, AI-powered food expiry predictions, and an automated donor-recipient matching system. Mid-term goals include partnerships with restaurants and supermarkets, blockchain-based transparency for tracking donations, and emergency food response integration. For long-term impact, we envision IoT-enabled smart food bins, self-sustaining food hubs, and AI-driven food redistribution to create a truly zero-waste ecosystem. Our ultimate mission is to ensure that no food goes to waste, and no one goes hungry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="row mb-5">
        <div className="col-md-12">
          <div className="card h-100 shadow">
            <div className="card-body text-center p-4">
              <FaHandsHelping className="display-4 text-danger mb-3" />
              <h3 className="card-title">Why Choose Us?</h3>
              <p className="card-text">
                We are committed to transparency, efficiency, and community
                impact. Our platform connects donors, volunteers, and recipients
                seamlessly, ensuring that every contribution makes a difference.
                Join us in creating a world where no one goes hungry and no food
                goes to waste.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-5">
        <h2 className="mb-4">Join Us in Making a Difference</h2>
        <p className="lead mb-4">
          Whether you're a donor, volunteer, or recipient, your contribution
          matters. Together, we can build a better future.
        </p>
        <button className="btn btn-primary btn-lg">Get Involved</button>
      </div>
    </div>
  );
};

export default AboutUs;