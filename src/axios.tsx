import axios from "axios";

const instance = axios.create({
    //baseURL: "https://netflix-test-server.herokuapp.com/api/",
    baseURL: "https://login-bhsoft.herokuapp.com/api/",
})

export default instance;