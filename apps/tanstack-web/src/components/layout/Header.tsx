import { NAV_LINKS } from "@/constants/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { fade, parentVariants } from "@blaze-motion/motion";
import { Github } from "lucide-react";
import { SearchBar } from "../common/SearchBar";
import { Link } from "@tanstack/react-router";

export function Header() {
  const [hoveredTab, setHoveredTab] = useState<string | null>("/");
  const [activeTab, setActiveTab] = useState<string | null>("/");

  const handleTab = (href: string) => {
    setActiveTab(href);
  };

  return (
    <motion.header
      variants={parentVariants({ delayChildren: 0.25 })}
      initial="initial"
      animate="animate"
      className="flex justify-center fixed top-0 left-0 right-0 z-100 bg-dark-100/70 backdrop-blur-md h-12 2xl:h-16 border-b-2 border-white/10"
    >
      <div className="flex items-center justify-between gap-6 w-full max-w-7xl mx-auto px-8">
        <div>
          <motion.h2
            variants={fade({
              direction: "right",
              distance: 40,
              ease: "backOut",
              excludeDelay: true,
            })}
            className="bg-linear-to-r from-radical-red-600 to-radical-red-300 bg-clip-text text-transparent text-2xl font-semibold tracking-wide"
          >
            BlazeMotion
          </motion.h2>
        </div>
        <motion.ul
          variants={parentVariants({ delayChildren: 0.15 })}
          className="flex items-center gap-2 2xl:gap-4"
        >
          {NAV_LINKS.map(({ id, label, href }) => (
            <motion.li
              variants={fade({
                direction: "down",
                distance: 20,
                ease: "backOut",
                excludeDelay: true,
              })}
              className="relative"
              key={id}
            >
              <Link
                onMouseEnter={() => setHoveredTab(href)}
                onMouseLeave={() => setHoveredTab(null)}
                onClick={() => handleTab(href)}
                className={`text-base 2xl:text-lg text-neutral-300 px-2 hover:text-radical-red-400 transition-all duration-300 ${activeTab === href ? "text-radical-red-400 font-medium" : "hover:font-medium"}`}
                to={href}
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
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <motion.aside
          variants={parentVariants({ delayChildren: 0.15 })}
          className="flex-1 flex items-center gap-4 justify-end"
        >
          <motion.div
            variants={fade({
              direction: "down",
              distance: 20,
              ease: "backOut",
              excludeDelay: true,
            })}
          >
            <SearchBar />
          </motion.div>
          <motion.a
            variants={fade({
              direction: "left",
              distance: 20,
              ease: "backOut",
              excludeDelay: true,
            })}
            href="https://github.com/OrlandoDev17/blaze-motion"
            target="_blank"
          >
            <Github className="text-radical-red-400 hover:text-radical-red-600 hover:scale-105 transition-all duration-300" />
          </motion.a>
        </motion.aside>
      </div>
    </motion.header>
  );
}
