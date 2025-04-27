
"use client"
import { ProviderProps } from "@/types/appContextType";
import { useToastState } from "@/app/hooks/toast/toast";
import { ToastItem } from "@/app/hooks/toast/toastItem";
import ThemeLoader from "@/components/ThemeLoader";
import { AppContext } from "./AppContext";
import { useCart } from "./hooks/useCart";
import { useAuth } from "./hooks/useAuth";
import { useWishlist } from "./hooks/useWishlist";
import { useUI } from "./hooks/useUI";

function AppProvider({ children }: ProviderProps) {
  const { toasts, addToast, removeToast } = useToastState();
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
        addToast,
        removeToast,
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
      <ThemeLoader isDarkTheme={activeTheme} />
      {children}
      <div className="fixed top-4 right-4 w-64 z-50">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
            onClose={removeToast}
          />
        ))}
      </div>
    </AppContext>
  );
}

export default AppProvider;