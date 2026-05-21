import { A } from "@solidjs/router";
import {
  BiRegularSearch,
  BiSolidChevronDown,
  BiSolidGroup,
  BiSolidHide,
  BiSolidShow,
  BiSolidTimeFive,
} from "solid-icons/bi";
import { FiActivity } from "solid-icons/fi";
import { createResource, createSignal, For, Show } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import ServerCard from "../components/ServerCard";

// TODO: This should be done elsewhere, not in Home
const fetchServers = async () => {
  const response = await fetch("/api/servers");
  if (!response.ok) throw new Error("Failed to scout servers");
  return response.json();
};

export default function Home() {
  const [servers] = createResource(fetchServers);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [allowNsfw, setAllowNsfw] = createSignal(false);
  const [sortBy, setSortBy] = createSignal("bumps");
  const [visibleLimit, setVisibleLimit] = createSignal(12);

  const filteredServers = () => {
    const list = servers();
    if (!list) return [];

    const filtered = list.filter((server) => {
      if (server.is_nsfw === 1 && !allowNsfw()) {
        return false;
      }

      const query = searchQuery().toLowerCase().trim();
      if (!query) return true;

      return (
        server.server_name?.toLowerCase().includes(query) ||
        server.description?.toLowerCase().includes(query)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy() === "members") {
        return (b.members || 0) - (a.members || 0);
      }

      const timeA = a.last_bumped
        ? new Date(
            a.last_bumped.includes("Z") || a.last_bumped.includes("+")
              ? a.last_bumped
              : `${a.last_bumped.replace(" ", "T")}Z`,
          ).getTime()
        : 0;
      const timeB = b.last_bumped
        ? new Date(
            b.last_bumped.includes("Z") || b.last_bumped.includes("+")
              ? b.last_bumped
              : `${b.last_bumped.replace(" ", "T")}Z`,
          ).getTime()
        : 0;
      return timeB - timeA;
    });
  };

  const displayedServers = () => {
    return filteredServers().slice(0, visibleLimit());
  };

  return (
    <div class="bg-brand-page text-brand-textPrimary min-h-screen font-sans">
      <style>{`
        .grid-item-move {
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .grid-item-enter-active, .grid-item-exit-active {
          transition: all 0.3s ease-out;
        }
        .grid-item-enter-from {
          opacity: 0;
          transform: scale(0.9) translateY(15px);
        }
        .grid-item-exit-to {
          opacity: 0;
          transform: scale(0.9);
        }
      `}</style>

      <section class="flex min-h-[85vh] flex-col items-center justify-between gap-[60px] px-[7%] py-20 md:flex-row">
        <div class="max-w-[600px] text-center md:text-left">
          <h1 class="line-tight mb-5 text-5xl leading-[1.05] font-bold md:text-[72px]">
            Discover Your <span class="text-brand-orange">Space</span>
          </h1>
          <p class="text-brand-textSecondary mb-[35px] text-xl">
            Find, join, and explore servers with Stoward. A hub for communities of every kind.
          </p>
          <div class="flex flex-wrap justify-center gap-[18px] md:justify-start">
            <div class="flex flex-wrap justify-center gap-[18px] md:justify-start">
              <A
                href="/add-server"
                class="from-brand-teal to-brand-tealHover text-brand-page inline-block rounded-full bg-gradient-to-br px-7 py-4 text-base font-bold no-underline shadow-[0_10px_25px_rgba(77,182,172,0.2)] transition-all hover:scale-105 active:scale-95">
                Add Your Server
              </A>

              <a
                href="https://stt.gg/VHS7Pe7k"
                target="_blank"
                rel="noopener noreferrer"
                class="border-brand-border text-brand-textPrimary hover:border-brand-teal/50 inline-block rounded-full border-2 bg-transparent px-7 py-4 text-base font-semibold no-underline transition-all hover:scale-105 active:scale-95">
                Support Server
              </a>
            </div>
          </div>
        </div>

        <div class="relative flex h-80 w-80 shrink-0 items-center justify-center md:h-[500px] md:w-[500px]">
          <img
            src="/Stoward.png"
            alt="Stoward the scout himself!"
            class="pointer-events-none h-full w-full animate-[float_3s_ease-in-out_infinite] object-contain select-none"
          />
        </div>
      </section>

      <section class="px-[7%] pt-10 pb-20">
        <div class="mb-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <h2 class="text-brand-textPrimary text-[38px] font-bold whitespace-nowrap">
            {sortBy() === "members" ? "Top Member Count" : "Recently Bumped"}
          </h2>

          <div class="flex flex-wrap items-center gap-4">
            <div class="relative flex min-w-[260px] flex-grow items-center md:flex-grow-0">
              <span class="text-brand-textSecondary/40 pointer-events-none absolute left-4">
                <BiRegularSearch size={20} />
              </span>
              <input
                type="text"
                placeholder="Search communities..."
                value={searchQuery()}
                onInput={(e) => {
                  setSearchQuery(e.currentTarget.value);
                  setVisibleLimit(12);
                }}
                class="bg-brand-surface border-brand-border/40 focus:border-brand-teal text-brand-textPrimary placeholder-brand-textSecondary/50 w-full rounded-2xl border-2 py-3 pr-5 pl-11 text-sm shadow-sm transition-all outline-none"
              />
            </div>

            <div class="bg-brand-surface border-brand-border/40 flex items-center rounded-2xl border-2 p-1.5 text-sm font-bold shadow-sm">
              <span class="text-brand-textSecondary/50 hidden px-2.5 text-xs tracking-wider uppercase sm:inline">
                Sort by:
              </span>

              <button
                onClick={() => setSortBy("bumps")}
                class={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 transition-all select-none ${
                  sortBy() === "bumps"
                    ? "bg-brand-teal text-brand-page shadow-sm"
                    : "text-brand-textSecondary hover:text-brand-textPrimary"
                }`}>
                <BiSolidTimeFive size={16} />
                <span>Bumps</span>
              </button>

              <button
                onClick={() => setSortBy("members")}
                class={`flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 transition-all select-none ${
                  sortBy() === "members"
                    ? "bg-brand-teal text-brand-page shadow-sm"
                    : "text-brand-textSecondary hover:text-brand-textPrimary"
                }`}>
                <BiSolidGroup size={16} />
                <span>Members</span>
              </button>

              <button
                disabled={true}
                title="Activity metric coming soon!"
                class="text-brand-textSecondary/25 flex cursor-not-allowed items-center gap-1.5 rounded-xl px-4 py-2 select-none">
                <FiActivity size={16} />
                <span>Activity</span>
              </button>
            </div>

            <button
              onClick={() => setAllowNsfw(!allowNsfw())}
              class={`flex cursor-pointer items-center gap-2 rounded-2xl border-2 px-5 py-3 text-sm font-bold transition-all select-none active:scale-95 ${
                allowNsfw()
                  ? "border-red-500/30 bg-red-500/10 text-red-500"
                  : "bg-brand-surface text-brand-textSecondary border-brand-border/40"
              }`}>
              <Show when={allowNsfw()} fallback={<BiSolidShow size={18} />}>
                <BiSolidHide size={18} />
              </Show>
              <span>NSFW</span>
            </button>
          </div>
        </div>

        <Show
          when={!servers.loading}
          fallback={
            <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              <For each={Array(3)}>
                {() => (
                  <div class="bg-brand-surface border-brand-border/20 flex h-[420px] animate-pulse flex-col gap-4 rounded-[28px] border-2 p-6 opacity-60">
                    <div class="bg-brand-elevated h-32 w-full rounded-2xl"></div>
                    <div class="bg-brand-elevated border-brand-surface -mt-12 h-16 w-16 rounded-2xl border-4"></div>
                    <div class="bg-brand-elevated mt-2 h-6 w-2/3 rounded-lg"></div>
                    <div class="bg-brand-elevated h-4 w-full rounded-lg"></div>
                    <div class="bg-brand-elevated h-4 w-5/6 rounded-lg"></div>
                    <div class="bg-brand-elevated mt-auto h-12 w-full rounded-2xl"></div>
                  </div>
                )}
              </For>
            </div>
          }>
          <Show
            when={!servers.error}
            fallback={
              <div class="text-brand-orange bg-brand-surface border-brand-brown/30 rounded-[28px] border-2 border-dashed p-8 py-20 text-center font-medium">
                Oops! Stoward is feeling a bit foggy right now. Try refreshing!
              </div>
            }>
            <div class="relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
              <TransitionGroup name="grid-item">
                <For
                  each={displayedServers()}
                  fallback={
                    <div class="text-brand-textSecondary col-span-full py-16 text-center font-medium">
                      No matching servers discovered.
                    </div>
                  }>
                  {(serverItem) => (
                    <div class="w-full">
                      <ServerCard server={serverItem} />
                    </div>
                  )}
                </For>
              </TransitionGroup>
            </div>

            <Show when={filteredServers().length > visibleLimit()}>
              <div class="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleLimit((prev) => prev + 12)}
                  class="bg-brand-surface border-brand-border/60 text-brand-textPrimary hover:border-brand-teal flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-bold shadow-md transition-all hover:scale-105 active:scale-95">
                  <span>Show More Listings</span>
                  <BiSolidChevronDown size={18} class="animate-bounce pt-0.5" />
                </button>
              </div>
            </Show>
          </Show>
        </Show>
      </section>
    </div>
  );
}
