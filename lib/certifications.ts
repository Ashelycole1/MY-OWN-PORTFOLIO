import { Certification } from "@/types/certification";

export const certifications: Certification[] = [
  {
    id: "hcia-ai-v4",
    name: "HCIA-AI V4.0 (Huawei Certified ICT Associate – Artificial Intelligence)",
    issuer: "Huawei",
    date: "2025-10",
    badgeImage: "/certifications/hcia-ai-v4.png",
    verifyUrl: undefined, // TODO: add verify link if available
  },
  {
    id: "blockchain-basics",
    name: "Blockchain Basics",
    issuer: "Cyfrin Updraft",
    date: "2026-07",
    badgeImage: "/certifications/blockchain-basics.png",
    verifyUrl: undefined, // TODO: add verify link
  },
  {
    id: "kubernetes-lfs158",
    name: "(LFS158) Introduction to Kubernetes",
    issuer: "The Linux Foundation",
    date: undefined, // TODO: confirm issue date
    badgeImage: "/certifications/kubernetes-lfs158.png",
    verifyUrl: undefined, // TODO: add verify link
  },
  {
    id: "systems-analysis-ibm",
    name: "Introduction to Systems Analysis",
    issuer: "IBM",
    date: "2026-03",
    badgeImage: "/certifications/systems-analysis-ibm.png",
    verifyUrl: undefined, // TODO: add verify link
  },
  {
    id: "digital-entrepreneurship-afrilabs",
    name: "Digital Entrepreneurship Skills",
    issuer: "AfriLabs",
    date: "2025-03",
    badgeImage: "/certifications/digital-entrepreneurship-afrilabs.png",
    verifyUrl: undefined, // TODO: add verify link
  },
  {
    id: "everyday-excel",
    name: "Everyday Excel",
    issuer: "Coursera",
    date: "2025-09",
    badgeImage: "/certifications/everyday-excel.png",
    verifyUrl: undefined, // TODO: add verify link
  },

  // --- TODO: 4 additional certifications not yet detailed ---
  // Confirmed to exist but need name/date/badge image/credential info:
  // - Huawei certification #2 (name TBD)
  // - Huawei certification #3 (name TBD)
  // - Huawei certification #4 (name TBD)
  // - Kuelimika Kwa Afrika certification (name TBD)
];
