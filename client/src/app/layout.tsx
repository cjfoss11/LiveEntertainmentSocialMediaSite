"use client"

import { Provider } from "./components/ui/provider"
import "./globals.css";
import { useState } from "react"
import { RefreshUserPostsContext } from './hooks/useRefreshUserPosts';
import { CurrentMatieralsToUploadContext } from "./hooks/useCurrentMaterialsToUpload";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // Refreshing a user's own posts
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handleRefreshCallback = (newValue: boolean) => {
      setRefreshPosts(newValue);
  }

  // refreshing materials to be uploaded as a post
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  return (
    <html lang="en">
      <body>
        <Provider>
          <RefreshUserPostsContext.Provider value={{refreshPosts, handleRefreshCallback}}>
            <CurrentMatieralsToUploadContext.Provider value={{file, description, imageSrc, setFile, setDescription, setImageSrc }}>
              {children}
            </CurrentMatieralsToUploadContext.Provider>
          </RefreshUserPostsContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
