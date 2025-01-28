"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Pointer } from "@/components/global/floating-mouse";
import { cn } from "@/lib/utils";
import { Files, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

const PasswordGenerator = () => {
  const [value, setValue] = useState([25]);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeMixedCase, setIncludeMixedCase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);

  const max = 100;
  const skipInterval = 10;
  const ticks = [...Array(max + 1)].map((_, i) => i);

  const generatePassword = () => {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let charPool = "";
    if (includeLetters) charPool += letters;
    if (includeMixedCase) charPool += upperCase;
    if (includeNumbers) charPool += numbers;
    if (includeSymbols) charPool += symbols;

    if (!charPool) {
      setPassword("");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < value[0]; i++) {
      const randomIndex = Math.floor(Math.random() * charPool.length);
      newPassword += charPool[randomIndex];
    }

    setPassword(newPassword);
    setCopyStatus(false);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => setCopyStatus(true))
        .catch(() => setCopyStatus(false));
    }
  };

  useEffect(() => {
    generatePassword();
  }, [value, includeLetters, includeMixedCase, includeNumbers, includeSymbols]);

  const handleSliderChange = (newValue: number[]) => {
    if (newValue[0] >= 10) {
      setValue([newValue[0]]);
    }
  };

  const handleSwitchChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    value: boolean
  ) => {
    const options = [
      includeLetters,
      includeMixedCase,
      includeNumbers,
      includeSymbols,
    ];
    const trueCount = options.filter(Boolean).length;

    if (trueCount === 1 && !value) {
      return;
    }

    setter(value);
  };

  const getPasswordFontSize = () => {
    const length = password.length;
    if (length <= 25) {
      return "20px";
    }
    const minFontSize = 7;
    const maxFontSize = 20;
    const maxLength = 100;
    const minLength = 25;
    const fontSize =
      maxFontSize -
      (((length - minLength) * (maxFontSize - minFontSize)) /
        (maxLength - minLength)) *
        1.5;
    return `${Math.max(minFontSize, fontSize)}px`;
  };

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak password";
    if (score === 3) return "Average password";
    return "Strong password";
  };

  return (
    <div className="flex flex-col gap-4 p-5 h-full">
      <Pointer
        onClick={copyToClipboard}
        name={
          <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
            <Files className="w-4 h-4 stroke-black" />
          </span>
        }
        className="w-[420px] max-w-[420px] h-24 bg-primary/20 rounded-lg flex items-center justify-center text-primary-foreground text-lg font-medium overflow-hidden"
      >
        <p className="text-foreground" style={{ fontSize: getPasswordFontSize() }}>
          {password || "Set some options to generate a password"}
        </p>
        <motion.p
          initial={{ y: 100 }}
          animate={{ y: copyStatus ? 0 : 100 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-xs text-foreground/60 absolute left-1 bottom-1"
        >
          copyied
        </motion.p>
        <motion.p
          initial={{ y: 100 }}
          animate={{ y: copyStatus ? 100 : 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="text-xs text-foreground/60 absolute right-1 bottom-1"
        >
          click to copy
        </motion.p>
      </Pointer>
      <div className="flex flex-col gap-2 w-[420px]">
        <div
          className="h-1 w-full overflow-hidden rounded-full bg-border max-w-[420px]"
          role="progressbar"
          aria-valuenow={strengthScore}
          aria-valuemin={0}
          aria-valuemax={4}
          aria-label="Password strength"
        >
          <div
            className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
            style={{ width: `${(strengthScore / 4) * 100}%` }}
          ></div>
        </div>
        <span className="flex justify-between w-full">
          <p className="text-sm font-medium text-foreground">
            {getStrengthText(strengthScore)}
          </p>
          <motion.div
            whileTap={{ rotate: 360 }}
            transition={{ duration: .5 }}
            onClick={() => generatePassword()}
            className="flex items-center justify-center"
          >
            <RefreshCcw
              className="w-4 h-4 text-foreground/70 hover:text-foreground cursor-pointer"
            />
          </motion.div>
        </span>
      </div>
      <div className="space-y-4 max-w-[420px]">
        <Label>
          Length :{" "}
          <output className="text-sm font-medium tabular-nums">
            {value[0]}
          </output>
        </Label>
        <div>
          <Slider
            max={max}
            aria-label="Length"
            value={value}
            onValueChange={(value) => handleSliderChange(value)}
          />
          <span
            className="mt-3 flex w-full items-center justify-between gap-1 px-2.5 text-xs font-medium text-muted-foreground"
            aria-hidden="true"
          >
            {ticks.map((_, i) => (
              <span
                key={i}
                className="flex w-0 flex-col items-center justify-center gap-2"
              >
                <span
                  className={cn(
                    "h-1 w-px bg-muted-foreground/70",
                    i % skipInterval !== 0 && "h-0.5",
                    i === value[0] &&
                      "bg-primary-foreground shadow-[0_0_5px_#fff]"
                  )}
                />
                <span className={cn(i % skipInterval !== 0 && "opacity-0")}>
                  {i}
                </span>
              </span>
            ))}
          </span>
        </div>
      </div>
      <Label className="w-full max-w-[420px] ">
        <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
          SETTINGS
        </span>
      </Label>
      <div className="relative flex w-full max-w-[420px] items-start gap-2 rounded-lg px-4">
        <Switch
          checked={includeLetters}
          onCheckedChange={(checked) =>
            handleSwitchChange(setIncludeLetters, checked)
          }
          className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
        />
        <div className="grid grow gap-2">
          <Label htmlFor="checkbox-13">Include Letters</Label>
        </div>
      </div>
      <div className="relative flex w-full max-w-[420px] items-start gap-2 rounded-lg px-4">
        <Switch
          checked={includeMixedCase}
          onCheckedChange={(checked) =>
            handleSwitchChange(setIncludeMixedCase, checked)
          }
          className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
        />
        <div className="grid grow gap-2">
          <Label htmlFor="checkbox-13">Mixed case</Label>
        </div>
      </div>
      <div className="relative flex w-full max-w-[420px] items-start gap-2 rounded-lg px-4">
        <Switch
          checked={includeNumbers}
          onCheckedChange={(checked) =>
            handleSwitchChange(setIncludeNumbers, checked)
          }
          className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
        />
        <div className="grid grow gap-2">
          <Label htmlFor="checkbox-13">Include Numbers</Label>
        </div>
      </div>
      <div className="relative flex w-full max-w-[420px] items-start gap-2 rounded-lg px-4">
        <Switch
          checked={includeSymbols}
          onCheckedChange={(checked) =>
            handleSwitchChange(setIncludeSymbols, checked)
          }
          className="order-1 after:absolute after:inset-0 data-[state=unchecked]:border-input data-[state=unchecked]:bg-transparent [&_span]:transition-all [&_span]:data-[state=unchecked]:size-4 [&_span]:data-[state=unchecked]:translate-x-0.5 [&_span]:data-[state=unchecked]:bg-input [&_span]:data-[state=unchecked]:shadow-none rtl:[&_span]:data-[state=unchecked]:-translate-x-0.5"
        />
        <div className="grid grow gap-2">
          <Label htmlFor="checkbox-13">Include Symbols</Label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
