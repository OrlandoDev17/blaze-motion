import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { parentVariants, fade } from "@blaze-motion/motion";

interface FooterLinksProps {
  id: string;
  title: string;
  links: FooterLinksItemProps[];
}

interface FooterLinksItemProps {
  id: string;
  label?: string;
  href: string;
  icon?: string;
}

const FOOTER_LINKS: FooterLinksProps[] = [
  {
    id: "resources",
    title: "Recursos",
    links: [
      {
        id: "npm",
        label: "npm",
        href: "https://npmjs.com/package/@blaze-motion/motion",
      },
      {
        id: "github",
        label: "Github",
        href: "https://github.com/OrlandoDev17/blaze-motion",
      },
      { id: "docs", label: "Docs", href: "/docs" },
    ],
  },
  {
    id: "product",
    title: "Producto",
    links: [
      { id: "presets", label: "Presets", href: "/presets" },
      { id: "components", label: "Components", href: "/components" },
      { id: "changelog", label: "Changelog", href: "/changelog" },
    ],
  },
  {
    id: "connect",
    title: "Conéctate",
    links: [
      {
        id: "email",
        icon: "lucide:at-sign",
        href: "mailto:orlandodev1707@gmail.com",
      },
      {
        id: "portfolio",
        icon: "lucide:code",
        href: "https://orlando-lopez.vercel.app",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full border-t-2 border-white/5 bg-dark-100/70 backdrop-blur-md">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.6 }}
        variants={parentVariants({ delayChildren: 0.15, startDelay: 0.5 })}
        className="grid grid-cols-4 gap-6 py-8 max-w-7xl mx-auto px-8"
      >
        <motion.div variants={parentVariants()} className="flex flex-col gap-4">
          <motion.h3
            variants={fade({
              direction: "down",
              distance: 50,
              excludeDelay: true,
            })}
            className="text-lg font-semibold"
          >
            Blaze Motion
          </motion.h3>
          <motion.p
            variants={fade({
              direction: "left",
              distance: 50,
              excludeDelay: true,
            })}
            className="text-xs text-white/70 font-mono"
          >
            © {new Date().getFullYear()} Blaze Motion. Motor de animaciones de
            alto rendimiento.
          </motion.p>
        </motion.div>
        {FOOTER_LINKS.map((column) => (
          <motion.div
            variants={parentVariants()}
            className="flex flex-col gap-2"
            key={column.id}
          >
            <motion.h4
              variants={fade({
                direction: "down",
                distance: 50,
                excludeDelay: true,
              })}
              className="text-sm text-white/70 uppercase font-semibold"
            >
              {column.title}
            </motion.h4>
            <motion.ul
              variants={parentVariants()}
              className={`flex ${
                column.id === "connect" ? "flex-row gap-4" : "flex-col gap-1"
              }`}
            >
              {column.links.map((link) => (
                <motion.li
                  variants={fade({
                    direction: "left",
                    distance: 50,
                    excludeDelay: true,
                  })}
                  key={link.id}
                >
                  <Link
                    className="text-white/50 text-sm uppercase hover:text-white hover:underline transition-all duration-300 group inline-flex items-center"
                    to={link.href}
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {link.icon && (
                      <Icon
                        icon={link.icon}
                        className="size-8 p-1.5 bg-dark-200 border 
                        border-white/10 rounded-sm group-hover:border-white/20 group-hover:scale-110 transition-all duration-300"
                      />
                    )}
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ))}
      </motion.div>
    </footer>
  );
}
