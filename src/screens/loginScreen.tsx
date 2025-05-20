import React, { useEffect } from "react";
import Aurora from "../blocks/Backgrounds/Aurora/Aurora";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { useLogedUser } from "../context/logedUserContext";

const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { logedUser, setLogedUser } = useLogedUser();

  useEffect(() => {
    if (logedUser) {
      navigate("/home");
    }
    document.title = "🔧 Emimenza | Login";
  }, []);

  const handleLogin = async () => {
    setError(null); // Resetea el error antes de intentar el login
    try {
      // Consulta la tabla Profiles para verificar si el usuario existe
      const { data, error } = await supabase
        .from("Profiles")
        .select("*")
        .eq("name", username)
        .eq("password", password);

        console.log("Data:", data);
      if (data?.length === 0) {
        setError("Usuario no encontrado.");
        console.error("Error al buscar usuario");
        return;
      }

      if (data) {
        navigate("/home");
        setLogedUser(true);
      } else {
        setError("Usuario no encontrado.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center">
      {/* Aurora de fondo */}
      <div className="absolute top-0 left-0 w-screen h-full z-0">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.7}
          speed={0.5}
        />
      </div>

      {/* Aurora invertido */}
      <div className="absolute bottom-0 left-0 w-screen h-full z-0 rotate-180">
        <Aurora
          colorStops={["#e303fc", "#5a03fc", "#038cfc"]}
          blend={1}
          amplitude={0.5}
          speed={0.5}
        />
      </div>

      {/* Login Form */}
      <div className="relative z-10 p-8 rounded-lg shadow-lg w-96 bg-background dark:bg-dark-background">
        <h2 className="text-4xl-custom font-bold font-clash mb-4 text-center text-white">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
