import React ,{useState}from "react";
import {ToastContainer,  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

  const [inputvalue, setInputvalue] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  const getvalue = (e) => {
    const { name, value } = e.target;
    setInputvalue(() => {
      return {
        ...inputvalue,
        [name]: value
      }
    })

  }

  const sentUserdata = async (e) => {
    e.preventDefault();

    const { name, email, mobile, message } = inputvalue;
    if (name === "") {
      toast.error("name is require")
    }  else if (email === "") {
      toast.error("email is require")
    } else if (!email.includes("@")) {
      toast.error("invalid email")
    } else if (mobile === "") {
      toast.error("mobile is require")
    } else {
      const res = await fetch("https://skillmate-assessment.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, mobile, message
        })
      });
      const data = await res.json();

      if (data.status === 201) {
        toast.success("Your Response Submitted");
        setInputvalue({
          ...inputvalue,
          name: "",
          email: "",
          mobile: "",
          message: ""
        })
      }
    }
  }



  return (
    <div
      name="contact"
      className="w-full md:h-screen bg-gradient-to-b from-black to-gray-800 p-10 text-white "
    >
      <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
        <div className="pb-4">
          <p className="text-4xl font-bold inline border-b-4 border-gray-500">
            Contact
          </p>
          <p className="py-3">Submit the form below to get in touch with me</p>
        </div>

        <div className=" flex justify-center items-center">
          <form
            className=" flex flex-col w-full md:w-1/2"
          >
            <input
              type="text"
              name="name"
              value={inputvalue.name}
              onChange={getvalue}
              placeholder="Enter your name"
              className=" p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
              <input
              type="text"
              name="mobile"
              value={inputvalue.mobile}
              onChange={getvalue}
              placeholder="Enter your Phone Number"
              className=" my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <input
              type="text"
              name="email"
              value={inputvalue.email}
              onChange={getvalue}
              placeholder="Enter your email"
              className=" my-2 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            />
            <textarea
              name="message"
              value={inputvalue.message}
              onChange={getvalue}
              placeholder="Enter your message"
              rows="10"
              className="my-2 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
            ></textarea>

            <button 
            onClick={sentUserdata}
            type="submit"
            className="text-white bg-gradient-to-b from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Let's talk
            </button>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
