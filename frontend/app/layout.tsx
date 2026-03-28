import "antd/dist/reset.css";
import "./globals.css";

export const metadata = {
  title: "RoleGuard UI",
  description: "Role-Based Access Guard Frontend"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}