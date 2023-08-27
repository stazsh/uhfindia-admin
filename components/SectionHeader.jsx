function SectionHeader({ title, subtitle }) {
  return (
    <div className="w-full flex flex-row items-end">
      <div className="text-4xl mob:text-2xl text-primary font-bold">
        {title}
      </div>
      <div className="text-tertiary mob:hidden pl-3 self-end h-fit font-semibold pb-[0.15rem]">
        {subtitle}
      </div>
    </div>
  );
}

export default SectionHeader;
