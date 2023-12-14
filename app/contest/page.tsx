import format from "date-fns/format";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { CiStopwatch } from "react-icons/ci";
import { GoCodeReview } from "react-icons/go";
import { MdOutlineManageSearch } from "react-icons/md";
import { TbClockPause, TbClockPlay } from "react-icons/tb";

const Page = () => {
  const content = `
Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis vitae vehicula in, vulputate nec dui. In nec est magna. Suspendisse felis turpis, fermentum a felis ut. Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis vitae vehicula in,

Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis vitae vehicula in, vulputate nec dui. In nec est magna. Suspendisse felis turpis, fermentum a felis ut. Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis vitae vehicula in,
Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis vitae vehicula in, vulputate nec dui. In nec est magna. Suspendisse felis turpis, fermentum.

Suspendisse felis turpis, fermentum a felis ut. Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis

Suspendisse felis turpis, fermentum a felis ut. Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatisSuspendisse felis turpis, fermentum a felis ut. Maecenas porttitor iaculis enim sed vestibulum. Nam at ornare diam, sed faucibus orci. Praesent in suscipit velit. Nulla nulla magna, venenatis
`;

  return (
    <div className="px-8 py-10">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-8">
          <div className="border border-white p-1 shrink-0">
            <div className="from-[#3933B0] tp-[#B033A4] bg-gradient-to-b rounded-full h-4 w-4"></div>
          </div>

          <div className="rounded-full w-1 bg-neutral-500/40 grow"></div>
        </div>

        <div className="w-full flex flex-col">
          <div className="px-4 pb-4 from-transparent to-[#0D1117] bg-gradient-to-b flex justify-between">
            <div className="flex gap-3 items-start">
              <div className="h-20 w-20 rounded-full overflow-hidden">
                <img
                  src="https://i.pravatar.cc/300"
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="mt-3">
                <div className="text-lg font-medium">AUDNAME</div>
                <div className="text-sm">AUDTITLE</div>
              </div>
            </div>

            <div className="flex gap-2 self-center">
              <div className="flex border border-indigo-800 px-4 py-2 bg-indigo-800/20 rounded-lg items-center gap-2">
                <GoCodeReview className="text-indigo-800" size={20} />
                <p>Access Codebase</p>
              </div>
              <div className="flex border border-indigo-800 px-4 py-2 bg-indigo-800/20 rounded-lg items-center gap-2">
                <MdOutlineManageSearch className="text-indigo-800" size={20} />
                <p>Submit Findings</p>
              </div>
            </div>
          </div>

          <div className="my-8 self-start">
            <h2 className="text-4xl my-3">CONTEST NAME</h2>
            <div className="flex min-w-full gap-4 justify-between">
              <div className="flex gap-2 items-center">
                <TbClockPlay className="text-indigo-800" size={22} />
                <p className="text-sm">{format(new Date(), "MMM dd, yyyy")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <CiStopwatch className="text-indigo-800" size={22} />
                <p className="text-sm">{format(new Date(), "MMM dd, yyyy")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <AiOutlineDollarCircle className="text-indigo-800" size={22} />
                <p className="text-sm">{format(new Date(), "MMM dd, yyyy")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <TbClockPause className="text-indigo-800" size={22} />
                <p className="text-sm">{format(new Date(), "MMM dd, yyyy")}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {content.split("\n").map((c, i) => (
              <p key={i} className="font-medium text-lg">
                {c}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
