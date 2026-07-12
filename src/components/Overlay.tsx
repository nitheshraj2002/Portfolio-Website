import { motion, MotionValue, useTransform, useSpring } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const smooth = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 20,
    mass: 2,
  });

  const opacity1 = useTransform(smooth, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(smooth, [0, 0.2], [0, -100]);

  const opacity2 = useTransform(smooth, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(smooth, [0.2, 0.5], [100, -100]);

  const opacity3 = useTransform(smooth, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(smooth, [0.5, 0.8], [100, -100]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8">

        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute text-center flex flex-col items-center justify-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
            Nithesh Byju
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light tracking-wide">
            Creative Developer.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-8 md:left-24 max-w-xl text-left"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
            I build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              digital experiences.
            </span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute right-8 md:right-24 max-w-xl text-right"
        >
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
            Bridging <span className="italic text-zinc-300">design</span> and <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              engineering.
            </span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}