import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import { toast } from "sonner";

interface QRCodeCardProps {
  inviteLink?: string;
}

const QRCodeCard = ({ inviteLink }: QRCodeCardProps) => {
  const [qrCode, setQrCode] = useState<string | undefined>();

  useEffect(() => {
    if (!inviteLink) {
      setQrCode(undefined);
      return;
    }

    let cancelled = false;
    QRCode.toDataURL(inviteLink, { width: 320, margin: 1 })
      .then((dataUrl) => {
        if (!cancelled) setQrCode(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setQrCode(undefined);
      });

    return () => {
      cancelled = true;
    };
  }, [inviteLink]);

  const handleDownload = () => {
    if (!qrCode) {
      toast.info("QR Code will be available after the circle is created.");
      return;
    }

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "study-circle-qr.png";
    link.click();

    toast.success("QR Code downloaded!");
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
      "
    >
      {/* Header */}

      <div>
        <h3 className="font-heading text-base font-semibold text-slate-900">
          QR Code
        </h3>

        <p className="mt-1 text-sm text-slate-500">Scan to join this circle</p>
      </div>

      {/* QR */}

      <div
        className="
          mt-6
          flex
          justify-center
        "
      >
        <div
          className="
            flex
            h-40
            w-40
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
          "
        >
          {qrCode ? (
            <img
              src={qrCode}
              alt="Study Circle QR Code"
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div className="text-center">
              <div
                className="
                  mx-auto
                  h-20
                  w-20
                  rounded-lg
                  bg-slate-100
                "
              />

              <p className="mt-4 text-xs text-slate-400">QR Preview</p>
            </div>
          )}
        </div>
      </div>

      {/* Download */}

      <button
        type="button"
        onClick={handleDownload}
        className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2

          rounded-xl
          border
          border-slate-200

          py-3

          text-sm
          font-medium
          text-[var(--color-primary)]

          transition-all
          duration-300

          hover:bg-blue-50
          hover:border-[var(--color-primary)]
        "
      >
        <HiOutlineArrowDownTray className="text-lg" />
        Download QR
      </button>
    </div>
  );
};

export default QRCodeCard;
