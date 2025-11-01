import { useState } from "react";
import axios from "axios";

export function useUser() {
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user-info", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error: any) {
      console.error(error);
      setUser(null);
    }
  };

  return { user, setUser, getUser };
}
