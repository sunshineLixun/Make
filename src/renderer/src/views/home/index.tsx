import Sidebar from "./components/sidebar";
import Container from "./components/container";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div className="flex w-100% h-100%">
      <Sidebar />
      <Container />
    </div>
  );
}
