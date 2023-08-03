function SubsectionHeader({ icon, label, className }) {
  return (
    <div
      className={
        "text-tertiary flex flex-row items-center h-fit" + " " + className
      }
    >
      {icon}
      <span className="pl-2 font-medium text-sm leading-none">{label}</span>
    </div>
  );
}

export default SubsectionHeader;
