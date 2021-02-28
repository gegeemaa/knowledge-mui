import axios from "axios";

const instance = axios.create({
    baseURL: "https://knowledge-930c1-default-rtdb.firebaseio.com/"
});

export default instance;