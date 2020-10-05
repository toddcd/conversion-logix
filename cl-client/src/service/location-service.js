import config from "../config";

const LocationService = {
     getCountry() {
        const url = `${config.API_ENDPOINT}/api/location/country`;
        return fetch(url)
            .then(checkError)
            .then(res =>{
                return res.json()
            })
    },
};

const checkError = (response) => {
    if (!response.ok) {
        throw Error(response.status+ ' ' +response.statusText +' '+response.url)
    }
    return response;
}

export default LocationService;
