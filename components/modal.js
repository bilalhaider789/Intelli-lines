import { Dialog } from "@headlessui/react";
import { useRef } from "react";

export function Modal({ children }) {
  let overlayRef = useRef();

  return (
    // <Dialog></Dialog>
    //   static
    //   open={true}
    //   onClose={onClose}
    //   initialFocus={overlayRef}
    //   className="fixed inset-0 z-10 flex items-center justify-center"
    // >
    //   <Dialog.Overlay
    //     ref={overlayRef}
    //     className="fixed inset-0 bg-gray-800/60"
    //   />
    //   <div className="relative flex items-center justify-center w-1/2">
    //     {children}
    //   </div>
    // </Dialog>
    <div>
    <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0"></div>
    <div className="bg-transparent h-full w-full absolute top-0 left-0 flex justify-center items-center">{children}</div>
    </div>
  );

}