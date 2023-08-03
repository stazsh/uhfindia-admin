function SectionHeader({ title, subtitle }) {
  return (
    <div className="w-full flex flex-row">
      <div className="text-4xl text-primary font-bold">{title}</div>
      <div className="text-tertiary pl-3 self-end h-fit font-semibold pb-[0.15rem]">
        {subtitle}
      </div>
    </div>
  );
}

export default SectionHeader;
