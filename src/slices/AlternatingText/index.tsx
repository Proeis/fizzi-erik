"use client"

import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { View } from "@react-three/drei";
import clsx from "clsx";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText: FC<AlternatingTextProps> = ({ slice }) => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative text-sky-950 bg-yellow-300"
    >
      <div>
        <View className="alternating-text-view absolute left-0 h-screen w-full">
          <Scene />
        </View>

        <div className="grid relative">


          {slice.primary.text_group.map((item, index) => (
            <div 
              key={asText(item.heading)}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >

              <div className={clsx(index % 2 == 0 ? "col-start-1" : "md:col-start-2", "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30 max-md:text-center z-[100]")}>

                <h2 className="text-balance text-6xl font-bold">
                  {asText(item.heading)}
                </h2>
                <div className="mt-4 text-xl">
                  <PrismicRichText field={item.body} />
                </div>

              </div>

            </div>
          ))}


        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;
