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
  const [loading, setLoading] = useState(true);
  const { session } = useContext(SessionContext);
  const { loggedIn } = session;

  const navigation = useNavigate();

  useEffect(() => {
    if (requireAuth && !loggedIn) {
      navigation("/login", {
        replace: true,
      });
    } else if (requireNotAuth && loggedIn) {
      navigation("/", {
        replace: true,
      });
    } else {
      setLoading(false);
    }
  }, [requireAuth, requireNotAuth, loggedIn]);

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
