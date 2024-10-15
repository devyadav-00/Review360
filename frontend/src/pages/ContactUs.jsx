import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      to_name: formData.name,
      to_email: formData.email,
      message: formData.message,
    };
    
    const serviceId = "service_sbhqtdl";  // Update with your actual EmailJS Service ID
    const templateId = "template_1d5bepg";  // Update with your actual Template ID
    const userId = "aU7THG1capnm4eRa2";  // Your EmailJS user ID

    emailjs.send(serviceId, templateId, data, userId)
      .then(() => {
        alert("Message Sent Successfully");
      })
      .catch((error) => {
        console.error("Email sending error:", error);
        alert("Failed to send message. Please try again later.");
      });

    // Clear form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 h-[110vh] sm:h-screen bg-gray-100 text-center px-6">
      <div className="max-w-3xl bg-white   p-8 rounded-xl sm:rounded-lg shadow-md w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
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