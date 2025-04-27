import { useState, useEffect, useRef } from "react";
import { User } from "next-auth";
import { UserProps } from "@/types/appContextType";
import { ProfileProps } from "@/types/user";
import api from "@/lib/axios";

export function useAuth() {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileDetail, setProfileDetail] = useState<ProfileProps | null>(null);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState<boolean>(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState<boolean>(false);
  const openModalLoginRef = useRef<HTMLDivElement>(null);
  const openModalRegisterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);
        const response = await fetch('/api/session');
        const data: UserProps = await response.json();

        if (!data.user) {
          setUserData(null);
          return;
        }

        setUserData(data.user);
      } catch (err) {
        console.error('Erro ao buscar dados do usuário:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    async function getFullUserDetails() {
      if (!userData?.id) return;

      try {
        const response = await api.get(`/auth/profile/${userData.id}`);
        setProfileDetail(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    }

    getFullUserDetails();
  }, [userData?.id]);

  function openCloseModalLogin() {
    setIsOpenModalLogin(!isOpenModalLogin);
  }

  useEffect(() => {
    function handleClickOutsideLogin(event: MouseEvent) {
      if (openModalLoginRef.current && !openModalLoginRef.current.contains(event.target as Node) && isOpenModalLogin) {
        setIsOpenModalLogin(false);
      }
    }

    if (isOpenModalLogin) {
      document.addEventListener("mousedown", handleClickOutsideLogin);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLogin);
    };
  }, [isOpenModalLogin]);

  function openCloseModalRegister() {
    setIsOpenModalRegister(!isOpenModalRegister);
  }

  useEffect(() => {
    function handleClickOutsideRegister(event: MouseEvent) {
      if (openModalRegisterRef.current && !openModalRegisterRef.current.contains(event.target as Node) && isOpenModalRegister) {
        setIsOpenModalRegister(false);
      }
    }

    if (isOpenModalRegister) {
      document.addEventListener("mousedown", handleClickOutsideRegister);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideRegister);
    };
  }, [isOpenModalRegister]);

  function closeModalRegisterScrollY() {
    setIsOpenModalRegister(false);
  }

  return {
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
  };
}