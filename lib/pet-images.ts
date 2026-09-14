/** Unsplash companion-animal photos (decorative; bootcamp / fictional site). */

export type PetPhoto = {
  src: string;
  alt: string;
};

export const petPhotos = {
  hero: {
    src: "https://images.unsplash.com/photo-1450778869180-41d060edd706?auto=format&fit=crop&w=1600&q=80",
    alt: "Person gently holding a happy dog at a veterinary visit",
  },
  heroAccent: {
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
    alt: "Calm tabby cat resting indoors",
  },
  clinicDog: {
    src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80",
    alt: "Golden retriever outdoors",
  },
  clinicCat: {
    src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80",
    alt: "Cat looking toward the camera",
  },
  wellness: {
    src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80",
    alt: "Two dogs playing together",
  },
  emergency: {
    src: "https://images.unsplash.com/photo-1530281700549-e82e7f93811a?auto=format&fit=crop&w=800&q=80",
    alt: "Dog receiving care and attention",
  },
  team: {
    src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80",
    alt: "Dog with a bandana at a clinic",
  },
  dashboardBanner: {
    src: "https://images.unsplash.com/photo-1628009365241-1a4a0341946e?auto=format&fit=crop&w=1600&q=80",
    alt: "Veterinarian with a small dog in a clinical setting",
  },
} satisfies Record<string, PetPhoto>;

export const clinicGallery = [
  petPhotos.wellness,
  petPhotos.clinicCat,
  petPhotos.clinicDog,
  petPhotos.team,
];
