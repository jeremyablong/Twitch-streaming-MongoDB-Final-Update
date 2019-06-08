import axios from "axios";

//////////// THIS CONTROLS THE JSON SERVER JSON DATA ////////////////
export default axios.create({
	baseURL: "http://localhost:5000"
});

//////////// THIS CONTROLS THE JSON SERVER JSON DATA ////////////////