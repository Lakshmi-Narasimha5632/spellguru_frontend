import { motion } from "framer-motion";

export default function BeeMascot() {
  return (
    <motion.img
      src="https://media.istockphoto.com/id/995810872/vector/cartoon-happy-bee-waving-hand.jpg?s=612x612&w=0&k=20&c=d9HmXLDVFDFmkcZZJ0Jn5teisd3GE-SIcj71_mwiTRM="
      alt="Bee Mascot"
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }}className="bee-mascot"
      style={{
        width: 90,
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 9999,
        pointerEvents: "none"
      }}
    />
  );
}
