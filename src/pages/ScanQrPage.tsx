
import {Scanner} from '@yudiel/react-qr-scanner';

const ScanQrPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen ">
      <div className="max-w-md w-full space-y-4 px-4">
        <h1 className="text-3xl font-bold text-center">QR Code Scanner</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Point your camera at a QR code and the decoded information will be
          displayed.
        </p>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden aspect-square">
          <div className="flex items-center justify-center h-full">
          <Scanner
          onResult={(result) => console.log(result)}
          onError={(error) => console.log(error?.message)}
      />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 space-y-2">
          <h2 className="text-lg font-semibold">Decoded Information</h2>
          <p className="text-gray-500 dark:text-gray-400">
            No QR code detected yet.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ScanQrPage;
