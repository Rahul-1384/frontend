import React, { useState } from 'react';
import QR from '../images/bookefy_06_qr.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/Dialog";
import { FaApple, FaGooglePlay } from 'react-icons/fa';


const AppDownloadButtons = () => {
  const [isIOSModalOpen, setIsIOSModalOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
      {/* iOS Button */}
      <button
        onClick={() => setIsIOSModalOpen(true)}
        className="w-full sm:w-auto px-6 py-3 bg-white text-gray-900 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-300"
      >
        <FaApple className="w-8 h-8" />
        <div className="text-left">
          <div className="text-sm">Download on the</div>
          <div className="text-lg font-semibold">App Store</div>
        </div>
      </button>

      {/* Android Button */}
      <button
        onClick={() => setIsAndroidModalOpen(true)}
        className="w-full sm:w-auto px-6 py-3 bg-white text-gray-900 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-300"
      >
        <FaGooglePlay className="w-6 h-6" />
        <div className="text-left">
          <div className="text-sm">Get it on</div>
          <div className="text-lg font-semibold">Google Play</div>
        </div>
      </button>

      {/* iOS Modal */}
      <Dialog open={isIOSModalOpen} onOpenChange={setIsIOSModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download iOS App</DialogTitle>
            <DialogDescription>
              Scan the QR code below with your iOS device camera
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <img
              src={QR}
              alt="iOS App QR Code"
              className="w-64 h-64 bg-white p-4 rounded-lg"
            />
            <p className="mt-4 text-center text-sm text-gray-500">
              Scan this QR code with your iOS device to download the app
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Android Modal */}
      <Dialog open={isAndroidModalOpen} onOpenChange={setIsAndroidModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Android App</DialogTitle>
            <DialogDescription>
              Scan the QR code below with your Android device camera
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <img
              src={QR}
              alt="Android App QR Code"
              className="w-64 h-64 bg-white p-4 rounded-lg"
            />
            <p className="mt-4 text-center text-sm text-gray-500">
              Scan this QR code with your Android device to download the app
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppDownloadButtons;