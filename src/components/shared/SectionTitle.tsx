type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  titleAccent,
  description,
  centered = true,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text leading-tight">
        {title}{" "}
        {titleAccent && (
          <span className="text-primary">{titleAccent}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-brand-muted text-lg max-w-2xl leading-relaxed mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
