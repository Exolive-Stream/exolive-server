import { TextLogo } from "../../components/logo";
import heroImg from "../../assets/hero.png";
import { useMediaQuery } from "react-responsive";
import { LayoutLoader, ModernButton } from "../../components";

export function WelcomePage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className="bg-black w-full flex flex-col">
      <div
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: isDesktop ? "auto 180%" : "100% auto",
          backgroundPosition: "80% 50%",
          backgroundColor: 'black',
        }}
        className="relative text-primary bg-primary w-full py-16 px-3 flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold mb-3">
          You are in <TextLogo />
        </h1>

        <ModernButton> Watch girls </ModernButton>

        <div
          className="w-full p-3 absolute bottom-0 left-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
          }}
        />
      </div>

      <div className="py-20 px-5 flex flex-col items-center text-primary ">
        <div className="max-w-mm font-bold text-xl">
          Join <span className="underline text-pink-600 hover:text-pink-300">now</span> and unlock a realm of unbridled <i className="text-pink-600">passion</i> and <i className="text-pink-600">pleasure</i>!
        </div>
      </div>
      <h1 className="text-3xl px-6 font-bold text-primary"> Trend Models: </h1>
      <ul className="p-6 flex flex-row flex-wrap *:m-4">
        {
          Array(20).fill(0).map(() => <LayoutLoader/>
          )}
      </ul>
    </div>
  );
}