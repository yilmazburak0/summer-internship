import { toast, Slide } from 'react-toastify';

const notify = (type, message, options = {}) => {
  return toast[type](message, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    transition: Slide,
    theme: 'colored',
    ...options
  });
};

export default notify;
