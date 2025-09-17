"use client"

import { Environment } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import FloatingCan from "@/components/FloatingCan"
import { useMediaQuery } from "@/hooks/useMediaQuery"

gsap.registerPlugin(useGSAP, ScrollTrigger)



export default function Scene() {
    const canRef = useRef<Group>(null)
    const isDesktop = useMediaQuery("(min-width: 768px)", true)

    const bgColors = ["#FFA6B5", "#E9CFF6" , "#CBEF9A"]

    useGSAP(() => {
        if (!canRef.current) return;

        const sections = gsap.utils.toArray(".alternating-section")

        const scrollTl = gsap.timeline({
            scrollTrigger:  {
                trigger: ".alternating-text-view",
                endTrigger: ".alternating-text-container",
                pin: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            }
        })

        sections.forEach((_, index) => {
            if (!canRef.current) return;
            if (index == 0) return;

            const isOdd = index % 2 !== 0

            const xPosition = isDesktop ? (isOdd ? "-1" : "1") : 0
            const delay = isDesktop ? 0 : 0.5
            const duration = isDesktop ? 0.5 : 1

            scrollTl
            .to(canRef.current.position, {
                x: xPosition,
                ease: "power1.inOut",
            })
            .to(canRef.current.rotation, {
                y: isOdd ? "0.4" : "-0.4",
                ease: "back.inOut",
                delay: delay,
                duration: duration,
            }, "<")
            .to(".alternating-text-container", {
                backgroundColor: gsap.utils.wrap(bgColors, index)
            });

        });

    }, {dependencies: [isDesktop]});


  return (
    <group ref={canRef} position-x={isDesktop ? 1 : 0} rotation-y={-0.4}>
        <FloatingCan flavor={"strawberryLemonade"}/>
        <Environment files={"/hdr/lobby.hdr"} environmentIntensity={1} />
    </group>
  )
}