"use client";
import { FormEvent, useState } from "react";
import { IoGitBranchOutline } from "react-icons/io5";
import { FileInput } from "./FileInput";

function Page() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [unlockAmount, setUnlockAmount] = useState(0);
  const [award, setAward] = useState(0);
  const [type, setType] = useState<
    "solidity" | "bytes" | "rust" | "bytes+solidity"
  >("solidity");
  const [chain, setChain] = useState<"ethereum" | "near" | "solana" | "cosmos">(
    "ethereum",
  );
  const [hrs, setHrs] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const duration = hrs * 3600 + min * 60 + sec; // in seconds
  const [address, setAddress] = useState("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", desc);
    formData.append("unlockAmount", unlockAmount.toString());
    formData.append("awardAmount", award.toString());
    formData.append("type", type);
    formData.append("address", address);
    formData.append("chain", chain);
    formData.append("duration", duration.toString());

    formData.set("file", file);

    try {
      const res = await fetch(`/api/hack-me`, {
        method: "POST",
        body: formData,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-[85px] max-w-[70rem] px-5 mb-20 mx-auto  ">
      <h1 className="text-white text-5xl mt-20 leading-5">Hack Me.</h1>
      <p className="mt-3 text-md font-medium ">
        Fill the required info below and create a battle,
      </p>
      <form className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-8 md:gap-20">
        <div className="w-full">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Abebe kebede"
              onChange={(e) => setName(e.target.value)}
              className="input bg-[#161B22] input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="label">
            <span className="label-text">Vulnerable contract address</span>
          </label>
          <input
            type="text"
            placeholder="0x****"
            onChange={(e) => setAddress(e.target.value)}
            className="input bg-[#161B22] input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
          />
        </div>
        {/* <TextEditor /> */}
      </form>
      <div className="my-8 md:my-20 w-full flex flex-col sm:flex-row gap-8 lg:gap-16 items-start ">
        <div className="w-full sm:w-2/3 h-full py-2">
          <FileInput onChange={(e) => setFile((e.target.files ?? [])[0])} />

          <div className="mt-10">
            <label className="label">
              <span className="label-text">Brief Description.</span>
            </label>
            <textarea
              placeholder="description..."
              onChange={(e) => setDesc(e.target.value)}
              className="textarea textarea-bordered textarea-lg w-full "
            ></textarea>
          </div>
        </div>
        <div className="w-full sm:w-1/3 flex-col mb-10">
          <div className="mb-5">
            <label className="label">
              <span className="label-text">Unlock Amount ($)</span>
            </label>
            <input
              type="number"
              placeholder="$20"
              onChange={(e) => setUnlockAmount(e.target.valueAsNumber || 0)}
              className="input bg-[#161B22] input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
            />
          </div>
          <div className="mb-5">
            <label className="label">
              <span className="label-text">Award Amount ($)</span>
            </label>
            <input
              type="number"
              placeholder="$35"
              onChange={(e) => setAward(e.target.valueAsNumber || 0)}
              className="input bg-[#161B22] input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
            />
          </div>
          <div className="mb-5">
            <label className="label">
              <span className="label-text">Select Type</span>
            </label>

            <select
              className="select bg-[#161B22] input-bordered focus:border-primary focus:outline-none w-full"
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="solidity">Solidity</option>
              <option value="bytes">Bytes</option>
              <option value="rust">Rust</option>
              <option value="bytes+solidity">Bytes+Solidity</option>
            </select>
          </div>
          <div className="mb-5">
            <label className="label">
              <span className="label-text">Select Chain</span>
            </label>

            <select
              className="select bg-[#161B22] input-bordered focus:border-primary focus:outline-none  w-full"
              onChange={(e) => setChain(e.target.value as any)}
            >
              <option value="ethereum">Ethereum</option>
              <option value="near">Near</option>
              <option value="solana">Solana</option>
              <option value="cosmos">Cosmos</option>
            </select>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Challenge Duration</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="H"
                onChange={(e) => setHrs(e.target.valueAsNumber || 0)}
                className="input bg-[#161B22] px-2 text-center input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
              />
              <input
                type="number"
                placeholder="M"
                onChange={(e) => setMin(e.target.valueAsNumber || 0)}
                className="input bg-[#161B22] px-2 text-center input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
              />
              <input
                type="number"
                placeholder="S"
                onChange={(e) => setSec(e.target.valueAsNumber || 0)}
                className="input bg-[#161B22] px-2 text-center input-bordered focus:border-primary focus:outline-none w-full placeholder:text-[#777]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="flex gap-3 items-center py-2 px-7 bg-secondary rounded-lg border border-primary "
          disabled={
            !name ||
            !desc ||
            !file ||
            duration < 600 ||
            !award ||
            !address ||
            !unlockAmount ||
            loading
          }
          onClick={handleSubmit}
        >
          <IoGitBranchOutline className="w-5 h-5 text-primary" />{" "}
          {loading ? "Submitting..." : "Submit your challenge"}
        </button>
      </div>
    </section>
  );
}

export default Page;
