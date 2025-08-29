import Image from "next/image";
import classNames from "classnames";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Avatar = ({ src, alt, size = "md", className }: AvatarProps) => {
  const sizeClass = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
    xl: "h-32 w-32",
  };

  return (
    <div className={classNames("relative", sizeClass[size], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-full object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default Avatar;
