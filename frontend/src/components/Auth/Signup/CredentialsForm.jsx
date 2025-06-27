function CredentialsForm({ username, setUsername, password, setPassword, onNext }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-[#ffbf00]">
          Sign Up
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium leading-6 text-white">Username</label>
          <input
            type="text"
            required
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label className="block text-sm font-medium leading-6 text-white">Password</label>
          <input
            type="password"
            required
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block pl-2 w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ffbf00] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Next
        </button>
        <div className="text-md text-center">
          <span className="text-white font-semibold">Already have an account? </span>
          <a href="/login" className="font-semibold text-red-600 hover:text-[#ffbf00]">Log in</a>
        </div>
      </form>
    </>
  );
}

export default CredentialsForm;