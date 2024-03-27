function Header() {
    return (
        <div className="bg-black p-8 my-0.5 mx-0.5 rounded-xl">
            <h2 className="text-white font-extrabold text-center text-6xl italic">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-cyan-700 uppercase">Task</span>
                <small className="text-gray-500 font-semibold">manager</small>
            </h2>
        </div>
    )
}

export default Header;