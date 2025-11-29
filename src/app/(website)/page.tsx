import FAQ from "@/components/ReusableSection/FAQ";
import Gallery from "@/components/ReusableSection/Gallery";
import SentMessage from "@/components/ReusableSection/GetInTouch";
import Review from "@/components/ReusableSection/Review";
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
      {/* <FAQ /> */}
      {/* <Review /> */}
      {/* <Gallery /> */}
    </div>
  );
}
