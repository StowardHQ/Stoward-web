import { BiRegularCopy, BiSolidCheckCircle, BiSolidInfoCircle } from "solid-icons/bi";
import { createSignal, Show } from "solid-js";

export default function AddServer() {
  const [copiedText, setCopiedText] = createSignal("");

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(""), 2000);
  };

  return (
    <div class="bg-brand-page text-brand-textPrimary min-h-screen font-sans">
      <section class="flex min-h-[50vh] flex-col items-center justify-between gap-[40px] px-[7%] py-16 md:flex-row">
        <div class="max-w-[620px] text-center md:text-left">
          <h1 class="line-tight mb-5 text-4xl leading-[1.1] font-bold md:text-[56px]">
            Grow Your <span class="text-brand-orange">Space</span>
          </h1>
          <p class="text-brand-textSecondary mb-8 text-lg leading-relaxed">
            Stoward indexes your servers using our bot. Bring you new members, share your passions,
            and push your community further!
          </p>
          <div class="flex flex-wrap justify-center gap-[18px] md:justify-start">
            <a
              href="https://stoat.chat/bot/01KGD56A67XSS9HM1KXAYPJ62E"
              target="_blank"
              rel="noopener noreferrer"
              class="from-brand-teal to-brand-tealHover text-brand-page inline-block rounded-full bg-gradient-to-br px-8 py-4 text-base font-bold no-underline shadow-[0_10px_25px_rgba(77,182,172,0.2)] transition-all hover:scale-105 active:scale-95">
              Invite Stoward Bot
            </a>
          </div>
        </div>

        <div class="bg-brand-surface border-brand-border/40 relative flex w-full max-w-md flex-col gap-4 rounded-[28px] border-2 p-8 shadow-xl">
          <div class="text-brand-orange bg-brand-orange/10 w-fit rounded-xl p-3">
            <BiSolidInfoCircle size={28} />
          </div>
          <h3 class="text-xl font-bold">Web Dashboard Incoming</h3>
          <p class="text-brand-textSecondary text-sm leading-relaxed">
            I'm working on a full web-dashboard experience! Soon, you'll be able to customize your
            server description, tags and other things straight from this website!
          </p>
        </div>
      </section>

      <section class="px-[7%] pt-4 pb-24">
        <h2 class="text-brand-textPrimary mb-10 text-[32px] font-bold">Bot Commands & Setup</h2>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="bg-brand-surface border-brand-border/40 hover:border-brand-teal/50 flex flex-col justify-between rounded-[24px] border-2 p-6 shadow-sm transition-all">
            <div>
              <span class="text-brand-teal mb-2 block text-xs font-bold tracking-widest uppercase">
                Step 01
              </span>
              <h3 class="mb-3 text-lg font-bold">Add Your Server</h3>
              <p class="text-brand-textSecondary mb-5 text-sm leading-relaxed">
                Registers your community into our directory. Make sure your invite link is
                permanent!
              </p>
            </div>

            <div class="bg-brand-page border-brand-border/60 text-brand-orange relative flex items-center justify-between rounded-xl border p-3.5 font-mono text-xs">
              <span class="truncate pr-4">s!addserver [Invite_url]</span>
              <button
                onClick={() => handleCopy("s!addserver [Invite_url]", "add")}
                class="text-brand-textSecondary hover:text-brand-teal shrink-0 cursor-pointer transition-colors">
                <Show when={copiedText() === "add"} fallback={<BiRegularCopy size={18} />}>
                  <BiSolidCheckCircle size={18} class="text-brand-teal" />
                </Show>
              </button>
            </div>
          </div>

          <div class="bg-brand-surface border-brand-border/40 hover:border-brand-teal/50 flex flex-col justify-between rounded-[24px] border-2 p-6 shadow-sm transition-all">
            <div>
              <span class="text-brand-teal mb-2 block text-xs font-bold tracking-widest uppercase">
                Step 02
              </span>
              <h3 class="mb-3 text-lg font-bold">Grow Further</h3>
              <p class="text-brand-textSecondary mb-5 text-sm leading-relaxed">
                Pushes your position back to the top of the feed to attract brand new organic
                members.
              </p>
            </div>

            <div class="bg-brand-page border-brand-border/60 text-brand-orange relative flex items-center justify-between rounded-xl border p-3.5 font-mono text-xs">
              <span>s!bump</span>
              <button
                onClick={() => handleCopy("s!bump", "bump")}
                class="text-brand-textSecondary hover:text-brand-teal shrink-0 cursor-pointer transition-colors">
                <Show when={copiedText() === "bump"} fallback={<BiRegularCopy size={18} />}>
                  <BiSolidCheckCircle size={18} class="text-brand-teal" />
                </Show>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
