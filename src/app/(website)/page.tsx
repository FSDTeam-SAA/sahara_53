import SentMessage from "@/components/ReusableSection/GetInTouch";
import AmazingFeatures from "@/components/website/PageSections/HomePage/AmazingFeatures";
import Banner from "@/components/website/PageSections/HomePage/Banner";
import RecentBooks from "@/components/website/PageSections/HomePage/RecentBook";

export default function page() {
  return (
    <div>
      <Banner />
      <RecentBooks />
      <AmazingFeatures />
      <SentMessage />

    </div>
  );
}

