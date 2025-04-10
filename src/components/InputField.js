import { motion } from "framer-motion";

export default function InputField({ label, type, name, value, onChange }) {
  return (
    <motion.div whileFocus={{ scale: 1.05 }} className="mb-4">
      <label className="label">
        <span className="label-text text-lg text-[#002A28]">{label}</span>
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className="input input-bordered w-full text-lg p-3 border-gray-300 focus:border-[#00443f] focus:ring-[#00443f] bg-[#F5F7F8] text-[#002A28]"
      />
    </motion.div>
  );
}
