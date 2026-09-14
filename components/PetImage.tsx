import Image from "next/image";
import type { PetPhoto } from "@/lib/pet-images";

type PetImageProps = PetPhoto & {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function PetImage({
  src,
  alt,
  className = "aspect-[4/3]",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: PetImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
