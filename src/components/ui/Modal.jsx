import { useEffect, useRef } from 'react';

export default function Modal({ children, onClose }) {
  const modalRef = useRef();
  
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    const handleEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div 
        ref={modalRef} 
        className="w-11/12 max-w-4xl bg-white rounded-3xl overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}