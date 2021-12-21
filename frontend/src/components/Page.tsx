import { ReactNode } from "react";
import { Helmet } from "react-helmet";

interface Props {
  title?: string;
  indexed?: boolean;
  children: ReactNode;
}

export default function Page({ title, indexed, children }: Props) {
  return (
    <>
      <Helmet>
        <title>Spotify Queue {title ? ` - ${title}` : ""}</title>
        {!indexed && <meta name="robots" content="noindex, nofollow" />}
      </Helmet>
      {children}
    </>
  );
}
