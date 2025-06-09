const Outgoing= ({ message }) => {
  return (
    <div className="flex justify-end mb-4 cursor-pointer" key={message.id}>
      <div className="flex max-w-96 bg-white text-black rounded-lg p-3 gap-3">
        <p>{message.message}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="My Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default Outgoing;
