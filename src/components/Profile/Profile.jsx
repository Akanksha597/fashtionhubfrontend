import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckoutPage from "../deliveryAddress/delivery";
import axios from "axios";
import OrderTracking from "./OrderTracking";
import {
  Modal,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import "./ProfileModern.css"

import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrder } from "../../features/order/orderSlice";
import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user")) || {};

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: [],
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [accountDetail, setaccountDetail] = useState({});
  const [selectedOrder, setselectedOrder] = useState({});

  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setProfileData(userData);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "orders" && profileData.email) {
      dispatch(fetchAllOrders({ email: profileData.email }));
    }
  }, [activeTab, profileData.email]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab) setActiveTab(tab);
  }, [location]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReason("");
    setaccountDetail({});
  };

  const handleShowModal = (order) => {
    setShowModal(true);
    setselectedOrder(order);
  };

  const returnOrderFlow = (order) => {
    let finalData = { ...order, orderStatus: "CANCELLED" };

    if (!selectedReason) {
      toast.error("Please select a reason!");
      return;
    }

    finalData.rejectedReason = selectedReason;

    dispatch(updateOrder({ id: order._id, orderData: finalData }))
      .unwrap()
      .then(() => {
        toast.success("Order cancelled successfully!");
        handleCloseModal();
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const renderAddressList = (add) => {
    if (!add) return <p>No address</p>;
    return (
      <div className="small text-muted">
        <div>{add.alternativename}</div>
        <div>{add.alternativeMobile}</div>
        <div>
          {add.addressLine1}, {add.city}, {add.state}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <ToastContainer />

      {/* Tabs */}
      <div className="d-flex justify-content-center mb-4">
        <div className="bg-white shadow rounded-pill p-2 d-flex gap-2">
          {["profile", "orders", "savedAddress"].map((tab) => (
            <button
              key={tab}
              className={`btn rounded-pill px-4 ${
                activeTab === tab ? "btn-dark" : "btn-light"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "profile"
                ? "My Profile"
                : tab === "orders"
                ? "My Orders"
                : "Saved Address"}
            </button>
          ))}
        </div>
      </div>

      {/* PROFILE */}
      {activeTab === "profile" && (
        <div className="card shadow-lg border-0 p-4 mb-5">
          <h5 className="mb-4">Personal Details</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label>Email</label>
              <input
                className="form-control"
                value={profileData.email}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label>Name</label>
              <input
                className="form-control"
                value={profileData.name}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label>Mobile</label>
              <input
                className="form-control"
                value={profileData.mobile}
                disabled
              />
            </div>
          </div>
        </div>
      )}

      {/* ORDERS */}
      {activeTab === "orders" && (
        <>
          {loading && <p>Loading...</p>}

          {orders?.length ? (
            orders.map((order) => (
              <div key={order._id} className="card shadow mb-4 border-0">
                <div className="card-body">

                  {/* Items */}
 <div className="product-scroll-modern mb-3">
  {order?.dbCart?.map((item) => (
    <div key={item._id} className="product-card-modern">

      <div className="img-wrapper">
        <img src={item.productId?.thumbnail} alt="product" />
      </div>

      <div className="product-info">
        <div className="product-name">
          {item.productId?.productName}
        </div>
        <div className="product-qty">
          Qty: {item.qty}
        </div>
      </div>

    </div>
  ))}
</div>

                  <OrderTracking
                    order={order}
                    handleShowModal={handleShowModal}
                  />

                  <div className="row mt-3">
                    {userData?.address?.map((add, i) => (
                      <div className="col-md-6" key={i}>
                        <div className="bg-light p-3 rounded mb-2">
                          <h6>{i === 0 ? "Delivery" : "Billing"}</h6>
                          {renderAddressList(add)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <strong>Total:</strong>
                    <strong>₹{order.totalAmount}</strong>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">No Orders</div>
          )}
        </>
      )}

      {/* ADDRESS */}
      {activeTab === "savedAddress" && <CheckoutPage />}

      {/* CANCEL MODAL */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Dropdown onSelect={(val) => setSelectedReason(val)}>
            <Dropdown.Toggle className="w-100">
              {selectedReason || "Select Reason"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Product Issue">Product Issue</Dropdown.Item>
              <Dropdown.Item eventKey="Delay">Delivery Delay</Dropdown.Item>
              <Dropdown.Item eventKey="Changed Mind">Changed Mind</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => returnOrderFlow(selectedOrder)}>
            Cancel Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;