export interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  role: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/80?img=5",
    name: "Sarah Jenkins",
    role: "PRODUCT LEAD @ FINTECH CORP",
    text: "Aditya doesn't just design — he architects experiences. His ability to translate complex product logic into something that feels inevitable is something I've rarely encountered."
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/80?img=8",
    name: "Rohan Mehta",
    role: "ENGINEERING MANAGER @ ZOMATO",
    text: "Working with Aditya redefined how our team thinks about interface design. The spatial sensibility he brings, and his obsession with micro-interactions, elevated our entire product language."
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/80?img=15",
    name: "Priya Nair",
    role: "FOUNDER @ STUDIO NOIR",
    text: "Aditya brought a cinematic quality to our dashboard that our users felt immediately — even if they couldn't name it. A rare mind: systems thinker and visual poet at once."
  }
];
