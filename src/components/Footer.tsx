import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "./Bounded";
import Logo from "./Logo";

export default async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");
  return (
    <Bounded as="footer">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <Link href="/">
          <Logo />
        </Link>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} {settings.data.site_title}
        </p>
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
