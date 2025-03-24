import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RewardComponent = () => {
    return (
        <div className="container my-5">
            {/* Volunteer Rewards Section */}
            <div className="text-center mb-5">
                <h1 className="display-4">Volunteer Rewards</h1>
                <p className="lead">
                    Thank you for your dedication to reducing food waste and helping those
                    in need! As a token of our appreciation, we offer these rewards to
                    recognize your efforts. Keep up the great work!
                </p>
            </div>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🏆 Ranking Badge</h5>
                            <p className="card-text">
                                Earn badges based on your contribution level. Climb the ranks
                                and show off your achievements!
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Social Service Certificate */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">📜 Social Service Certificate</h5>
                            <p className="card-text">
                                Receive a certificate acknowledging your volunteer work. Perfect
                                for your portfolio or resume!
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Redeem Coupons */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🎫 Redeem Coupons</h5>
                            <p className="card-text">
                                Redeem coupons for discounts at partner stores or for exclusive
                                perks on our platform.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Gift Coupons */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🎁 Gift Coupons</h5>
                            <p className="card-text">
                                Get gift coupons for popular brands and services as a thank-you
                                for your hard work.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Additional Rewards */}
                {/* Volunteer of the Month */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🌟 Volunteer of the Month</h5>
                            <p className="card-text">
                                Be recognized as the top volunteer of the month and receive
                                exclusive rewards and recognition.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Exclusive Events */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🎉 Exclusive Events</h5>
                            <p className="card-text">
                                Get invited to special events, workshops, and networking
                                opportunities for top volunteers.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Personalized Thank You */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">💌 Personalized Thank You</h5>
                            <p className="card-text">
                                Receive a personalized thank-you message from the team and the
                                community you've helped.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Charity Donation in Your Name */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">❤️ Charity Donation</h5>
                            <p className="card-text">
                                We'll make a small donation to a charity of your choice in your
                                name as a thank-you.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donor Rewards Section */}
            <div className="text-center mt-5 mb-5">
                <h1 className="display-4">Donor Rewards</h1>
                <p className="lead">
                    We deeply appreciate your generosity in sharing surplus food with those
                    in need. To show our gratitude, we offer these rewards to recognize
                    your contributions. Thank you for making a difference!
                </p>
            </div>

            <div className="row">
                {/* Donor Recognition Badge */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🏅 Donor Recognition Badge</h5>
                            <p className="card-text">
                                Earn a special badge to showcase your contributions as a donor on
                                your profile.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Tax Deduction Certificate */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">📄 Tax Deduction Certificate</h5>
                            <p className="card-text">
                                Receive a certificate for tax deductions on your donations, as
                                per applicable laws.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Donor Appreciation Certificate */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">📜 Donor Appreciation Certificate</h5>
                            <p className="card-text">
                                Get a certificate of appreciation for your generous contributions
                                to the community.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Exclusive Donor Events */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🎉 Exclusive Donor Events</h5>
                            <p className="card-text">
                                Get invited to exclusive events and networking opportunities for
                                top donors.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Donor of the Month */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🌟 Donor of the Month</h5>
                            <p className="card-text">
                                Be recognized as the top donor of the month and receive exclusive
                                rewards and recognition.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Personalized Thank You for Donors */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">💌 Personalized Thank You</h5>
                            <p className="card-text">
                                Receive a personalized thank-you message from the team and the
                                community you've supported.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Charity Donation in Your Name */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">❤️ Charity Donation</h5>
                            <p className="card-text">
                                We'll make a small donation to a charity of your choice in your
                                name as a thank-you.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>

                {/* Discount Coupons for Donors */}
                <div className="col-md-3 mb-4">
                    <div className="card h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">🎫 Discount Coupons</h5>
                            <p className="card-text">
                                Receive discount coupons from our partner stores as a token of
                                appreciation.
                            </p>
                            <a href="/login" className="btn btn-primary">Get</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardComponent;