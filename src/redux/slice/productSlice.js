import { createSlice } from "@reduxjs/toolkit";

const initialState={

    products:[],
    minPrice:null,
    maxPrice:null,

}

const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        STORE_PRODUCTS(state,action){
            
            state.products = action.payload
        },
        GET_PRICE_RANGE(state,action){
            
            const {data} =action.payload

            const array=[]
            data.map((product)=>{
                const price=product.price
                return array.push(price)
            })
            const max= Math.max(...array)
            const min=Math.min(...array)
            state.minPrice=min
            state.maxPrice=max
        },
    },
})


export const{ STORE_PRODUCTS,GET_PRICE_RANGE} = productSlice.actions

export const selectProducts = (state)=>state.product.products
export const selectMinPrice = (state)=>state.product.minPrice
export const selectMaxPrice = (state)=>state.product.maxPrice
export default productSlice.reducer