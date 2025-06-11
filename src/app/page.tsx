'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Lenis from 'lenis';
import { MotionValue, useScroll, useTransform, motion, useInView } from 'framer-motion';

const images = [
  "/fruits4.png",
  "/fruits5.png",
  "/fruits.png",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
  "/hero5.png",
  "/hero6.png",
  "/fruits.png",
  "/hero7.png",
  "/hero8.png",
  "/hero9.png",
];

export default function Home() {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const title = useRef(null);
  const contactTitle = useRef(null);
  const isInView = useInView(title, { once: true, margin: '75%' });
  const isContactInView = useInView(contactTitle, { 
    once: true, 
    margin: '-25%',
  });

  const titleWords = "Software that works because we love making it.".split(" ");
  const titleWords2 = "Contact Us!".split(" ");

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i
      }
    })
  };

  const animation2 = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 0.075 * i
      }
    })
  }

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', resize);
    requestAnimationFrame(raf);
    resize();
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <main className="bg-white">
      {/* <div className="h-screen underline-hidden" style={{background: 'radial-gradient(circle at 50% 100%, #000000 60%, #0066ff, #ff66aa, #ff6600 )',}}> */}
      <div className='h-screen underline-hidden'> 
        <h1 ref={title} className="text-[3rem] xl:text-[6rem] text-black font-mono font-black absolute top-1/5 left-0 pl-[3vw] uppercase md:top-1/4 md:left-0 md:w-3/5 flex flex-wrap z-10">
          {titleWords.map((word, i) => (
            <span key={i} className="relative overflow-hidden mr-4 inline-block">
              <motion.span
                className="inline-block"
                custom={i}
                variants={animation}
                initial="initial"
                animate={isInView ? "enter" : ""}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        <h2 className="text-md xl:text-[2rem] text-neutral-400 font-mono font-medium bottom-10 xl:bottom-12 px-[3vw] left-0 md:left-0 md:w-3/4 absolute">
        Tailored software solutions, crafted with passion.
        <motion.div
          className="absolute bottom-3 lg:bottom-5 w-full md:flex justify-end hidden"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-8 lg:w-8" fill="none" viewBox="0 0 24 24" stroke="black">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
        </h2>
      </div>
      <motion.div
        className="lg:flex items-center pt-[80vw] lg:pt-0 justify-end h-full absolute z-2 top-0 right-0 mr-[3vw] ml-[3vw] hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
      >
        <Image
          src="/ascii-art (3).png"
          width={400}
          height={400}
          alt="ASCII Art"
          className="rounded-lg shadow-[0_20px_30px_rgba(0,0,0,0.5)] object-cover"
          style={{ background: "#000", filter: "" }}
        />
      </motion.div>
      <div ref={gallery} className="h-[175vh] overflow-hidden bg-white ">
        <div className="relative top-[-12.5vh] h-[120vh] lg:h-[200vh] flex gap-[2vw] p-[2vw]">
          <Column images={[images[0], images[1], images[2]]} y={y} className="relative h-full min-w-full lg:w-1/4  lg:min-w-[250px] flex flex-col gap-[2vw] top-[-50%] lg:top-[-30%]" />
          <Column images={[images[3], images[4], images[5]]} y={y2} className="relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] top-[-70%]" />
          <Column images={[images[6], images[7], images[8]]} y={y3} className="relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] top-[-30%]" />
          <Column images={[images[9], images[10], images[11]]} y={y4} className="relative h-full w-1/4 min-w-[250px] flex flex-col gap-[2vw] top-[-60%]" />
        </div>
      </div>
      {/* <div className="h-screen flex items-center" style={{background: 'radial-gradient(circle at 50% 0%, #000000 60%, #0066ff, #ff66aa, #ff6600 )',}}> */}
      <div className="h-screen flex items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-end">
          <div ref={contactTitle} className="text-left mb-8 lg:mb-0 w-full lg:w-1/2 mt-10 flex flex-col items-start">
            <div className="flex flex-wrap">
              {titleWords2.map((word, i) => (
                <span key={i} className="text-[3rem] pl-[3vw] uppercase xl:text-[6rem] text-black font-mono font-black mb-0 overflow-hidden mr-4 inline-block text-center">
                  <motion.span
                    className="inline-block"
                    custom={i}
                    variants={animation2}
                    initial="initial"
                    animate={isContactInView ? "enter" : ""}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>
            <h2 className="text-md pl-[3vw] xl:text-[2rem] text-neutral-400 font-mono font-medium mt-2">
              <div className='flex items-center mb-0'>
                contact@gmail.com 
                <svg className="w-4 h-4 md:w-[1.5rem] md:h-[1.5rem] ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              </div>
              For your next project :)
            </h2>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:mr-[3vw]">
            <pre className="text-xs sm:text-sm text-black font-mono md:scale-100 h-full mx-[3vw] lg:mx-0">
{/* {`                                 __
                     .--.      .'  \`.
                   .' . :\\    /   :  L
                   F     :\\  /   . : |        .-._
                  /     :  \\/        J      .' ___\\
                 J     :   /      : : L    /--'   \`\`.
                 F      : J           |  .<'.o.  \`-'>
                /        J             L \\_>.   .--w)
               J        /              \\_/|   . \`-__|
               F                        / \`    -' /|)
              |   :                    J   '        |
             .'   ':                   |    .    :  \\
            /                          J      :     |L
           F                              |     \\   ||
          F .                             |   :      |
         F  |                             ; .   :  : F
        /   |                                     : J
       J    J             )                ;        F
       |     L           /      .:'                J
    .-'F:     L        ./       :: :       .       F
    \`-'F:     .\\    \`:.J         :::.             J
      J       :\\    \`:|        |::::\\            |
      J        |:\`.    J        :\`:::\\            F
       L   :':/ \\ \`-\`.  \\       : \`:::|        .-'
       |     /   L    >--\\         :::|\`.    .-'
       J    J    |    |   L     .  :::: :\`, /
        L   F    J    )   |        >::   : /
        |  J      L   F   \\     .-.:'   . /
        ): |     J   /     \`-   | |   .--'
        /  |     |: J        L  J J   )
        L  |     |: |        L   F|   /
        \\: J     \\:  L       \\  /  L |
         L |      \\  |        F|   | )
         J F       \\ J       J |   |J
          L|        \\ \\      | |   | L
          J L        \\ \\     F \\   F |
           L\\         \\ \\   J   | J   L
          /__\\_________)_\`._)_  |_/   \\_____
                              ""   \`"""`} */}
{/* {`
                      .,,uod8B8bou,,.
              ..,uod8BBBBBBBBBBBBBBBBRPFT?l!i:.
         ,=m8BBBBBBBBBBBBBBBRPFT?!||||||||||||||
         !...:!TVBBBRPFT||||||||||!!^^""'   ||||
         !.......:!?|||||!!^^""'            ||||
         !.........||||                     ||||
         !.........||||  #/'                 ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         !.........||||                     ||||
         \.........||||                    ,||||
          .;.......||||               _.-!!|||||
   .,uodWBBBBb.....||||       _.-!!|||||||||!:'
!YBBBBBBBBBBBBBBb..!|||:..-!!|||||||!iof68BBBBBb....
!..YBBBBBBBBBBBBBBb!!||||||||!iof68BBBBBBRPFT?!::   \\.
!....YBBBBBBBBBBBBBBbaaitf68BBBBBBRPFT?!:::::::::     \\.
!......YBBBBBBBBBBBBBBBBBBBRPFT?!::::::;:!^"';:::       \\.
!........YBBBBBBBBBBRPFT?!::::::::::^''...::::::;         iBBbo.
\\..........YBRPFT?!::::::::::::::::::::::::;iof68bo.      WBBBBbo.
  \\..........:::::::::::::::::::::::;iof688888888888b.     'YBBBP^'
    \\........::::::::::::::::;iof688888888888888888888b.     '
      \\......:::::::::;iof688888888888888888888888888888b.
        \\....:::;iof688888888888888888888888888888888888b.
          \\..::!8888888888888888888888888888888899fT!^"'
            \\' !!988888888888888888888888888899fT|!^"'
                \\!!8888888888888888899fT|!^"'
                  \\!988888888899fT|!^"'
                    \\!9899fT|!^"'
                      \\!^"'
`}  */}
              <video
                src="/ascii-art-video (1).webm"
                autoPlay
                loop
                muted
                playsInline
                className="rounded-lg shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                style={{ background: "#000", filter: "" }}
              />
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
const Column = ({ images, y, className }: { images: string[]; y: MotionValue<number>; className?: string }) => {
  return (
    <motion.div
      className={`${className}`}
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-1/3 w-full overflow-hidden border-1 border-neutral-700 rounded-lg shadow-[0_20px_20px_rgba(0,0,0,0.5)]">
          <div className="relative w-full h-full">
            <Image src={`${src}`} alt={`image ${i}`} fill className="object-cover rounded-lg" />
            <div className="w-full h-full bg-neutral-200 rounded-md" />
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-md" />
          </div>
        </div>
      ))}
    </motion.div>
  );
}