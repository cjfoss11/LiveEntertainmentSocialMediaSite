"use client"

import { Provider } from "./components/ui/provider"
import "./globals.css";
import {useState} from "react"
import {RefreshUserPostsContext} from './hooks/useRefreshUserPosts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handleRefreshCallback = (newValue: boolean) => {
      setRefreshPosts(newValue);
  }

  return (
    <html lang="en">
      <body>
        <Provider>
          <RefreshUserPostsContext.Provider value={{refreshPosts, handleRefreshCallback}}>
            {children}
          </RefreshUserPostsContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
