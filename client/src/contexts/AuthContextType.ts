import User from "../models/User";

interface AuthContextType {
    user: User | null; // replace User with the actual type of your user
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // replace User with the actual type of your user
}

export default AuthContextType;