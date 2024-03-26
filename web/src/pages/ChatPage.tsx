export function ChatPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-4">
          <div className="overflow-y-auto max-h-60">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="ml-2 bg-blue-100 rounded-lg p-2">
                  <p className="text-sm text-blue-800">User1: Hello there!</p>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="mr-2 bg-green-100 rounded-lg p-2">
                  <p className="text-sm text-green-800">
                    User2: Hi, how are you?
                  </p>
                </div>
                <img
                  src="https://via.placeholder.com/40"
                  alt="Avatar"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50">
          <form className="flex">
            <input
              type="text"
              placeholder="Type your message here"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
