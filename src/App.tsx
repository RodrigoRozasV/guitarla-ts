import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import useCart from "./hooks/useCart";

function App(){

    const { data, cart, addToCar, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal } = useCart()
    
    return(
        <>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
            />
            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {
                        data.map((guitar) => (
                            <Guitar
                                key={guitar.id}
                                guitar={guitar}
                                addToCar={addToCar}
                            />
                        ))
                    }
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default App