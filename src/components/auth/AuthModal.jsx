import { useState } from 'react';
import Modal from '../ui/Modal';
import AuthForm from './AuthForm';
import { X } from 'lucide-react';

export default function AuthModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-blue-300 p-4 md:p-12 flex items-center justify-center">
          <img 
            src="/login-img.png" 
            alt="Online shopping illustration" 
            className="w-full h-auto max-w-[200px] md:max-w-xs"
          />
        </div>
        
        <div className="w-full md:w-1/2 p-3 md:p-8">
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mt-2 md:mt-4 px-2 md:px-6">
            <h2 className="text-lg md:text-2xl font-semibold text-gray-700 mb-6 md:mb-8">
              Welcome back
            </h2>
            <AuthForm />
            <p className="mt-3 md:mt-4 text-sm md:text-base text-center text-gray-600">
              Don't have an account? {' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Create an Account
            </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
