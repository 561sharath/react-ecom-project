import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState={
    filteredproducts:[]
}

const filterSlice=createSlice({
    name:"filter",
    initialState,
    reducers:{
        FILTER_BY_SEARCH(state,action){
            const {items,search}=action.payload
            const tempProducts = items.filter((product)=>
            product.name.toLowerCase().includes(search.toLowerCase())
            || product.category.toLowerCase().includes(search.toLowerCase()))

            state.filteredproducts=tempProducts

        },

        SORT_PRODUCTS(state,action){
            const {items,sort}=action.payload
            
            let tempProducts=[]
            if(sort==="latest"){
                tempProducts=items
                
            }

            if(sort === "lowest-price"){
                tempProducts=items.slice().sort((a,b)=>{
                    return a.price - b.price
                })
            }

            if(sort === "highest-price"){
                tempProducts=items.slice().sort((a,b)=>{
                    return b.price-a.price
                })
            }

            if(sort==="a-z"){
                tempProducts=items.slice().sort((a,b)=>{
                    return a.name.localeCompare(b.name)
                })
                
            }

            if(sort==="z-a"){
                tempProducts=items.slice().sort((a,b)=>{
                    return b.name.localeCompare(a.name)
                })
                
            }

            

            state.filteredproducts=tempProducts
        },

        FILTER_BY_CATEGORY(state,action){
            //console.log(action.payload)
            const{products,category}=action.payload
            let tempProducts=[]
            if (category==="All"){
                tempProducts=products

            }
            else{
                tempProducts=products.filter((product)=>
                product.category===category)
            }
            state.filteredproducts=tempProducts
        },
        FILTER_BY_BRAND(state,action){
            //console.log(action.payload)
            const{products,brand}=action.payload
            let tempProducts=[]
            if (brand==="All"){
                tempProducts=products

            }
            else{
                tempProducts=products.filter((product)=>
                product.brand===brand)
            }
            state.filteredproducts=tempProducts
        },

        FILTER_BY_PRICE(state,action){
            
            const {items,price}=action.payload

            let tempProducts=[]

            tempProducts=items.filter((product)=>
                product.price <= price

            
            )
            state.filteredproducts=tempProducts
        },

        LOAD_PRODUCTS(state,action){
            
            

            state.filteredproducts=action.payload
        }
        

        

        
    }
})

export const {FILTER_BY_SEARCH,SORT_PRODUCTS,FILTER_BY_BRAND,
FILTER_BY_CATEGORY,FILTER_BY_PRICE,SORT_BY_ALL_PRODUCTS,LOAD_PRODUCTS}=filterSlice.actions
export const selectFilteredProducts = (state) =>state.filter.filteredproducts
export default filterSlice.reducer
