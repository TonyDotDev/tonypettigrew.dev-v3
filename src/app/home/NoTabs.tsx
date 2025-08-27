import { JSX } from "react";
import { VscVscode } from "react-icons/vsc";
import { Typography } from "@/app/components/typography";
import { BsShift, BsAlt, BsCommand } from "react-icons/bs";

const CommandLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Typography
      variant="h6"
      as="p"
      color="quaternary"
      className="text-right"
      size="sm"
    >
      {children}
    </Typography>
  );
};

interface IconCommandKey {
  key: JSX.Element;
  text: string;
}

interface StringCommandKey {
  key: string;
}
type CommandKey = IconCommandKey | StringCommandKey;

const CommandKeys = ({ keys }: { keys: CommandKey[] }) => {
  return (
    <Typography
      variant="h6"
      as="p"
      color="primary"
      className="flex items-center gap-1 text-left sm:text-xs"
    >
      {keys.map((commandKey) => {
        const label = "text" in commandKey ? commandKey.text : commandKey.key;

        return (
          <span
            key={label}
            aria-label={label}
            className="bg-foreground-tertiary/20 flex h-5 w-5 items-center justify-center rounded font-mono"
          >
            {commandKey.key}
          </span>
        );
      })}
    </Typography>
  );
};

export const NoTabs = () => {
  return (
    <div className="flex h-[calc(100vh-180px)] flex-col items-center justify-center">
      <VscVscode className="mb-0 h-40 w-40 flex-shrink-0 text-black/30 sm:h-60 sm:w-60 md:h-[350px] md:w-[350px]" />
      <div className="text-foreground-quaternary grid grid-cols-2 gap-x-3 gap-y-5 text-sm">
        <CommandLabel>Show Explorer</CommandLabel>
        <CommandKeys
          keys={[
            { key: <BsShift />, text: "Shift" },
            { key: <BsAlt />, text: "Alt" },
            { key: "E", text: "E" },
          ]}
        />

        <CommandLabel>Show Search</CommandLabel>
        <CommandKeys
          keys={[
            { key: <BsShift />, text: "Shift" },
            { key: <BsAlt />, text: "Alt" },
            { key: "S", text: "S" },
          ]}
        />
        <CommandLabel>Show Repositories</CommandLabel>
        <CommandKeys
          keys={[
            { key: <BsShift />, text: "Shift" },
            { key: <BsAlt />, text: "Alt" },
            { key: "G" },
          ]}
        />
        <CommandLabel>Show AI Chat</CommandLabel>
        <CommandKeys
          keys={[
            { key: <BsShift />, text: "Shift" },
            { key: <BsAlt />, text: "Alt" },
            { key: "C" },
          ]}
        />
        <CommandLabel>Show Spotify Playlists</CommandLabel>
        <CommandKeys
          keys={[
            { key: <BsShift />, text: "Shift" },
            { key: <BsAlt />, text: "Alt" },
            { key: "S" },
          ]}
        />
        <CommandLabel>Refresh Page (Reset Tabs)</CommandLabel>
        <CommandKeys
          keys={[{ key: <BsCommand />, text: "Command" }, { key: "R" }]}
        />
      </div>
    </div>
  );
};
