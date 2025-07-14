import { useState, useEffect, useMemo } from "react";

// Fungsi ini tidak bergantung pada state atau props komponen,
// jadi lebih baik diletakkan di luar agar tidak dibuat ulang pada setiap render.
function calculateTimeLeft(deadline) {
    const diff = new Date(deadline) - new Date();

    if (diff <= 0) {
        return { expired: true, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        expired: false,
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
}

function PaymentTimer({ deadline }) {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(deadline));

    useEffect(() => {
        // Hentikan interval jika waktu sudah habis dari awal
        if (timeLeft.expired) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(deadline));
        }, 1000);

        return () => clearInterval(timer);
    }, [deadline, timeLeft.expired]);

    // Gunakan useMemo untuk memformat teks waktu.
    // Ini memastikan string hanya dibuat ulang saat timeLeft berubah, bukan pada setiap render.
    const formattedTime = useMemo(() => {
        if (timeLeft.expired) {
            return "Waktu telah habis!";
        }

        const pad = (num) => String(num).padStart(2, "0");
        return `Sisa waktu: ${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(timeLeft.seconds)}`;
    }, [timeLeft]);

    return (
        <p
            className={`text-2xl text-center mt-4 ${
                timeLeft.expired ? "text-red-500" : ""
            }`}
        >
            {formattedTime}
        </p>
    );
}

export default PaymentTimer;
