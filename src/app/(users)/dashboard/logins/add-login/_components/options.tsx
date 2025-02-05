import React, { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import {
  RiInstagramLine,
  RiGoogleLine,
  RiFacebookBoxLine,
  RiDiscordLine,
  RiLinkedinLine,
  RiGithubLine,
  RiGitlabLine,
  RiTwitterXFill,
  RiMicrosoftFill,
  RiAppleFill,
  RiAmazonLine,
  RiFirefoxLine,
  RiChromeLine,
  RiStackOverflowLine,
  RiNpmjsLine,
  RiTrelloLine,
  RiSlackLine,
  RiNotionLine,
  RiCodepenLine,
  RiDropboxLine,
  RiDribbbleLine,
  RiBehanceLine,
  RiMediumLine,
  RiGooglePlayLine,
  RiAppStoreLine,
  RiUbuntuLine,
  RiPinterestLine,
  RiSnapchatLine,
  RiWhatsappLine,
  RiTelegramLine,
  RiSkypeLine,
  RiNetflixLine,
  RiSpotifyLine,
} from "@remixicon/react";

const items = [
  {
    value: "https://spotify.com",
    label: "Spotify",
    icon: RiSpotifyLine,
  },
  {
    value: "https://netflix.com",
    label: "Netflix",
    icon: RiNetflixLine,
  },
  {
    value: "https://skype.com",
    label: "Skype",
    icon: RiSkypeLine,
  },
  {
    value: "https://telegram.org",
    label: "Telegram",
    icon: RiTelegramLine,
  },
  {
    value: "https://whatsapp.com",
    label: "WhatsApp",
    icon: RiWhatsappLine,
  },
  {
    value: "https://snapchat.com",
    label: "Snapchat",
    icon: RiSnapchatLine,
  },
  {
    value: "https://pinterest.com",
    label: "Pinterest",
    icon: RiPinterestLine,
  },
  {
    value: "https://medium.com",
    label: "Medium",
    icon: RiMediumLine,
  },
  {
    value: "https://behance.net",
    label: "Behance",
    icon: RiBehanceLine,
  },
  {
    value: "https://dribbble.com",
    label: "Dribbble",
    icon: RiDribbbleLine,
  },
  {
    value: "https://ubuntu.com",
    label: "Ubuntu",
    icon: RiUbuntuLine,
  },
  {
    value: "https://apps.apple.com",
    label: "App Store",
    icon: RiAppStoreLine,
  },
  {
    value: "https://play.google.com",
    label: "Google Play",
    icon: RiGooglePlayLine,
  },
  {
    value: "https://instagram.com",
    label: "Instagram",
    icon: RiInstagramLine,
  },
  {
    value: "https://google.com",
    label: "Google",
    icon: RiGoogleLine,
  },
  {
    value: "https://facebook.com",
    label: "Facebook",
    icon: RiFacebookBoxLine,
  },
  {
    value: "https://discord.com",
    label: "Discord",
    icon: RiDiscordLine,
  },
  {
    value: "https://twitter.com",
    label: "Twitter",
    icon: RiTwitterXFill,
  },
  {
    value: "https://linkedin.com",
    label: "LinkedIn",
    icon: RiLinkedinLine,
  },
  {
    value: "https://github.com",
    label: "GitHub",
    icon: RiGithubLine,
  },
  {
    value: "https://gitlab.com",
    label: "GitLab",
    icon: RiGitlabLine,
  },
  {
    value: "https://microsoft.com",
    label: "Microsoft",
    icon: RiMicrosoftFill,
  },
  {
    value: "https://apple.com",
    label: "Apple",
    icon: RiAppleFill,
  },
  {
    value: "https://aws.amazon.com",
    label: "Amazon AWS",
    icon: RiAmazonLine,
  },
  {
    value: "https://stackoverflow.com",
    label: "Stack Overflow",
    icon: RiStackOverflowLine,
  },
  {
    value: "https://npmjs.com",
    label: "NPM",
    icon: RiNpmjsLine,
  },
  {
    value: "https://trello.com",
    label: "Trello",
    icon: RiTrelloLine,
  },
  {
    value: "https://slack.com",
    label: "Slack",
    icon: RiSlackLine,
  },
  {
    value: "https://notion.so",
    label: "Notion",
    icon: RiNotionLine,
  },
  {
    value: "https://codepen.io",
    label: "CodePen",
    icon: RiCodepenLine,
  },
  {
    value: "https://dropbox.com",
    label: "Dropbox",
    icon: RiDropboxLine,
  },
  {
    value: "https://mozilla.org",
    label: "Firefox",
    icon: RiFirefoxLine,
  },
  {
    value: "https://chrome.google.com",
    label: "Chrome",
    icon: RiChromeLine,
  },
];

interface OptionProps {
  value: string;
  setValue: (value: string) => void;
  setTitle?: (title: string) => void;
}

const Options = ({ value, setValue, setTitle }: OptionProps) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(
    null
  );
  const getSelectedIcon = () => {
    if (!selectedItem) return <></>;
    const Icon = selectedItem.icon;
    return <Icon className="h-5 w-5 text-muted-foreground mr-2" />;
  };

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setOpen(true);

    if (!newValue) {
      setSelectedItem(null);
      return;
    }

    const matchedItem = items.find((item) =>
      item.label.toLowerCase().includes(newValue.toLowerCase())
    );

    setSelectedItem(matchedItem || null);
  };

  return (
    <Command className="relative w-full overflow-visible">
      <CommandInput
        placeholder="https://example.com"
        container={cn(
          "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
        )}
        value={value}
        icon={getSelectedIcon()}
        onValueChange={handleValueChange}
      />
      {value && open && (
        <CommandList className="absolute z-50 w-full top-12 border border-input bg-background shadow-lg shadow-black/5 rounded-lg">
          <CommandEmpty>No service found.</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue);
                  setSelectedItem(item);
                  setTitle ? setTitle(item.label) : null;
                  setOpen(false);
                }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default Options;
