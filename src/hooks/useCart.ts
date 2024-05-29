import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CarItem } from "../types";

const useCart = () => {

    const initialCart = () : CarItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)
    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    

    function addToCar (item : Guitar) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id)

        if(itemExists >= 0){ //existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else{ // no existe en el carrito
            const newItem : CarItem = {...item, quantity : 1}
            setCart([...cart, newItem])
        }
    }

    function removeFromCart(id : Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseQuantity(id : Guitar['id']){
        const updatedCart = cart.map( item =>{
            if (item.id ===  id && item.quantity < MAX_ITEMS) {
                return{
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseQuantity(id : Guitar['id']) {
        const updatedCart = cart.map( item => {
            if(item.id ===  id && item.quantity > MIN_ITEMS){
                return{
                    ...item,
                    quantity: item.quantity - 1
                } 
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }

    //State derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart])
    const cartTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

    return{
        data,
        cart,
        addToCar,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
    
    
}

export default useCart