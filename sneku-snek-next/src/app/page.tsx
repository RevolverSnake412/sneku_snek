import CustomHome from "@/pages/home";
import { AuthProvider } from "@/services/AuthContext";
import Header from "@/components/Layout/Header";
import "./globals.css";

export default function Home() {
  return (
    <AuthProvider>
      <Header />
      <CustomHome />
    </AuthProvider>
  );
}
