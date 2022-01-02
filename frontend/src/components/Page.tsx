import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";

import SessionContext from "~/context/SessionContext";
import FullPageLoading from "./FullPageLoading";

interface Props {
  title?: string;
  indexed?: boolean;
  requireAuth?: boolean;
  requireNotAuth?: boolean;
  children: ReactNode;
}

export default function Page({
  title,
  indexed,
  requireAuth,
  requireNotAuth,
  children,
}: Props) {
  const { session } = useContext(SessionContext);

  const navigation = useNavigate();

  useEffect(() => {
    if (requireAuth && !session.isLoggedIn) {
      navigation("/login", {
        replace: true,
      });
    } else if (requireNotAuth && session.isLoggedIn) {
      navigation("/", {
        replace: true,
      });
    }
  }, [requireAuth, requireNotAuth, session.isLoggedIn]);

  return (
    <>
      <Helmet>
        <title>Spotify Queue {title ? ` - ${title}` : ""}</title>
        {(!indexed || requireAuth) && (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Helmet>
      {children}
    </>
  );
}
