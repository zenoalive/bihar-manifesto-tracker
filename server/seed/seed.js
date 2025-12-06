import mongoose from "mongoose";
import dotenv from "dotenv";
import PromiseModel from "../models/Promise.js";

dotenv.config();

const initialPromises = [
  // Jobs & Employment
  { title: "1 crore jobs", description: "Generate over 1 crore employment opportunities.", category: "Jobs & Employment", progress: 0 },
  { title: "Manufacturing push", description: "A manufacturing unit in every district + 10 industrial parks.", category: "Jobs & Employment", progress: 0 },
  { title: "Big investment in new economy", description: "Attract ₹50 lakh crore into new-age economy.", category: "Jobs & Employment", progress: 0 },
  { title: "Defence & semiconductor corridor", description: "Defence corridor and semiconductor parks.", category: "Jobs & Employment", progress: 0 },

  // Skill Development
  { title: "Skills census & Mega Skill Centres", description: "Conduct a skill census; set up mega skill centres in every district.", category: "Skill Development", progress: 0 },

  // Women Empowerment
  { title: "Women's financial support (₹2L)", description: "Mukhyamantri Mahila Rozgar Yojana: up to ₹2 lakh to start businesses.", category: "Women Empowerment", progress: 0 },
  { title: "Lakhpati Didis & Mission Crorepati", description: "Target of 1 crore Lakhpati Didis; Mission Crorepati for women entrepreneurs.", category: "Women Empowerment", progress: 0 },

  // Social Justice / EBC Support
  { title: "Support for EBCs", description: "Economic and social support including ₹10 lakh for certain occupational EBC groups.", category: "Social Justice / EBC Support", progress: 0 },

  // Agriculture & Rural Development
  { title: "Karpoori Thakur Kisan Samman Nidhi", description: "₹3,000 per crop season (~₹9,000 annually) for farmers.", category: "Agriculture & Rural Development", progress: 0 },
  { title: "Guaranteed MSP & procurement centres", description: "Procurement centres for major crops at panchayat level.", category: "Agriculture & Rural Development", progress: 0 },
  { title: "Agricultural infrastructure investment", description: "₹1 lakh crore into irrigation, warehouses, food processing.", category: "Agriculture & Rural Development", progress: 0 },
  { title: "Bihar Milk Mission & Fisheries", description: "Chilling & processing units in every block; fisheries cluster development.", category: "Agriculture & Rural Development", progress: 0 },
  { title: "Flood management plan", description: "Make Bihar flood-free: embankments, interlink rivers and canals.", category: "Agriculture & Rural Development", progress: 0 },

  // Infrastructure
  { title: "7 New Expressways", description: "Construction of 7 new expressways in Bihar.", category: "Infrastructure", progress: 0 },
  { title: "Rail modernisation", description: "Modernise ~3,600 km of railway lines (Gati Shakti).", category: "Infrastructure", progress: 0 },
  { title: "Metro in 4 cities", description: "Introduce metro services in 4 additional cities.", category: "Infrastructure", progress: 0 },
  { title: "New airports & air links", description: "Greenfield international airport near Patna; upgrade regional airports.", category: "Infrastructure", progress: 0 },
  { title: "New satellite townships / Greenfield cities", description: "Develop New Patna + satellite townships.", category: "Infrastructure", progress: 0 },

  // Industry & Investment
  { title: "Vocal-for-Local / MSME push", description: "100 MSME parks and support for 50,000 local enterprises.", category: "Industry & Investment", progress: 0 },
  { title: "Textile & local export hubs", description: "Mithila Textile Park, Ang Silk Park; push silk/makhana/fish exports.", category: "Industry & Investment", progress: 0 },

  // Youth & Education
  { title: "Free education (KG → PG)", description: "Free quality schooling from KG up to PG for poor students.", category: "Youth & Education", progress: 0 },
  { title: "Nutrition & school infrastructure", description: "Modern labs, nutritious breakfasts and mid-day meals.", category: "Youth & Education", progress: 0 },
  { title: "Sports infrastructure", description: "Build sports cities and Centres of Excellence in each division.", category: "Youth & Education", progress: 0 },

  // Health & Welfare Schemes
  { title: "World-class health infrastructure", description: "Medi-city, medical colleges in every district, trauma centres.", category: "Health & Welfare Schemes", progress: 0 },
  { title: "Free healthcare, housing & security (Panchamrit)", description: "Free medical cover up to ₹5 lakh, 50 lakh houses, social security pensions.", category: "Health & Welfare Schemes", progress: 0 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Connected");

    // optional: clear only if you want fresh copy
    await PromiseModel.deleteMany({});
    console.log("Old data cleared");

    await PromiseModel.insertMany(initialPromises);
    console.log("Inserted initial promises");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
