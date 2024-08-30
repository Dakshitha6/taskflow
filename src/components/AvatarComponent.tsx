
function AvatarSelectionModal({ isOpen, onClose, onSelectAvatar }:any) {
  const avatars = [
    '/images/avatars/avatar1.png',
    '/images/avatars/avatar2.png',
    '/images/avatars/avatar3.png',
    '/images/avatars/avatar4.png',
    '/images/avatars/avatar5.png',
    '/images/avatars/avatar6.png',
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Select Your Avatar</h2>
        <div className="grid grid-cols-3 gap-4">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="h-20 w-20 rounded-full cursor-pointer object-cover"
              onClick={() => onSelectAvatar(avatar)}
            />
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default AvatarSelectionModal;
