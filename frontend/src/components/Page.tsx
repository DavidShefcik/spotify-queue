import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
  const session = useContext(SessionContext);

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
    } else {
      setLoading(false);
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
      {loading ? <FullPageLoading /> : children}
    </>
  );
}
