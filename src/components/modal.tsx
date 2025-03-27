"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { useRouter } from "next/navigation";

const Modal = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    // 다이얼로그가 열려 있지 않으면 열도록 설정
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    // 다이얼로그의 스크롤을 맨 위로 이동
    dialogRef.current?.scrollTo({
      top: 0,
    });
  }, []);

  // createPortal을 사용하여 모달을 렌더링
  return createPortal(
    <dialog
      ref={dialogRef} // 다이얼로그 참조 설정
      onClose={() => router.back()} // 다이얼로그가 닫힐 때 이전 페이지로 이동
      onClick={(e) => {
        // 다이얼로그 외부를 클릭하면 이전 페이지로 이동
        if ((e.target as HTMLElement).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement // 모달을 렌더링할 DOM 노드
  );
};

export default Modal;
