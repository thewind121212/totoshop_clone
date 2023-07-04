import {useState, useEffect} from 'react'

function CountDownButton({handleResendClick}: {handleResendClick: () => void}) {
  //react core
  const [countdown, setCountdown] = useState(60);
  const [timer, setTimer] = useState<any>(null);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(timer);
    }
  }, [countdown]);

  useEffect(() => {
    // Start the countdown timer
    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    setTimer(interval);

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleResendClickHandler = () => {
    handleResendClick();
    setCountdown(60);
    clearInterval(timer);

    const interval = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    setTimer(interval);
  }


  return (
        <button
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          disabled={countdown > 0}
          onClick={handleResendClickHandler}
        >
          {countdown > 0 ? `Gửi lại tin nhắn xác thực sau (${countdown}s)` : "Gửi lại tin nhắn xác thực"}
        </button>
  )
}

export default CountDownButton