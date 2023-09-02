import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState={
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity:0,
    cartTotalAmount:0,

}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        ADD_To_CART(state,action){
            
            const productIndex = state.cartItems.findIndex((item)=>
            item.id=== action.payload.id)

            if (productIndex>=0){

                state.cartItems[productIndex].cartQuantity += 1
                toast.info(`${action.payload.name} incresed by one`,{position:"top-left"})

            }
            else{

                const tempProducts={...action.payload,cartQuantity:1}
                state.cartItems.push(tempProducts)
                toast.success(`${action.payload.name} product added to cart`,{position:"top-left"})

            }

            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
            console.log(action.payload)
            
        },

        DECREASE_CART(state,action){
            const productIndex = state.cartItems.findIndex((item)=>
            item.id=== action.payload.id)

            if (state.cartItems[productIndex].cartQuantity>1){

                state.cartItems[productIndex].cartQuantity-=1
                toast.info(`${action.payload.name} decresaed by one`,{position:"top-left"})
            }
            else if(state.cartItems[productIndex].cartQuantity===1){

                const newCartItem=state.cartItems.filter((item)=>
                item.id!== action.payload.id)
                state.cartItems=newCartItem
                toast.success(`${action.payload.name} removed from cart`,{position:"top-left"})

            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

        },

        REMOVE_FROM_CART(state,action){
            console.log(action.payload)
            const newCartItem=state.cartItems.filter((item)=>
                item.id!== action.payload.id)

                state.cartItems=newCartItem
                toast.success(`${action.payload.name} removed from cart`,{position:"top-left"})
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

            
            


            
        },

        CLEAR_CART(state,action){
            state.cartItems=[]
            toast.info(`cart cleared`,{position:"top-left"})
                localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

            
        },
        CALCULATE_SUB_TOTAL(state,action){

            const array=[]
            state.cartItems.map((item)=>{
                const {price,cartQuantity} = item
                const cartItemAmount=price*cartQuantity
                //console.log(cartItemAmount)
                return array.push(cartItemAmount)

            })

            const totalAmount=array.reduce((a,b)=>{
                return a+b
            },0)

            state.cartTotalAmount=totalAmount

        },

        CALCULATE_TOTAL_QUANTITY(state,action){

            const array=[]
            state.cartItems.map((item)=>{
                const {cartQuantity} = item
                const quantity=cartQuantity
                //console.log(cartItemAmount)
                return array.push(quantity)

            })

            const totalquantity=array.reduce((a,b)=>{
                return a+b
            },0)

            state.cartTotalQuantity=totalquantity

        },

        
        
        
    }
})

export const{ADD_To_CART,DECREASE_CART,REMOVE_FROM_CART,CLEAR_CART,CALCULATE_TOTAL_QUALITY,CALCULATE_SUB_TOTAL,CALCULATE_TOTAL_QUANTITY}=cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export default cartSlice.reducer