export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="checkbox checkbox-sm border-[#00443f]   text-[#002A28] rounded-md"
      />
      <span className="text-[#002A28]">{label}</span>
    </label>
  );
}
