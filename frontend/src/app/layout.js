import "./globals.css";

export const metadata = {
  title: "Catalogo de livros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="body">{children}</body>
    </html>
  );
}
