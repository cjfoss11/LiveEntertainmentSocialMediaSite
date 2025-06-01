'use client';

import { useState, useEffect } from "react";
export const useProfileViewModel = () => {
    const [posts, setPosts] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)

    useEffect(() => {
        // add new function declarations here
        setPosts(0)
        setFollowers(0)
        setFollowing(0)
      }, []);

      return {
        posts, 
        followers,
        following, 
      };
}