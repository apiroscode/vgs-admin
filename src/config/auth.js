import React, { useEffect, useState } from "react";

import { auth, firestore } from "./firebase";

import { maybe } from "@/utils";
import { useNotify } from "@/utils/hooks";

import { BaseSpinner } from "@/components";

export const AuthContext = React.createContext();

const checkIsAdmin = async (uid) => {
  try {
    const doc = await firestore.collection("roles").doc("admin").get();
    if (doc.exists) {
      const users = maybe(() => doc.data().users, []);
      return users.includes(uid);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const notify = useNotify();
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user !== null) {
        const isAdmin = await checkIsAdmin(user.uid);
        if (isAdmin) {
          setCurrentUser(user);
        } else {
          auth.signOut();
          notify.error("User not found");
          setCurrentUser(null);
        }
        setPending(false);
      } else {
        setCurrentUser(null);
        setPending(false);
      }
    });
  }, [notify]);

  if (pending) {
    return <BaseSpinner />;
  }

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
