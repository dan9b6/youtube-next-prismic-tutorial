import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "./Bounded";
import Logo from "./Logo";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <Bounded as="header" className="md:py-6 lg:py-8">
      <div className="flex gap-4 items-center justify-between flex-col sm:flex-row">
        <Link href="/">
          <Logo />
        </Link>
        <nav>
          <ul className="flex">
            {settings.data.navigation.map(({ link, label }, index) => {
              return (
                <li key={index}>
                  <PrismicNextLink field={link} className="p-3">
                    {label}
                  </PrismicNextLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
}
