import { Meta, Title } from "@solidjs/meta";
import { A } from "@solidjs/router";
import {
  BiRegularArrowBack,
  BiRegularCopy,
  BiRegularSearch,
  BiRegularX,
  BiSolidCheckCircle,
  BiSolidMessageSquareDetail,
  BiSolidTerminal,
} from "solid-icons/bi";
import { createEffect, createSignal, For, onCleanup, Show } from "solid-js";

function CopyButton(props) {
  return (
    <button
      onClick={props.onClick}
      class="text-brand-textSecondary hover:text-brand-teal -m-2 shrink-0 cursor-pointer p-2 transition-colors"
      aria-label="Copy to clipboard">
      <Show when={props.isCopied} fallback={<BiRegularCopy size={props.size || 16} />}>
        <BiSolidCheckCircle size={props.size || 16} class="text-brand-teal" />
      </Show>
    </button>
  );
}

export default function DocsPage() {
  const [copiedText, setCopiedText] = createSignal("");
  const [activeTab, setActiveTab] = createSignal("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [activeSection, setActiveSection] = createSignal("add-server");
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const commands = [
    {
      id: "add-server",
      name: "Add Server",
      syntax: "s!addserver <invite_url> [nsfw]",
      desc: "Lists your Stoat.chat server on Stoward.",
      required: "<invite_url>",
      optional: "[nsfw]",
      type: "setup",
    },
    {
      id: "bump-server",
      name: "Bump Server",
      syntax: "s!bump",
      desc: "Pushes your server to the top of Stoward.",
      required: null,
      optional: null,
      type: "utility",
    },
    {
      id: "ping",
      name: "Ping",
      syntax: "s!ping",
      desc: "Displays ping and other information about the bot/platform",
      required: null,
      optional: null,
      type: "utility",
    },
    {
      id: "edit-server",
      name: "Edit Server",
      syntax: "s!editserver [invite_url] [sfw / nsfw]",
      desc: "Changes your invite or updates age rating.",
      required: null,
      optional: "[invite_url].",
      type: "setup",
    },
    {
      id: "delist-server",
      name: "Delist Server",
      syntax: "s!delist <server_name>",
      desc: "Permanently deletes your server fom Stoward",
      required: "<server_name>.",
      optional: null,
      type: "setup",
    },
  ];

  const apiEndpoints = [
    {
      id: "api-stats",
      method: "GET",
      path: "/api/stats",
      name: "Global Stats",
      desc: "Returns platform counts, tracking total indexed communities and members.",
      responseExample: { total_servers: 9, total_members: 2307 },
    },
    {
      id: "api-servers-list",
      method: "GET",
      path: "/api/servers",
      name: "List Servers",
      desc: "Returns a collection of indexed server listings.",
      responseExample: [
        {
          id: 12,
          server_id: "01KRY99VV8D8ZKXWD0XND5CMRX",
          server_name: "Stoward",
          icon_url:
            "https://cdn.stoatusercontent.com/icons/EG3dSM2t4du4SSIwVEJd_YPHeytlAieje4TWaj_rKf?max_side=256",
          banner_url:
            "https://cdn.stoatusercontent.com/banners/fvHt4jrvwuP6Tt00EYVoEx4TSuPKlYPK2C6rX8M0nD",
          invite_link: "https://stoat.chat/invite/RTJksPKe",
          members: 14,
          description:
            "Discover communities worth joining with Stoward! the hub for finding, exploring, and growing Stoat servers.\n\nWhether you're building a new community or searching for your next one, Stoward helps you discover active, unique servers across every category.\n\nJoin for support, updates, feature previews or socializing! \n\n#support #stoward #stoat #community #growth #discover",
          is_verified: 1,
          is_nsfw: 0,
          owner: "Asraye",
          owner_id: "01H72THN43HSSYMZY81249J6GP",
          added_on: "2026-05-18 20:46:18",
          last_bumped: "2026-05-23 18:12:04",
        },
      ],
    },
    {
      id: "api-server-single",
      method: "GET",
      path: "/api/servers/:sid",
      name: "Get Server",
      desc: "Retrieves data for a specific server.",
      responseExample: {
        id: 12,
        server_id: "01KRY99VV8D8ZKXWD0XND5CMRX",
        server_name: "Stoward",
        icon_url:
          "https://cdn.stoatusercontent.com/icons/EG3dSM2t4du4SSIwVEJd_YPHeytlAieje4TWaj_rKf?max_side=256",
        banner_url:
          "https://cdn.stoatusercontent.com/banners/fvHt4jrvwuP6Tt00EYVoEx4TSuPKlYPK2C6rX8M0nD",
        invite_link: "https://stoat.chat/invite/RTJksPKe",
        members: 14,
        description:
          "Discover communities worth joining with Stoward! the hub for finding, exploring, and growing Stoat servers.\n\nWhether you're building a new community or searching for your next one, Stoward helps you discover active, unique servers across every category.\n\nJoin for support, updates, feature previews or socializing! \n\n#support #stoward #stoat #community #growth #discover",
        is_verified: 1,
        is_nsfw: 0,
        owner: "Asraye",
        owner_id: "01H72THN43HSSYMZY81249J6GP",
        added_on: "2026-05-18 20:46:18",
        last_bumped: "2026-05-23 18:12:04",
      },
    },
  ];

  createEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px" },
    );

    [...commands, ...apiEndpoints].forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    onCleanup(() => observer.disconnect());
  });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedText(key);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const filteredCommands = () =>
    commands.filter(
      (cmd) =>
        (activeTab() === "all" || cmd.type === activeTab()) &&
        (!searchQuery() ||
          [cmd.name, cmd.desc, cmd.syntax].some((s) =>
            s.toLowerCase().includes(searchQuery().toLowerCase()),
          )),
    );

  const filteredApi = () =>
    apiEndpoints.filter(
      (api) =>
        !searchQuery() ||
        [api.path, api.desc, api.method, api.name].some((s) =>
          s.toLowerCase().includes(searchQuery().toLowerCase()),
        ),
    );

  return (
    <div class="bg-brand-page text-brand-textPrimary flex min-h-screen w-full flex-col scroll-smooth font-sans md:flex-row">
      <Title>Documentation | Stoward</Title>
      <Meta name="description" content="Official documentation for Stoward." />

      <div class="fixed bottom-6 left-1/2 z-50 w-[max-content] -translate-x-1/2 md:hidden">
        <nav class="bg-brand-page/90 border-brand-border/60 flex items-center gap-1 rounded-full border p-1.5 shadow-2xl backdrop-blur-xl">
          <a
            href="#bot-commands"
            class={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
              activeSection() === "bot-commands" || commands.some((c) => c.id === activeSection())
                ? "bg-brand-teal scale-105 text-white shadow-lg"
                : "text-brand-textSecondary opacity-70"
            }`}>
            <BiSolidMessageSquareDetail size={18} />
            <span class="text-[10px] font-bold">Bot</span>
          </a>
          <a
            href="#public-api"
            class={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
              activeSection() === "public-api" || apiEndpoints.some((a) => a.id === activeSection())
                ? "bg-brand-orange scale-105 text-white shadow-lg"
                : "text-brand-textSecondary opacity-70"
            }`}>
            <BiSolidTerminal size={18} />
            <span class="text-[10px] font-bold">API</span>
          </a>
          <div class="bg-brand-border/30 mx-1 h-6 w-[1px]" />
          <button
            onClick={() => setIsMenuOpen(true)}
            class="text-brand-textSecondary hover:bg-brand-surface flex h-9 w-9 items-center justify-center rounded-full">
            <BiRegularSearch size={20} />
          </button>
        </nav>
      </div>

      <aside
        class={`bg-brand-page border-brand-border/40 md:bg-brand-surface/30 fixed inset-x-0 bottom-0 z-[60] flex max-h-[85vh] transform flex-col rounded-t-3xl border-t p-6 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:z-40 md:h-screen md:w-72 md:translate-y-0 md:rounded-none md:border-t-0 md:border-r ${isMenuOpen() ? "translate-y-0 shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)]" : "translate-y-full md:translate-y-0"} `}>
        <div class="mb-6 flex items-center justify-between md:hidden">
          <span class="text-sm font-bold">Index</span>
          <button onClick={() => setIsMenuOpen(false)} class="-mr-2 p-2">
            <BiRegularX size={24} />
          </button>
        </div>

        <div class="flex h-full flex-col">
          <div class="mb-8 hidden md:block">
            <A
              href="/"
              class="text-brand-textSecondary hover:text-brand-teal inline-flex items-center gap-2 text-xs font-semibold transition-colors">
              <BiRegularArrowBack size={14} /> Back to Discover
            </A>
          </div>

          <div class="relative mb-8">
            <BiRegularSearch size={16} class="text-brand-textSecondary/60 absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery()}
              onInput={(e) => setSearchQuery(e.target.value)}
              class="bg-brand-page/50 border-brand-border/40 focus:border-brand-teal/60 w-full rounded-xl border py-2.5 pr-4 pl-9 text-sm focus:outline-none"
            />
          </div>

          <nav class="custom-scrollbar flex-1 space-y-8 overflow-y-auto pr-2">
            <div class="space-y-1">
              <div class="text-brand-textSecondary/40 px-2 pb-2 text-[10px] font-black tracking-widest uppercase">
                Bot Commands
              </div>
              <For each={commands}>
                {(cmd) => (
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    href={`#${cmd.id}`}
                    class={`block rounded-lg px-2 py-2 text-xs transition-all duration-200 ${activeSection() === cmd.id ? "text-brand-teal bg-brand-teal/10 border-brand-teal border-l-2 pl-3 font-bold" : "text-brand-textSecondary/70 hover:text-brand-teal hover:bg-brand-surface/50"}`}>
                    {cmd.name}
                  </a>
                )}
              </For>
            </div>

            <div class="space-y-1">
              <div class="text-brand-textSecondary/40 px-2 pb-2 text-[10px] font-black tracking-widest uppercase">
                API Reference
              </div>
              <For each={apiEndpoints}>
                {(api) => (
                  <a
                    onClick={() => setIsMenuOpen(false)}
                    href={`#${api.id}`}
                    class={`block rounded-lg px-2 py-2 text-xs transition-all duration-200 ${activeSection() === api.id ? "text-brand-orange bg-brand-orange/10 border-brand-orange border-l-2 pl-3 font-bold" : "text-brand-textSecondary/70 hover:text-brand-orange hover:bg-brand-surface/50"}`}>
                    {api.name}
                  </a>
                )}
              </For>
            </div>
          </nav>
        </div>
      </aside>

      <main class="max-w-4xl flex-1 space-y-12 px-5 py-8 pb-32 md:space-y-20 md:px-12 md:py-16 md:pb-16">
        <header class="space-y-3">
          <h1 class="text-3xl leading-tight font-extrabold tracking-tight md:text-5xl">
            Documentation
          </h1>
          <p class="text-brand-textSecondary max-w-2xl text-base leading-relaxed md:text-lg">
            Everything you need to add your community to Stoward, and (for devs) utilize our API!.
          </p>
        </header>
        <Show when={filteredCommands().length > 0}>
          <section id="bot-commands" class="scroll-mt-20 space-y-6">
            <div class="border-brand-border/20 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 class="flex items-center gap-2 text-xl font-bold md:text-2xl">
                <BiSolidMessageSquareDetail class="text-brand-teal" size={22} /> Commands
              </h2>
              <div class="bg-brand-surface border-brand-border/40 flex rounded-xl border p-1 text-[10px] font-bold">
                <For each={["all", "setup", "utility"]}>
                  {(tab) => (
                    <button
                      onClick={() => setActiveTab(tab)}
                      class={`rounded-lg px-3 py-1.5 uppercase transition-all ${activeTab() === tab ? "bg-brand-teal text-white shadow-sm" : "text-brand-textSecondary"}`}>
                      {tab}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6">
              <For each={filteredCommands()}>
                {(cmd) => (
                  <div
                    id={cmd.id}
                    class="bg-brand-surface/40 border-brand-border/30 hover:border-brand-teal/30 scroll-mt-24 space-y-4 rounded-2xl border p-5 transition-colors md:p-8">
                    <div class="flex items-start justify-between">
                      <div>
                        <h3 class="text-brand-textPrimary text-lg font-bold">{cmd.name}</h3>
                        <p class="text-brand-textSecondary mt-1 text-sm">{cmd.desc}</p>
                      </div>
                      <span class="bg-brand-page border-brand-border/40 text-brand-textSecondary rounded border px-2 py-0.5 text-[9px] font-black tracking-wider uppercase">
                        {cmd.type}
                      </span>
                    </div>

                    <div class="bg-brand-page/80 border-brand-border/40 text-brand-orange flex items-center justify-between gap-3 overflow-hidden rounded-xl border p-4 font-mono text-xs">
                      <span class="truncate">{cmd.syntax}</span>
                      <CopyButton
                        onClick={() => handleCopy(cmd.syntax, cmd.name)}
                        isCopied={copiedText() === cmd.name}
                      />
                    </div>

                    <Show when={cmd.required || cmd.optional}>
                      <div class="border-brand-border/10 mt-4 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
                        <Show when={cmd.required}>
                          <div class="space-y-1">
                            <span class="text-[10px] font-black tracking-widest text-red-400/80 uppercase">
                              Required
                            </span>
                            <p class="text-brand-textSecondary text-xs leading-relaxed">
                              {cmd.required}
                            </p>
                          </div>
                        </Show>
                        <Show when={cmd.optional}>
                          <div class="space-y-1">
                            <span class="text-brand-teal/80 text-[10px] font-black tracking-widest uppercase">
                              Optional
                            </span>
                            <p class="text-brand-textSecondary text-xs leading-relaxed">
                              {cmd.optional}
                            </p>
                          </div>
                        </Show>
                      </div>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </section>
        </Show>

        <Show when={filteredApi().length > 0}>
          <section id="public-api" class="scroll-mt-20 space-y-6">
            <div class="border-brand-border/20 border-b pb-4">
              <h2 class="flex items-center gap-2 text-xl font-bold md:text-2xl">
                <BiSolidTerminal class="text-brand-orange" size={22} /> API Refernce
              </h2>
            </div>

            <div class="space-y-8">
              <For each={filteredApi()}>
                {(api) => (
                  <div
                    id={api.id}
                    class="bg-brand-surface/40 border-brand-border/30 hover:border-brand-orange/30 scroll-mt-24 space-y-5 rounded-2xl border p-5 transition-colors md:p-8">
                    <div class="flex flex-col gap-3">
                      <div class="flex items-center gap-3">
                        <span class="rounded-lg border border-green-500/20 bg-green-600/20 px-2.5 py-1 text-[11px] font-black text-green-400">
                          {api.method}
                        </span>
                        <span class="font-mono text-sm font-bold opacity-80">{api.path}</span>
                      </div>
                      <h3 class="text-brand-textPrimary font-bold">{api.name}</h3>
                    </div>
                    <p class="text-brand-textSecondary text-sm leading-relaxed">{api.desc}</p>
                    <div class="space-y-2">
                      <span class="text-brand-textSecondary/60 ml-1 text-[10px] font-bold uppercase">
                        Example Response
                      </span>
                      <pre class="bg-brand-page/80 border-brand-border/40 overflow-x-auto rounded-xl border p-5 font-mono text-[11px] leading-normal">
                        {JSON.stringify(api.responseExample, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </section>
        </Show>
      </main>

      <Show when={isMenuOpen()}>
        <div
          onClick={() => setIsMenuOpen(false)}
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
        />
      </Show>
    </div>
  );
}
