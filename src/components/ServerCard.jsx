import {
  BiSolidCheckCircle,
  BiSolidChevronDown,
  BiSolidChevronUp,
  BiSolidGroup,
  BiSolidTimeFive,
} from "solid-icons/bi";
import { For, Show, createEffect, createSignal, onMount } from "solid-js";

export default function ServerCard(props) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [hasOverflow, setHasOverflow] = createSignal(false);
  let textRef;

  const getTags = () => {
    if (!props.server.description) return [];
    const normalizedDescription = props.server.description.normalize('NFKC');
    const tags = normalizedDescription.match(/#\w+/g);
    return tags 
      ? tags.map((tag) => {
          const cleanTag = tag.replace("#", "");
          return cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1);
        }).slice(0, 3) 
      : [];
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "recently";

    const now = new Date();
    const normalizedDateString =
      dateString.includes("Z") || dateString.includes("+")
        ? dateString
        : `${dateString.replace(" ", "T")}Z`;

    const then = new Date(normalizedDateString);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 5) return "just now";
    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    return `${Math.floor(hours / 24)}d ago`;
  };

  const checkOverflow = () => {
    if (textRef) {
      setHasOverflow(textRef.scrollHeight > textRef.clientHeight);
    }
  };

  onMount(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
  });

  createEffect(() => {
    if (props.server.description) {
      checkOverflow();
    }
  });

  return (
    <div class="bg-brand-surface hover:border-brand-teal group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] border-2 border-transparent font-sans shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all duration-250 ease-out hover:-translate-y-2">
      <div class="from-brand-orange/15 to-brand-brown/15 relative h-32 w-full shrink-0 overflow-hidden bg-gradient-to-br">
        <Show
          when={props.server.banner_url}
          fallback={
            <div class="absolute inset-0 flex items-center justify-center text-4xl opacity-20 select-none">
              🐾 🍃 🐾
            </div>
          }>
          <img
            src={props.server.banner_url}
            alt={`${props.server.server_name} banner`}
            class={`h-full w-full object-cover transition-all duration-500 ${
              props.server.is_nsfw === 1
                ? "pointer-events-none scale-110 blur-xl select-none group-hover:scale-105 group-hover:blur-none"
                : "group-hover:scale-105"
            }`}
            loading="lazy"
          />
        </Show>
        <div class="from-brand-surface/80 absolute inset-0 bg-gradient-to-t to-transparent"></div>
      </div>

      <div class="relative flex flex-grow flex-col p-6 pt-0">
        <div class="from-brand-orange to-brand-brown border-brand-surface relative z-10 -mt-9 mb-4 h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[22px] border-4 bg-gradient-to-br shadow-md">
          <Show when={props.server.icon_url}>
            <img
              src={props.server.icon_url}
              alt={`${props.server.server_name} icon`}
              class={`h-full w-full object-cover transition-all duration-500 ${
                props.server.is_nsfw === 1
                  ? "pointer-events-none scale-110 blur-md select-none group-hover:scale-100 group-hover:blur-none"
                  : ""
              }`}
              loading="lazy"
            />
          </Show>
        </div>

        <div class="mb-2 flex shrink-0 items-center justify-between">
          <div class="flex items-center gap-1.5 truncate pr-2">
            <h3
              class="text-brand-textPrimary truncate text-xl font-bold"
              title={props.server.server_name}>
              {props.server.server_name}
            </h3>
            <Show when={props.server.is_verified === 1}>
              <span
                title="Verified Server"
                class="text-brand-teal shrink-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                <BiSolidCheckCircle size={18} />
              </span>
            </Show>
          </div>

          <span class="bg-brand-orange/10 text-brand-orange flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold">
            <BiSolidGroup size={12} class="text-brand-orange" />
            {props.server.members}
          </span>
        </div>

        <div class="text-brand-textSecondary/70 mb-3 flex shrink-0 items-center gap-4 text-xs select-none">
          <div class="flex items-center gap-1">
            <BiSolidTimeFive size={13} class="text-brand-teal/70" />
            <span>Bumped {formatTimeAgo(props.server.last_bumped)}</span>
          </div>
        </div>

        <div
          class="mb-1 shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
          style={isOpen() ? { height: "auto" } : { "min-h": "68px", "max-h": "68px" }}>
          <p
            ref={textRef}
            class="text-brand-textSecondary text-sm leading-relaxed"
            style={
              isOpen()
                ? {}
                : {
                    display: "-webkit-box",
                    "-webkit-line-clamp": "3",
                    "-webkit-box-orient": "vertical",
                    overflow: "hidden",
                  }
            }>
            {props.server.description
              ? props.server.description.split("#")[0].trim()
              : "No description provided."}
          </p>
        </div>

        <div class="mb-2 flex h-6 shrink-0 items-center justify-center">
          <Show when={hasOverflow()}>
            <button
              onClick={() => setIsOpen(!isOpen())}
              aria-label={isOpen() ? "Collapse description" : "Expand description"}
              class="text-brand-textSecondary/50 hover:text-brand-teal hover:bg-brand-elevated/40 flex cursor-pointer items-center justify-center rounded-full p-1 transition-colors">
              <Show when={isOpen()} fallback={<BiSolidChevronDown size={20} />}>
                <BiSolidChevronUp size={20} />
              </Show>
            </button>
          </Show>
        </div>

        <div class="mb-4 flex flex-grow items-end overflow-hidden">
          <div class="flex w-full flex-wrap gap-2">
            <For each={getTags()}>
              {(tag) => (
                <span class="bg-brand-elevated text-brand-textSecondary border-brand-border rounded-full border px-3 py-1 text-xs font-medium tracking-wide whitespace-nowrap">
                  {tag}
                </span>
              )}
            </For>
          </div>
        </div>

        <div class="mt-auto shrink-0">
          <a
            href={props.server.invite_link}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-brand-teal text-brand-page hover:bg-brand-orange block w-full cursor-pointer rounded-2xl border-none py-3.5 text-center font-bold no-underline shadow-[0_4px_14px_rgba(77,182,172,0.2)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_4px_14px_rgba(255,169,77,0.2)] active:scale-98">
            Join Server
          </a>
        </div>
      </div>
    </div>
  );
}
