import "./globals.css";
import SideCardDetail from "../components/SideCardDetail";
import Map from "../components/map";
import StoreProvider from "../providers/StoreProvider";
import AlertProvider from "../providers/AlertProvider";

export default function RootLayout({ children, params }) {
  return (
    <StoreProvider>
      <html lang="id">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Phantox Negara</title>
        </head>
        <body>
          <AlertProvider>
            <div className="relative">
              <SideCardDetail />
            </div>
            <div className="h-full w-full">{children}</div>
            <Map />
          </AlertProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
