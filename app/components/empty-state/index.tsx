export function EmptyState() {
  return (
    <div className="grid grid-cols-1">
      <div
        className={`col-span-1 text-2xl bg-amber-50 lg:dark:bg-zinc-800/30 space-y-2 fixed left-0 top-0 w-full p-8 justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border dark:bg-zinc-800/30 dark:from-inherit`}
      >
        <p>
          Welcome! This is a starting point for your personal Vercelian info
          page. <br />
          Start by visiting{" "}
          <a
            href="https://github.com/dddiggory/vercelians-can-ship#welcome-vercelian"
            target="_blank"
            className="underline text-blue-800 dark:text-blue-300"
          >
            the Template repo on Github
          </a>
          . Follow the instructions in the Readme to make your own copy and
          deploy it to Vercel.
        </p>
        <p className="pt-3">
          For some personalized starter content, go to{" "}
          <code className="font-mono font-bold">app/page.tsx</code> and insert
          your Github Username into the slot on Line 1. <br />
          Happy shipping! 🚢
        </p>
      </div>
    </div>
  );
}
