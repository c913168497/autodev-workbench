import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { TopNavigation } from "@/layout/navigation/TopNavigation";
import { SideNavigation } from "@/layout/navigation/SideNavigation";
import { AIAssistantWrapper } from "@/layout/AIAssistantWrapper";
import { AIAssistantProvider } from "@/context/AIAssistantContext";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoDev Workbench",
  description: "AI-Powered AutoDevelopment Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AuthProvider>
          <AIAssistantProvider>
            <div className="min-h-screen bg-white flex flex-col">
              <TopNavigation />
              <div className="flex flex-1">
                <SideNavigation />
                <main className="flex-1 overflow-auto">
                  {children}
                </main>
              </div>
              <AIAssistantWrapper />
            </div>
            <Toaster position="top-right" />
          </AIAssistantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
