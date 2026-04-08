import { NAV_LINKS } from "@/lib/constants";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export function Header() {
  const [hoveredTab, setHoveredTab] = useState<string | null>("#playground");
  const [activeTab, setActiveTab] = useState<string | null>("#playground");

  const handleTab = (href: string) => {
    setActiveTab(href);
  };

  return (
    <header className="flex items-center justify-between px-8 bg-header h-16">
      <div className="flex-1">
        <h2 className="text-radical-red-300 text-2xl font-semibold tracking-wide">
          BlazeMotion
        </h2>
      </div>
      <ul className="flex items-center gap-4">
        {NAV_LINKS.map(({ id, label, href }) => (
          <li className="relative" key={id}>
            <a
              onMouseEnter={() => setHoveredTab(href)}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => handleTab(href)}
              className={`text-lg text-neutral-300 font-medium px-2 hover:text-radical-red-300 transition-all duration-300 ${activeTab === href ? "text-radical-red-300" : ""}`}
              href={href}
            >
              {label}
              <AnimatePresence>
                {hoveredTab === href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-1 bg-radical-red-300 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </AnimatePresence>
            </a>
          </li>
        ))}
      </ul>
      <div className="flex-1 flex items-center justify-end">
        <a
          className="font-jetbrains-mono font-medium bg-neutral px-4 py-2 rounded-md shadow-inner shadow-white/10 hover:shadow-inner hover:shadow-white/30 hover:-translate-y-1 transition-all duration-300"
          href="https://github.com/OrlandoDev17/blaze-motion"
        >
          Github
        </a>
      </div>
    </header>
  );
}
