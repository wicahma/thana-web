import Map from "../../components/map";
import "../globals.css";

export default function RootLayout({
  children,
  dashboard,
  data,
  login,
  user,
  params,
}) {
  return (
    <>
      <div className="h-full w-full">
        {children}
        <div>{params.activePage === "dashboard" && dashboard}</div>
        <div>{params.activePage === "data" && data}</div>
        <div>{params.activePage === "login" && login}</div>
        <div>{params.activePage === "user" && user}</div>
      </div>
    </>
  );
}
