import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      to_name: formData.name,
      to_email: formData.email,
      message: formData.message,
    };

    const serviceId = process.env.REACT_APP_SERVICE_ID;
    const templateId = process.env.REACT_APP_TEMPLATE_ID;
    const userId = process.env.REACT_APP_USER_ID;

    emailjs
      .send(serviceId, templateId, data, userId)
      .then(() => {
        // alert("Message Sent Successfully");
        toast.success("Message Sent Successfully");
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        toast.error("Failed to send message. Please try again later.");
        // alert("Failed to send message. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col relative items-center justify-center pt-16 h-[110vh] sm:h-screen bg-gray-100 text-center px-6">
      {loading && (
        <div className="absolute w-full z-10">
          <Loader />
        </div>
      )}
      <div className="max-w-3xl bg-white   p-8 rounded-xl sm:rounded-lg shadow-md w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
          Contact Us
        </h1>
        <p className="sm:text-lg text-gray-700 mb-8">
          Have any questions or feedback? We'd love to hear from you! Fill out
          the form below and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-6">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-2 sm:px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-2 sm:px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
              className="w-full px-2 sm:px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 sm:px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
