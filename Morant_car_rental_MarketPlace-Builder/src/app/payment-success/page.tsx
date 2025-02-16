import Link from 'next/link';

export default function PaymentSuccess() {

  return (
    <div>
      <main className="mt-20 flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-blue-400 dark:from-gray-800 dark:to-gray-700">
        <div className="bg-white dark:bg-gray-900 max-w-md w-full p-8 rounded-lg shadow-lg text-center space-y-6">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Thank You!
          </h1>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Payment Successful!
          </h2>

          <div className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 p-4 rounded-xl text-white">
            <h3 className="text-xl font-semibold">Amount Paid</h3>
          </div>

          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>Your car rental is being processed. We&apos;ll send you the details shortly.</p>
          </div>

          <div className="mt-8">
            <Link href={"/"}>
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md transition duration-300"
              >
                Go Back to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
