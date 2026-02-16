/**
 * Example usage of the Package component
 * 
 * This file demonstrates how to use the Package component with data fetched from an API.
 * Replace the API_URL with your actual API endpoint.
 */

import Package from "./package";
import type { PackageData } from "./package";

// Example: Fetch package data from API
async function fetchPackageData(slug: string): Promise<PackageData | null> {
  try {
    // Replace with your actual API endpoint
    const API_URL = "https://api.growfore.com/api/v1/packages"; // Example URL
    const response = await fetch(`${API_URL}?slug=${slug}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch package data");
    }
    
    const result = await response.json();
    
    // Map the API response to match PackageData type
    if (result.data && result.data.length > 0) {
      return result.data[0] as PackageData;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching package:", error);
    return null;
  }
}

// Example component that uses Package
export default async function PackagePageExample({ slug }: { slug: string }) {
  const packageData = await fetchPackageData(slug);
  
  if (!packageData) {
    return (
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-2xl font-bold">Package not found</h1>
        <p className="mt-2 text-muted-foreground">
          The package you're looking for doesn't exist.
        </p>
      </div>
    );
  }
  
  return <Package data={packageData} />;
}

// Example with mock data (for testing/development)
export const mockPackageData: PackageData = {
  id: 3,
  title: "Annapurna Circuit Trek",
  slug: "eligendi-optio-dele",
  shortDescription: "<p>Blanditiis&nbsp;vero&nbsp;sint.</p>",
  fullDescription: "<p>Join the Annapurna Circuit Trek. It's an amazing journey through the Himalayas, offering stunning mountain views, diverse landscapes, and rich cultural experiences.</p>",
  highlights: [
    "<p>Scenic mountain flight to Lukla from Kathmandu/Ramechhap</p>",
    "<p>Trek past renowned Sherpa towns like Namche, Tengboche & Dingboche</p>",
    "<p>Cross into Sagarmatha National Park, a UNESCO World Heritage Site</p>",
  ],
  locations: ["Ipsam consequatur do"],
  keywords: ["Et eum architecto au"],
  inclusions: [
    "<p>Aspernatur&nbsp;suscipit&nbsp;.</p>",
    "<p>Accommodation in teahouses</p>",
    "<p>All meals during the trek</p>",
  ],
  exclusions: [
    "<p>Velit&nbsp;aut&nbsp;iusto&nbsp;repe.</p>",
    "<p>International flights</p>",
    "<p>Travel insurance</p>",
  ],
  price: 264,
  dropOffPoint: "Fugit corporis offi",
  duration: "19 Days",
  guestCapacity: 81,
  images: [
    "https://api.growfore.com/api/v1/uploads/birendra-lake-manaslu-circuit-1770613619344-xothyi.webp",
  ],
  itinerary: [
    {
      day: 1,
      title: "Dolorem dolorum ex p",
      description: "<p>Labore&nbsp;commodi&nbsp;atque.</p>",
    },
    {
      day: 2,
      title: "Arrival in Kathmandu",
      description: "<p>Welcome to Nepal! Transfer to hotel and briefing session.</p>",
    },
  ],
  meetingPoint: "Distinctio Eius qui",
  whatToBring: [],
  additionalInfo: [
    {
      title: "Nisi labore delectus",
      description: "<p>Reiciendis&nbsp;quia&nbsp;in&nbsp;v.</p>",
    },
  ],
  difficultyLevel: "EASY",
  averageRating: 0,
  reviewCount: 0,
  faqs: [
    {
      answer: "<p>Sapiente&nbsp;et&nbsp;veniam,&nbsp;.</p>",
      question: "Reprehenderit autem",
    },
  ],
};
