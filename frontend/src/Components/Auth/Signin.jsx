 import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate(); // hook pour la redirection

  const LeftPanel = () => {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center text-white px-10"
        style={{ backgroundImage: "url('/bg-left.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <h3 className="text-2xl font-bold mb-10">CodeSquid</h3>
        <img src="/login_Illustration.png" alt="Login Illustration" className="w-80 mb-10" />
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Track & Manage Your <br /> Personal Expenses
        </h3>
        <p className="text-sm text-center max-w-md opacity-80">
          Easily monitor your income, expenses, and budget <br /> in one place.
        </p>
      </div>
    );
  };

  const RightPanel = () => {
    const handleSignup = (e) => {
      e.preventDefault(); // éviter le rechargement de la page
      // ⚡ Ici tu pourras plus tard ajouter une requête API pour enregistrer l'utilisateur
      navigate("/dashboard"); // redirige vers Home
    };

    return (
      <div className="w-full h-full flex flex-col items-center justify-center px-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account & Take <br /> Control of Your Finances
        </h2>

        <div className="flex gap-4 mb-6">
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <img src="/google.png" alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
            <img src="/github.png" alt="Github" className="w-5 h-5" />
            <span>Sign up with Github</span>
          </button>
        </div>

        {/* Formulaire */}
        <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="border-b py-2 outline-none focus:border-purple-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-b py-2 outline-none focus:border-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-b py-2 outline-none focus:border-purple-500"
          />

          {/* Bouton signup */}
          <button
            type="submit"
            className="bg-purple-500 text-white py-3 rounded-full shadow-lg hover:bg-purple-600 transition"
          >
            SIGN UP
          </button>
        </form>

        <p className="text-sm mt-6">
          Own an Account?{" "}
          <span className="text-purple-500 font-semibold cursor-pointer hover:underline">
            JUMP RIGHT IN
          </span>
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-screen h-screen">
      <div className="w-1/2 h-full">
        <LeftPanel />
      </div>
      <div className="w-1/2 h-full">
        <RightPanel />
      </div>
    </div>
  );
};

export default Signin;
