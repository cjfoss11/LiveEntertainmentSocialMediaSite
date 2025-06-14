import {createContext, useContext} from "react"

export interface RefreshUserPostsContextType {
  refreshPosts: boolean;
  handleRefreshCallback: (newValue: boolean) => void;
}

export const RefreshUserPostsContext = createContext<RefreshUserPostsContextType | undefined>(undefined);


export const useRefreshUserPosts = (): RefreshUserPostsContextType => {
  const context = useContext(RefreshUserPostsContext);
  if (!context) {
    throw new Error('useRefreshUserPosts must be used within a RefreshUserPostsContext.Provider');
  }
  return context;
};