interface AuthImageProps {
  src: string;
  alt: string;
}

const AuthImage = ({ src, alt }: AuthImageProps) => {
  return (
    <div
      className="
        relative
        hidden
        xl:block
        h-full
        min-h-screen
        overflow-hidden
      "
    >
      <img
        src={src}
        alt={alt}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
};

export default AuthImage;
