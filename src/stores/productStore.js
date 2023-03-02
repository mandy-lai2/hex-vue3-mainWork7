import { defineStore } from 'pinia'

export default defineStore('productStore',{
// data, methods, computed  對應的
// state, actions, getters
state: () => ({
  
}),
actions:{

},
getters:{
  sortProducts:({products})=>{
    return products.sort((a,b)=> a.price - b.price);
  }
}
})