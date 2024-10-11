import React from 'react';
import { Footer as FlowbiteFooter } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <div>
            <FlowbiteFooter container>
                <div className="w-full">
                    {/* Header section */}
                    <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                        <div>
                            <FlowbiteFooter.Brand
                                href="https://flowbite.com"
                                src="https://flowbite.com/docs/images/logo.svg"
                                alt="Flowbite Logo"
                                name="Flowbite"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                            {/* About section */}
                            <div>
                                <FlowbiteFooter.Title title="About" />
                                <FlowbiteFooter.LinkGroup col>
                                    <FlowbiteFooter.Link href="#">Flowbite</FlowbiteFooter.Link>
                                    <FlowbiteFooter.Link href="#">Tailwind CSS</FlowbiteFooter.Link>
                                </FlowbiteFooter.LinkGroup>
                            </div>
                            {/* Follow us section */}
                            <div>
                                <FlowbiteFooter.Title title="Follow Us" />
                                <FlowbiteFooter.LinkGroup col>
                                    <FlowbiteFooter.Link href="#">GitHub</FlowbiteFooter.Link>
                                    <FlowbiteFooter.Link href="#">Discord</FlowbiteFooter.Link>
                                </FlowbiteFooter.LinkGroup>
                            </div>
                            {/* Legal section */}
                            <div>
                                <FlowbiteFooter.Title title="Legal" />
                                <FlowbiteFooter.LinkGroup col>
                                    <FlowbiteFooter.Link href="#">Privacy Policy</FlowbiteFooter.Link>
                                    <FlowbiteFooter.Link href="#">Terms & Conditions</FlowbiteFooter.Link>
                                </FlowbiteFooter.LinkGroup>
                            </div>
                        </div>
                    </div>
                    <FlowbiteFooter.Divider />
                    {/* Copyright and social media links */}
                    <div className="w-full sm:flex sm:items-center sm:justify-between">
                        <FlowbiteFooter.Copyright href="#" by="Flowbite™" year={2022} />
                        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                            <FlowbiteFooter.Icon href="#" icon={BsFacebook} />
                            <FlowbiteFooter.Icon href="#" icon={BsInstagram} />
                            <FlowbiteFooter.Icon href="#" icon={BsTwitter} />
                            <FlowbiteFooter.Icon href="#" icon={BsGithub} />
                            <FlowbiteFooter.Icon href="#" icon={BsDribbble} />
                        </div>
                    </div>
                </div>
            </FlowbiteFooter>
        </div>
    );
};

export default Footer;
