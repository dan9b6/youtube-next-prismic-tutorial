import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Header() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <header>
      <Link href="/">{settings.data.site_title}</Link>
      <nav>
        <ul>
          {settings.data.navigation.map(({ link, label }, index) => {
            return (
              <li key={index}>
                <PrismicNextLink field={link}>{label}</PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
