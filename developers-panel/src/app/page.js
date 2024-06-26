"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [developers, setDevelopers] = useState([]);
  const [newDeveloper, setNewDeveloper] = useState([]);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("");
  const [work_location, setWork_location] = useState("");
  const [salary, setSalary] = useState("");
  const [global, setGlobal] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "first_name":
        setFirst_name(value);
        break;
      case "last_name":
        setLast_name(value);
        break;
      case "city":
        setCity(value);
        break;
      case "role":
        setRole(value);
        break;
      case "work_location":
        setWork_location(value);
        break;
      case "salary":
        setSalary(value);
        break;
      case "blah":
        setGlobal(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const developer = {
      first_name,
      last_name,
      city,
      role,
      work_location,
      salary,
    };
    setNewDeveloper(developer);
    // Post new developer to the server
    await postNewDeveloper(developer);
    console.log(developer);
    console.log(newDeveloper);

    // Clear the form fields after submission
    setFirst_name("");
    setLast_name("");
    setCity("");
    setRole("");
    setWork_location("");
    setSalary("");
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newDeveloper = {};
  // };

  // 🌟 Try the above

  useEffect(() => {
    getAllDevelopers();
  }, []);

  const getAllDevelopers = async () => {
    try {
      const res = await axios.get(
        "https://developersrestapi.onrender.com/developers"
      );
      console.log(res);
      setDevelopers(res.data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  const postNewDeveloper = async (developer) => {
    console.log(`Adding developer "${developer.firstName}"...`);
    try {
      const response = await axios.post(
        "https://developersrestapi.onrender.com/developers",
        developer,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Developer posted successfully:", response.data);
      await getAllDevelopers();
    } catch (error) {
      console.error(
        "Error posting developer:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleClick = async (e) => {
    const id = e.target.value;
    try {
      const response = await axios.delete(
        `https://developersrestapi.onrender.com/developers/${id}`
      );
      console.log(`Successfully deleted :)`);
      await getAllDevelopers();
    } catch (error) {
      console.error("Error deleting developer:", error);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Role</th>
            <th>Work Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {developers.map((developer, index) => (
            <tr key={index}>
              <td>{developer.first_name}</td>
              <td>{developer.last_name}</td>
              <td>{developer.city}</td>
              <td>{developer.role}</td>
              <td>{developer.work_location}</td>
              <td>{developer.salary}</td>
              <td>
                <button value={developer.id} onClick={handleClick}>
                  Delete
                </button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={first_name}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={last_name}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={city}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="role">Role</label>
            <input
              id="role"
              name="role"
              value={role}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="work_location">Work Location</label>
            <input
              id="work_location"
              name="work_location"
              value={work_location}
              onChange={handleInputChange}
            />
          </li>
          <li>
            <label htmlFor="salary">Salary</label>
            <input
              id="salary"
              name="salary"
              value={salary}
              onChange={handleInputChange}
            />
          </li>
        </ul>
        <button type="submit">Add New Employee</button>
      </form>
    </>
  );
}
