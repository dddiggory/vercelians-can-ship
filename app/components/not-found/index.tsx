import Link from "next/link";

export function NotFound({username}: {username: string}) {
  return (
    <div className="grid grid-cols-1">
      <div
        className={`col-span-1 text-2xl bg-amber-50 space-y-2 fixed left-0 top-0 w-full p-8 justify-center border-b border-gray-300 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto  lg:rounded-xl lg:border dark:bg-zinc-800/30 dark:from-inherit`}
      >
        <p>
          Profile not found! Are you sure {username} is your correct GitHub
          Username?
        </p>
        <p>
          Check{" "}
          <Link
            href="https://github.com/settings/profile"
            className="underline text-blue-800 dark:text-blue-300"
            target="_blank"
          >
            https://github.com/settings/profile
          </Link>{" "}
          to confirm, then update it at the top of{" "}
          <code className="font-mono font-bold">app/page.tsx</code>.
        </p>
      </div>
    </div>
  );
}
