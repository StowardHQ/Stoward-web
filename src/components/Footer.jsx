import { A } from "@solidjs/router";
import { BiLogosGithub, BiRegularSupport } from "solid-icons/bi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer class="bg-brand-page border-brand-border border-t px-[7%] py-10 font-sans transition-colors duration-200">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-4">
        <div class="flex max-w-sm flex-col gap-2.5">
          <A href="/" class="text-brand-brown w-fit text-[24px] font-bold no-underline">
            Stoward
          </A>
          <p class="text-brand-textSecondary text-sm leading-relaxed">
            The premier directory to discover active Stoat servers.
          </p>
        </div>

        <div class="flex flex-wrap gap-x-12 gap-y-6 md:gap-x-[56px]">
          <div class="flex flex-col gap-3">
            <span class="text-brand-textPrimary text-xs font-bold tracking-wider uppercase">
              Community
            </span>
            <a
              href="https://github.com/StowardHQ/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-brand-textSecondary hover:text-brand-teal flex items-center gap-2 text-sm font-medium no-underline transition-colors duration-200">
              <BiLogosGithub size={18} />
              GitHub
            </a>
            <a
              href="https://stt.gg/VHS7Pe7k"
              target="_blank"
              rel="noopener noreferrer"
              class="text-brand-textSecondary hover:text-brand-teal flex items-center gap-2 text-sm font-medium no-underline transition-colors duration-200">
              <BiRegularSupport size={18} />
              Support Server
            </a>
          </div>
        </div>
      </div>

      <hr class="border-brand-border/40 my-8 border-t" />

      <div class="text-brand-textSecondary/70 flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div>&copy; {currentYear} StowardHQ. All rights reserved.</div>
        <div class="font-normal tracking-wide italic sm:text-right">
          Not affiliated with Stoat or Revolt Platforms Ltd.
        </div>
      </div>
    </footer>
  );
}
