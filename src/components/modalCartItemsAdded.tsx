"use client"
import { Context, ContextType } from "@/context/Context"
import Image from "next/image"
import { useContext } from "react"
import { Button } from "./ui/button"
import { X } from "lucide-react"

export function ModalCartItemsAdded() {
  const {
    cart,
    total,
    cartAmount,
    addItemCart,
    removeItemCart,
    openCloseModalCart,
    isOpenModalCart,
    openModalCartRef
  } = useContext(Context) as ContextType;


  return (
    <>
      {isOpenModalCart && (
        <div ref={openModalCartRef} className="fixed right-0 z-99 max-w-120 w-full max-h-screen h-full bg-gray-600/95 border-l border-l-gray-400 ">
          <div className="flex items-center justify-between p-1">
            <h1 className="text-primary font-semibold text-2xl">
              Carrinho de compras
            </h1>
            <button
              onClick={openCloseModalCart}
              className="text-primary hover:text-hover">
              <X />
            </button>
          </div>

          <div className="overflow-auto h-custom-calc hide-scrollbar">
            {cart.map(item => (
              <div key={item.id} className="flex flex-col items-center justify-between p-2 border-b border-b-gray-400">
                <h1 className="line-clamp-1 text-gray-100 font-semibold">{item.title}</h1>
                <div className="w-full flex justify-between">
                  <Image src={item.images[0].image} alt="imagem do produto" width={100} height={100} />
                  <div className="flex gap-3 justify-center items-center w-25">
                    <Button onClick={() => removeItemCart(item)}>-</Button>
                    {item.amount}
                    <Button onClick={() => addItemCart(item)}>+</Button>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <p>Preço: <strong className="text-green">R$ {item.price}</strong></p>
                  <p className="float-right">SubTotal: {item.total.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL"
                  })}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 max-w-120 w-full h-30">
            {cartAmount !== 0 && (
              <div className="flex flex-col justify-between h-full border border-gray-400 p-2 bg-gray-600">
                <div className="flex justify-between">
                  <p>Total</p>
                  <p className="text-green">{total}</p>
                </div>

                <Button>Proceed to Checkout</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}