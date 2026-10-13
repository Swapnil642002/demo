import type { Verification } from "./site";

export interface Member {
  id: string;
  name: string;
  role: string;
  image: { src: string; width: number; height: number; alt: string };
  /** The live site publishes no biography, department or credentials. */
  bio?: string;
  verification: Verification;
}

/**
 * The three leadership entries published on the existing site. No
 * qualifications, departments, tenure or registration numbers are published
 * there, so none are invented here.
 */
export const leadership: Member[] = [
  {
    id: "chandan-kumar-ray",
    name: "Dr. Chandan Kumar Ray",
    role: "Principal",
    image: {
      src: "/images/team/chandan-kumar-ray.png",
      width: 500,
      height: 500,
      alt: "Portrait of Dr. Chandan Kumar Ray, Principal of Shri Shaktimayi",
    },
    verification: "source-copied",
  },
  {
    id: "sahajanand-pandey",
    name: "Dr. Sahajanand Pandey",
    role: "Manager",
    image: {
      src: "/images/team/sahajanand-pandey.png",
      width: 512,
      height: 512,
      alt: "Portrait of Dr. Sahajanand Pandey, Manager of Shri Shaktimayi",
    },
    verification: "source-copied",
  },
  {
    id: "dewanand-pandey",
    name: "Dr. Dewanand Pandey",
    role: "Director",
    image: {
      src: "/images/team/dewanand-pandey.png",
      width: 512,
      height: 512,
      alt: "Portrait of Dr. Dewanand Pandey, Director of Shri Shaktimayi",
    },
    verification: "source-copied",
  },
];

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  category: "campus" | "classroom" | "events";
}

/**
 * Alt text is descriptive but deliberately conservative: the college has not
 * supplied captions, so we describe only what is visibly present rather than
 * asserting that a photo shows a named department or event.
 */
export const gallery: GalleryItem[] = [
  { id: "g1", src: "/images/gallery/gallery-1.jpg", width: 1000, height: 750, alt: "Campus view at Shri Shaktimayi", category: "campus" },
  { id: "g2", src: "/images/gallery/gallery-2.jpg", width: 1000, height: 750, alt: "College building exterior", category: "campus" },
  { id: "g3", src: "/images/gallery/gallery-3.jpg", width: 1000, height: 750, alt: "Institutional campus grounds", category: "campus" },
  { id: "g4", src: "/images/gallery/gallery-4.jpg", width: 1000, height: 750, alt: "College campus facilities", category: "campus" },
  { id: "g5", src: "/images/gallery/gallery-5.jpg", width: 1000, height: 750, alt: "Campus building and grounds", category: "campus" },
  { id: "g6", src: "/images/gallery/gallery-6.jpg", width: 1000, height: 750, alt: "Shri Shaktimayi campus area", category: "campus" },
  { id: "g7", src: "/images/gallery/gallery-7.jpg", width: 780, height: 1040, alt: "Interior view of the college facilities", category: "classroom" },
  { id: "g8", src: "/images/gallery/gallery-8.jpg", width: 1040, height: 780, alt: "College facility interior", category: "classroom" },
  { id: "g9", src: "/images/gallery/gallery-9.jpg", width: 1040, height: 780, alt: "Learning space within the college", category: "classroom" },
  { id: "g10", src: "/images/gallery/gallery-10.jpg", width: 717, height: 378, alt: "Institutional photograph", category: "campus" },
  { id: "g11", src: "/images/gallery/gallery-11.jpg", width: 717, height: 408, alt: "Institutional photograph", category: "campus" },
  { id: "g12", src: "/images/gallery/gallery-12.jpg", width: 1600, height: 720, alt: "Campus scene at Shri Shaktimayi", category: "campus" },
  { id: "g13", src: "/images/gallery/gallery-13.jpg", width: 1600, height: 718, alt: "Campus scene at Shri Shaktimayi", category: "campus" },
  { id: "g14", src: "/images/gallery/gallery-14.jpg", width: 720, height: 1600, alt: "Vertical view of college facilities", category: "classroom" },
  { id: "g15", src: "/images/gallery/gallery-15.jpg", width: 720, height: 1600, alt: "Vertical view of college facilities", category: "classroom" },
  { id: "g16", src: "/images/gallery/gallery-16.jpg", width: 1600, height: 720, alt: "Wide view of the campus", category: "campus" },
  { id: "g17", src: "/images/gallery/gallery-17.jpg", width: 1600, height: 720, alt: "Wide view of the campus", category: "campus" },
  { id: "g18", src: "/images/gallery/gallery-18.jpg", width: 720, height: 1600, alt: "Vertical view of college premises", category: "classroom" },
  { id: "g19", src: "/images/gallery/gallery-19.jpg", width: 720, height: 1600, alt: "Vertical view of college premises", category: "classroom" },
  { id: "g20", src: "/images/gallery/gallery-20.jpg", width: 1600, height: 720, alt: "Campus panorama", category: "campus" },
  { id: "g21", src: "/images/gallery/gallery-21.jpg", width: 1600, height: 720, alt: "Campus panorama", category: "campus" },
  { id: "g22", src: "/images/gallery/gallery-22.jpg", width: 1600, height: 720, alt: "Campus panorama", category: "campus" },
  { id: "g23", src: "/images/gallery/gallery-23.jpg", width: 720, height: 1600, alt: "Vertical view of institutional building", category: "campus" },
  { id: "g24", src: "/images/gallery/gallery-24.jpg", width: 1600, height: 720, alt: "Campus panorama", category: "campus" },
  { id: "g25", src: "/images/gallery/gallery-25.jpg", width: 1080, height: 728, alt: "College activity photograph", category: "events" },
  { id: "g26", src: "/images/gallery/gallery-26.jpg", width: 1073, height: 482, alt: "College activity photograph", category: "events" },
];

