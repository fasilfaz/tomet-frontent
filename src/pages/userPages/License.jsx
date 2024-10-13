import { SubBanner } from '@/components';
import { Card } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

const LicensingPage = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Licensing - Tomet Clothing | Fashion Design Licensing</title>
                <meta
                    name="description"
                    content="Explore the Licensing Options for Tomet Clothing Designs. Learn About Our Commercial and Personal Use Licenses to Incorporate Our Fashion Designs Into Your Projects."
                />
                <meta
                    name="keywords"
                    content="Tomet Clothing Licensing, Fashion Design Licensing, Commercial Use License, Personal Use License, Apparel Design Rights, Fashion Copyright."
                />
                <link rel="canonical" 
                // href="https://urban-nest-app.netlify.app/licensing"
                 />
            </Helmet>
            <SubBanner
            page1={"Home"}
            page2={"License"}
            href={"/"}
            color={"text-black"}
            title={"License"}
            />
            <div className="container py-5">
                <div className="space-y-8">
                    <Card className="p-5 hover:scale-105 transition-all delay-75 ease-in-out">
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Commercial Use License</h2>
                        <p className="text-justify">
                        Our Commercial Use License allows you to use our fashion designs in your commercial projects, such as retail stores, boutiques, or promotional campaigns. This license includes the right to reproduce, display, and distribute the designs, as well as the ability to create derivative works
                        </p>
                        <p className="text-justify mt-4">
                        The Commercial Use License is subject to a one-time fee of $499 per design.
                        </p>
                    </Card>
                    <Card className="p-5 hover:scale-105 transition-all delay-75 ease-in-out">
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Personal Use License</h2>
                        <p className="text-justify">
                        Our Personal Use License allows you to use our fashion designs in your personal projects, such as your wardrobe or personal blog. This license does not include the right to reproduce, display, or distribute the designs, nor the ability to create derivative works.
                        </p>
                        <p className="text-justify mt-4">
                            The Personal Use License is free of charge.
                        </p>
                    </Card>
                    {/* <Card className="p-5">
                        <h2 className="text-2xl font-bold text-[#da4444] mb-4">Additional Terms and Conditions</h2>
                        <p className="">
                            Please review our full Terms and Conditions for additional details on the use of our furniture designs.
                        </p>
                        <a
                            href="/terms"
                            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                        >
                            View Terms and Conditions
                        </a>
                    </Card> */}
                </div>
            </div>
        </div>
    );
};

export default LicensingPage;