"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Star,
  MessageSquarePlus,
  Bug,
  ChevronRightIcon,
  ChevronLeft,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Label } from "@/components/ui/label";

const FEEDBACK_OPTIONS = {
  "Feature Request": {
    description: "Suggest a new feature or enhancement.",
    icon: <MessageSquarePlus size={18} />,
  },
  "Report Issue": {
    description: "Report a bug or problem you encountered.",
    icon: <Bug size={18} />,
  },
  "Rate App": {
    description: "Give us a rating based on your experience.",
    icon: <Star size={18} />,
  },
  Other: {
    description: "Any other feedback you want to provide.",
    icon: null,
  },
};

export default function FeedbackDialog() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<
    keyof typeof FEEDBACK_OPTIONS | ""
  >("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setStep(2);
    } else if (step === 2 && (selectedType !== "Rate App" || rating !== null)) {
      setStep(3);
    }
  };

  const handleBack = () => setStep(step > 1 ? step - 1 : 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, height: 250 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full space-y-2"
          >
            <DialogHeader className="relative h-[32px]">
              <DialogTitle className="absolute flex items-center gap-2 -left-[5px] -top-[5px]">
                What kind of feedback?
              </DialogTitle>
              <span className="absolute bg-neutral-300/10 h-px w-[110%] -left-5 bottom-0"></span>
            </DialogHeader>
            {Object.entries(FEEDBACK_OPTIONS).map(
              ([type, { description, icon }]) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  className="w-full flex gap-2 items-center justify-start"
                  onClick={() =>
                    setSelectedType(type as keyof typeof FEEDBACK_OPTIONS)
                  }
                >
                  {icon} {type}
                </Button>
              )
            )}
            <DialogFooter className="w-full flex items-center justify-center">
              <Button
                className="w-full"
                onClick={handleNext}
                disabled={step === 1 && !selectedType}
              >
                Next{" "}
              </Button>
            </DialogFooter>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20, height: 250 }}
            animate={{
              opacity: 1,
              x: 0,
              height: selectedType === "Rate App" ? 310 : 190,
            }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full space-y-2"
          >
            <DialogHeader className="relative h-[32px]">
              <DialogTitle className="absolute flex items-center gap-2 -left-[10px] -top-[10px]">
                <Button size={"icon"} onClick={() => setStep(1)}>
                  <ChevronLeft />
                </Button>
                Help us improve
              </DialogTitle>
              <span className="absolute bg-neutral-300/10 h-px w-[110%] -left-5 bottom-0"></span>
            </DialogHeader>
            {selectedType === "Rate App" && (
              <div className="">
                <form className="space-y-5">
                  <div className="space-y-4">
                    <div>
                      <fieldset className="space-y-4">
                        <legend className="text-foreground text-lg leading-none">
                          How was you overall experiance?
                        </legend>
                        <RadioGroup className="flex gap-0 -space-x-px rounded-md shadow-xs">
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                            <label
                              key={number}
                              className="border-input has-data-[state=checked]:border-ring focus-within:border-ring focus-within:ring-ring/50 relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border text-center text-sm transition-[color,box-shadow] outline-none first:rounded-s-md last:rounded-e-md focus-within:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 has-data-[state=checked]:z-10"
                            >
                              <RadioGroupItem
                                id={`radio-17-r${number}`}
                                value={number.toString()}
                                className="sr-only after:absolute after:inset-0"
                              />
                              {number}
                            </label>
                          ))}
                        </RadioGroup>
                      </fieldset>
                      <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                        <p>Very bad</p>
                        <p>Execting</p>
                      </div>
                    </div>

                    <div className="*:not-first:mt-2">
                      <Label>Why did you give this rating?</Label>
                      <Textarea
                        id="feedback"
                        placeholder="How can we improve Origin UI?"
                        aria-label="SendIcon feedback"
                      />
                    </div>
                  </div>
                  <Button type="button" className="w-full">
                    Send feedback
                  </Button>
                </form>
              </div>
            )}
            {selectedType === "Feature Request" && (
              <form className="space-y-3">
                <span>
                  <Label>Describe the featured you want.</Label>
                  <Textarea
                    id="feedback"
                    placeholder="How can we and new feature?"
                    aria-label="SendIcon feedback"
                  />
                </span>
                <div className="flex flex-col sm:flex-row sm:justify-end">
                  <Button type="button">Request feature</Button>
                </div>
              </form>
            )}
            {selectedType === "Report Issue" && (
              <form className="space-y-3">
                <span>
                  <Label>Describe the issue in detail.</Label>
                  <Textarea
                    id="feedback"
                    placeholder="How can we improve?"
                    aria-label="SendIcon feedback"
                  />
                </span>
                <div className="flex flex-col sm:flex-row sm:justify-end">
                  <Button type="button">Report Bug</Button>
                </div>
              </form>
            )}
            {selectedType === "Other" && (
              <form className="space-y-3">
                <span>
                  <Label>Describe your feedback in detail.</Label>
                  <Textarea
                    id="feedback"
                    placeholder="How can we improve?"
                    aria-label="SendIcon feedback"
                  />
                </span>
                <div className="flex flex-col sm:flex-row sm:justify-end">
                  <Button type="button">Submit</Button>
                </div>
              </form>
            )}
          </motion.div>
        );
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group h-auto gap-4 py-3 text-left w-full  border-none rounded-none justify-between"
          variant="outline"
        >
          <div className="space-y-1">
            <h3>Send Feedback</h3>
          </div>
          <ChevronRightIcon
            className="opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            aria-hidden="true"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4 flex flex-col justify-between lg:min-w-[450px]">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
