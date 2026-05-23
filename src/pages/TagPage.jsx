import { useParams, A } from "@solidjs/router";
import { createResource, createSignal, For, Show } from "solid-js";
import { Meta, Title } from "@solidjs/meta";
import { TransitionGroup } from "solid-transition-group";
import {
  BiRegularArrowBack,
  BiRegularSearch,
  BiSolidCompass,
  BiSolidGroup,
  BiSolidTimeFive,
  BiSolidShow,
  BiSolidHide,
  BiSolidChevronDown,
} from "solid-icons/bi";
import { fetchServers } from "../api";
import ServerCard from "../components/ServerCard";

export default function TagPage() {
  const params = useParams();
  const [searchQuery, setSearchQuery] = createSignal("");
  const [allowNsfw, setAllowNsfw] = createSignal(false);
  const [sortBy, setSortBy] = createSignal("bumps");
  const [visibleLimit, setVisibleLimit] = createSignal(12);

  const [servers] = createResource(
    () => params.tag,
    async (tag) => {
      const allServers = await fetchServers();
      return allServers.filter(
        (s) => s.description && s.description.toLowerCase().includes(`#${tag.toLowerCase()}`),
      );
    },
  );

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

  const displayTag = () => params.tag.charAt(0).toUpperCase() + params.tag.slice(1);

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

      <main class="mx-auto w-full max-w-7xl px-[7%] py-12">
        <Title>{displayTag()} | Stoat Servers</Title>
        <Meta
          name="description"
          content={`Explore public Stoat servers tagged with #${params.tag}. Find your next space on Stoward!`}
        />

        <div class="mb-6">
          <A
            href="/"
            preload={true}
            class="text-brand-textSecondary/80 hover:text-brand-teal inline-flex items-center gap-2 text-sm font-semibold no-underline transition-colors">
            <BiRegularArrowBack size={18} />
            <span>Back to Discover</span>
          </A>
        </div>

        <div class="border-brand-border/20 mb-8 flex flex-col gap-6 border-b pb-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 class="text-brand-textPrimary text-3xl font-black tracking-tight sm:text-4xl">
              <span class="text-brand-teal">#{displayTag()}</span>
            </h1>
            <p class="text-brand-textSecondary/80 mt-1.5 text-sm font-medium">
              Showing Stoat communities matching #{displayTag()} tag!
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <div class="relative flex min-w-[260px] flex-grow items-center md:flex-grow-0">
              <span class="text-brand-textSecondary/40 pointer-events-none absolute left-4">
                <BiRegularSearch size={20} />
              </span>
              <input
                type="text"
                placeholder={`Search within #${params.tag}...`}
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
            <Show
              when={servers() && servers().length > 0}
              fallback={
                <div class="bg-brand-surface border-brand-border/20 mx-auto mt-12 flex max-w-xl flex-col items-center justify-center rounded-[28px] border-2 p-12 text-center shadow-md">
                  <div class="bg-brand-orange/10 text-brand-orange mb-4 rounded-full p-4">
                    <BiSolidCompass size={36} />
                  </div>
                  <h3 class="text-brand-textPrimary mb-2 text-xl font-bold">No servers found</h3>
                  <p class="text-brand-textSecondary mb-6 max-w-sm text-sm leading-relaxed">
                    Nobody has listed a server using{" "}
                    <span class="text-brand-orange font-semibold">#{params.tag}</span> yet. Be the
                    first to add one, or head back to check out other active categories!
                  </p>
                  <A
                    href="/"
                    class="bg-brand-teal text-brand-page hover:bg-brand-orange rounded-2xl px-6 py-3 font-bold no-underline shadow-sm transition-colors">
                    Explore Directory
                  </A>
                </div>
              }>
              <div class="relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                <TransitionGroup name="grid-item">
                  <For
                    each={displayedServers()}
                    fallback={
                      <div class="text-brand-textSecondary border-brand-border/40 bg-brand-surface/40 col-span-full mx-auto mt-6 w-full max-w-md rounded-[28px] border-2 border-dashed py-16 text-center font-medium">
                        <p class="text-brand-textPrimary mb-1 text-base font-semibold">
                          No matching results
                        </p>
                        <p class="text-sm opacity-80">
                          Try modifying your search or filters for this category.
                        </p>
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
        </Show>
      </main>
    </div>
  );
}
