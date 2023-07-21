import { useAppSelector, useAppDispatch } from "@/redux/reduxHook";
import { toogleSnackBar, toogleSnackBarDispatch} from "@/redux/Features/UI/snackBar.slice";
import CountDownButton from "@/components/UI/count-down-button/CountDownButton.component";

const dispatchType = {
  "RESENT_EMAIL": [{type: 'success', content: 'Đã gửi lại email xác thực'}], }
function Reverify() {
  const state = useAppSelector((state) => state.registerStatus);
  const dispatch = useAppDispatch();

  const handleResendClick = async() => {
  const res   =  await fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: state.userEmail,
      }),
    });
  
    const { isSentCheck } = await res.json();

    if(isSentCheck) {
      dispatch(
        toogleSnackBar(toogleSnackBarDispatch(dispatchType.RESENT_EMAIL))
      );
    }

  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="bg-gray-100 p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">
        Kiểm tra Email và Xác minh Tài khoản của bạn
        </h1>
        <p className="text-gray-600 mb-8">
        Đã gửi một email quan trọng đến <span className="text-blue-500">{state.userEmail}</span> với một liên kết quan trọng để xác minh tài khoản của bạn. Vui lòng kiểm tra kỹ hộp thư đến của bạn và nhấp vào liên kết đó để hoàn tất quá trình xác minh và kích hoạt tài khoản của bạn. Chúng tôi rất mong chờ được chào đón bạn trong cộng đồng của chúng tôi!
        </p>
        <CountDownButton handleResendClick={handleResendClick}/>
      </div>
    </div>
  )
}

export default Reverify