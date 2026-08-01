export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo-mark.png`}
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
    />
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-serif text-xl tracking-tight ${className}`}>
      Quillstones
    </span>
  );
}
