import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";

function FAQItem({ question, answer }) {
  const [exp, setexp] = useState(false);

  return (
    <>
      <div className="flex flex-col vignets">
        <div
          class="text-xl font-[Poppins] unselectable dark:text-[#d2d2d2] text-[#3d3d3d] px-3 my-1 text-center rounded-lg bg-blur3 sm:w-[240px] w-screen cursor-pointer hover:scale-[100.5%] active:scale-[99.5%]"
          onClick={() => setexp(!exp)}
        >
          {question}
        </div>
        {exp && (
          <p class="text-md font-[Poppins] sm:w-[400px] w-screen unselectable dark:text-[#d2d2d2] text-[#3d3d3d]">
            {answer}
          </p>
        )}
      </div>
    </>
  );
}

export function FAQ() {
  if (!IS_BROWSER) return null;
  const [hidden, sethidden] = useState(false);
  const faqItems = [
    {
      question: "What is DizzyHavoc?",
      answer:
        "DizzyHavoc is a new deployment method for smart contracts, specifically designed to reduce costs and enhance flexibility.",
    },
    {
      question: "How does it work?",
      answer: "DizzyHavoc works by...",
    },
  ];
  const isMobile = globalThis.window?.matchMedia("(pointer: coarse)").matches;
  if (!isMobile) {
    return (
      <>
        <div
          onClick={() => sethidden(!hidden)}
          className="
          text-xl
          sm:text-3xl 
          mb-2 
          font-medium 
          font-[Poppins] 
          text-center 
          unselectable 
          w-full 
          cursor-pointer 
          hover:scale-[100.5%] 
          active:scale-[99.5%] 
          border-[1px]
          border-e-transparent 
          border-s-transparent 
          border-t-[#5e5e5e4d] 
          border-b-[#5e5e5e4d] 
          dark:border-e-transparent 
          dark:border-s-transparent 
          dark:border-t-[#dbdbdb3b]
          dark:border-b-[#dbdbdb3b]
        dark:text-[#cccccc] 
        text-[#3d3d3d]"
        >
          Frequently Asked Questions
        </div>
        <div class="w-[410px] h-[150px] overflow-y-scroll overflow-x-hidden">
          {hidden &&
            faqItems.map((item) => (
              <FAQItem question={item.question} answer={item.answer} />
            ))}
        </div>
      </>
    );
  } else if (isMobile) {
    return (
      <>
        <div class="w-screen h-[150px] overflow-y-scroll overflow-x-hidden">
          <div
            onClick={() => sethidden(!hidden)}
            className="
            text-xl 
            mb-2 
            shadow-lg 
            font-medium 
            font-[Poppins] 
            text-center 
            unselectable 
            rounded-lg 
            bg-blur3 
            w-[110px] 
            cursor-pointer 
            hover:scale-[100.5%] 
            active:scale-[99.5%] 
            border
            border-[#e9e9e981]
          dark:border-[#ffffff13]
          dark:bg-[#191919]
          bg-[#f1f1f1] 
          dark:text-[#d2d2d2] 
          text-[#3d3d3d]"
          >
            FAQ
          </div>
          {!hidden &&
            faqItems.map((item) => (
              <FAQItem question={item.question} answer={item.answer} />
            ))}
        </div>
      </>
    );
  }
}
