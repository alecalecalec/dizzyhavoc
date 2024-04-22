import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { MarketData } from "../../lib/stats/marketData.tsx";
import { Arb, Avax, Base, Bsc, Eth } from "./marketbars/mod.ts";
export default function MarketBarsContainer() {
  if (!IS_BROWSER) return <></>;
  const initialloading = useSignal<boolean>(true);
  const count = useSignal<number>(30);
  // liquidity
  const liq_eth = useSignal<number>(0);
  const liq_arb = useSignal<number>(0);
  const liq_bsc = useSignal<number>(0);
  const liq_base = useSignal<number>(0);
  const liq_avax = useSignal<number>(0);
  // daily volume
  const vol24_eth = useSignal<number>(0);
  const vol24_arb = useSignal<number>(0);
  const vol24_bsc = useSignal<number>(0);
  const vol24_base = useSignal<number>(0);
  const vol24_avax = useSignal<number>(0);
  // prices
  const token_eth = useSignal<number>(0);
  const token_arb = useSignal<number>(0);
  const token_bsc = useSignal<number>(0);
  const token_base = useSignal<number>(0);
  const token_avax = useSignal<number>(0);
  // txn count
  const tx_eth = useSignal<number>(0);
  const tx_arb = useSignal<number>(0);
  const tx_bsc = useSignal<number>(0);
  const tx_base = useSignal<number>(0);
  const tx_avax = useSignal<number>(0);
  // h24 price change
  const h24_eth = useSignal<number>(0);
  const h24_arb = useSignal<number>(0);
  const h24_bsc = useSignal<number>(0);
  const h24_base = useSignal<number>(0);
  const h24_avax = useSignal<number>(0);
  // index in MarketBar column
  const arborder = useSignal<number>(0);
  const bscorder = useSignal<number>(0);
  const baseorder = useSignal<number>(0);
  const avaxorder = useSignal<number>(0);
  const ethorder = useSignal<number>(0);
  // marketBar tooltip display state
  const arbtooltip = useSignal<boolean>(false);
  const bsctooltip = useSignal<boolean>(false);
  const basetooltip = useSignal<boolean>(false);
  const avaxtooltip = useSignal<boolean>(false);
  const ethtooltip = useSignal<boolean>(false);

  const getPrices = async () => {
    let arbprice = 0,
      ethprice = 0,
      bscprice = 0,
      baseprice = 0,
      avaxprice = 0;
    const data = await MarketData();
    for (let i = 0; i < data.pairs.length; i++) {
      const fixedvalue = Number(data.pairs[i].priceUsd).toFixed(5);
      const fixedliq = Number(data.pairs[i].liquidity.usd).toFixed(2);
      switch (data.pairs[i].url) {
        case "https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81":
          token_eth.value = ethprice = Number(fixedvalue);
          liq_eth.value = fixedliq;
          vol24_eth.value = data.pairs[i].volume.h24;
          tx_eth.value =
            data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
          h24_eth.value = data.pairs[i].priceChange.h24;
          break;
        case "https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83":
          token_arb.value = arbprice = Number(fixedvalue);
          liq_arb.value = fixedliq;
          vol24_arb.value = data.pairs[i].volume.h24;
          tx_arb.value =
            data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
          h24_arb.value = data.pairs[i].priceChange.h24;
          break;
        case "https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5":
          token_bsc.value = bscprice = Number(fixedvalue);
          liq_bsc.value = fixedliq;
          vol24_bsc.value = data.pairs[i].volume.h24;
          tx_bsc.value =
            data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
          h24_bsc.value = data.pairs[i].priceChange.h24;
          break;
        case "https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e":
          token_base.value = baseprice = Number(fixedvalue);
          liq_base.value = fixedliq;
          vol24_base.value = data.pairs[i].volume.h24;
          tx_base.value =
            data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
          h24_base.value = data.pairs[i].priceChange.h24;
          break;
        case "https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643":
          token_avax.value = avaxprice = Number(fixedvalue);
          liq_avax.value = fixedliq;
          vol24_avax.value = data.pairs[i].volume.h24;
          tx_avax.value =
            data.pairs[i].txns.h24.buys + data.pairs[i].txns.h24.sells;
          h24_avax.value = data.pairs[i].priceChange.h24;
          break;
        default:
          break;
      }
    }
    largestPriceDelta(ethprice, arbprice, bscprice, baseprice, avaxprice);
    initialloading.value = false;
  };
  function largestPriceDelta(
    token_eth: number,
    token_arb: number,
    token_bsc: number,
    token_base: number,
    token_avax: number
  ) {
    const tokens = {
      Eth: token_eth,
      Arb: token_arb,
      Bsc: token_bsc,
      Base: token_base,
      Avax: token_avax,
    };
    const sortedTokens = Object.entries(tokens).sort((a, b) => a[1] - b[1]); // Sort the tokens by price
    sortedTokens.forEach(([token], index) => {
      switch (token) {
        case "Eth":
          ethorder.value = index;
          break;
        case "Arb":
          arborder.value = index;
          break;
        case "Bsc":
          bscorder.value = index;
          break;
        case "Base":
          baseorder.value = index;
          break;
        case "Avax":
          avaxorder.value = index;
          break;
        default:
          break;
      }
    });
  }
  const starttimer = () => {
    // auto refresh logic
    let x = 0;
    const intervalId = setInterval(() => {
      if (x < 100) {
        x += 0.05;
        count.value = x; // Update the progress value
      } else {
        setTimeout(() => {
          getPrices();
          starttimer();
        }, 250);
        clearInterval(intervalId); // Stop the interval when x reaches 100
      }
    }, 10);
  };
  useState(() => {
    // on load, fetch data and start timer
    getPrices();
    starttimer();
  });

  return (
    <>
      {initialloading.value ? (
        // display loader
        <div class="w-full h-full flex justify-center bg-blur3 items-center">
          <img src="./misc/loader.svg"></img>
        </div>
      ) : (
        // loaded bars
        <div class="w-full flex flex-col gap-1">
          <div
            style={{ order: ethorder != null ? -ethorder : 0 }}
            class="w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3"
          >
                        <div onClick={() => {
              ethtooltip.value = !ethtooltip.value;
            }}
            class="z-[2] absolute bottom-1 cursor-pointer unselectable left-1 dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]">{ethtooltip.value ? <img class="size-5 contrast-0 vignets" src="/misc/minus.svg"></img> : <img class="size-5 contrast-0 vignets" src="/misc/plus.svg"></img>}</div>
            {/* ETH MarketBar */}
            <a
              draggable={false}
              class="z-20 sm:size-[50px] hover:scale-[105%] ml-3 mt-3 sm:mt-11 justify-start size-9"
              title="open in dexscreener"
              target="_blank"
              href="https://dexscreener.com/ethereum/0xb7a71c2e31920019962cb62aeea1dbf502905b81"
            >
              <img
                draggable={false}
                src="/chains/token_eth.png"
                title="open in dexscreener"
                alt="eth"
              />
            </a>
            <Eth
              token_eth={token_eth}
              h24_eth={h24_eth}
              liq_eth={liq_eth}
              vol24_eth={vol24_eth}
              tx_eth={tx_eth}
            />
          </div>
          {ethtooltip.value && (
            <div
              style={{ order: ethorder != null ? -ethorder : 0 }}
              class="sm:h-[1.1rem] h-[0.9rem] rounded-md justify-evenly flex flex-row sm:text-sm text-[11px] px-2 font-[Poppins] w-full bg-blur3"
            >
            <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">holders: {0}</p>
            <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">transfers: {0}</p>
            <a class="flex text-[#3b2d82] dark:text-[#ccb286]" target="_blank" href="https://etherscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">contract</a>
            </div>
          )}
          <div
            style={{ order: arborder != null ? -arborder : 0 }}
            class="w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3"
          >
                        <div onClick={() => {
              arbtooltip.value = !arbtooltip.value;
            }}
            class="z-[2] absolute bottom-1 cursor-pointer unselectable left-1 dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]">{arbtooltip.value ? <img class="size-5 contrast-0 vignets" src="/misc/minus.svg"></img> : <img class="size-5 contrast-0 vignets" src="/misc/plus.svg"></img>}</div>
            {/* Arb MarketBar */}
            <a
              draggable={false}
              class="z-20 sm:size-[50px] hover:scale-[105%] ml-3 mt-3 sm:mt-11 justify-start size-9"
              title="open in dexscreener"
              target="_blank"
              href="https://dexscreener.com/arbitrum/0x05c5bdbc7b3c64109ddcce058ce99f4515fe1c83"
            >
              <img
                draggable={false}
                src="/chains/token_arb.png"
                title="open in dexscreener"
                alt="arb"
              />
            </a>
            <Arb
              token_arb={token_arb}
              h24_arb={h24_arb}
              liq_arb={liq_arb}
              vol24_arb={vol24_arb}
              tx_arb={tx_arb}
            />
          </div>
          {arbtooltip.value && (
            <div
              style={{ order: arborder != null ? -arborder : 0 }}
              class="sm:h-[1.1rem] h-[0.9rem] rounded-md justify-evenly flex flex-row sm:text-sm text-[11px] px-2 font-[Poppins] w-full bg-blur3"
              >
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">holders: {0}</p>
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">transfers: {0}</p>
              <a class="flex text-[#3b2d82] dark:text-[#ccb286]" target="_blank" href="https://arbiscan.io/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">contract</a>
              </div>
          )}
          <div
            style={{ order: avaxorder != null ? -avaxorder : 0 }}
            class="w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3"
          >
                        <div onClick={() => {
              avaxtooltip.value = !avaxtooltip.value;
            }}
            class="z-[2] absolute bottom-1 cursor-pointer unselectable left-1 dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]">{avaxtooltip.value ? <img class="size-5 contrast-0 vignets" src="/misc/minus.svg"></img> : <img class="size-5 contrast-0 vignets" src="/misc/plus.svg"></img>}</div>
            {/* Avax MarketBar */}
            <a
              draggable={false}
              class="z-20 sm:size-[50px] hover:scale-[105%] ml-3 mt-3 sm:mt-11 justify-start size-9"
              title="open in dexscreener"
              target="_blank"
              href="https://dexscreener.com/avalanche/0x523a04633b6c0c4967824471dda0abbce7c5e643"
            >
              <img
                draggable={false}
                src="/chains/token_avax.png"
                title="open in dexscreener"
                alt="avax"
              />
            </a>
            <Avax
              token_avax={token_avax}
              h24_avax={h24_avax}
              liq_avax={liq_avax}
              vol24_avax={vol24_avax}
              tx_avax={tx_avax}
            />
          </div>
          {avaxtooltip.value && (
            <div
              style={{ order: avaxorder != null ? -avaxorder : 0 }}
              class="sm:h-[1.1rem] h-[0.9rem] rounded-md justify-evenly flex flex-row sm:text-sm text-[11px] px-2 font-[Poppins] w-full bg-blur3"
              >
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">holders: {0}</p>
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">transfers: {0}</p>
              <a class="flex text-[#3b2d82] dark:text-[#ccb286]" target="_blank" href="https://subnets.avax.network/c-chain/address/0x3419875B4D3Bca7F3FddA2dB7a476A79fD31B4fE">contract</a>
              </div>
          )}

          <div
            style={{ order: baseorder != null ? -baseorder : 0 }}
            class="w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3"
          >
                        <div onClick={() => {
              basetooltip.value = !basetooltip.value;
            }}
            class="z-[2] absolute bottom-1 cursor-pointer unselectable left-1 dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]">{basetooltip.value ? <img class="size-5 contrast-0 vignets" src="/misc/minus.svg"></img> : <img class="size-5 contrast-0 vignets" src="/misc/plus.svg"></img>}</div>
            {/* Base MarketBar */}
            <a
              draggable={false}
              class="z-20 sm:size-[50px] hover:scale-[105%] ml-3 mt-3 sm:mt-11 justify-start size-9"
              title="open in dexscreener"
              target="_blank"
              href="https://dexscreener.com/base/0xb64dff20dd5c47e6dbb56ead80d23568006dec1e"
            >
              <img
                draggable={false}
                src="/chains/token_base.png"
                title="open in dexscreener"
                alt="base"
              />
            </a>
            <Base
              token_base={token_base}
              h24_base={h24_base}
              liq_base={liq_base}
              vol24_base={vol24_base}
              tx_base={tx_base}
            />
          </div>
          {basetooltip.value && (
            <div
              style={{ order: baseorder != null ? -baseorder : 0 }}
              class="sm:h-[1.1rem] h-[0.9rem] rounded-md justify-evenly flex flex-row sm:text-sm text-[11px] px-2 font-[Poppins] w-full bg-blur3"
              >
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">holders: {0}</p>
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">transfers: {0}</p>
              <a class="flex text-[#3b2d82] dark:text-[#ccb286]" target="_blank" href="https://basescan.org/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">contract</a>
              </div>
          )}

          <div
            style={{ order: bscorder != null ? -bscorder : 0 }}
            class="w-full relative shadow-lg flex h-[7rem] sm:h-[9rem] rounded-lg gap-3 bg-blur3"
          >
            <div onClick={() => {
              bsctooltip.value = !bsctooltip.value;
            }}
             class="z-[2] absolute bottom-1 cursor-pointer unselectable left-1 dark:text-[#d0d0d0] text-[#3d3d3d] sm:text-sm text-[11px] font-[Poppins]">{bsctooltip.value ? <img class="size-5 contrast-0 vignets" src="/misc/minus.svg"></img> : <img class="size-5 contrast-0 vignets" src="/misc/plus.svg"></img>}</div>

            {/* BSC MarketBar */}
            <a
              draggable={false}
              class="z-20 sm:size-[50px] hover:scale-[105%] ml-3 mt-3 sm:mt-11 justify-start size-9"
              title="open in dexscreener"
              target="_blank"
              href="https://dexscreener.com/bsc/0x642089a5da2512db761d325a868882ece6e387f5"
            >
              <img
                draggable={false}
                src="/chains/token_bsc.png"
                title="open in dexscreener"
                alt="bsc"
              />
            </a>
            <Bsc
              token_bsc={token_bsc}
              h24_bsc={h24_bsc}
              liq_bsc={liq_bsc}
              vol24_bsc={vol24_bsc}
              tx_bsc={tx_bsc}
            />
          </div>
          {bsctooltip.value && (
            <div
              style={{ order: bscorder != null ? -bscorder : 0 }}
              class="sm:h-[1.1rem] h-[0.9rem] rounded-md justify-evenly flex flex-row sm:text-sm text-[11px] font-[Poppins] px-2  w-full bg-blur3"
              >
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">holders: {0}</p>
              <p class="flex dark:text-[#d0d0d0] text-[#3d3d3d]">transfers: {0}</p>
              <a class="flex text-[#3b2d82] dark:text-[#ccb286]" target="_blank" href="https://bscscan.com/address/0x3419875b4d3bca7f3fdda2db7a476a79fd31b4fe">contract</a>
              </div>
          )}
        </div>
      )}
    </>
  );
}
