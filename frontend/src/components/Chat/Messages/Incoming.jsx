const Incoming = ({ message }) => {
  return (
    <div className="flex mb-4 cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2" key={message.id}>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex max-w-96 bg-gold rounded-lg p-3 gap-3">
        <p className="text-black">{message.message}</p>
      </div>
    </div>
  );
};

export default Incoming;