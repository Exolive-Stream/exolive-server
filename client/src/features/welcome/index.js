
import { navigate } from "wouter/use-browser-location"
import { useMediaQuery } from "react-responsive";
import { TextLogo } from "@/components/logo";
import { LayoutLoader, ModernButton } from "@/components";
import { heroImg } from "@/assets";


export function WelcomePage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <main className="bg-black w-full flex flex-col">
      <header
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: isDesktop ? "auto 180%" : "auto 130%",
          backgroundPosition: "80% 50%",
          backgroundColor: 'black',
        }}
        className="relative text-primary bg-primary w-full pb-16 px-3 flex flex-col items-center"
      >
        <nav
          className="w-full flex justify-between items-center pt-4 pb-6 lg:pb-4"
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
          }}
        > 
          <ul className="flex items-center *:transition *:duration-500 *:cursor-pointer">
            <li className="mr-4">
              <a
                className="animate-pulse py-1 px-2 rounded-md text-lg font-bold bg-pink-600 text-black"
                onClick={() => navigate('/auth/login')}
              >
                Login
              </a>
            </li>
            <li>
              <a href="/about" className="text-lg font-bold underline transition-all hover:text-pink-600">
                About
              </a>
            </li>
          </ul>
        </nav>
        <h1 className="text-3xl font-bold my-3">
          You are in <TextLogo />
        </h1>

        <ModernButton href='/auth/login'> Watch girls </ModernButton>

        <div
          className="w-full p-3 absolute bottom-0 left-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)'
          }}
        />
      </header>

      <section className="py-20 px-5 flex flex-col items-center text-primary">
        <div className="max-w-m text-center font-bold text-xl">
          Join <span className="underline text-pink-600 hover:text-pink-300">now</span> and unlock a realm of unbridled <i className="text-pink-600">passion</i> and <i className="text-pink-600">pleasure</i>!
        </div>
      </section>

      <h1 className="text-3xl px-6 font-bold text-primary"> Trending Models: </h1>

      <ul className="p-6 flex flex-row flex-wrap gap-4">
        {Array(20).fill(0).map(() => <LayoutLoader/>)}
      </ul>
    </main>
  );
}