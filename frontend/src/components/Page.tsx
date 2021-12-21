import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";

import SessionContext from "~/context/SessionContext";

interface Props {
  title?: string;
  indexed?: boolean;
  requireAuth?: boolean;
  children: ReactNode;
}

export default function Page({ title, indexed, requireAuth, children }: Props) {
  const { session } = useContext(SessionContext);
  const { loggedIn } = session;

  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (requireAuth && !loggedIn) {
      navigation("/login", {
        replace: true,
        state: {
          redirectTo: location.pathname,
        },
      });
    }
  }, [requireAuth, loggedIn]);

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
