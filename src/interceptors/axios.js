import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8082/api/v1/';

let isRefresh = false;
axios.interceptors.response.use(res => res, async e => {
    if(e.response.status === 401 && !isRefresh) {
        isRefresh = true;
        const {status, data} = await axios.post('refresh', {}, {withCredentials: true});
        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return axios(e.config)
        }
    }
    isRefresh = false;
    return e;
})