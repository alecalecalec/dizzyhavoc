export default function Error404() {
  return (
    <>
      <div class="h-screen sm:mb-[230px] mb-[100px] flex flex-col justify-center items-center">
        <img
          class="invert-0 dark:invert"
          src="/misc/1.gif"
          alt="404 image"
          width="450"
        />
        <h1 class="sm:text-4xl text-2xl dark:text-[#d2d2d2] text-[#282828] font-bold">
          404 - Page not found
        </h1>
        <p class="my-4 dark:text-[#d2d2d2] text-[#282828]">
          The page you were looking for doesn't exist.
        </p>
        <a href="/" class="underline dark:text-[#d2d2d2] text-[#282828]">
          Go back home
        </a>
      </div>
    </>
  );
}
