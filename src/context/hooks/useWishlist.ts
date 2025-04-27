import { useState, useEffect } from "react";
import { WishlistProps } from "@/types/user";
import api from "@/lib/axios";
import { useToastState } from "@/app/hooks/toast/toast";

export function useWishlist(userId: string | undefined) {
  const [wishList, setWishList] = useState<WishlistProps | null>(null);
  const [reloadWishList, setReloadWishList] = useState<boolean>(false);
  const { addToast } = useToastState();

  useEffect(() => {
    async function getWishList() {
      if (!userId) return;

      try {
        const { data } = await api.get(`/wishlist/user/${userId}`);
        setWishList(data);
      } catch (error) {
        console.log(error);
      }
    }

    getWishList();
  }, [userId, reloadWishList]);

  function reloadWish() {
    setReloadWishList(!reloadWishList);
  }

  async function addItemWishlist(productId: string) {
    if (!userId) {
      addToast('error', 'Você precisa estar logado para adicionar à lista de desejos');
      return;
    }

    try {
      await api.post('/wishlist', {
        userId,
        productId
      });

      reloadWish();
      addToast('success', 'Item adicionado à lista de desejos');
    } catch (error) {
      console.error('Erro ao adicionar à lista de desejos:', error);
      addToast('error', 'Erro ao adicionar à lista de desejos');
    }
  }

  async function removeFromWishlist(itemId: string) {
    try {
      const { data } = await api.delete(`/wishlist/${itemId}`);

      setWishList(prev => {
        if (!prev) return null;
        return {
          ...prev,
          items: prev.items.filter(item => item.id !== itemId)
        };
      });

      addToast('success', `${data.message}`);
    } catch (error) {
      console.log(error);
      addToast('error', 'Erro ao tentar remover item da lista de desejos');
    }
  }

  return {
    wishList,
    addItemWishlist,
    removeFromWishlist,
    reloadWishList
  };
}