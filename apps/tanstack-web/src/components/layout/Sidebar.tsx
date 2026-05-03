import { SIDEBAR_LINKS } from "@/constants/navigation";
import { Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";

export function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 fixed top-12 2xl:top-16 bottom-0 w-64 lg:w-56 md:w-48 left-0 bg-dark-100/70 backdrop-blur-md overflow-y-auto border-r-2 border-white/5 py-6 z-10">
      <header className="flex-col items-start flex gap-2 px-6">
        <h2 className="uppercase font-bold tracking-tight text-white">
          Documentación
        </h2>
        <span className="font-mono text-xs text-white/50 bg-white/5 px-2 py-1 rounded-md">
          v1.4.0
        </span>
      </header>

      <nav className="flex-1 mt-2">
        <ul className="flex flex-col gap-6">
          {SIDEBAR_LINKS.map((category) => (
            <li key={category.id} className="flex flex-col gap-1">
              {/* Encabezado de Categoría */}
              <div className="flex items-center gap-2 px-6 mb-1 text-slate-400 text-sm font-semibold uppercase tracking-wider">
                {category.icon && (
                  <Icon icon={category.icon} className="text-lg" />
                )}
                <span>{category.label}</span>
              </div>

              {/* Sub-enlaces */}
              <ul className="flex flex-col">
                {category.subLinks?.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href || "#"}
                      className="flex items-center w-full px-6 py-2.5 text-xs 2xl:text-sm transition-all border-r-2 font-medium tracking-wide"
                      inactiveProps={{
                        className:
                          "text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5",
                      }}
                      activeProps={{
                        className:
                          "text-white bg-gradient-to-r from-transparent via-pink-500/5 to-pink-500/20 border-pink-500 font-semibold",
                      }}
                    >
                      <span className="pl-7">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
