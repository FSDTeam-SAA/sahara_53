import Link from "next/link";
import { Heart } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#EFEFFD] text-gray-800 py-16 px-6  mx-auto">
      <div className="w-full mx-auto overflow-hidden">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 ">
          {/* Left Section - Logo and Description */}
          <div className="md:col-span-1">
            <div className="">
       
              <Image
                src={"/logo.png"}
                alt="logo"
                width={96}
                height={80}
                className=" object-cover"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Craft magical stories that inspire imagination and bring joy to
              every reader.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  href="/create-book"
                  className="text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  Create Book
                </Link>
              </li>
              <li>
                <Link
                  href="/myorder"
                  className="text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-6">
              Learn More
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/how-it-work"
                  className="text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-600 hover:text-purple-600 transition text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-gray-800 font-semibold text-lg mb-6">
              Get In Touch
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-gray-600 text-sm">Made With Love</span>
            </div>
            <p className="text-gray-600 text-sm">
              <a
                href="mailto:support@buildastorytime.com"
                className="hover:text-purple-600 transition overflow-y-auto"
              >
                Support@buildastorytime.com
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 mb-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>© 2025 Build a Story Time. All rights reserved.</p>
          {/* <div className="flex gap-6">
            <Link
              href="#"
              className="hover:text-purple-600 transition font-medium"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-purple-600 transition font-medium"
            >
              Privacy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
