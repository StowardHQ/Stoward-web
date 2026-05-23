import { useParams, A } from "@solidjs/router";
import { createResource, Show, For } from "solid-js";
import { Meta, Title } from "@solidjs/meta";
import {
  BiSolidCheckCircle,
  BiSolidGroup,
  BiSolidTimeFive,
  BiSolidServer,
  BiRegularArrowBack,
} from "solid-icons/bi";
import { fetchSingleServer } from "../api";
import { extractTags, formatTimeAgo } from "../utils/helpers";

export default function ServerPage() {
  const params = useParams();
  const [server] = createResource(() => params.sid, fetchSingleServer);

  return (
    <div class="bg-brand-page text-brand-textPrimary relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden font-sans">
      <Show
        when={server()}
        fallback={
          <div class="w-full animate-pulse pt-12">
            <main class="relative z-10 mx-auto w-full max-w-5xl space-y-4 px-4 pb-32 sm:px-[7%] md:pb-24">
              <div class="bg-brand-surface/60 mb-2 h-5 w-32 rounded-lg"></div>

              <div class="bg-brand-surface border-brand-border/20 flex w-full flex-col rounded-[28px] border-2 p-6 shadow-xl sm:p-8">
                <div class="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div class="flex w-full flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
                    <div class="bg-brand-elevated border-brand-surface h-20 w-20 shrink-0 rounded-[22px] border-4 shadow-sm"></div>
                    <div class="flex w-full max-w-md flex-col items-center space-y-4 pt-2 sm:items-start">
                      <div class="bg-brand-textSecondary/20 h-7 w-3/4 rounded-xl"></div>
                      <div class="flex gap-4">
                        <div class="bg-brand-orange/10 h-6 w-24 rounded-lg"></div>
                        <div class="bg-brand-textSecondary/10 h-6 w-32 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-brand-textSecondary/10 mx-auto mt-2 h-5 w-32 rounded-lg md:absolute md:top-2 md:right-0 md:mx-0 md:mt-0"></div>
                </div>
                <hr class="border-brand-border/10 my-6" />
                <div class="space-y-3">
                  <div class="bg-brand-textSecondary/15 h-4 w-full rounded-md"></div>
                  <div class="bg-brand-textSecondary/15 h-4 w-11/12 rounded-md"></div>
                  <div class="bg-brand-textSecondary/15 h-4 w-4/5 rounded-md"></div>
                </div>
              </div>

              <div class="bg-brand-surface border-brand-border/20 hidden h-[84px] w-full rounded-[28px] border-2 shadow-xl md:block"></div>
            </main>
          </div>
        }>
        {(data) => {
          const tagsList = extractTags(data().description);
          const cleanDescription = data().description
            ? data().description.split("#")[0].trim()
            : "No description provided.";

          return (
            <>
              <Title>{data().server_name} | Stoat Servers</Title>
              <Meta name="description" content={cleanDescription.slice(0, 155)} />

              <div class="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden select-none">
                <Show
                  when={data().banner_url}
                  fallback={
                    <div class="absolute inset-0 flex items-center justify-center text-6xl opacity-[0.03] sm:text-9xl">
                      🐾 🍃 🐾 🍃 🐾
                    </div>
                  }>
                  <img
                    src={data().banner_url}
                    alt=""
                    class={`h-full w-full object-cover opacity-25 mix-blend-lighten brightness-75 filter ${
                      data().is_nsfw === 1 ? "scale-110 blur-3xl" : "blur-[4px]"
                    }`}
                  />
                </Show>
                <div class="from-brand-page via-brand-page/80 absolute inset-0 bg-gradient-to-t to-transparent"></div>
                <div class="bg-brand-page/40 absolute inset-0 backdrop-blur-[2px]"></div>
              </div>

              <main class="relative z-10 mx-auto flex w-full max-w-5xl flex-grow flex-col justify-center gap-4 px-4 pt-16 pb-32 sm:px-[7%] md:pb-24">
                <div class="self-start">
                  <A
                    href="/"
                    preload={true}
                    class="text-brand-textSecondary/80 hover:text-brand-teal inline-flex items-center gap-2 text-sm font-semibold no-underline drop-shadow-sm transition-colors">
                    <BiRegularArrowBack size={18} />
                    <span>Back to Discover</span>
                  </A>
                </div>

                <div class="bg-brand-surface/85 border-brand-border/20 relative flex w-full flex-col overflow-hidden rounded-[28px] border-2 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-8">
                  <div class="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div class="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
                      <div class="from-brand-orange to-brand-brown border-brand-surface relative h-20 w-20 shrink-0 overflow-hidden rounded-[22px] border-4 bg-gradient-to-br shadow-md">
                        <Show
                          when={data().icon_url}
                          fallback={
                            <div class="bg-brand-elevated flex h-full w-full items-center justify-center text-2xl">
                              <BiSolidServer class="text-brand-textSecondary/40" />
                            </div>
                          }>
                          <img
                            src={data().icon_url}
                            alt={`${data().server_name} icon`}
                            class={`h-full w-full object-cover ${
                              data().is_nsfw === 1
                                ? "pointer-events-none scale-110 blur-md select-none"
                                : ""
                            }`}
                          />
                        </Show>
                      </div>

                      <div class="space-y-2.5">
                        <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                          <h1 class="text-brand-textPrimary text-2xl font-bold tracking-tight sm:text-3xl">
                            {data().server_name}
                          </h1>

                          <div class="flex items-center gap-2">
                            <Show when={data().is_verified === 1}>
                              <span
                                title="Verified Server"
                                class="text-brand-teal shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                                <BiSolidCheckCircle size={22} />
                              </span>
                            </Show>

                            <Show when={data().is_nsfw === 1}>
                              <span class="rounded-lg border border-red-500/40 bg-red-500/10 px-2.5 py-0.5 text-xs font-black tracking-wider text-red-500 uppercase select-none">
                                NSFW
                              </span>
                            </Show>
                          </div>
                        </div>

                        <div class="text-brand-textSecondary/70 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold select-none sm:justify-start">
                          <span class="bg-brand-orange/10 text-brand-orange flex items-center gap-1.5 rounded-lg px-2.5 py-1">
                            <BiSolidGroup size={13} class="text-brand-orange" />
                            {data().members?.toLocaleString() || 0} Members
                          </span>
                        </div>
                      </div>
                    </div>

                    <div class="text-brand-textSecondary/70 mt-2 flex items-center justify-center gap-1 text-xs font-semibold md:absolute md:top-2 md:right-0 md:mt-0">
                      <BiSolidTimeFive size={14} class="text-brand-teal/70" />
                      <span>Bumped {formatTimeAgo(data().last_bumped)}</span>
                    </div>
                  </div>

                  <hr class="border-brand-border/20 my-6" />

                  <div class="mb-6">
                    <p class="text-brand-textSecondary text-sm leading-relaxed whitespace-pre-wrap sm:text-base">
                      {cleanDescription}
                    </p>
                  </div>

                  <Show when={tagsList.length > 0}>
                    <div class="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                      <For each={tagsList}>
                        {(tag) => (
                          <A
                            href={`/tag/${tag.toLowerCase()}`}
                            class="bg-brand-elevated text-brand-textSecondary border-brand-border hover:border-brand-teal hover:text-brand-teal rounded-full border px-3.5 py-1 text-xs font-medium tracking-wide whitespace-nowrap no-underline transition-colors duration-200">
                            #{tag}
                          </A>
                        )}
                      </For>
                    </div>
                  </Show>
                </div>

                <div class="bg-brand-surface/90 border-brand-border/20 md:bg-brand-surface/85 md:border-brand-border/20 fixed right-0 bottom-0 left-0 z-50 border-t p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] backdrop-blur-lg md:relative md:rounded-[28px] md:border-2 md:p-5 md:shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:backdrop-blur-xl">
                  <div class="mx-auto w-full max-w-5xl md:px-0">
                    <a
                      href={data().invite_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="bg-brand-teal text-brand-page hover:bg-brand-orange block w-full rounded-2xl border-none px-8 py-3.5 text-center font-bold tracking-wider uppercase no-underline shadow-[0_4px_14px_rgba(77,182,172,0.2)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_4px_14px_rgba(255,169,77,0.2)] active:scale-98">
                      Join Server
                    </a>
                  </div>
                </div>
              </main>
            </>
          );
        }}
      </Show>
    </div>
  );
}
