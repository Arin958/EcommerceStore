const Newsletter = () => (
  <div>
    <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
    <p className="text-gray-400 mb-4">
      Subscribe for exclusive offers and updates.
    </p>
    <form className="space-y-3">
      <input
        type="email"
        placeholder="Your email"
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white"
      />
      <button
        type="submit"
        className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition"
      >
        Subscribe
      </button>
    </form>
  </div>
);

export default Newsletter;