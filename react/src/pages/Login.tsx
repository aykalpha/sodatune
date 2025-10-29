import Card from "../components/Card";

export default function Login() {
  const handleGoogleLogin = () => {
    // LaravelのGoogle認証エンドポイントに飛ばす
    window.location.href = "http://localhost:8000/auth/google/redirect";
  };

  return (
    <Card>
      <div className="flex flex-col items-center justify-center gap-6 p-10">
        <h2 className="text-2xl font-semibold text-gray-800">Googleでログイン</h2>
        <button
          onClick={handleGoogleLogin}
          className="bg-white text-gray-700 border border-gray-300 shadow-md rounded-full px-6 py-3 flex items-center gap-3 hover:bg-gray-100 transition"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </Card>
  );
}
