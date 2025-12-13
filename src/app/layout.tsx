import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <title>Pulse CRUD demo</title>
      </head>
      <body className="flex flex-col justify-between">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
