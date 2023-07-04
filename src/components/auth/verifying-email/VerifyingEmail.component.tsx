import { FormEvent, useState , useRef} from 'react';

const VerifyEmailPage = ({paramJWT} : {paramJWT : string}) => {
  const emailRef = useRef<any>('');


  const handleSendVerification = async() => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailRef.current.value)) return 
      const res = await  fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email :emailRef.current.value.trim(), authVerificationToken: paramJWT.trim()}),
      })
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Xác nhận Email của bạn</h1>
        <p className="text-gray-600 mb-8">Vui lòng nhập email để kích hoạt tải khoản của bạn.</p>
        <div className="flex mb-4">
          <input
            type="email"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
            placeholder="Email address"
            ref={emailRef}
          />
          <button
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
            onClick={handleSendVerification}
          >
           Xác nhận ngay 
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
