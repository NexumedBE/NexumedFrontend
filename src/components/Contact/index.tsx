"use client"

import { useState } from "react";
import NewsLatterBox from "./NewsLatterBox";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    profession: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: false, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ success: false, message: "" });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      setStatus({ success: true, message: "Successfully submitted!" });
      setFormData({ name: "", email: "", telephone: "", profession: "", message: "" });
    } else {
      setStatus({ success: false, message: data.message || "Failed to submit." });
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-6 dark:black">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="mb-6 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px]">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Contact Form
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  {[
                    { label: "Name", name: "name", type: "text", required: true },
                    { label: "Email", name: "email", type: "email", required: true },
                    { label: "Telephone", name: "telephone", type: "tel", required: false },
                    { label: "Profession", name: "profession", type: "text", required: false },
                  ].map(({ label, name, type, required }) => (
                    <div className="w-full px-4 md:w-1/2" key={name}>
                      <div className="mb-8">
                        <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                          {label} {required && <span className="text-primary">*</span>}
                        </label>
                        <input
                          type={type}
                          name={name}
                          placeholder={`Enter your ${label.toLowerCase()}`}
                          value={formData[name as keyof typeof formData]}
                          onChange={handleChange}
                          required={required}
                          className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Message Textarea */}
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        Your Message <span className="text-primary">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  {status.message && (
                    <p className={`mb-4 text-center text-sm ${status.success ? "text-primary" : "text-red-500"}`}>
                      {status.message}
                    </p>
                  )}
                  <div className="w-full px-4">
                    <button type="submit" className="rounded-sm bg-primary px-9 py-4 text-base font-medium text-white">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

