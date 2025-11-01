import Card from "../components/Card";
import Logo from "../components/Logo";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google/redirect";
  };

  return (
    <div className="font-kiwi text-white bg-center bg-cover min-h-screen flex items-center justify-center">
      <Card>
        <div className="flex flex-col items-center justify-center gap-8 p-10 w-[320px]">
          {/* ロゴ */}
          <Logo />

          {/* ログインボタン */}
          <button
            onClick={handleGoogleLogin}
            className="
              flex
              items-center
              gap-2
              px-6 py-3 rounded-full
              border 
              backdrop-blur-lg
              hover:bg-white/30
            "
          >
            <img
              src='https://developers.google.com/identity/images/g-logo.png'
              className='w-5 h-5 bg-white rounded-full p-0.5'
              alt='Google logo'
            />
            Googleでログイン
          </button>

          {/* フッター */}
          <footer>
            © 2025 Sodachune
          </footer>
        </div>
      </Card>
    </div>
  );
}
