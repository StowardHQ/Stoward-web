export default function NotFound() {
  return (
    <section class="dark:bg-brand-page dark:text-brand-textPrimary flex min-h-screen flex-col items-center justify-center bg-[#FFF4E0] p-8 text-center font-sans text-[#C48A5B] antialiased md:p-12">
      <div class="relative mb-6 select-none">
        <h1 class="dark:text-brand-textSecondary/5 font-['Poppins','Nunito',sans-serif] text-9xl font-extrabold tracking-widest text-[#C48A5B]/10">
          404
        </h1>
      </div>

      <div class="mx-auto mb-8 max-w-md space-y-3">
        <h2 class="dark:text-brand-textPrimary font-['Poppins','Nunito',sans-serif] text-2xl font-bold text-[#C48A5B] md:text-3xl">
          Lost in the Forest!
        </h2>
        <p class="dark:text-brand-textSecondary font-medium text-[#C48A5B]/80">
          Stoward scouted high and low, but this page doesn't seem to exist. It might have scampered
          away from his grasp!
        </p>
      </div>

      <a
        href="/"
        class="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#4DB6AC] to-[#3aa197] px-6 py-3 font-['Poppins','Nunito',sans-serif] font-bold text-white shadow-lg shadow-[#4DB6AC]/30 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-[#4DB6AC]/40 active:scale-95">
        <span class="mr-2 transition-transform duration-200 group-hover:-translate-x-1"></span>
        Back to Discover
      </a>
    </section>
  );
}
