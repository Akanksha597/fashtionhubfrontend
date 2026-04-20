import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeliveryPolicy() {
  return (
    <div className="container  mt-5">
    
      <h3 className="text-center mb-4">Delivery Policy</h3>
      <div className="text-center">
        <h4 className="text-success">
          *** YOUR ORDER SHOULD BE DELIVERED WITHIN 5-7 WORKING DAYS ***
        </h4>
      </div>
      <p className="mt-4">
        We offer free/paid shipping for all orders to be delivered within India.
        We usually ship orders within 2-3 days through our registered & reliable
        courier partners.
      </p>
      <p>
        Delivery timelines are indicative and, on some occasions, there might
        be some delay due to unavoidable circumstances. "If delivery or
        performance deadlines are not met for reasons beyond our control, such
        as force majeure or any other unforeseen event, that affects our
        component suppliers, the agreed deadlines shall be extended for a
        reasonable period. If there are multiple items, delivery might take
        some time."
      </p>
      </div>
    
  );
}

export default DeliveryPolicy;
