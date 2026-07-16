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
    h-screen
    overflow-hidden
    xl:block
  "
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />

      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
};

export default AuthImage;
