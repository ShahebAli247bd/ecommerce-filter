import axios from "axios"


const FetchApi = (url) => {
 try {
    return axios
        .get(url)
        .then((res) => res.data.items)
        .catch((err) => console.log(err.message));
 } catch (error) {
  console.log(err.message)
 }
}

export default FetchApi
