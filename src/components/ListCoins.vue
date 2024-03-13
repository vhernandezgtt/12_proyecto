<template>
  <v-container>
    <v-card
      title="Lista Coins"
      flat
    >
    <v-btn @click="ws.socketOpen()">On</v-btn>    
    <v-btn @click="test()">Clear</v-btn>    
    <v-btn @click="test2()">test2</v-btn>    
    
    <v-data-table 
          :items="jData"
          :headers="headers"
          :search="search"
          item-key="name"
          density="compact"
          class="elevation-1"
        >

        <template v-slot:top>
          <div class="my-2 mx-4 text-h5 font-weight-medium">
            Relacion Criptomonedas
          </div>
          <v-text-field
              v-model="search"
              label="Buscar"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
          ></v-text-field>
        </template>

      <template v-slot:item="value">
        <tr>
          <td>{{ value.item.id  }}</td>
          <td>{{ value.item.symbol  }}</td>
          <td>{{ value.item.name  }}</td>
          <td class="d-flex justify-end" >
            <transition name="slide-fade">
                <div :class="value.item.evo" v-if="!value.item.lchange" >
                    {{ value.item.priceUsd | toMoneda  }}
                </div>
              </transition>
            </td>
        </tr>
      </template>
    
    </v-data-table>


      
    </v-card>


  </v-container>
</template>

<script>
  import CoinsService from '../services/coins.service';
  import CoinsSocketService from '../services/coins.socket.service';

  export default {
    name: 'ListCoins',

    data: () => ({
      search:'',
      jData:[],
      columns:[],
      ltest:false,
      headers:[
//        { text: 'Plant', align: 'start', sortable: false, key: 'name' },
        { text:'Id', value: 'id' },
        { text:"Simbolo" ,value: 'symbol' },
        { text:"Nombre" , value: 'name' },
        { text:"Precio " , value: 'priceUsd'  ,   align: 'right',}
      ]
    }),
    created(){
      let me = this;
      this.cli = new CoinsService();
      this.ws  = new CoinsSocketService(this);

      this.$root.$on('changePrice', (e)=>{
        let nPos =  this.findCoin(e.key);
        if(nPos != -1){
          if( e.value > me.jData[nPos]["priceUsd"] ){
            me.jData[nPos]["evo"] ="evo-plus"
          }else if (e.value < me.jData[nPos]["priceUsd"]){
            me.jData[nPos]["evo"] ="evo-minus"
          }else{
            me.jData[nPos]["evo"] ="evo-equal"

          }
          //console.log("wwww", me.jData[nPos])
          me.jData[nPos]["priceUsd"] = e.value 
          me.jData[nPos]["lchange"] = !me.jData[nPos]["lchange"]
        }
      })
      
    },

    async mounted(){
      //this.cli.getCoins().then((d)=>this.jData = d.data.data)
      let aux = await this.cli.getCoinsSync();
      console.log("aux", aux.data.data )
      this.jData = aux.data.data
      
     
    },
    beforeDestroy(){

    },
    methods:{
      findCoin(name){
        return this.jData.findIndex((num, idx) => {
        if( num.id == name ) return idx ;
            //if (idx > 0 && num >= arr[idx - 1]) return false;
            //if (idx < arr.length - 1 && num >= arr[idx + 1]) return false;
           // return true;
        });
      },
      changeColor() {
          // Cambia el color de fondo al azar
          const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          this.bgColor = randomColor;
      },
      test(){
        this.jData[0].priceUsd=456.78
        console.log("data", this.jData)
      },
      test2(){
        this.ltest = !this.ltest

      }
    }

  }



</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s; /* Reducir la duración a 0.3 segundos */
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.5;
}

/* Transición de color */
.xfade-enter-active,
.xfade-leave-active {
  transition: background-color 0.5s;
}
.xfade-enter,
.xfade-leave-to {
  background-color: transparent;
}

.evo-plus {
  color:green
}
.evo-minus {
  color: red
}
.evo-equal {
  color: black
}


.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 1;
}
</style>
