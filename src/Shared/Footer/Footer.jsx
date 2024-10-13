import React from "react";
import { Footer as FlowbiteFooter } from "flowbite-react";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsPinterest,
  BsLinkedin,
} from "react-icons/bs";

const Footer = () => {
  return (
    <div className="shadow-2xl py-10 ">
      <FlowbiteFooter container>
        <div className="w-full">
          {/* Header section */}
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="ml-20">
              <img className="w-3/12" src="https://i.ibb.co.com/drCQPSv/mlogo1.png" alt="" />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              {/* About section */}
              <div>
                <FlowbiteFooter.Title title="About Us" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link href="/about">
                    Our Story
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link href="/about#mission">
                    Our Mission
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link href="/about#commitment">
                    Sustainability
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div>
              {/* Customer Service section */}
              <div>
                <FlowbiteFooter.Title title="Customer Service" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link href="/contact">
                    Contact Us
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link href="/faq">FAQs</FlowbiteFooter.Link>
                  <FlowbiteFooter.Link href="/returns">
                    Returns & Exchanges
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div>
              {/* Legal section */}
              <div>
                <FlowbiteFooter.Title title="Legal" />
                <FlowbiteFooter.LinkGroup col>
                  <FlowbiteFooter.Link href="/privacy-policy">
                    Privacy Policy
                  </FlowbiteFooter.Link>
                  <FlowbiteFooter.Link href="/terms">
                    Terms & Conditions
                  </FlowbiteFooter.Link>
                </FlowbiteFooter.LinkGroup>
              </div>
            </div>
          </div>
          <FlowbiteFooter.Divider />
          {/* Copyright and social media links */}
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FlowbiteFooter.Copyright
              href="#"
              by="Trendy Boutique™"
              year={2024}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
              <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
              <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
              <FlowbiteFooter.Icon href="#" icon={BsPinterest} />
              <FlowbiteFooter.Icon href="#" icon={BsLinkedin} />
            </div>
          </div>
        </div>
      </FlowbiteFooter>
    </div>
  );
};

export default Footer;
