import Vue from 'vue';

export default class  CoinsSocketService{
    _wss =  "wss://ws.coincap.io/prices?assets=ALL";
    constructor(oVue){
        this.oVue = oVue;
        
        console.log("constructor socket coins" , Vue)
    }

    socketOpen(){
        let me = this;
        this._socket = new WebSocket(this._wss);
        this._socket.onopen = function(e) {
            console.log("socket abierto",e)
        };
        this._socket.onmessage = function(event) {
            let jData = JSON.parse(event.data);
            Object.keys(jData).forEach((key)=>{
                me.oVue.$root.$emit("changePrice",{key:key,value:parseFloat(jData[key])})
            })
          };
          
        this._socket.onclose = function(event) {
            if (event.wasClean) {
                console.log(`[close] Conexión cerrada limpiamente, código=${event.code} motivo=${event.reason}`)
            } else {
                console.error('[close] La conexión se cayó');
            }
        };

    }
    
    socketClose(){
        this._socket.close([3000], ["Socket cerrado a petición"]);
    }

    version(){
        return "Coin Service 1.0"
    }

}