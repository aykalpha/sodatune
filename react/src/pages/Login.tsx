import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-yellow-300">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <img
            src="/logo.png"
            alt="そだちゅーん"
            className="h-24 object-contain"
          />
        </div>

        <form className="space-y-5">
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full px-4 py-3 border rounded-full text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full px-4 py-3 border rounded-full text-center placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-green-400 to-yellow-400 text-white font-semibold hover:opacity-90 transition"
            onClick={handleLogin}
          >
            ログイン
          </button>
        </form>
      </motion.div>


    </div>
  );
}

export default Login;
