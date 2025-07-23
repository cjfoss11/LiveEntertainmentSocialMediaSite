import { createContext, useContext } from 'react';

type CurrentMatieralsToUploadContextType = {
  file: File | null;
  description: string;
  imageSrc: string | null;
  setFile: (file: File | null) => void;
  setDescription: (value: string) => void;
  setImageSrc: (value: string | null) => void;
};

export const CurrentMatieralsToUploadContext = createContext<CurrentMatieralsToUploadContextType | undefined>(undefined);

export const useCurrentMaterialsToUpload = () => {
  const context = useContext(CurrentMatieralsToUploadContext);
  if (!context) {
    throw new Error('useFileStringContext must be used within a FileStringProvider');
  }
  return context;
};