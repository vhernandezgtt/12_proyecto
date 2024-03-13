import Vue from 'vue';

export default class  CoinsService{
    _endpoint = 'https://api.coincap.io/v2/assets';
    constructor(){
    }
    version(){
        return "Coin Service 1.0"
    }

    getCoins(){
        return Vue.axios.get(this._endpoint)
    }

    async getCoinsSync(){
        return await Vue.axios.get(this._endpoint)
    }
}