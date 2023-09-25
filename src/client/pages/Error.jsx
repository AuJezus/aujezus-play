function Error({ errorMsg }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold">Error</h1>
        <p className="text-lg mt-2">{errorMsg?.message}</p>
        <p className="text-lg mt-2">Please try again later.</p>
      </div>
    </div>
  );
}

export default Error;
