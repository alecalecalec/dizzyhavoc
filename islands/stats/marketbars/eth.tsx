import { EthChart } from "../charts/mod.ts";
import { Signal } from "@preact/signals";
import { formatNumber } from "../../../lib/common/formatNumber.tsx";
export function Eth(props: {
  token_eth: Signal<number>;
  h24_eth: Signal<number>;
  liq_eth: Signal<number>;
  vol24_eth: Signal<number>;
  tx_eth: Signal<number>;
}) {
  const { token_eth, h24_eth, liq_eth, vol24_eth, tx_eth } = props;
  return (
    <div class="flex items-start sm:items-center flex-row">
      <div class="flex gap-3 sm:gap-0 mx-3 sm:flex-col flex-row">
        <div class="flex sm:flex-row flex-col">
          <section class="rounded flex sm:flex-row flex-col w-full py-[1px] ml-0">
            <h1 class="font-[Poppins] text-[#000000] font-medium dark:text-[#ccb286] text-[1rem] sm:text-[1.2rem] inline">
              ${formatNumber(token_eth.value)}
            </h1>
            <h1
              title="24h price change"
              class={`font-[Poppins] unselectable font-medium text-[0.7rem] ml-1 sm:text-[0.7rem] inline ${
                h24_eth.value < 0 ? "text-[#a23535]" : "text-[#4da235]"
              }`}
            >
              {h24_eth.value}%
            </h1>
          </section>
        </div>
        <div class="flex sm:flex-row flex-col">
          <section class="rounded flex flex-col w-full py-[1px] ml-0">
            <h1 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] sm:text-start text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
              Liquidity:{" "}
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] inline">
                ${formatNumber(liq_eth.value)}
              </h1>
            </h1>
          </section>
        </div>
        <div class="flex flex-row sm:flex-col">
          <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
            <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] sm:text-start text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
              24h Vol:{" "}
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] inline">
                ${formatNumber(vol24_eth.value)}
              </h1>
            </h2>
          </section>
        </div>
        <div class="flex flex-row sm:flex-col">
          <section class="rounded flex flex-col mx-auto w-full py-[1px] ml-0">
            <h2 class="font-[Poppins] dark:text-[#d2d2d2] text-[#1a1a1a] sm:text-start text-center text-[0.5rem] sm:text-[0.8rem] inline justify-center tracking-tight items-center">
              24h Tx:{" "}
              <h1 class="mx-1 font-[Poppins] text-[#000000] dark:text-[#ffffff] text-[0.95rem] inline">
                {Number(formatNumber(tx_eth.value)).toFixed(0)}
              </h1>
            </h2>
          </section>
        </div>
      </div>
      <div class="flex absolute right-auto left-0 sm:left-auto sm:right-0 flex-row">
        <EthChart />
      </div>
    </div>
  );
}
