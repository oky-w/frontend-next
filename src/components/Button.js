import { motion } from "framer-motion";

export default function Button({ label, onClick, type }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      type={type}
      className="btn bg-[#00443f] text-white w-full text-lg py-3 rounded-lg hover:bg-[#002A28] transition-all"
    >
      {label}
    </motion.button>
  );
}
