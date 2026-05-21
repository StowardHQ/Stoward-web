import { A } from "@solidjs/router";
import { BiSolidMoon, BiSolidSun } from "solid-icons/bi";
import { createSignal, onMount, Show } from "solid-js";

export default function Navbar() {
  const [isDark, setIsDark] = createSignal(false);
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  onMount(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  });

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav class="bg-brand-page/90 border-brand-border relative sticky top-0 z-50 flex items-center justify-between border-b px-[7%] py-[18px] font-sans backdrop-blur-md transition-colors duration-200">
      <A
        href="/"
        onClick={closeMenu}
        class="text-brand-brown z-50 flex items-center gap-3 text-[28px] font-bold no-underline">
        Stoward
      </A>

      <div class="hidden items-center gap-[28px] md:flex">
        <A
          href="/add-server"
          class="text-brand-textPrimary hover:text-brand-teal font-medium no-underline transition-all duration-200 hover:-translate-y-0.5">
          Add Server
        </A>
        <a
          href="https://stt.gg/VHS7Pe7k"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-textPrimary hover:text-brand-teal font-medium no-underline transition-all duration-200 hover:-translate-y-0.5">
          Support Server
        </a>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          class="bg-brand-elevated text-brand-textPrimary border-brand-border flex min-h-[42px] min-w-[42px] cursor-pointer items-center justify-center rounded-xl border p-2.5 transition-all duration-200 hover:scale-105 active:scale-95">
          <Show when={isDark()} fallback={<BiSolidMoon size={20} class="text-brand-textPrimary" />}>
            <BiSolidSun size={20} class="text-brand-orange" />
          </Show>
        </button>
      </div>

      <div class="z-50 flex items-center md:hidden">
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen()}
          aria-label="Toggle navigation menu"
          class="relative flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 focus:outline-none">
          <span
            class={`bg-brand-textPrimary h-0.5 w-6 origin-center rounded-full transition-all duration-300 ${isMenuOpen() ? "translate-y-2 rotate-45" : ""}`}></span>
          <span
            class={`bg-brand-textPrimary h-0.5 w-6 rounded-full transition-all duration-200 ${isMenuOpen() ? "scale-x-0 opacity-0" : ""}`}></span>
          <span
            class={`bg-brand-textPrimary h-0.5 w-6 origin-center rounded-full transition-all duration-300 ${isMenuOpen() ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </div>

      <div
        class={`bg-brand-page border-brand-border absolute top-full left-0 z-40 flex w-full flex-col gap-5 border-b px-[7%] py-6 shadow-xl transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen()
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-4 opacity-0"
        }`}>
        <A
          href="/add-server"
          onClick={closeMenu}
          class="text-brand-textPrimary border-brand-border/30 hover:text-brand-teal border-b py-2 text-lg font-medium no-underline transition-colors">
          Add Server
        </A>
        <a
          href="https://stt.gg/VHS7Pe7k"
          onClick={closeMenu}
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-textPrimary border-brand-border/30 hover:text-brand-teal border-b py-2 text-lg font-medium no-underline transition-colors">
          Support Server
        </a>

        <div class="flex items-center justify-between pt-2">
          <span class="text-brand-textSecondary text-sm font-medium">Switch Theme</span>
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            class="bg-brand-elevated text-brand-textPrimary border-brand-border flex min-h-[42px] min-w-[42px] cursor-pointer items-center justify-center rounded-xl border p-2.5 transition-all duration-200 hover:scale-105 active:scale-95">
            <Show
              when={isDark()}
              fallback={<BiSolidMoon size={20} class="text-brand-textPrimary" />}>
              <BiSolidSun size={20} class="text-brand-orange" />
            </Show>
          </button>
        </div>
      </div>
    </nav>
  );
}
