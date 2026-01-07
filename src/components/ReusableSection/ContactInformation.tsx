// components/ContactInformation.tsx

// import Image from "next/image";
import { Card } from "../ui/card";
import Link from "next/link";
import { Globe, Phone } from "lucide-react";

export default function ContactInformation() {
  return (
    <section>
      <div className="container mx-auto p-4 my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <Card className="group relative overflow-hidden gap-0 bg-[#EFEFFD] border-border/50 p-6 transition-all duration-300 hover:border-border hover:shadow-lg">
            <p className="mb-2 flex items-center justify-center w-14 h-14 bg-[#5D5FEF] rounded-lg p-3 text-white">
              <Globe className="w-7 h-7" />
            </p>

            <h3 className="mb-2 text-lg font-semibold text-[#5D5FEF] font-serif">
              Get in Touch
            </h3>

            <p className="text-sm text-[#5D5FEF] mb-5">
              Speak to our friendly team.
            </p>

            <Link
              href="mailto:Support@buildastorytime.com"
              className="text-[#5D5FEF]"
            >
              Support@buildastorytime.com
            </Link>
          </Card>

          {/* Phone Card */}
          <Card className="group relative overflow-hidden gap-0 bg-[#EFEFFD] border-border/50 p-6 transition-all duration-300 hover:border-border hover:shadow-lg">
            <p className="mb-2 flex items-center justify-center w-14 h-14 bg-[#5D5FEF] rounded-lg p-3 text-white">
              <Phone className="w-7 h-7" />
            </p>

            <h3 className="mb-2 text-lg font-semibold text-[#5D5FEF] font-serif">
              Call us
            </h3>

            <p className="text-sm text-[#5D5FEF] mb-5">
              Mon–Fri from 10 AM to 4 PM.
            </p>

            <Link href="tel:+15550000000" className="text-[#5D5FEF]">
              0421963588
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
