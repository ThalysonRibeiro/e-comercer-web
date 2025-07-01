
"use client"
import { ProviderProps } from "@/types/appContextType";
import { AppContext } from "./AppContext";
import { useCart } from "./hooks/useCart";
import { useAuth } from "./hooks/useAuth";
import { useWishlist } from "./hooks/useWishlist";
import { useUI } from "./hooks/useUI";

function AppProvider({ children }: ProviderProps) {
  const {
    userData,
    loading,
    profileDetail,
    isOpenModalLogin,
    isOpenModalRegister,
    openModalLoginRef,
    openModalRegisterRef,
    openCloseModalLogin,
    openCloseModalRegister,
    closeModalRegisterScrollY
  } = useAuth();

  const {
    cart,
    total,
    addItemCart,
    removeItemCart,
    cartAmount,
    openCloseModalCart,
    isOpenModalCart,
    openModalCartRef
  } = useCart();

  const {
    wishList,
    addItemWishlist,
    removeFromWishlist,
    reloadWishList
  } = useWishlist(userData?.id);

  const {
    activeTheme,
    openSideBar,
    sideBarRef,
    IsActiveTheme,
    toggleSideBar
  } = useUI();

  return (
    <AppContext
      value={{
        cart,
        total,
        addItemCart,
        removeItemCart,
        cartAmount,
        openCloseModalCart,
        isOpenModalCart,
        userData,
        loading,
        openModalCartRef,
        openModalLoginRef,
        openModalRegisterRef,
        openCloseModalLogin,
        openCloseModalRegister,
        isOpenModalLogin,
        isOpenModalRegister,
        closeModalRegisterScrollY,
        profileDetail,
        IsActiveTheme,
        toggleSideBar,
        openSideBar,
        sideBarRef,
        wishList,
        addItemWishlist,
        removeFromWishlist,
        reloadWishList
      }}
    >
      {children}
    </AppContext>
  );
}

export default AppProvider;