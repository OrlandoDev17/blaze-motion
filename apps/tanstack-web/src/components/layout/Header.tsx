import { NAV_LINKS } from "@/constants/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { fade, parentVariants } from "@blaze-motion/motion";

export function Header() {
  const [hoveredTab, setHoveredTab] = useState<string | null>("#playground");
  const [activeTab, setActiveTab] = useState<string | null>("#playground");

  const handleTab = (href: string) => {
    setActiveTab(href);
  };

  return (
    <motion.header
      variants={parentVariants({ stagger: 0.15 })}
      initial="initial"
      animate="animate"
      className="flex items-center justify-between px-8 bg-dark-100 h-16"
    >
      <div className="flex-1">
        <motion.h2
          variants={fade({
            direction: "right",
            distance: 40,
            ease: "backOut",
            excludeDelay: true,
          })}
          className="text-radical-red-300 text-2xl font-semibold tracking-wide"
        >
          BlazeMotion
        </motion.h2>
      </div>
      <motion.ul
variants={parentVariants({ stagger: 0.15 })}
      className="flex items-center gap-4"
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
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        variants={fade({
          direction: "left",
          distance: 20,
          ease: "backOut",
          delay: 0.7,
        })}
        className="flex-1 flex items-center justify-end"
      >
        <a
          className="font-mono font-medium bg-dark-200 px-4 py-2 rounded-md shadow-inner shadow-white/20 hover:shadow-inner hover:shadow-white/30 hover:-translate-y-1 transition-all duration-300"
          href="https://github.com/OrlandoDev17/blaze-motion"
        >
          Github
        </a>
      </motion.div>
    </motion.header>
  );
}
