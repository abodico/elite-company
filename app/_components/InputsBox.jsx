"use client"

const InputsBox = ({
    title,
    inputs = [],
    buttonName,
    onSubmit,
    setOpenInputsBox,
}) => {
    return (
        <>
            <div className="w-full h-full rounded-tl-3xl bg-black/10 absolute inset-0 top-0"></div>
            <div className="w-[769px] min-h-[405px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-primary border-4 bg-white">
                <div className="relative w-full h-full p-9 flex flex-col justify-center items-center">
                    <button
                        onClick={() => setOpenInputsBox(false)}
                        className="absolute inset-0 top-4 left-4 size-8 text-primary  rounded-full bg-secondary border-primary border-2 text-center "
                    >
                        X
                    </button>
                    <h3 className="text-3xl font-semibold text-primary inter">
                        {!!title && title}
                    </h3>
                    <div className="w-full">
                        <form
                            action="w-full flex flex-col gap-4"
                            onSubmit={(e) => onSubmit(e)}
                        >
                            <div className="px-4">
                                {inputs.map((input) =>
                                    input.type !== "select" ? (
                                        <input
                                            key={input.name}
                                            type={input.type}
                                            spellCheck="false"
                                            className="block my-4 outline-none bg-primary rounded-3xl w-full h-14 text-white text-xl px-4"
                                            placeholder={
                                                "Please Enter Your " +
                                                input.name +
                                                ":"
                                            }
                                        />
                                    ) : (
                                        <select
                                            key={input.name}
                                            className="block my-4 outline-none bg-primary rounded-3xl w-full h-14 text-white text-xl px-4"
                                            placeholder={
                                                "Please Enter Your " +
                                                input.name +
                                                ":"
                                            }
                                        >
                                            {input.options.map((option) => (
                                                <option
                                                    key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    )
                                )}
                            </div>
                            <input
                                type="submit"
                                value={buttonName}
                                className="float-right inline-block bg-primary cursor-pointer px-8 h-fit text-3xl text-white transition hover:scale-110 hover:shadow-xl focus:outline-none"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InputsBox
