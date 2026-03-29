import "antd/dist/reset.css";
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "RoleGuard UI",
  description: "Role-Based Access Guard Frontend"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}