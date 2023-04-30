import * as ToastRadix from '@radix-ui/react-toast';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

import { IoMdClose } from "react-icons/io"

import style from './style.module.scss'

interface IToastProps {
  children: ReactNode;
  title: string;
  onClose: () => void;
}

export function Toast({children, title, onClose}: IToastProps) {
  const [open, setOpen] = useState(false);
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);

  function handleOpenToast() {
    setOpen(false);
    onClose()
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      // eventDateRef.current = oneWeekAway(null);
      setOpen(true);
    }, 100);
  }

  useEffect(() => {
    handleOpenToast()
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
      <>
      <ToastRadix.Root className={style.toast} open={open} onOpenChange={setOpen}>
        a
        <div>
          <ToastRadix.Title className={style.toast__title}>{title}</ToastRadix.Title>
          <ToastRadix.Description asChild>
            {children}
          </ToastRadix.Description>
        </div>
        <ToastRadix.Action className={style.toast__action} asChild altText="Goto schedule to undo">
          <button className={style.toast__btn}>
            <IoMdClose />
          </button>
        </ToastRadix.Action>
      </ToastRadix.Root>
      <ToastRadix.Viewport className={style.toast__viewport} />
      </>
  );
};

function oneWeekAway(date: Date | null) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export function ToastProvider({children}: any) {
  return (
    <ToastRadix.Provider swipeDirection="up">
      {children}
    </ToastRadix.Provider>
  )
}