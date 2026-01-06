import {
  useContext,
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;

  name: string;
  setName: Dispatch<SetStateAction<string>>;

  email: string;
  setEmail: Dispatch<SetStateAction<string>>;

  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};