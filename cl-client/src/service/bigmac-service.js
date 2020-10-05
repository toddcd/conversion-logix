import config from "../config";

const BigmacService = {
    getPricing() {
        const url = `${config.API_ENDPOINT}/api/bigmac/pricing`;
        return fetch(url)
            .then(checkError)
            .then(res =>{
                return res.json()
            })
    },
    cachePricing (result){
        window.sessionStorage.setItem('pricing', JSON.stringify(result));
    },
    rehydratePricing(){
        return JSON.parse(window.sessionStorage.getItem('pricing'));
    }
};

const checkError = (response) => {
    if (!response.ok) {
        throw Error(response.status+ ' ' +response.statusText +' '+response.url)
    }
    return response;
}

export default BigmacService;
